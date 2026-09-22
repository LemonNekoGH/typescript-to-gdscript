import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
/**
 * `void expr` evaluates its operand and yields `undefined`, which this
 * project has no representation for — so there is no position where
 * the result can be emitted. Its usual job here, discarding the value
 * of a call, is already done: a lambda or a `return` whose expression
 * yields nothing drops the `return` on its own.
 */
export declare const VOID_OPERATOR_ERROR: string;
/**
 * True when `node` evaluates to nothing. GDScript refuses to take the
 * value of a call to a function that returns `void`, so `return` must
 * not be put in front of one.
 */
export declare function isVoidExpression(t: TransformerDelegate, node: ts.Expression): boolean;
//# sourceMappingURL=void-value.d.ts.map