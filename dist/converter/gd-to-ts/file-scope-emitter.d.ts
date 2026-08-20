/**
 * File-scope emitters for GD→TS conversion — the symmetric reverse
 * of the TS→GD file-scope lift.
 *
 * GDScript class-body `const` / named `enum` / inner `class`
 * declarations lift OUT of the TS class body into file-scope decls
 * (wrapped in an `export namespace <ClassName> { ... }` pair with the
 * class), giving consumers `Foo.X` resolution via TypeScript's native
 * namespace+class merging. The forward TS→GD pass pulls them back
 * into the class body, so the round-trip stays stable.
 *
 * This module also owns the inner-class emission path
 * (`emitFileScopeClass`), which recurses through nested classes and
 * uses `buildClassScope` / `withClassScope` to isolate each class's
 * member-resolution state.
 */
import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import { type GdToTsContext } from './context.ts';
/**
 * Format a raw GD `extends` target for the TypeScript output.
 *
 * GDScript supports two forms:
 *   - `extends Identifier`        → emit identifier verbatim.
 *   - `extends "res://path.gd"`   → no TS-native equivalent; mirror via
 *     `preload(...)` so the TS class still has a constructable base.
 *
 * The extracted-from-AST string keeps the surrounding quotes for the
 * string form, so a leading `"` / `'` is the discriminator.
 */
export declare function formatExtendsForTs(extendsClass: string): string;
export declare function emitFileScopeConst(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitFileScopeEnum(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitFileScopeClass(node: SyntaxNode, ctx: GdToTsContext, isAbstractFromParent?: boolean): string;
//# sourceMappingURL=file-scope-emitter.d.ts.map