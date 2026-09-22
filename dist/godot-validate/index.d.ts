import type { TransformDiagnostic } from '../converter/common/index.ts';
export { parseGodotErrors, getAutoloadNames, isAutoloadFalsePositive, isDuplicateClassFalsePositive, isUnindexedOwnClassFalsePositive, collectDeclaredClassNames, collectDeclaredClassNamesUnder, isUnderScratchDir, } from './error-parser.ts';
export type { GodotRawError } from './error-parser.ts';
export { remapError, remapErrorSync } from './source-map-remap.ts';
export interface GodotValidateOptions {
    /**
     * .gd files to validate. Pass a bare `string` to validate without
     * source-map remapping, or the object form to supply the `.gd.map`
     * JSON + original `.ts` path so diagnostics come back anchored at
     * the TypeScript positions.
     */
    gdFiles: Array<string | {
        path: string;
        sourceMapJson?: string;
        tsFilePath?: string;
    }>;
    /** Godot project root (must contain project.godot) */
    projectRoot: string;
    /** Path to Godot executable */
    godotPath: string;
    /**
     * Optional abort signal. When aborted, the in-flight Godot process
     * is killed and the function returns immediately with whatever
     * diagnostics had been collected so far (typically none). The
     * remaining files in the batch, output parsing, and source-map
     * remapping are all skipped — useful for callers that supersede
     * their own requests (e.g. the ts-plugin firing a fresh validation
     * on every keystroke).
     */
    signal?: AbortSignal;
    /**
     * Optional `ProjectCache` directory. Any diagnostic pointing at a
     * file inside here is treated as a throwaway mirror (the cache's
     * `gd-output/<…>.gd`) and Godot's `Class "X" hides a global script
     * class.` error for such files is suppressed — the real file is
     * what's already registered in the project. Callers that already
     * have a `ResolvedConfig` should pass `cfg.cacheDir`; otherwise
     * leave unset.
     */
    cacheDir?: string;
}
export interface GodotValidateResult {
    /** All diagnostics, remapped to TS positions where source maps exist */
    diagnostics: TransformDiagnostic[];
    /** Whether Godot executable was found and ran */
    godotAvailable: boolean;
}
/**
 * Validates GDScript files using the Godot CLI and remaps errors
 * back to TypeScript positions via source maps.
 */
export declare function validateGdFiles(options: GodotValidateOptions): Promise<GodotValidateResult>;
export interface GodotValidateProjectOptions {
    projectRoot: string;
    godotPath: string;
    /** Only report errors for .gd files whose resolved path starts with this dir. */
    gdDir: string;
    /**
     * Source map table for remapping .gd errors back to .ts positions.
     * Key: normalized absolute .gd file path.
     * Value: { sourceMapJson, tsFilePath } — both optional.
     */
    sourceMapTable: Map<string, {
        sourceMapJson?: string;
        tsFilePath?: string;
    }>;
    cacheDir?: string;
    signal?: AbortSignal;
}
/**
 * Run `godot --headless --check-only --path PROJECT` (no --script) to validate
 * the entire project at once. Errors are filtered to files under `gdDir` and
 * remapped to TypeScript positions via the provided source-map table.
 */
export declare function validateGdProject(options: GodotValidateProjectOptions): Promise<GodotValidateResult>;
//# sourceMappingURL=index.d.ts.map