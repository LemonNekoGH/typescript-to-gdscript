import { ProjectCache } from '../cache/index.ts';
import { parseAutoloads, findSceneFiles, resolveSignalHandlers, collectAllSignalHandlers, type SignalHandlerInfo, type ScriptClassInfo, type AutoloadEntry } from './scene-utils.ts';
export { parseAutoloads, resolveSignalHandlers, collectAllSignalHandlers, findSceneFiles };
export type { SignalHandlerInfo, ScriptClassInfo, AutoloadEntry };
export interface GenerateTypingsOptions {
    /** Root directory of the project (base for res:// paths) */
    rootDir: string;
    /** TypeScript source directory */
    tsDir: string;
    /** GDScript output directory */
    gdDir: string;
    /** TS source files to scan for class declarations */
    files: string[];
    /** Output directory for per-file .d.ts typings */
    outputDir: string;
    /** @deprecated Use outputDir instead */
    outputPath?: string;
    /** Directory containing .tscn scene files */
    scenesDir: string;
    /** Path to tsconfig.json */
    tsConfigPath?: string;
    /** Glob patterns for files/folders to ignore */
    ignore?: string[];
    /** Path to project.godot file (for autoload singleton detection) */
    projectFile?: string;
    /** Path to godot-class-registry.json (for typed signal handler generation) */
    registryPath?: string;
    /** Optional cache instance for skipping unchanged typings */
    cache?: ProjectCache;
    /** Optional debug logger (e.g. for --debug CLI flag) */
    onDebug?: (message: string) => void;
    /** Absolute path to Godot engine typings (for /// reference in _index.d.ts) */
    godotTypingsDir?: string;
    /**
     * When true, non-anonymous classes are emitted into `declare global`
     * so consumers can use them without an explicit `import`. When false
     * (the project default), the same classes are emitted as module-scoped
     * declarations and consumers must import them — matching the
     * anonymous-class pattern. Addons override this to true unconditionally.
     */
    generateGlobalClassTypes?: boolean;
}
/**
 * Generates per-file .d.ts typings in outputDir:
 * - Per-scene .tscn.d.ts files (scene tree interfaces, GodotResources, parent entries)
 * - Per-script .gd.d.ts files (module augmentation, global class, GodotScripts)
 * - Per-resource .d.ts files (GodotResources entries)
 * - _index.d.ts (empty global interfaces, autoload singletons)
 * Returns list of written file paths.
 */
export declare function generateTypings(options: GenerateTypingsOptions): string[];
export interface GenerateFileTypingsOptions {
    rootDir: string;
    tsDir: string;
    outputDir: string;
    tsConfigPath?: string;
    scenesDir?: string;
    ignore?: string[];
    projectFile?: string;
    /** Optional cache instance for skipping unchanged typings */
    cache?: ProjectCache;
    /** Absolute path to Godot engine typings (for /// reference in _index.d.ts) */
    godotTypingsDir?: string;
    /** See `GenerateTypingsOptions.generateGlobalClassTypes`. */
    generateGlobalClassTypes?: boolean;
}
/**
 * Regenerate typings for specific changed files (incremental).
 * Handles .ts, .tscn, .tres/.res, and project.godot files.
 * All TS files must be passed for the TS program to resolve cross-references.
 */
export declare function generateFileTypings(changedFiles: string[], allTsFiles: string[], options: GenerateFileTypingsOptions): string[];
export interface GenerateAddonTypingsOptions {
    rootDir: string;
    outputDir: string;
    ignore?: string[];
    registryPath?: string;
    /** Optional cache instance for skipping unchanged addon files */
    cache?: ProjectCache;
    /** Optional debug logger (e.g. for --debug CLI flag) */
    onDebug?: (message: string) => void;
    /**
     * Path to the project's tsconfig.json. Forwarded to the nullable helper so
     * its TS program can resolve Godot typings — otherwise references to
     * `Node`, `Resource`, etc. collapse to `any` and Phase C's TS2322 signal
     * never fires for Godot-class returns in addon code.
     */
    tsConfigPath?: string;
}
/**
 * Generate typings for GDScript addon files.
 * Converts addon .gd -> .ts, writes to outputDir/addons/ preserving structure,
 * then generates .gd.d.ts scene typings for each addon script.
 */
export declare function generateAddonTypings(options: GenerateAddonTypingsOptions): string[];
//# sourceMappingURL=scenes.d.ts.map