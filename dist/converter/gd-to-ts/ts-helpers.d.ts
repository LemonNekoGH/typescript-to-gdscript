/**
 * TS-based post-processing helpers for GD-to-TS conversion.
 *
 * These run AFTER initial conversion and typings generation, using the TS
 * type-checker to find and fix issues that couldn't be detected during
 * GDScript parsing (e.g. operator overloads on inherited types).
 */
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
export interface TsHelperOptions {
    /** Converted .ts file paths to process */
    files: string[];
    /** Root directory (for TS program creation) */
    rootDir: string;
    /** Path to tsconfig.json */
    tsConfigPath?: string;
    /** Godot class registry (required for explicitConvert / nullable helpers) */
    registry?: GodotClassRegistry;
    /**
     * Use `!` (definite-assignment) instead of `?` (optional) for non-primitive
     * TS2564 fields that aren't assigned in `_ready()`. Less strict but fewer
     * downstream `X | undefined` errors at usage sites.
     */
    unsafeUseAny?: boolean;
    /**
     * Addon mode: widen ALL reference-typed OUT positions to `T | null`
     * (fields, returns, locals, getters) instead of using the TS2322
     * fallback. Use when generating typings for external addon code whose
     * internals we can't type-check for null flow.
     */
    addonMode?: boolean;
}
export interface TsHelperResult {
    /** Files that were modified */
    fixedFiles: string[];
    /** Remaining diagnostics that couldn't be auto-fixed */
    diagnostics: Array<{
        file: string;
        message: string;
        line: number;
        column: number;
    }>;
}
export interface SourceFix {
    start: number;
    end: number;
    replacement: string;
}
export declare function runTsHelpers(options: TsHelperOptions): TsHelperResult;
//# sourceMappingURL=ts-helpers.d.ts.map