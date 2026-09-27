import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
import { effectiveNode, isSourceGrouped } from './effective-parent.ts';

// ---- gd.as / gd.is ----
//
// The two operators sit at opposite ends of GDScript's precedence table,
// so they need grouping in almost opposite places. Verified against
// Godot at runtime:
//
// - `is` binds tighter than everything except `.`, `[]` and `()`:
//   `y and x is int`, `false == x is String`, `not x is String` and
//   `"a" if y else x is String` all group `x is T` first. Only the
//   RECEIVER position regroups — `x is T.m` reads the dotted part as a
//   type path.
// - `as` binds looser than everything except assignment, and takes the
//   whole expression to its LEFT as the value: `count / total as float`
//   is `(count / total) as float` (0.0 for 1 and 2, where the TS meant
//   0.5), and `w if c else v as int` casts the whole ternary. So it is
//   bare only in a slot delimited on both sides.

/**
 * True when the position a node effectively occupies is delimited on
 * both sides in the emitted GDScript, so nothing around it can take
 * part in the node's own operator. Anything not listed gets grouped —
 * redundant parentheses are never wrong, a regrouped cast silently is.
 */
function isDelimitedSlot(position: ts.Node): boolean {
  const p = position.parent;
  if (!p) return true;
  if (
    ts.isVariableDeclaration(p) ||
    ts.isPropertyDeclaration(p) ||
    ts.isParameter(p) ||
    ts.isPropertyAssignment(p)
  ) {
    return p.initializer === position;
  }
  if (
    ts.isReturnStatement(p) ||
    ts.isExpressionStatement(p) ||
    ts.isArrayLiteralExpression(p) ||
    ts.isIfStatement(p) ||
    ts.isWhileStatement(p) ||
    ts.isDoStatement(p) ||
    ts.isSwitchStatement(p) ||
    ts.isForOfStatement(p) ||
    // A template span is emitted inside `str(...)`.
    ts.isTemplateSpan(p)
  ) {
    return true;
  }
  if (ts.isCallExpression(p) || ts.isNewExpression(p)) {
    return p.expression !== position;
  }
  if (ts.isElementAccessExpression(p)) return p.argumentExpression === position;
  if (ts.isBinaryExpression(p)) {
    const op = p.operatorToken.kind;
    const isAssignment =
      op >= ts.SyntaxKind.FirstAssignment && op <= ts.SyntaxKind.LastAssignment;
    return isAssignment && p.right === position;
  }
  return false;
}

/** True for the receiver of `.`, `[]` or `()`. */
function isReceiver(position: ts.Node): boolean {
  const p = position.parent;
  return (
    !!p &&
    (ts.isPropertyAccessExpression(p) ||
      ts.isElementAccessExpression(p) ||
      ts.isCallExpression(p)) &&
    p.expression === position
  );
}

/**
 * Group an `as` / `is` expression where GDScript would otherwise
 * regroup it. Position is read past the wrappers the emitter erases
 * (`!`, a TS `as`, `satisfies`, `<T>x`) — `gd.as(n, T)!.texture` puts
 * the cast in receiver position just as surely as the bare form, and
 * under `strict` it is the form users write. Parentheses already in
 * the source are written back out, so they count as grouping.
 */
function groupCast(
  node: ts.CallExpression,
  text: string,
  operator: 'as' | 'is',
): string {
  if (isSourceGrouped(node)) return text;
  const position = effectiveNode(node);
  const needsGroup =
    operator === 'is' ? isReceiver(position) : !isDelimitedSlot(position);
  return needsGroup ? `(${text})` : text;
}

/**
 * True when this expression emits GDScript with a bare infix operator
 * at its top level, so splicing it into another operator's operand
 * slot would let the two operators regroup.
 *
 * TS parenthesizes nothing for us here: an operand of `gd.ops.mul(a, b)`
 * or the value of `gd.is(v, T)` is a call ARGUMENT, so the source needs
 * no parens and the AST carries no `ParenthesizedExpression` to
 * preserve. That is why ordinary TS binary expressions are safe (their
 * parens survive as nodes) and these are not.
 *
 * The erased wrappers are looked through first — `gd.as(v, T)!` emits
 * exactly what `gd.as(v, T)` does. Parentheses are not: those are
 * written back out. Counted as infix: binary and ternary expressions,
 * a template literal (emitted as `"" + str(a) + …`), a `!` (emitted as
 * `not`, which binds looser than comparison), and `gd.as` / `gd.is`.
 */
function emitsBareInfix(node: ts.Expression): boolean {
  let inner = node;
  while (
    ts.isNonNullExpression(inner) ||
    ts.isAsExpression(inner) ||
    ts.isSatisfiesExpression(inner) ||
    ts.isTypeAssertionExpression(inner)
  ) {
    inner = inner.expression;
  }
  if (
    ts.isBinaryExpression(inner) ||
    ts.isConditionalExpression(inner) ||
    ts.isTemplateExpression(inner)
  ) {
    return true;
  }
  if (ts.isPrefixUnaryExpression(inner)) {
    return inner.operator === ts.SyntaxKind.ExclamationToken;
  }
  if (!ts.isCallExpression(inner)) return false;
  const callee = inner.expression;
  return (
    ts.isPropertyAccessExpression(callee) &&
    ts.isIdentifier(callee.expression) &&
    callee.expression.text === 'gd' &&
    (callee.name.text === 'as' || callee.name.text === 'is')
  );
}

/** An operand spliced into an operator the helper builds itself. */
export function emitOperand(
  t: TransformerDelegate,
  node: ts.Expression,
): string {
  const text = t.emitExpression(node);
  return emitsBareInfix(node) ? `(${text})` : text;
}

/**
 * Handle `gd.as(value, Type)` -> `value as Type`.
 * Returns null if this is not a gd.as call.
 */
export function tryEmitGdAs(
  t: TransformerDelegate,
  node: ts.CallExpression,
  obj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'as')
    return null;
  if (node.arguments.length >= 2) {
    const value = emitOperand(t, node.arguments[0]!);
    const type = t.emitExpression(node.arguments[1]!);
    return groupCast(node, `${value} as ${type}`, 'as');
  }
  return null;
}

/**
 * Handle `gd.is(value, Type)` -> `value is Type`.
 * Returns null if this is not a gd.is call.
 */
export function tryEmitGdIs(
  t: TransformerDelegate,
  node: ts.CallExpression,
  obj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'is')
    return null;
  if (node.arguments.length >= 2) {
    const value = emitOperand(t, node.arguments[0]!);
    const type = t.emitExpression(node.arguments[1]!);
    return groupCast(node, `${value} is ${type}`, 'is');
  }
  return null;
}
