/**
 * Top-level GD→TS source-file emitter.
 *
 * Produces:
 *   1. An optional `export namespace <ClassName> { ... }` block
 *      containing lifted file-scope decls (consts, named enums,
 *      inner classes). See `file-scope-emitter.ts` for the
 *      individual emitters.
 *   2. The `export class <ClassName> extends <Base> { ... }` that
 *      corresponds to the GD script class. Class members (vars,
 *      methods, signals, anonymous enums) stay inside this block.
 *
 * The two-block layout relies on TypeScript's native namespace+class
 * merging so `ClassName.X` resolves cross-file, and — for consts,
 * enums, and inner classes — forward TS→GD converts back into the
 * script class body cleanly.
 *
 * Per-class state (member index, static classification, inferred
 * types, class-level type names) is collected into a `ClassScope`
 * via `buildClassScope` and installed on `ctx` via `withClassScope`
 * — both from `class-scope.ts` — giving a single, exception-safe
 * point for scope management.
 */
import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import { type GdToTsContext } from './context.ts';
export declare function emitSourceFile(root: SyntaxNode, ctx: GdToTsContext): string;
//# sourceMappingURL=source-emitter.d.ts.map