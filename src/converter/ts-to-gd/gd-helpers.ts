import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
import { effectiveNode, isSourceGrouped } from './effective-parent.ts';
import { sanitizeFunctionName } from '../../typings/class-generator.ts';

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
function emitOperand(t: TransformerDelegate, node: ts.Expression): string {
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

/**
 * Handle a global whose GDScript name TypeScript cannot spell:
 * `gd.typeof(value)` -> `typeof(value)`.
 *
 * Keyed on the same predicate the typings generator uses to decide a
 * global gets no declaration of its own (`sanitizeFunctionName` changes
 * it), so the two cannot drift: every global `gd` has to carry is one
 * this rewrites back, under any Godot version. `typeof` is the only
 * one today. Returns null if this is not such a call.
 */
export function tryEmitGdUnspellableGlobal(
  t: TransformerDelegate,
  node: ts.CallExpression,
  obj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isIdentifier(obj) || obj.text !== 'gd') return null;
  if (
    !t.ctx.registry?.isGlobalFunction(method) ||
    sanitizeFunctionName(method) === method
  ) {
    return null;
  }
  const args = node.arguments.map((a) => t.emitExpression(a)).join(', ');
  return `${method}(${args})`;
}

// ---- gd.dict() ----

/**
 * Handle `gd.dict([[key, value], ...])` -> `{key: value, ...}`.
 * Returns null if this is not a gd.dict call.
 */
export function tryEmitGdDict(
  t: TransformerDelegate,
  node: ts.CallExpression,
  obj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'dict')
    return null;
  return emitGdDict(t, node);
}

function emitGdDict(t: TransformerDelegate, node: ts.CallExpression): string {
  if (node.arguments.length !== 1) {
    t.addDiagnostic(
      node,
      'error',
      'gd.dict() requires exactly one argument (array of [key, value] pairs)',
    );
    return '{}';
  }

  const arg = node.arguments[0]!;
  if (!ts.isArrayLiteralExpression(arg)) {
    t.addDiagnostic(
      node,
      'error',
      'gd.dict() argument must be an array literal of [key, value] pairs',
    );
    return '{}';
  }

  const entries: string[] = [];
  for (const element of arg.elements) {
    if (
      !ts.isArrayLiteralExpression(element) ||
      element.elements.length !== 2
    ) {
      t.addDiagnostic(
        element,
        'error',
        'gd.dict() entries must be [key, value] tuples',
      );
      continue;
    }

    const keyNode = element.elements[0]!;
    const valueNode = element.elements[1]!;

    let key: string;
    if (ts.isStringLiteral(keyNode)) {
      key = t.emitStringLiteral(keyNode);
    } else if (ts.isNumericLiteral(keyNode)) {
      key = keyNode.getText(t.ctx.sourceFile);
    } else if (ts.isIdentifier(keyNode)) {
      key = keyNode.text;
    } else if (ts.isPropertyAccessExpression(keyNode)) {
      key = t.emitExpression(keyNode);
    } else {
      t.addDiagnostic(
        keyNode,
        'error',
        'gd.dict() keys must be identifiers, property accesses, or string/number literals, not expressions',
      );
      key = keyNode.getText(t.ctx.sourceFile);
    }

    const value = t.emitExpression(valueNode);
    entries.push(`${key}: ${value}`);
  }

  if (entries.length === 0) {
    return '{}';
  }

  return t.emitMultiLineDict(entries);
}

// ---- gd.ops.* ----

/**
 * Handle `gd.ops.add(a, b)` etc. -> `(a + b)`.
 * Returns null if this is not a gd.ops.* call.
 */
export function tryEmitGdOps(
  t: TransformerDelegate,
  node: ts.CallExpression,
  outerObj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isPropertyAccessExpression(outerObj)) return null;
  const gdObj = outerObj.expression;
  const opsNs = outerObj.name.text;
  if (!ts.isIdentifier(gdObj) || gdObj.text !== 'gd' || opsNs !== 'ops')
    return null;
  return emitOpsHelper(t, method, node.arguments);
}

function emitOpsHelper(
  t: TransformerDelegate,
  method: string,
  args: ts.NodeArray<ts.Expression>,
): string {
  const operands = args.map((a) => emitOperand(t, a));

  // Unary operators (1 arg)
  if (method === 'plus' && operands.length === 1) return `+${operands[0]}`;
  if (method === 'minus' && operands.length === 1) return `-${operands[0]}`;

  // Binary operators (2 args)
  const binaryOpMap: Record<string, string> = {
    add: ' + ',
    sub: ' - ',
    mul: ' * ',
    div: ' / ',
    rem: ' % ',
    eq: ' == ',
    ne: ' != ',
    gt: ' > ',
    gte: ' >= ',
    lt: ' < ',
    lte: ' <= ',
  };
  const op = binaryOpMap[method];
  if (op && operands.length === 2) {
    return `(${operands[0]}${op}${operands[1]})`;
  }
  return `${operands.join(', ')}`;
}

// ---- gd.eval() ----

export function isGdEvalCall(node: ts.Expression): boolean {
  if (!ts.isCallExpression(node)) return false;
  if (!ts.isPropertyAccessExpression(node.expression)) return false;
  const obj = node.expression.expression;
  return (
    ts.isIdentifier(obj) &&
    obj.text === 'gd' &&
    node.expression.name.text === 'eval'
  );
}

/**
 * Process a gd.eval() call and return the GDScript lines (with relative indentation).
 * Each line is prefixed with tabs for its depth relative to the first non-empty line.
 * Returns null if the content cannot be extracted or is empty.
 */
export function processGdEval(
  t: TransformerDelegate,
  node: ts.CallExpression,
): string[] | null {
  if (node.arguments.length < 1) return null;
  const arg = node.arguments[0]!;

  // Extract the string content
  let content: string;
  if (ts.isStringLiteral(arg)) {
    content = arg.text;
  } else if (ts.isNoSubstitutionTemplateLiteral(arg)) {
    content = arg.text;
  } else if (ts.isTemplateExpression(arg)) {
    t.addDiagnostic(
      node,
      'warning',
      'gd.eval with template expressions is not supported',
    );
    return null;
  } else {
    t.addDiagnostic(
      node,
      'warning',
      'gd.eval argument must be a string literal',
    );
    return null;
  }

  // Strip leading newline if present
  const body = content.startsWith('\n') ? content.slice(1) : content;
  const rawLines = body.split('\n');

  // Strip trailing empty lines
  while (rawLines.length > 0 && rawLines[rawLines.length - 1]!.trim() === '') {
    rawLines.pop();
  }
  const nonEmpty = rawLines.filter((l) => l.trim() !== '');
  if (nonEmpty.length === 0) return null;

  // Single non-empty line: return trimmed
  if (nonEmpty.length === 1) {
    return [nonEmpty[0]!.trim()];
  }

  // Detect indentation style: tabs vs spaces
  const hasTabs = nonEmpty.some((l) => l.startsWith('\t'));
  const hasSpaces = nonEmpty.some((l) => /^ /.test(l));

  if (hasTabs && hasSpaces) {
    t.addDiagnostic(
      node,
      'error',
      'gd.eval: mixed tabs and spaces indentation is not supported',
    );
    return null;
  }

  const out: string[] = [];
  if (hasTabs) {
    // Tab indentation: strip common tab prefix, emit as-is
    const minTabs = nonEmpty.reduce((min, l) => {
      const leading = l.match(/^(\t*)/)?.[1]?.length ?? 0;
      return Math.min(min, leading);
    }, Infinity);
    for (const line of rawLines) {
      if (line.trim() === '') continue;
      out.push(line.slice(minTabs));
    }
  } else {
    // Space indentation: convert indent levels to tabs
    const spaceToDepth = new Map<number, number>();
    let prevSpaces = nonEmpty[0]!.match(/^( *)/)?.[1]?.length ?? 0;
    let depth = 0;
    spaceToDepth.set(prevSpaces, 0);

    for (const line of rawLines) {
      if (line.trim() === '') continue;
      const spaces = line.match(/^( *)/)?.[1]?.length ?? 0;
      const lineContent = line.trimStart();

      if (spaces > prevSpaces) {
        depth++;
      } else if (spaces < prevSpaces) {
        const mapped = spaceToDepth.get(spaces);
        if (mapped !== undefined) {
          depth = mapped;
        } else {
          depth = Math.max(0, depth - 1);
        }
      }

      spaceToDepth.set(spaces, depth);
      prevSpaces = spaces;
      out.push('\t'.repeat(depth) + lineContent);
    }
  }
  return out;
}

/**
 * Emit gd.eval('gdscript code') as a standalone statement (raw GDScript lines).
 */
export function emitGdEval(
  t: TransformerDelegate,
  node: ts.CallExpression,
  pos: { line: number; col: number },
): void {
  const lines = processGdEval(t, node);
  if (!lines) return;
  for (const line of lines) {
    t.emitter.writeLine(line, pos.line, pos.col);
  }
}
