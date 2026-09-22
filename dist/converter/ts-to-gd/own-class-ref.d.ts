/**
 * Resolution of references to the enclosing class's own members.
 *
 * A TS `Example.BAR` or `this.BAR` has three possible GDScript
 * spellings, and none of them is valid everywhere:
 *
 *   - `Example.BAR` — valid in every context and immune to shadowing,
 *     but only when the class actually emits a `class_name` line.
 *   - `self.BAR` — instance context only. `self` is a parse error
 *     inside `static func`, and resolves to `Nil` inside a `static var`
 *     initializer, which fails at runtime instead of at parse time.
 *   - `BAR` — valid anywhere inside the class body, but a local or
 *     parameter of the same name shadows it silently.
 *
 * So the class name is preferred; `self.` is the fallback for
 * anonymous classes in instance context, and the bare name the
 * fallback where `self` doesn't exist at all.
 *
 * Both fallbacks reach the member through the class body they sit in,
 * so neither can cross a class boundary: an anonymous script class's
 * member is unreachable from inside one of its inner classes. And the
 * bare form loses to a same-named local. Those two cases have no valid
 * GDScript spelling at all, so they are reported rather than guessed —
 * emitting either form would compile to something that silently reads
 * the wrong thing.
 *
 * Type positions (`s: MyClass.State` → `s: State`) are resolved by
 * `tsTypeNodeToGdType` and never reach this module.
 */
import ts from 'typescript';
/**
 * How a reference to an own-class member must be spelled in GDScript.
 *
 * `prefix` carries the text to put in front of the member name —
 * `'MyClass.'`, `'self.'`, or `''` for the bare form. `fallthrough`
 * means this isn't an own-class reference and ordinary emission is
 * already correct. `unsupported` means no spelling works and the
 * caller must raise a diagnostic.
 */
export type OwnClassRef = {
    kind: 'prefix';
    text: string;
} | {
    kind: 'fallthrough';
} | {
    kind: 'unsupported';
    reason: string;
};
/**
 * Nearest enclosing class declaration, or `undefined` at file scope.
 * Stops at the first one: inside an inner class, that class — not the
 * script class — is what `this` refers to.
 */
export declare function getEnclosingClass(node: ts.Node): ts.ClassLikeDeclaration | undefined;
/**
 * True when `node` sits where GDScript has no `self`: the body or the
 * initializer of a `static` member.
 *
 * Lambdas are walked through rather than treated as a boundary — a
 * GDScript lambda captures `self` lexically, exactly like a TS arrow
 * function, so a lambda inside a `static func` is still static
 * context. File scope is not static context.
 */
export declare function isStaticContext(node: ts.Node): boolean;
/**
 * GDScript name of the class enclosing `node`, or `null` when that
 * class has no name in GDScript scope.
 *
 * The `_Name` convention means "emit no `class_name`" for the SCRIPT
 * class only — an inner class is declared as `class _Inner:` with its
 * name verbatim, so the convention must not be applied to it.
 */
export declare function getOwnClassName(node: ts.Node, scriptClassName: string): string | null;
/**
 * How to spell a member access on the enclosing class in GDScript.
 *
 * `this` in instance context is deliberately `fallthrough` rather than
 * `self.`: `emitExpression` already yields `self` for it, and the
 * normal path has downstream work to do (the `.get()` rewrite) that an
 * early return would skip.
 */
export declare function resolveOwnClassRef(objExpr: ts.Expression, memberName: string, scriptClassName: string): OwnClassRef;
//# sourceMappingURL=own-class-ref.d.ts.map