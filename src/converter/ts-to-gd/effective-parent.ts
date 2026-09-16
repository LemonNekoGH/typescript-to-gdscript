import ts from 'typescript';

/**
 * True for wrappers that leave no trace in the emitted GDScript, so the
 * node inside one sits in the position the wrapper itself occupies.
 *
 * `as` / `satisfies` / `!` / `<T>x` are type-only and erased. Grouping
 * parentheses are erased too — the emitter re-adds its own where the
 * GDScript needs them, and it re-adds them by looking at this same
 * chain, so treating a source-level pair as significant here would
 * make the two disagree.
 */
function isErased(node: ts.Node): boolean {
  return (
    ts.isParenthesizedExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isTypeAssertionExpression(node)
  );
}

/**
 * The outermost node that stands in `node`'s place once the erased
 * wrappers are gone — what the surrounding syntax actually sees.
 *
 * Callers that need to know WHICH child of the parent they are (an
 * argument vs the callee, say) must compare against this, not against
 * `node`: in `f((g()))` the parent's argument list holds the
 * parentheses, not the call.
 */
export function effectiveNode(node: ts.Node): ts.Node {
  let current = node;
  while (current.parent && isErased(current.parent)) current = current.parent;
  return current;
}

/** Parent with the type-only and grouping wrappers stepped over. */
export function effectiveParent(node: ts.Node): ts.Node | undefined {
  return effectiveNode(node).parent;
}
