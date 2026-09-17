import { readFileSync, existsSync } from 'fs';
import { join, resolve, dirname, relative, basename } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { minimatch } from 'minimatch';
import { GodotClassRegistry } from "../typings/godot-registry.js";
import { TSTOGD_MODULES_DIR } from "../external-packages/index.js";
export function resolveConfig(options) {
    const searchDir = options?.configDir ?? process.cwd();
    const loaded = loadConfig(searchDir);
    const config = loaded?.config ?? null;
    // Use the directory where tstogd.json was found (not the search start dir)
    const baseDir = loaded?.configDir ?? searchDir;
    const overrides = options?.overrides ?? {};
    // Merge: CLI overrides > config > defaults
    const rootDir = resolve(baseDir, overrides.rootDir ?? config?.rootDir ?? '.');
    const tsDir = resolve(rootDir, overrides.tsDir ?? config?.tsDir ?? 'src');
    const gdDir = resolve(rootDir, overrides.gdDir ?? config?.gdDir ?? 'scripts');
    const typingsDir = resolve(rootDir, overrides.typingsDir ?? config?.typingsDir ?? '_gdtots');
    const scenesDir = resolve(rootDir, overrides.scenesDir ?? config?.scenesDir ?? '.');
    const ignore = overrides.exclude ?? config?.exclude ?? [];
    const projectFile = resolve(rootDir, overrides.projectFile ?? config?.projectFile ?? 'project.godot');
    const cacheDir = resolve(rootDir, overrides.cacheDir ??
        config?.cacheDir ??
        (existsSync(join(rootDir, 'node_modules'))
            ? join('node_modules', '.cache', 'typescript-to-gdscript')
            : join(tmpdir(), 'typescript-to-gdscript', basename(rootDir))));
    const godotTypingsDir = config?.godotTypingsDir
        ? resolve(baseDir, config.godotTypingsDir)
        : (findPackageTypingsDir(rootDir) ?? getPackageTypingsDir());
    return {
        rootDir,
        tsDir,
        gdDir,
        typingsDir,
        scenesDir,
        ignore,
        projectFile,
        tsconfig: overrides.tsconfig ??
            config?.tsconfig ??
            (existsSync(join(rootDir, 'tsconfig.json'))
                ? join(rootDir, 'tsconfig.json')
                : undefined),
        godotPath: overrides.godotPath ?? config?.godotPath,
        disableGodotLint: config?.disableGodotLint ?? false,
        lib: overrides.lib ?? config?.lib ?? false,
        externalPackages: overrides.externalPackages ?? config?.externalPackages ?? [],
        cacheDir,
        godotTypingsDir,
        converterOptions: {
            generateGlobalClassTypes: overrides.converterOptions?.generateGlobalClassTypes ??
                config?.converterOptions?.generateGlobalClassTypes ??
                false,
        },
    };
}
// ─── Ignore Patterns ─────────────────────────────────────────
/**
 * Tests whether a file path matches any of the ignore glob patterns.
 * Paths are compared relative to rootDir using forward slashes.
 */
export function shouldIgnore(filePath, rootDir, patterns) {
    const rel = relative(rootDir, filePath).replace(/\\/g, '/');
    if (rel === TSTOGD_MODULES_DIR || rel.startsWith(`${TSTOGD_MODULES_DIR}/`)) {
        return true;
    }
    if (patterns.length === 0)
        return false;
    return patterns.some((pattern) => minimatch(rel, pattern, { dot: true }));
}
const CONFIG_FILENAME = 'tstogd.json';
/**
 * Loads tstogd.json by walking up from the given directory (defaults to CWD).
 * Returns null if not found in any ancestor directory.
 */
export function loadConfig(dir) {
    let searchDir = resolve(dir ?? process.cwd());
    for (;;) {
        const configPath = join(searchDir, CONFIG_FILENAME);
        if (existsSync(configPath)) {
            const raw = readFileSync(configPath, 'utf-8');
            return { config: JSON.parse(raw), configDir: searchDir };
        }
        const parent = dirname(searchDir);
        if (parent === searchDir)
            break; // filesystem root
        searchDir = parent;
    }
    return null;
}
// ─── Registry Resolution ──────────────────────────────────────
/**
 * Walk up from rootDir looking for node_modules/typescript-to-gdscript/typings.
 * Returns the path via node_modules (preserving symlink structure) or undefined.
 */
function findPackageTypingsDir(rootDir) {
    let dir = rootDir;
    for (let i = 0; i < 10; i++) {
        const candidate = join(dir, 'node_modules', 'typescript-to-gdscript', 'typings');
        if (existsSync(join(candidate, 'index.d.ts')))
            return candidate;
        const parent = dirname(dir);
        if (parent === dir)
            break;
        dir = parent;
    }
    return undefined;
}
/**
 * Get the path to the package's bundled typings directory.
 * Works whether running from src/ (ts-node) or dist/ (compiled).
 * Resolves symlinks — use findPackageTypingsDir() for node_modules paths.
 */
function getPackageTypingsDir() {
    // This file is at src/config/index.ts or dist/config/index.js
    // Package root is two levels up
    const thisDir = dirname(fileURLToPath(import.meta.url));
    const packageRoot = resolve(thisDir, '..', '..');
    return join(packageRoot, 'typings');
}
/**
 * Resolves the bundled registry JSON path.
 * The registry lives directly in typings/godot-class-registry.json.
 */
function getBundledRegistryPath() {
    const typingsDir = getPackageTypingsDir();
    const registryPath = join(typingsDir, 'godot-class-registry.json');
    if (existsSync(registryPath))
        return registryPath;
    return null;
}
/**
 * Resolves the Godot executable path with the following priority:
 * 1. Explicit --godot-path CLI flag
 * 2. godotPath from tstogd.json
 * 3. GODOT_PATH environment variable
 * 4. "godot" on system PATH
 */
export function resolveGodotPath(options) {
    if (options?.godotPath)
        return resolve(options.godotPath);
    const loaded = loadConfig(options?.configDir);
    if (loaded?.config.godotPath) {
        return resolve(loaded.configDir, loaded.config.godotPath);
    }
    if (process.env.GODOT_PATH)
        return process.env.GODOT_PATH;
    return 'godot';
}
/**
 * Resolves the GodotClassRegistry with the following priority:
 * 1. Explicit --registry CLI path
 * 2. Bundled typings/godot-class-registry.json
 */
export function resolveRegistry(options) {
    // 1. Explicit CLI path
    if (options?.registryPath) {
        return GodotClassRegistry.fromJsonFile(resolve(options.registryPath));
    }
    // 2. Bundled registry
    const bundledPath = getBundledRegistryPath();
    if (bundledPath)
        return GodotClassRegistry.fromJsonFile(bundledPath);
    throw new Error('Could not find Godot class registry. Provide --registry flag ' +
        'or ensure typings/godot-class-registry.json exists in the package.');
}
//# sourceMappingURL=index.js.map