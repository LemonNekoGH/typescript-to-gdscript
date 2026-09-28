/**
 * Binary and unary operators for GD→TS: `emitBinaryOp`, `emitUnaryOp`
 * and the `%Unique/Child` path they have to recognise first. Split out of
 * `expressions.ts` for the 500-line cap; `emitExpr` dispatches here.
 */
import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
import {
  inferExprType,
  GD_OPS_MAP,
  NOT_LIFT_OPS,
  GD_IS_PRIMITIVE_TYPES,
} from './type-inference.ts';
import { firstSyntaxChild } from './syntax-children.ts';
import { emitExpr } from './expressions.ts';

// ─── Binary / Unary Operators ─────────────────────────────────

/**
 * Detect %"UniqueNode"/Child or %UniqueNode/Child patterns.
 * Tree-sitter parses the `/` as a binary division operator.
 * Returns { path, suffix } where path is e.g. "%UniqueNode/Child" and suffix is
 * any trailing attribute chain (e.g. ".text" from `%"UniqueNode"/Child.text`), or null.
 */
export function tryEmitUniqueNodePath(
  node: SyntaxNode,
): { path: string; suffix: string } | null {
  const opNode = node.childForFieldName('op');
  if (!opNode || opNode.text !== '/') return null;

  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  if (!left || !right) return null;

  // Collect path segments: left may be another binary_operator with / or a get_node
  let basePath: string | null = null;
  let baseSuffix = '';
  if (left.type === SyntaxType.GetNode && left.text.startsWith('%')) {
    // %"UniqueNode" or %UniqueNode
    const text = left.text;
    if (text.startsWith('%"')) {
      basePath = `%${text.slice(2, -1)}`;
    } else {
      basePath = `%${text.slice(1)}`;
    }
  } else if (left.type === SyntaxType.BinaryOperator) {
    // Nested: %"UniqueNode"/Child/Grandchild
    const result = tryEmitUniqueNodePath(left);
    if (result) {
      basePath = result.path;
      baseSuffix = result.suffix;
    }
  }

  if (basePath === null) return null;

  // Right side: identifier (the child name) or attribute (Child.text → path + ".text")
  if (right.type === SyntaxType.Identifier) {
    return { path: `${basePath}/${right.text}`, suffix: baseSuffix };
  }
  if (right.type === SyntaxType.Attribute) {
    // Extract leading identifier as path component, rest becomes suffix
    // e.g. "Child.text" → path component "Child", suffix ".text"
    const firstChild = right.namedChildren[0];
    if (firstChild && firstChild.type === SyntaxType.Identifier) {
      const pathPart = firstChild.text;
      // The rest of the attribute text after the first identifier
      const attrSuffix = right.text.slice(firstChild.text.length);
      return {
        path: `${basePath}/${pathPart}`,
        suffix: baseSuffix + attrSuffix,
      };
    }
  }

  return null;
}

export function emitBinaryOp(node: SyntaxNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const opNode = node.childForFieldName('op');
  const opText =
    opNode?.text ?? node.children.find((c) => !c.isNamed)?.text ?? '??';

  // GD `is not` -> !(... instanceof ...) or !gd.is<T>(...) for primitives
  // tree-sitter parses `x is not Y` as binary_operator with children: x, "is", "not", Y
  if (opText === 'is') {
    const anonymousChildren = node.children.filter((c) => !c.isNamed);
    const hasNot = anonymousChildren.some((c) => c.text === 'not');
    if (hasNot) {
      const leftStr = left ? emitExpr(left, ctx) : '';
      const rightStr = right?.text ?? '';
      if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
        return `!gd.is(${leftStr}, ${rightStr})`;
      }
      return `!(${leftStr} instanceof ${rightStr})`;
    }
  }

  // GD `x not in y` -> `!(x in y)`. Same shape as `is not` above: one
  // operator spelled in two words, so tree-sitter hangs both on the
  // node as anonymous children and the `op` field holds only `not`.
  // Without this the `not` reads as the unary operator and the pair
  // emits as `x ! y` — not valid TypeScript, and reported by nothing.
  //
  // A leading `not` (`not x not in y`) gets the same lift the branch
  // below gives `not X op Y`: tree-sitter hangs it on `x`, but GDScript
  // reads `not (x not in y)` — verified, `true` for x = 1, y = [1].
  if (
    opText === 'not' &&
    node.children.some((c) => !c.isNamed && c.text === 'in')
  ) {
    const lifted =
      left?.type === SyntaxType.UnaryOperator &&
      isNegation(left.children.find((c) => !c.isNamed)?.text);
    const operand = lifted ? firstSyntaxChild(left) : left;
    const leftStr = operand ? emitExpr(operand, ctx) : '';
    const rightStr = right ? emitExpr(right, ctx) : '';
    const notIn = `!(${leftStr} in ${rightStr})`;
    return lifted ? `!${notIn}` : notIn;
  }

  // Fix tree-sitter-gdscript precedence bug: `not X op Y` is parsed as
  // `(not X) op Y` but GDScript evaluates it as `not (X op Y)`.
  // Lift the `not` to wrap the entire comparison.
  if (
    NOT_LIFT_OPS.has(opText) &&
    left &&
    left.type === SyntaxType.UnaryOperator
  ) {
    const unaryOp = left.children.find((c) => !c.isNamed)?.text;
    if (isNegation(unaryOp)) {
      const innerLeft = firstSyntaxChild(left);
      const innerLeftStr = innerLeft ? emitExpr(innerLeft, ctx) : '';
      const rightStr = right ? emitExpr(right, ctx) : '';
      // Rebuild the comparison without `not`, then wrap with `!(...)`
      const gdToTsOp: Record<string, string> = {
        '==': '===',
        '!=': '!==',
      };
      const tsOp = gdToTsOp[opText] ?? opText;
      if (opText === 'is') {
        if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
          return `!gd.is(${innerLeftStr}, ${rightStr})`;
        }
        return `!(${innerLeftStr} instanceof ${rightStr})`;
      }
      return `!(${innerLeftStr} ${tsOp} ${rightStr})`;
    }
  }

  // GD `as` -> gd.as()
  if (opText === 'as') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    return `gd.as(${leftStr}, ${rightStr})`;
  }

  // GD `is` -> instanceof for classes, gd.is<T>() for primitives
  if (opText === 'is') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
      return `gd.is(${leftStr}, ${rightStr})`;
    }
    return `${leftStr} instanceof ${rightStr}`;
  }

  // Check if this is an arithmetic op on operator-overloaded types (Vector2, Color, etc.)
  const mathFn = GD_OPS_MAP[opText];
  if (mathFn && left) {
    const leftType = inferExprType(left, ctx);
    if (leftType && ctx.registry.hasOperators(leftType)) {
      const leftStr = emitExpr(left, ctx);
      const rightStr = right ? emitExpr(right, ctx) : '';
      return `gd.ops.${mathFn}(${leftStr}, ${rightStr})`;
    }
  }

  const gdToTsOp: Record<string, string> = {
    and: '&&',
    or: '||',
    not: '!',
    '==': '===',
    '!=': '!==',
  };

  const tsOp = gdToTsOp[opText] ?? opText;
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';

  const result = `${leftStr} ${tsOp} ${rightStr}`;

  // Wrap `or`/`and` in `bool()` when used as a value (assigned, argument, returned)
  // AND the expression is not already boolean (comparisons return bool naturally).
  if (
    (opText === 'or' || opText === 'and') &&
    isGdLogicalValueContext(node) &&
    !isGdBoolExpression(node)
  ) {
    return `bool(${result})`;
  }

  return result;
}

/**
 * Check if a GDScript `or`/`and` binary_operator is used as a value
 * (assigned, passed as argument, returned). In these contexts, we wrap
 * with `bool()` since GDScript returns bool but TS `||`/`&&` return operands.
 */
function isGdLogicalValueContext(node: SyntaxNode): boolean {
  const parent = node.parent;
  if (!parent) return false;

  // Assignment RHS: `a = b or c`
  if (
    parent.type === SyntaxType.Assignment ||
    parent.type === SyntaxType.AugmentedAssignment
  ) {
    return parent.childForFieldName('right')?.id === node.id;
  }

  // Variable initializer: `var a = b or c`
  if (parent.type === SyntaxType.VariableStatement) {
    return parent.childForFieldName('value')?.id === node.id;
  }

  // Function argument: `func(a or b)`
  if (parent.type === SyntaxType.Arguments) return true;

  // Return statement: `return a or b`
  if (parent.type === SyntaxType.ReturnStatement) return true;

  return false;
}

/** Comparison operators that always return bool. */
const GD_COMPARISON_OPS = new Set([
  '==',
  '!=',
  '<',
  '>',
  '<=',
  '>=',
  'is',
  'in',
]);

/**
 * Check if a GDScript expression is inherently boolean — composed entirely of
 * comparisons and logical operators. If so, `bool()` wrapper is unnecessary.
 */
function isGdBoolExpression(node: SyntaxNode): boolean {
  if (node.type === SyntaxType.BinaryOperator) {
    const op = node.children.find((c) => !c.isNamed)?.text ?? '';
    if (GD_COMPARISON_OPS.has(op)) return true;
    if (op === 'or' || op === 'and') {
      const left = node.childForFieldName('left');
      const right = node.childForFieldName('right');
      return (
        (left ? isGdBoolExpression(left) : true) &&
        (right ? isGdBoolExpression(right) : true)
      );
    }
  }
  if (node.type === SyntaxType.UnaryOperator) {
    const op = node.children.find((c) => !c.isNamed)?.text ?? '';
    if (op === 'not' || op === '!') return true;
  }
  // `true` / `false` literals
  if (node.text === 'true' || node.text === 'false') return true;
  return false;
}

/**
 * GDScript spells logical negation two ways, `not` and `!`, and both bind
 * alike (verified at runtime: `!x == y` is `not (x == y)`), so every lift
 * of a leading negation over a comparison has to know both.
 */
function isNegation(op: string | undefined): boolean {
  return op === 'not' || op === '!';
}

export function emitUnaryOp(node: SyntaxNode, ctx: GdToTsContext): string {
  const operand = firstSyntaxChild(node);
  const op = node.children.find((c) => !c.isNamed)?.text ?? '';
  const tsOp = op === 'not' ? '!' : op;
  const operandStr = operand ? emitExpr(operand, ctx) : '';
  // `not X is Y` → `!(X instanceof Y)` — needs parens so `!` applies to the whole expression
  if (tsOp === '!' && operand?.type === SyntaxType.BinaryOperator) {
    return `!(${operandStr})`;
  }
  return `${tsOp}${operandStr}`;
}
