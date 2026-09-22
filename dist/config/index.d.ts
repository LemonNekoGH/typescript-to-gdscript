import { GodotClassRegistry } from '../typings/godot-registry.ts';
export interface TsToGdConfig {
    /** Root directory (base for relative paths). Defaults to config file directory or CWD. */
    rootDir?: string;
    /** TypeScript source directory (relative to rootDir or absolute). Defaults to `"src"`. */
    tsDir?: string;
    /** GDScript output directory (relative to rootDir or absolute). Defaults to `"scripts"`. */
    gdDir?: string;
    /** Directory for all generated typings (globals.d.ts, scene-typings.d.ts). Relative to rootDir. Defaults to "_gdtots". */
    typingsDir?: string;
    /** Directory to scan for .tscn scene files (relative to rootDir). Defaults to rootDir. */
    scenesDir?: string;
    /** Path to tsconfig.json */
    tsconfig?: string;
    /** Path to Godot executable for GDScript validation */
    godotPath?: string;
    /** Glob patterns for files/folders to exclude from all conversions and typings generation. */
    exclude?: string[];
    /** Path to project.godot file (relative to rootDir). Defaults to "project.godot". */
    projectFile?: string;
    /** Disable Godot executable validation (CLI `convert` post-write check + the ts-plugin's async Godot pass). When false (default), an error is raised if Godot is not found. */
    disableGodotLint?: boolean;
    /** Cache directory. Default: `node_modules/.cache/typescript-to-gdscript` or temp dir. */
    cacheDir?: string;
    /** Path to Godot engine typings (classes, gd-helpers, globals). Default: `node_modules/typescript-to-gdscript/typings`. */
    godotTypingsDir?: string;
    /** Converter behavior tweaks. */
    converterOptions?: ConverterOptions;
    /** Build this project as a reusable package with relative GDScript imports. */
    lib?: boolean;
    /** Shared tstogd projects that need an explicit source path or mount name. */
    externalPackages?: ExternalPackageConfig[];
}
export interface ExternalPackageConfig {
    /** npm package name or path to a tstogd library. */
    from: string;
    /** Optional path below tstogd_modules. Defaults to the package name. */
    to?: string;
}
/**
 * Knobs that change how the converter and typings generator emit code.
 * All fields are optional; omitted fields fall back to the defaults
 * documented per-field below.
 */
export interface ConverterOptions {
    /**
     * When true, every non-anonymous TypeScript class is emitted into the
     * global TS scope (`declare global { class X extends ScriptClass }`),
     * matching pre-refactor behavior. When false (default), classes are
     * module-scoped and consumers must `import` them — this drives the
     * TS→GD converter to emit `const X = preload("res://…")` for
     * renamed/anonymous imports and to skip-emit imports of globally
     * available GD classes.
     *
     * Addons (GD→TS conversion) always generate global types regardless
     * of this flag — addons are consumed as a unit and need to be visible
     * without explicit imports.
     */
    generateGlobalClassTypes?: boolean;
}
export interface ResolvedConfig {
    rootDir: string;
    tsDir: string;
    gdDir: string;
    /** Absolute path to the directory for all generated typings (globals.d.ts, scene-typings.d.ts). */
    typingsDir: string;
    scenesDir: string;
    tsconfig?: string;
    godotPath?: string;
    /** Glob patterns for files/folders to ignore. */
    ignore: string[];
    /** Absolute path to project.godot file. */
    projectFile: string;
    /** Disable Godot executable validation. */
    disableGodotLint: boolean;
    /** Build this project as a reusable package with relative imports. */
    lib: boolean;
    /** Explicit shared package mappings. */
    externalPackages: ExternalPackageConfig[];
    /** Absolute path to cache directory. */
    cacheDir: string;
    /** Absolute path to Godot engine typings directory. */
    godotTypingsDir: string;
    /**
     * Resolved converter knobs. Always present (defaults filled in by
     * `resolveConfig`); see `ConverterOptions` for per-field semantics.
     */
    converterOptions: ResolvedConverterOptions;
}
/** Same shape as `ConverterOptions` but with all fields required. */
export interface ResolvedConverterOptions {
    generateGlobalClassTypes: boolean;
}
/**
 * Loads tstogd.json and resolves all paths to absolute.
 * CLI flags can override any field via the `overrides` parameter.
 * Returns fully resolved config with absolute paths.
 */
/** CLI-only overrides that don't come from tstogd.json */
export interface ConfigOverrides extends Partial<TsToGdConfig> {
    /** GDScript output directory (CLI-only, not stored in tstogd.json) */
    gdDir?: string;
    /** Generate source maps (CLI-only flag, always true for lint + ts-plugin) */
    sourceMap?: boolean;
}
export declare function resolveConfig(options?: {
    configDir?: string;
    overrides?: ConfigOverrides;
}): ResolvedConfig;
/**
 * Tests whether a file path matches any of the ignore glob patterns.
 * Paths are compared relative to rootDir using forward slashes.
 */
export declare function shouldIgnore(filePath: string, rootDir: string, patterns: string[]): boolean;
/**
 * Loads tstogd.json from the given directory (defaults to CWD).
 * Returns null if not found.
 */
interface LoadConfigResult {
    config: TsToGdConfig;
    /** Absolute path to the directory containing tstogd.json */
    configDir: string;
}
/**
 * Loads tstogd.json by walking up from the given directory (defaults to CWD).
 * Returns null if not found in any ancestor directory.
 */
export declare function loadConfig(dir?: string): LoadConfigResult | null;
export interface ResolveGodotPathOptions {
    /** Explicit path from CLI flag (highest priority) */
    godotPath?: string;
    /** Directory to search for tstogd.json (defaults to CWD) */
    configDir?: string;
}
/**
 * Resolves the Godot executable path with the following priority:
 * 1. Explicit --godot-path CLI flag
 * 2. godotPath from tstogd.json
 * 3. GODOT_PATH environment variable
 * 4. "godot" on system PATH
 */
export declare function resolveGodotPath(options?: ResolveGodotPathOptions): string;
export interface ResolveRegistryOptions {
    /** Explicit registry path from CLI flag (highest priority) */
    registryPath?: string;
    /** Directory to search for tstogd.json (defaults to CWD) */
    configDir?: string;
}
/**
 * Resolves the GodotClassRegistry with the following priority:
 * 1. Explicit --registry CLI path
 * 2. Bundled typings/godot-class-registry.json
 */
export declare function resolveRegistry(options?: ResolveRegistryOptions): GodotClassRegistry;
export {};
//# sourceMappingURL=index.d.ts.map