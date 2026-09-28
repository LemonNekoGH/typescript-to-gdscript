import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';

/**
 * The GDScript spelling of a TS binary operator, or null when GDScript
 * has none — `>>>`, `&&=`, `||=`, `??`, the comma operator. The caller
 * reports those; this used to fall back to `??` without a word, which
 * turned `k |= 2` into `k ?? 2`.
 */
export function binaryOperator(kind: ts.SyntaxKind): string | null {
  switch (kind) {
    case ts.SyntaxKind.PlusToken:
      return '+';
    case ts.SyntaxKind.MinusToken:
      return '-';
    case ts.SyntaxKind.AsteriskToken:
      return '*';
    case ts.SyntaxKind.SlashToken:
      return '/';
    case ts.SyntaxKind.PercentToken:
      return '%';
    case ts.SyntaxKind.AsteriskAsteriskToken:
      return '**';
    case ts.SyntaxKind.EqualsEqualsEqualsToken:
      return '==';
    case ts.SyntaxKind.ExclamationEqualsEqualsToken:
      return '!=';
    case ts.SyntaxKind.EqualsEqualsToken:
      return '==';
    case ts.SyntaxKind.ExclamationEqualsToken:
      return '!=';
    case ts.SyntaxKind.LessThanToken:
      return '<';
    case ts.SyntaxKind.LessThanEqualsToken:
      return '<=';
    case ts.SyntaxKind.GreaterThanToken:
      return '>';
    case ts.SyntaxKind.GreaterThanEqualsToken:
      return '>=';
    case ts.SyntaxKind.AmpersandAmpersandToken:
      return 'and';
    case ts.SyntaxKind.BarBarToken:
      return 'or';
    case ts.SyntaxKind.EqualsToken:
      return '=';
    case ts.SyntaxKind.PlusEqualsToken:
      return '+=';
    case ts.SyntaxKind.MinusEqualsToken:
      return '-=';
    case ts.SyntaxKind.AsteriskEqualsToken:
      return '*=';
    case ts.SyntaxKind.SlashEqualsToken:
      return '/=';
    case ts.SyntaxKind.PercentEqualsToken:
      return '%=';
    case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
      return '**=';
    case ts.SyntaxKind.AmpersandEqualsToken:
      return '&=';
    case ts.SyntaxKind.BarEqualsToken:
      return '|=';
    case ts.SyntaxKind.CaretEqualsToken:
      return '^=';
    case ts.SyntaxKind.LessThanLessThanEqualsToken:
      return '<<=';
    case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
      return '>>=';
    case ts.SyntaxKind.AmpersandToken:
      return '&';
    case ts.SyntaxKind.BarToken:
      return '|';
    case ts.SyntaxKind.CaretToken:
      return '^';
    case ts.SyntaxKind.LessThanLessThanToken:
      return '<<';
    case ts.SyntaxKind.GreaterThanGreaterThanToken:
      return '>>';
    case ts.SyntaxKind.InKeyword:
      return 'in';
    case ts.SyntaxKind.InstanceOfKeyword:
      return 'is';
    default:
      return null;
  }
}

/**
 * The GDScript spelling of a prefix operator. `++` / `--` never get
 * here — they are statements in GDScript, handled by `emitIncrement`.
 */
export function unaryOperator(op: ts.PrefixUnaryOperator): string {
  switch (op) {
    case ts.SyntaxKind.ExclamationToken:
      return 'not ';
    case ts.SyntaxKind.MinusToken:
      return '-';
    case ts.SyntaxKind.PlusToken:
      return '+';
    case ts.SyntaxKind.TildeToken:
      return '~';
    default:
      throw new Error('`++` / `--` are emitted by emitIncrement');
  }
}

/** Parentheses, or a wrapper the emitter erases (`!`, `as`, `satisfies`, `<T>`). */
function isOuterWrapper(node: ts.Node): node is ts.Expression & {
  expression: ts.Expression;
} {
  return (
    ts.isParenthesizedExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isTypeAssertionExpression(node)
  );
}

/**
 * An expression with the parentheses and erased wrappers around it taken
 * off — for a statement or a `for` incrementor, where they mean nothing
 * in GDScript, and around an assignment they are an error:
 * `(this.n++);` has to go out as `self.n += 1`, not `(self.n += 1)`.
 */
export function withoutOuterWrappers(expr: ts.Expression): ts.Expression {
  let inner = expr;
  while (isOuterWrapper(inner)) inner = inner.expression;
  return inner;
}

/**
 * `++` / `--` on either side, as GDScript's `+= 1` / `-= 1` — which is a
 * statement there, not a value. Only where the result is discarded (an
 * expression statement, a `for` incrementor, through any parentheses) is
 * that the same thing; anywhere else the TS reads the value, and that is
 * reported, with `null` left in its place so `--emit-on-error` output
 * still parses. Null for any other unary operator.
 *
 * The prefix form used to emit nothing but its operand: `++this.n`
 * became `self.n`, and the increment was lost.
 */
export function emitIncrement(
  t: TransformerDelegate,
  node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression,
): string | null {
  const op =
    node.operator === ts.SyntaxKind.PlusPlusToken
      ? '+='
      : node.operator === ts.SyntaxKind.MinusMinusToken
        ? '-='
        : null;
  if (op === null) return null;
  let site: ts.Node = node;
  while (isOuterWrapper(site.parent)) site = site.parent;
  const p = site.parent;
  const discarded =
    ts.isExpressionStatement(p) ||
    (ts.isForStatement(p) && p.incrementor === site);
  if (!discarded) {
    t.addDiagnostic(
      node,
      'error',
      `\`${ts.tokenToString(node.operator)}\` used as a value has no GDScript ` +
        `equivalent: GDScript's \`${op} 1\` is a statement. Move it to a ` +
        `statement of its own.`,
    );
    return 'null';
  }
  return `${t.emitExpression(node.operand)} ${op} 1`;
}
