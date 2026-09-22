import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
/**
 * True when the callee is a Callable VALUE rather than the name of a
 * function, so the call has to go through `.call()`.
 *
 * GDScript calls a NAME — a method on something, a global function, a
 * constructor. It cannot call what an expression produced: `f()()`,
 * `a[0]()`, `(c)()`, `(func(): …)()` all fail with `Cannot call on an
 * expression. Use ".call()" if it's a Callable.` TypeScript spells
 * both `f()`, so the two have to be told apart here.
 */
export declare function isCallableValueCall(t: TransformerDelegate, callee: ts.Expression): boolean;
/**
 * True when a member reached through `self` or the enclosing class
 * name holds a Callable rather than naming a method, so the call has
 * to go through `.call()`.
 *
 * Split from {@link isCallableValueCall} because the evidence differs,
 * not because the question does. Here the DECLARATION settles it: a
 * class member that is not a method is a field, a getter, or a
 * property signature, and all three hold a value. Asking the type
 * instead would get this wrong — the dialect's `Callable` is
 * `type Callable = Function`, an interface with no call signature — so
 * a `cb: Callable` field carries no call signature to find.
 *
 * When nothing resolves there is no declaration to read, and the
 * value/name question falls back to the type-based test, which leaves
 * an unresolved name alone.
 */
export declare function isCallableMemberCall(t: TransformerDelegate, callee: ts.Expression): boolean;
//# sourceMappingURL=callable-call.d.ts.map