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
import { isAnonymousClassName } from '../common/index.ts';

/**
 * How a reference to an own-class member must be spelled in GDScript.
 *
 * `prefix` carries the text to put in front of the member name —
 * `'MyClass.'`, `'self.'`, or `''` for the bare form. `fallthrough`
 * means this isn't an own-class reference and ordinary emission is
 * already correct. `unsupported` means no spelling works and the
 * caller must raise a diagnostic.
 */
export type OwnClassRef =
  | { kind: 'prefix'; text: string }
  | { kind: 'fallthrough' }
  | { kind: 'unsupported'; reason: string };

const FALLTHROUGH: OwnClassRef = { kind: 'fallthrough' };

/**
 * Nearest enclosing class declaration, or `undefined` at file scope.
 * Stops at the first one: inside an inner class, that class — not the
 * script class — is what `this` refers to.
 */
export function getEnclosingClass(
  node: ts.Node,
): ts.ClassLikeDeclaration | undefined {
  for (let n: ts.Node | undefined = node.parent; n; n = n.parent) {
    if (ts.isClassDeclaration(n) || ts.isClassExpression(n)) return n;
  }
  return undefined;
}

/**
 * True when `node` sits where GDScript has no `self`: the body or the
 * initializer of a `static` member.
 *
 * Lambdas are walked through rather than treated as a boundary — a
 * GDScript lambda captures `self` lexically, exactly like a TS arrow
 * function, so a lambda inside a `static func` is still static
 * context. File scope is not static context.
 */
export function isStaticContext(node: ts.Node): boolean {
  for (let n: ts.Node | undefined = node.parent; n; n = n.parent) {
    if (ts.isClassDeclaration(n) || ts.isClassExpression(n)) return false;
    if (
      ts.isMethodDeclaration(n) ||
      ts.isPropertyDeclaration(n) ||
      ts.isGetAccessorDeclaration(n) ||
      ts.isSetAccessorDeclaration(n)
    ) {
      return (
        n.modifiers?.some((m) => m.kind === ts.SyntaxKind.StaticKeyword) ??
        false
      );
    }
  }
  return false;
}

/**
 * GDScript name of the class enclosing `node`, or `null` when that
 * class has no name in GDScript scope.
 *
 * The `_Name` convention means "emit no `class_name`" for the SCRIPT
 * class only — an inner class is declared as `class _Inner:` with its
 * name verbatim, so the convention must not be applied to it.
 */
export function getOwnClassName(
  node: ts.Node,
  scriptClassName: string,
): string | null {
  const name = getEnclosingClass(node)?.name?.text;
  if (!name) return null;
  if (name === scriptClassName && isAnonymousClassName(name)) return null;
  return name;
}

/** True when `pattern` binds `target`, destructuring included. */
function bindingBinds(pattern: ts.BindingName, target: string): boolean {
  if (ts.isIdentifier(pattern)) return pattern.text === target;
  return pattern.elements.some(
    (el) => !ts.isOmittedExpression(el) && bindingBinds(el.name, target),
  );
}

function declarationsBind(
  list: ts.VariableDeclarationList,
  target: string,
): boolean {
  return list.declarations.some((d) => bindingBinds(d.name, target));
}

/**
 * True when this single scope node introduces a binding for `target`.
 *
 * Deliberately ignores declaration order — a `var` hoists, and a GD
 * local shadows from its own line onward either way. Over-reporting
 * costs the user a rename; under-reporting ships a silent misread.
 */
function scopeBinds(n: ts.Node, target: string): boolean {
  if (ts.isFunctionLike(n)) {
    return n.parameters.some((p) => bindingBinds(p.name, target));
  }
  if (ts.isCatchClause(n)) {
    return (
      n.variableDeclaration !== undefined &&
      bindingBinds(n.variableDeclaration.name, target)
    );
  }
  if (
    ts.isForStatement(n) ||
    ts.isForOfStatement(n) ||
    ts.isForInStatement(n)
  ) {
    const init = n.initializer;
    return (
      init !== undefined &&
      ts.isVariableDeclarationList(init) &&
      declarationsBind(init, target)
    );
  }
  if (ts.isBlock(n) || ts.isCaseClause(n) || ts.isDefaultClause(n)) {
    return n.statements.some(
      (s) =>
        (ts.isVariableStatement(s) &&
          declarationsBind(s.declarationList, target)) ||
        ((ts.isFunctionDeclaration(s) || ts.isClassDeclaration(s)) &&
          s.name?.text === target),
    );
  }
  return false;
}

/**
 * True when a local, parameter, or nested declaration named `target`
 * is in scope at `node`, anywhere between it and the class body.
 */
function isShadowedByLocal(node: ts.Node, target: string): boolean {
  for (let n: ts.Node | undefined = node.parent; n; n = n.parent) {
    if (ts.isClassDeclaration(n) || ts.isClassExpression(n)) return false;
    if (scopeBinds(n, target)) return true;
  }
  return false;
}

/**
 * The bare-name form, guarded. It is the last spelling available when
 * the class emits no `class_name` and `self` doesn't exist — but a
 * same-named local captures it silently, and GDScript reports nothing,
 * so that case is surfaced instead of emitted.
 */
function bareRef(
  node: ts.Node,
  memberName: string,
  scriptClassName: string,
): OwnClassRef {
  if (!isShadowedByLocal(node, memberName)) return { kind: 'prefix', text: '' };
  return {
    kind: 'unsupported',
    reason:
      `\`${memberName}\` is a member of \`${scriptClassName}\` and also a ` +
      'local or parameter in scope here. The class is anonymous (the ' +
      '`_Name` convention emits no `class_name`) and a `static` member ' +
      'has no `self`, so the only spelling left is the bare name — which ' +
      'would silently resolve to the local. Rename the local, or rename ' +
      'the class so it emits a `class_name`.',
  };
}

/**
 * How to spell a member access on the enclosing class in GDScript.
 *
 * `this` in instance context is deliberately `fallthrough` rather than
 * `self.`: `emitExpression` already yields `self` for it, and the
 * normal path has downstream work to do (the `.get()` rewrite) that an
 * early return would skip.
 */
export function resolveOwnClassRef(
  objExpr: ts.Expression,
  memberName: string,
  scriptClassName: string,
): OwnClassRef {
  if (objExpr.kind === ts.SyntaxKind.ThisKeyword) {
    if (!isStaticContext(objExpr)) return FALLTHROUGH;
    const name = getOwnClassName(objExpr, scriptClassName);
    if (name !== null) return { kind: 'prefix', text: `${name}.` };
    // `getOwnClassName` only returns null for the anonymous script
    // class itself, so the member is in this very body — bare works.
    return bareRef(objExpr, memberName, scriptClassName);
  }
  // Only the script class's own name. Any other identifier — including
  // an inner class naming itself — refers to a class that exists in
  // GDScript scope under that name and stays verbatim.
  if (!ts.isIdentifier(objExpr) || objExpr.text !== scriptClassName) {
    return FALLTHROUGH;
  }
  if (!isAnonymousClassName(scriptClassName)) {
    return { kind: 'prefix', text: `${scriptClassName}.` };
  }
  // Anonymous script class: no `class_name` to qualify with. Both
  // fallbacks resolve inside the class body they sit in, so they can't
  // reach out of an inner class into the script class.
  if (getEnclosingClass(objExpr)?.name?.text !== scriptClassName) {
    return {
      kind: 'unsupported',
      reason:
        `\`${scriptClassName}.${memberName}\` can't be reached from inside ` +
        `an inner class. \`${scriptClassName}\` is anonymous (the \`_Name\` ` +
        'convention emits no `class_name`), and in an inner class `self` is ' +
        'the inner instance while the bare name is out of scope. Rename ' +
        `\`${scriptClassName}\` so it emits a \`class_name\`, or move ` +
        `\`${memberName}\` into the inner class.`,
    };
  }
  if (!isStaticContext(objExpr)) return { kind: 'prefix', text: 'self.' };
  return bareRef(objExpr, memberName, scriptClassName);
}
