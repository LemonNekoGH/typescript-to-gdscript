import ts from 'typescript';
import type { TransformResult } from '../common/index.ts';
import type { ResolvedExternalPackage } from '../../external-packages/index.ts';
export interface ConvertOptions {
    /** Path to the TypeScript file */
    filePath: string;
    /** Root directory of the project */
    rootDir: string;
    /**
     * TypeScript source root (where consumer `.ts` files live). Used to
     * compute the mirrored `.gd` path for imported classes when emitting
     * `const X = preload("res://…")` and `extends "res://…"`. Defaults to
     * `rootDir` (TS and GD trees share the same root).
     */
    tsDir?: string;
    /**
     * GDScript output root. Combined with `tsDir` to mirror the relative
     * tree structure when computing import paths. Defaults to `rootDir`.
     */
    gdDir?: string;
    /**
     * Godot project root — `res://` paths in emitted `preload(...)` and
     * `extends "res://..."` are taken relative to this directory. Defaults
     * to `rootDir`.
     */
    projectRoot?: string;
    /** Emit imports within this project as relative GDScript paths. */
    lib?: boolean;
    /** Shared packages mounted below projectRoot/tstogd_modules. */
    externalPackages?: ResolvedExternalPackage[];
    /** Path to tsconfig.json */
    tsConfigPath?: string;
    /** Whether to generate source maps */
    sourceMap?: boolean;
    /** Pre-created TypeScript program (for batch mode) */
    program?: ts.Program;
}
export declare function convertTsToGd(options: ConvertOptions): TransformResult;
//# sourceMappingURL=index.d.ts.map