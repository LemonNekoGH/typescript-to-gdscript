import { watch } from 'chokidar';
import { extname, resolve, relative, join } from 'path';
import { tmpdir } from 'os';
import { createHash } from 'crypto';
import ts from 'typescript';
import { convertTsToGd } from "../converter/ts-to-gd/index.js";
import { collectRuntimeModules, gdOutputPath, } from "../converter/ts-to-gd/modules.js";
import { createTsProgram } from "../parser/typescript/index.js";
import { validateGdFiles } from "../godot-validate/index.js";
import { generateTypings, generateAddonTypings, generateFileTypings, } from "../typings/scenes.js";
import { shouldIgnore } from "../config/index.js";
import { ProjectCache } from "../cache/index.js";
import { isConversionErrorSeverity } from "../converter/common/index.js";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { CheckRunner } from "./check.js";
/** File extensions that trigger typings regeneration (scenes, resources, assets). */
const RESOURCE_EXTENSIONS = new Set([
    '.tscn',
    '.tres',
    '.res',
    '.png',
    '.jpg',
    '.ogg',
    '.wav',
    '.mp3',
    '.gdshader',
    '.theme',
]);
/** All extensions the watcher cares about (TS + resources). */
const WATCHED_EXTENSIONS = new Set(['.ts', ...RESOURCE_EXTENSIONS]);
/** Debounce delay (ms) — wait for rapid file changes to settle before converting. */
const DEBOUNCE_MS = 50;
/** Debounce delay (ms) for the full-project diagnostic check after conversion. */
const CHECK_DEBOUNCE_MS = 1000;
export class Watcher {
    options;
    fsWatcher = null;
    cache;
    tsFiles = new Set();
    tsDir;
    gdDir;
    initialTypingsGenerated = false;
    initialScanDone = false;
    collectingInitialScan = true;
    // ── Program reuse ─────────────────────────────────────────
    cachedProgram = null;
    // ── Debounced conversion queue ────────────────────────────
    pendingTsFiles = new Set();
    pendingNonTsFiles = [];
    debounceTimer = null;
    // ── Debounced full-project check ──────────────────────────
    checkDebounceTimer = null;
    // ── Check + error-driven self-heal (see check.ts / heal.ts) ──
    checkRunner;
    // ── Initial scan counters ─────────────────────────────────
    initialConverted = 0;
    initialSkipped = 0;
    initialErrors = 0;
    cacheDir;
    constructor(options) {
        this.options = options;
        this.tsDir = options.tsDir ?? options.rootDir;
        this.gdDir = options.gdDir ?? options.outputDir ?? this.tsDir;
        this.cacheDir =
            options.cacheDir ??
                join(tmpdir(), `tstogd-cache-${createHash('sha256').update(resolve(options.rootDir)).digest('hex').slice(0, 16)}`);
        // `watch: true` keeps the manifest in sync with writes from the
        // parallel ts-plugin (inside tsserver). Without it, both sides hold
        // independent in-memory snapshots and their views of the cache drift.
        this.cache = new ProjectCache(this.cacheDir, { watch: true });
        this.checkRunner = new CheckRunner({
            tsDir: this.tsDir,
            gdDir: this.gdDir,
            projectRoot: options.projectRoot ?? options.rootDir,
            cacheDir: this.cacheDir,
            tsConfigPath: options.tsConfigPath,
            godotPath: options.godotPath,
            emitOnError: options.emitOnError,
            debug: options.debug,
            cache: this.cache,
            getTsFiles: () => this.tsFiles,
            getProgram: () => this.cachedProgram,
            setProgram: (p) => {
                this.cachedProgram = p;
            },
            requestRecheck: () => this.scheduleCheck(),
            log: (file, message, severity) => this.log(file, message, severity),
            debugLog: (message) => this.debugLog(message),
        });
    }
    start() {
        // Chokidar v4 does not support glob patterns — watch directories and filter via ignored.
        const watchedDirs = this.tsDir === this.options.rootDir
            ? [this.options.rootDir]
            : [this.tsDir, this.options.rootDir];
        this.fsWatcher = watch(watchedDirs, {
            ignored: (path, stats) => {
                const base = path.split(/[/\\]/).pop() ?? '';
                if (base.startsWith('.') ||
                    base === 'node_modules' ||
                    base === 'addons' ||
                    base === 'dist')
                    return true;
                if (!stats?.isFile())
                    return false;
                if (path.endsWith('.d.ts'))
                    return true;
                if (base === 'project.godot')
                    return false;
                const dotIdx = base.lastIndexOf('.');
                const ext = dotIdx >= 0 ? base.slice(dotIdx) : '';
                return !WATCHED_EXTENSIONS.has(ext);
            },
            persistent: true,
            ignoreInitial: false,
        });
        this.fsWatcher
            .on('add', (path) => this.handleFile(resolve(path)))
            .on('change', (path) => this.handleFile(resolve(path)))
            .on('unlink', (path) => this.handleRemove(resolve(path)))
            .on('ready', () => {
            // Enable debouncing before the flush. A file change can occur while the
            // initial batch is converting; it must schedule a follow-up batch rather
            // than being left in the newly refilled pending queue.
            this.initialScanDone = true;
            this.flushPending();
            this.collectingInitialScan = false;
            // Clean stale cache entries now that all files have been scanned
            const currentTsFiles = new Set([...this.tsFiles].map((f) => f.replace(/\\/g, '/')));
            this.cache.cleanStale(currentTsFiles);
            this.cache.save();
            // Print summary
            const parts = [];
            if (this.initialConverted > 0)
                parts.push(`${this.initialConverted} converted`);
            if (this.initialSkipped > 0)
                parts.push(`${this.initialSkipped} cached`);
            if (this.initialErrors > 0)
                parts.push(`${this.initialErrors} error(s)`);
            const summary = parts.length > 0 ? parts.join(', ') : 'no .ts files found';
            console.log(`Initial scan complete: ${summary}. Watching for changes...`);
        });
    }
    async stop() {
        if (this.debounceTimer)
            clearTimeout(this.debounceTimer);
        if (this.checkDebounceTimer)
            clearTimeout(this.checkDebounceTimer);
        // Wait for an in-flight check (which may be heal-writing files)
        // before tearing anything down.
        await this.checkRunner.dispose();
        await this.fsWatcher?.close();
        this.cache.save();
        await this.cache.close();
        console.log('Watcher stopped.');
    }
    // ── Event handlers ────────────────────────────────────────
    handleFile(filePath) {
        const ext = extname(filePath);
        if (shouldIgnore(filePath, this.options.rootDir, this.options.ignore ?? []))
            return;
        if (ext === '.ts' && !filePath.endsWith('.d.ts')) {
            this.tsFiles.add(filePath);
            this.pendingTsFiles.add(filePath);
            // Invalidate cached program — a TS file changed
            this.cachedProgram = null;
            this.scheduleFlush();
        }
        else if (RESOURCE_EXTENSIONS.has(ext) ||
            filePath.endsWith('project.godot')) {
            this.pendingNonTsFiles.push(filePath);
            this.scheduleFlush();
        }
    }
    handleRemove(filePath) {
        this.tsFiles.delete(filePath);
        this.pendingTsFiles.delete(filePath);
        this.cachedProgram = null;
        this.cache.save();
    }
    // ── Debounced batch processing ────────────────────────────
    scheduleFlush() {
        // During initial scan, don't debounce — we flush in the ready handler
        if (!this.initialScanDone)
            return;
        if (this.debounceTimer)
            clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.flushPending(), DEBOUNCE_MS);
    }
    flushPending() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
        const tsToConvert = [...this.pendingTsFiles];
        const nonTsChanged = [...this.pendingNonTsFiles];
        this.pendingTsFiles.clear();
        this.pendingNonTsFiles.length = 0;
        // Convert TS files (batch — one Program for all)
        if (tsToConvert.length > 0) {
            this.convertBatch(tsToConvert);
        }
        // Regenerate typings for all changed files (TS + non-TS) in one batch
        const allChanged = [...tsToConvert, ...nonTsChanged];
        if (allChanged.length > 0) {
            this.regenerateTypingsFor(allChanged);
        }
        // Always schedule the diagnostic check — even when no files needed
        // re-conversion (warm-cache initial scan) the user still wants to
        // see the project-wide error state.
        this.scheduleCheck();
    }
    // ── Batch conversion with Program reuse ───────────────────
    convertBatch(filePaths) {
        // Create or reuse the ts.Program before resolving the runtime graph.
        // TypeScript owns package/workspace module resolution, including paths
        // aliases and package exports.
        const oldProgram = this.cachedProgram ?? undefined;
        const program = createTsProgram({
            rootDir: this.tsDir,
            files: [...this.tsFiles],
            tsConfigPath: this.options.tsConfigPath,
            oldProgram,
        });
        this.cachedProgram = program;
        const runtimeFiles = collectRuntimeModules(filePaths, program);
        // Separate cached vs. stale files
        const toConvert = [];
        for (const filePath of runtimeFiles) {
            const outputOptions = {
                tsDir: this.tsDir,
                gdDir: this.gdDir,
                projectRoot: this.options.projectRoot ?? this.options.rootDir,
            };
            const outputPath = gdOutputPath(filePath, outputOptions);
            if (!outputPath) {
                this.log(filePath, 'Runtime module is outside tsDir and has no package.json for staging', 'error');
                continue;
            }
            if (this.cache.isTsToGdFresh(filePath, outputPath)) {
                if (this.collectingInitialScan)
                    this.initialSkipped++;
                this.log(filePath, 'Unchanged (cached)', 'debug');
                continue;
            }
            // Promote from cache-folder if a previous plugin/convert run already
            // produced the right bytes for the current source — saves a full
            // re-conversion + Godot validation.
            if (this.cache.hasFreshCachedGd(filePath)) {
                const promoted = this.cache.promoteCachedGd(filePath, outputPath);
                if (promoted && this.cache.isTsToGdFresh(filePath, outputPath)) {
                    if (this.collectingInitialScan)
                        this.initialSkipped++;
                    this.log(filePath, 'Promoted (cache-folder)', 'debug');
                    continue;
                }
            }
            toConvert.push({ filePath, outputPath });
        }
        if (toConvert.length === 0)
            return;
        this.debugLog(`Converting ${toConvert.length} file(s) with ${oldProgram ? 'reused' : 'new'} program`);
        for (const { filePath, outputPath } of toConvert) {
            this.convertSingleFile(filePath, outputPath, program);
        }
    }
    scheduleCheck() {
        if (this.options.noCheck)
            return;
        if (this.checkDebounceTimer)
            clearTimeout(this.checkDebounceTimer);
        this.debugLog(`Scheduling diagnostic check (${CHECK_DEBOUNCE_MS}ms debounce)`);
        this.checkDebounceTimer = setTimeout(() => this.runCheck(), CHECK_DEBOUNCE_MS);
    }
    runCheck() {
        this.checkDebounceTimer = null;
        this.checkRunner.run();
    }
    convertSingleFile(filePath, outputPath, program) {
        // This file's diagnostics may legitimately change this cycle (it was
        // edited) — exclude it from the heal pass's suspect detection.
        this.checkRunner.noteConverted(filePath);
        const result = convertTsToGd({
            filePath,
            rootDir: this.tsDir,
            tsDir: this.tsDir,
            gdDir: this.gdDir,
            projectRoot: this.options.projectRoot ?? this.options.rootDir,
            sourceMap: true,
            program,
        });
        for (const d of result.diagnostics) {
            // Map type-error → warning for log colouring; watch treats type-errors as non-blocking.
            const logSeverity = d.severity === 'type-error' ? 'warning' : d.severity;
            this.log(d.file, `[${d.severity}] ${d.message} (${d.line}:${d.column})`, logSeverity);
        }
        if (result.diagnostics.some((d) => isConversionErrorSeverity(d.severity))) {
            if (this.collectingInitialScan)
                this.initialErrors++;
            if (!this.options.emitOnError)
                return;
        }
        // Write output — only when the bytes actually changed, so Godot
        // doesn't reimport identical files and file watchers don't churn.
        const normalizeEol = (s) => s.replace(/\r\n/g, '\n');
        const diskContent = existsSync(outputPath)
            ? readFileSync(outputPath, 'utf-8')
            : null;
        const outputUnchanged = diskContent !== null &&
            normalizeEol(diskContent) === normalizeEol(result.code);
        if (!outputUnchanged) {
            mkdirSync(dirname(outputPath), { recursive: true });
            writeFileSync(outputPath, result.code);
        }
        // Update cache. `gdContent` populates `<cacheDir>/gd-output/` so a
        // later run (or the plugin) can reuse the exact bytes via promote.
        // When the write was skipped, hash the bytes actually on disk — a
        // CRLF .gd would never look fresh against the LF `result.code` hash.
        if (result.sourceMap) {
            this.cache.updateTsToGd(filePath, outputPath, result.sourceMap, result.diagnostics, {
                gdContent: outputUnchanged ? diskContent : result.code,
            });
        }
        this.cache.save();
        if (this.collectingInitialScan) {
            this.initialConverted++;
        }
        this.log(filePath, `Converted -> ${relative(this.options.rootDir, outputPath) || outputPath}`, 'info');
        // Validate with Godot if configured (identical bytes → identical
        // validation result, so skip when nothing was written)
        if (this.options.godotPath && !outputUnchanged) {
            const projectRoot = this.options.projectRoot ?? this.options.rootDir;
            validateGdFiles({
                gdFiles: [outputPath],
                projectRoot,
                godotPath: this.options.godotPath,
                cacheDir: this.cacheDir,
            })
                .then((validateResult) => {
                for (const d of validateResult.diagnostics) {
                    this.log(d.file || filePath, `[${d.severity}] ${d.message} (${d.line}:${d.column})`, d.severity);
                }
            })
                .catch((err) => {
                this.log(filePath, `Godot validation failed: ${err.message}`, 'warning');
            });
        }
    }
    // ── Typings regeneration ──────────────────────────────────
    debugLog(message) {
        if (this.options.debug) {
            console.log(message);
        }
    }
    regenerateTypingsFor(changedFiles) {
        if (!this.options.typingsDir)
            return;
        const typingsDir = this.options.typingsDir;
        const onDebug = this.options.debug
            ? (msg) => this.debugLog(msg)
            : undefined;
        // First run: full generation (all scripts, scenes, resources, index, addons)
        if (!this.initialTypingsGenerated) {
            this.initialTypingsGenerated = true;
            generateTypings({
                rootDir: this.options.rootDir,
                tsDir: this.tsDir,
                gdDir: this.gdDir,
                files: [...this.tsFiles],
                outputDir: typingsDir,
                scenesDir: this.options.scenesDir ?? this.options.rootDir,
                tsConfigPath: this.options.tsConfigPath,
                ignore: this.options.ignore,
                projectFile: this.options.projectFile,
                cache: this.cache,
                onDebug,
                godotTypingsDir: this.options.godotTypingsDir,
                generateGlobalClassTypes: this.options.generateGlobalClassTypes,
            });
            generateAddonTypings({
                rootDir: this.options.rootDir,
                outputDir: typingsDir,
                ignore: this.options.ignore,
                cache: this.cache,
                onDebug,
            });
            return;
        }
        // Incremental: regenerate typings for all changed files in one batch
        generateFileTypings(changedFiles, [...this.tsFiles], {
            rootDir: this.options.rootDir,
            tsDir: this.tsDir,
            outputDir: typingsDir,
            tsConfigPath: this.options.tsConfigPath,
            scenesDir: this.options.scenesDir ?? this.options.rootDir,
            ignore: this.options.ignore,
            projectFile: this.options.projectFile,
            cache: this.cache,
            generateGlobalClassTypes: this.options.generateGlobalClassTypes,
        });
    }
    // ── Logging ───────────────────────────────────────────────
    log(file, message, severity) {
        if (severity === 'debug' && !this.options.debug)
            return;
        if (this.options.onDiagnostic) {
            this.options.onDiagnostic(file, message, severity);
        }
        else {
            const prefix = severity === 'error'
                ? 'ERROR'
                : severity === 'warning'
                    ? 'WARN'
                    : 'INFO';
            console.log(`[${prefix}] ${relative(this.options.rootDir, file)}: ${message}`);
        }
    }
}
//# sourceMappingURL=index.js.map