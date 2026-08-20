/**
 * Error-driven self-healing for watch mode.
 *
 * The watcher reconverts only files whose own content changed, so a type
 * change in `b.ts` can leave `a.gd` stale. By design every *dangerous*
 * stale output surfaces as a fresh diagnostic each check cycle (TS
 * diagnostics are recomputed from the live program; Godot validates the
 * actual on-disk `.gd`). This module turns those diagnostics into the
 * "affected set": files whose diagnostic signature changed — without
 * having been reconverted in the current batch — are reconverted in
 * memory and rewritten when their output bytes differ.
 *
 * Positions are deliberately excluded from signatures: editing `b.ts`
 * shifts line numbers in ITS diagnostics, not in other files'. A file
 * whose only delta is diagnostic positions was edited itself (and thus
 * sits in the converted batch, which is excluded anyway).
 */
import { createHash } from 'crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, relative, resolve } from 'path';
import { convertTsToGd } from "../converter/ts-to-gd/index.js";
import { isConversionErrorSeverity } from "../converter/common/index.js";
/** Normalize a path for map keys (forward slashes). */
export function normPath(p) {
    return p.replace(/\\/g, '/');
}
/**
 * Per-file signature of a check result's diagnostics. Key: normalized
 * file path. Value: hash over the SORTED set of `severity|message`
 * entries — positions excluded, duplicates collapse.
 */
export function diagnosticSignatures(result) {
    const byFile = new Map();
    const collect = (diags, source) => {
        for (const d of diags) {
            if (d.severity === 'info')
                continue;
            const key = normPath(d.file);
            const list = byFile.get(key) ?? [];
            list.push(`${source}|${d.severity}|${d.message}`);
            byFile.set(key, list);
        }
    };
    collect(result.tsDiagnostics, 'TS');
    collect(result.converterDiagnostics, 'CONV');
    collect(result.godotDiagnostics, 'GD');
    const signatures = new Map();
    for (const [file, entries] of byFile) {
        const sorted = [...new Set(entries)].sort().join('\n');
        signatures.set(file, createHash('md5').update(sorted).digest('hex').slice(0, 16));
    }
    return signatures;
}
/**
 * Files whose diagnostic signature changed between two check runs
 * (appeared, disappeared, or differs), excluding files converted in the
 * current batch (already fresh) and anything that isn't a watched
 * project `.ts` file.
 *
 * `prev === null` means "no baseline yet" (first check after startup):
 * every file with diagnostics counts as changed — intentionally heals
 * stale-error files left over from previous sessions.
 */
export function computeSuspects(prev, curr, options) {
    const prevMap = prev ?? new Map();
    const candidates = new Set([...prevMap.keys(), ...curr.keys()]);
    const suspects = [];
    for (const file of candidates) {
        if (prevMap.get(file) === curr.get(file))
            continue;
        if (options.batchConverted.has(file))
            continue;
        if (!file.endsWith('.ts') || file.endsWith('.d.ts'))
            continue;
        if (!options.projectTsFiles.has(file))
            continue;
        suspects.push(file);
    }
    return suspects;
}
/**
 * Reconvert `files` in memory and rewrite the ones whose generated
 * bytes differ from disk (cache entries refreshed alongside). Returns
 * the list of `.gd` paths actually rewritten — non-empty means the
 * caller should rerun the diagnostic check ONCE so Godot validates the
 * healed bytes and converter diagnostics come from the fresh entries.
 */
export function healFiles(options) {
    const rewrote = [];
    for (const filePath of options.files) {
        const relPath = relative(options.tsDir, filePath);
        const outputPath = resolve(options.gdDir, relPath.replace(/\.ts$/, '.gd'));
        const result = convertTsToGd({
            filePath,
            rootDir: options.tsDir,
            tsDir: options.tsDir,
            gdDir: options.gdDir,
            projectRoot: options.projectRoot,
            tsConfigPath: options.tsConfigPath,
            sourceMap: true,
            program: options.program,
        });
        // Mirror convertSingleFile: hard conversion errors block the write.
        if (result.diagnostics.some((d) => isConversionErrorSeverity(d.severity)) &&
            !options.emitOnError) {
            options.onLog?.(filePath, 'Heal skipped — conversion errors block the write');
            continue;
        }
        const normalize = (s) => s.replace(/\r\n/g, '\n');
        const onDisk = existsSync(outputPath)
            ? readFileSync(outputPath, 'utf-8')
            : null;
        if (onDisk !== null && normalize(onDisk) === normalize(result.code)) {
            // Output already current — refresh diagnostics/source map only.
            // Hash the bytes actually on disk: a CRLF .gd would never look
            // fresh against the hash of the LF `result.code`.
            if (result.sourceMap) {
                options.cache.updateTsToGd(filePath, outputPath, result.sourceMap, result.diagnostics, { gdContent: onDisk });
            }
            continue;
        }
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, result.code);
        if (result.sourceMap) {
            options.cache.updateTsToGd(filePath, outputPath, result.sourceMap, result.diagnostics, { gdContent: result.code });
        }
        rewrote.push(outputPath);
        options.onLog?.(outputPath, 'Healed (stale output)');
    }
    return { rewrote };
}
//# sourceMappingURL=heal.js.map