import ts from 'typescript';
/**
 * `void expr` evaluates its operand and yields `undefined`, which this
 * project has no representation for — so there is no position where
 * the result can be emitted. Its usual job here, discarding the value
 * of a call, is already done: a lambda or a `return` whose expression
 * yields nothing drops the `return` on its own.
 */
export const VOID_OPERATOR_ERROR = '`void` operator is not supported — its result is `undefined`, which ' +
    'has no GDScript equivalent. Drop it: an arrow function whose body ' +
    'returns nothing already converts without a `return`.';
/**
 * True when `node` evaluates to nothing. GDScript refuses to take the
 * value of a call to a function that returns `void`, so `return` must
 * not be put in front of one.
 */
export function isVoidExpression(t, node) {
    return !!(t.ctx.checker.getTypeAtLocation(node).flags & ts.TypeFlags.Void);
}
//# sourceMappingURL=void-value.js.map