/**
 * TS→GD import processing.
 *
 * Translates `import { … } from '…'` statements at the top of a TS source
 * file into the GDScript output, following the project's anonymous-class
 * convention:
 *
 *   - Non-anonymous (regular `class_name X`) class, no rename →
 *     skip emission. The class is globally available in GD by virtue of
 *     `class_name`; no `const` alias needed.
 *
 *   - Non-anonymous, renamed (`import { Foo as Bar }`) →
 *     `const Bar = preload("res://path/to/Foo.gd")` so the local TS
 *     identifier resolves to the same script in GD.
 *
 *   - Anonymous (`_FilenameClass` — see `gdFilenameToAnonymousClassName`)
 *     class, with or without rename →
 *     `const <local> = preload("res://path/to/file.gd")`. Anonymous
 *     classes have no `class_name`, so a `const` alias is the only way
 *     to refer to them at all.
 *
 *   - `import X from '…'` (default) and `import * as X from '…'`
 *     (namespace) → hard error. GDScript has no equivalent.
 *
 *   - `import type { … }` and per-binding `import { type X }` →
 *     skip silently (TS-only, erased at runtime).
 *
 * The collected `consts` list is emitted by the transformer right after
 * `class_name`/`extends`. The `importMap` is consulted later for the
 * `extends "res://…"` rewrite (when extending an anonymous class) and
 * for field-name conflict detection.
 */
import ts from 'typescript';
import { type TransformContext, type TransformDiagnostic } from '../common/index.ts';
/**
 * One entry per LOCAL name in the importing file's scope. Keyed by the
 * local identifier (post-rename). Only includes imports we actually
 * care about — i.e. those that need a `const` alias OR are candidates
 * for the `extends "res://…"` rewrite. Skipped imports (regular global
 * GD classes) and type-only imports are NOT in the map.
 */
export interface ImportEntry {
    /**
     * Name as exported from the source module, used to decide whether
     * the target is anonymous. Same as `localName` when no `as` rename.
     */
    importedName: string;
    /** True iff `importedName` follows the `_FilenameClass` convention. */
    isAnonymous: boolean;
    /**
     * `res://…` path of the target's `.gd` mirror. Already forward-slashed
     * and ready to drop into a `preload(…)` or `extends "…"` literal.
     */
    resPath: string;
    /** TS AST node — used for accurate diagnostic anchoring. */
    node: ts.Node;
}
export interface ProcessImportsResult {
    /** Lines to emit at the top of the GD output, e.g. `const Foo = preload("res://…")`. */
    consts: string[];
    /** Local-name → entry map used by `extends`-rewriting and field-conflict checks. */
    importMap: Map<string, ImportEntry>;
    /** Errors produced by import processing (unsupported forms, unresolvable specifiers, …). */
    errors: TransformDiagnostic[];
}
export declare function processImports(sourceFile: ts.SourceFile, ctx: TransformContext): ProcessImportsResult;
//# sourceMappingURL=imports.d.ts.map