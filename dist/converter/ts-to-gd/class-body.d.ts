/**
 * Script-class body emission for TS→GD conversion.
 *
 * `emitClassHeader` writes `extends Base` / `class_name Foo` / the
 * `const X = preload(...)` lines for imports, then flags any class
 * field/method whose name collides with an imported local or a
 * file-scope lift. Returns the resolved class name so the caller can
 * update `currentClassName` without a callback round-trip.
 *
 * `emitClassMembers` walks the class's body and emits signals,
 * enums, properties, methods, the constructor, accessor pairs, and
 * inline inner classes in declaration order — with the blank-line
 * policy that matches idiomatic GDScript (functions surrounded by
 * blanks, plain properties pack tight). Used for BOTH the script
 * class body AND inner-class bodies (via `opts.passIfEmpty`).
 *
 * Both functions operate on a `TransformerDelegate` plus explicit
 * context values (import map, lifted names, import consts) rather
 * than reaching into private transformer state — keeps the
 * dependency surface visible.
 */
import ts from 'typescript';
import type { ImportEntry } from './imports.ts';
import type { TransformerDelegate } from './transformer-types.ts';
/**
 * Context values `emitClassHeader` needs from the transformer.
 * Passed explicitly instead of reaching into private fields so the
 * dependency surface is visible at the call site.
 */
export interface ClassHeaderCtx {
    importMap: Map<string, ImportEntry>;
    liftedNames: Set<string>;
    importConsts: string[];
}
export declare function emitClassHeader(node: ts.ClassDeclaration, t: TransformerDelegate, ctx: ClassHeaderCtx): string;
export interface EmitClassMembersOpts {
    /**
     * Emit a leading blank line before the first member. The script
     * class wants this to separate the member block from the
     * `extends`/`class_name` header. Inner classes pack tight after
     * `class Foo:` so they typically pass `false`.
     * Default: `true`.
     */
    leadingBlank?: boolean;
    /**
     * Emit `pass` when the class body is empty. Required for inner
     * classes (GDScript syntax error otherwise). Script classes can
     * be empty — nothing follows `extends`/`class_name`, so no `pass`
     * is needed. Default: `false`.
     */
    passIfEmpty?: boolean;
    /**
     * When emitting additional lifted members BEFORE the regular
     * members (e.g. an inner class with a paired namespace), the
     * caller sets this to `true` so the first member's spacing logic
     * treats itself as a continuation rather than the first line.
     * Default: `false`.
     */
    hasPriorContent?: boolean;
}
export declare function emitClassMembers(node: ts.ClassDeclaration, t: TransformerDelegate, opts?: EmitClassMembersOpts): void;
//# sourceMappingURL=class-body.d.ts.map