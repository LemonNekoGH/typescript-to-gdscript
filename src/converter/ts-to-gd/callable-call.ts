import ts from 'typescript';
import { isAmbient } from '../common/gd-names.ts';
import type { TransformerDelegate } from './transformer-types.ts';

/**
 * True when GDScript can call the callee exactly as written.
 *
 * The base is free — `f().m()` and `Foo.new().m()` are both fine,
 * because what follows the last `.` is still a name. Only the final
 * step matters.
 *
 * `super.m` is a name and nothing else: unlike every other base,
 * `super` cannot yield a `Callable` at all (Godot 4.7 rejects
 * `super.m.call()` with `Expected "(" after function name`). It stays
 * on this side of the split because a method never reaches
 * {@link isCallableValueCall}'s rewrite anyway — do NOT relax that
 * test in a way that lets a `super` access through.
 */
function isNamedCallTarget(callee: ts.Expression): boolean {
  return (
    ts.isIdentifier(callee) ||
    ts.isPropertyAccessExpression(callee) ||
    callee.kind === ts.SyntaxKind.SuperKeyword
  );
}

/**
 * True when the callee resolves to something GDScript has a name for.
 * An import is followed to what it binds, so a helper imported from
 * another file is judged by its declaration rather than by the import
 * specifier standing in for it.
 */
function declarationsOf(
  t: TransformerDelegate,
  callee: ts.Expression,
): readonly ts.Declaration[] {
  let symbol = t.ctx.checker.getSymbolAtLocation(callee);
  if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
    symbol = t.ctx.checker.getAliasedSymbol(symbol);
  }
  return symbol?.getDeclarations() ?? [];
}

/**
 * True when a declaration NAMES a function rather than holding one.
 *
 * A method or a function declaration names one outright. An ambient
 * `declare const` names one too: it becomes no variable in the emitted
 * script, so there is nothing there for a `Callable` to live in — it
 * can only be a name Godot already answers to. That second shape is how
 * the typings spell every value-type constructor (`declare const
 * Vector2: Vector2Constructor`), whose type carries call signatures and
 * no construct signature and is therefore indistinguishable by shape
 * from a local holding a lambda. Engine *classes* never get here; a
 * construct signature settles them earlier.
 *
 * A member declared in a `.d.ts` is deliberately not covered — a field
 * holds a value whichever file declares it.
 */
function isNamedFunction(d: ts.Declaration): boolean {
  return (
    ts.isMethodDeclaration(d) ||
    ts.isMethodSignature(d) ||
    ts.isFunctionDeclaration(d) ||
    (ts.isVariableDeclaration(d) && isAmbient(d))
  );
}

function resolvesToNamedFunction(
  t: TransformerDelegate,
  callee: ts.Expression,
): boolean {
  return declarationsOf(t, callee).some(isNamedFunction);
}

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
export function isCallableValueCall(
  t: TransformerDelegate,
  callee: ts.Expression,
): boolean {
  // Not a name — TypeScript is calling whatever the expression
  // produced, and a function it produced is a `Callable`. There is no
  // other reading, so no type is needed to choose.
  if (!isNamedCallTarget(callee)) return true;

  // A name can be either, so only rewrite what the checker proves is a
  // function VALUE. An unresolved name carries no call signature, and
  // guessing `.call()` there would break every ordinary call in a
  // project whose typings are missing.
  const type = t.ctx.checker.getTypeAtLocation(callee);
  if (type.getCallSignatures().length === 0) return false;
  if (type.getConstructSignatures().length > 0) return false;
  return !resolvesToNamedFunction(t, callee);
}

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
export function isCallableMemberCall(
  t: TransformerDelegate,
  callee: ts.Expression,
): boolean {
  const decls = declarationsOf(t, callee);
  if (decls.length === 0) return isCallableValueCall(t, callee);
  return !decls.some(isNamedFunction);
}
