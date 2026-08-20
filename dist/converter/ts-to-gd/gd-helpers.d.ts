import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
/**
 * Handle `gd.as(value, Type)` -> `value as Type`.
 * Returns null if this is not a gd.as call.
 */
export declare function tryEmitGdAs(t: TransformerDelegate, node: ts.CallExpression, obj: ts.Expression, method: string): string | null;
/**
 * Handle `gd.is(value, Type)` -> `value is Type`.
 * Returns null if this is not a gd.is call.
 */
export declare function tryEmitGdIs(t: TransformerDelegate, node: ts.CallExpression, obj: ts.Expression, method: string): string | null;
/**
 * Handle `gd.dict([[key, value], ...])` -> `{key: value, ...}`.
 * Returns null if this is not a gd.dict call.
 */
export declare function tryEmitGdDict(t: TransformerDelegate, node: ts.CallExpression, obj: ts.Expression, method: string): string | null;
/**
 * Handle `gd.ops.add(a, b)` etc. -> `(a + b)`.
 * Returns null if this is not a gd.ops.* call.
 */
export declare function tryEmitGdOps(t: TransformerDelegate, node: ts.CallExpression, outerObj: ts.Expression, method: string): string | null;
export declare function isGdEvalCall(node: ts.Expression): boolean;
/**
 * Process a gd.eval() call and return the GDScript lines (with relative indentation).
 * Each line is prefixed with tabs for its depth relative to the first non-empty line.
 * Returns null if the content cannot be extracted or is empty.
 */
export declare function processGdEval(t: TransformerDelegate, node: ts.CallExpression): string[] | null;
/**
 * Emit gd.eval('gdscript code') as a standalone statement (raw GDScript lines).
 */
export declare function emitGdEval(t: TransformerDelegate, node: ts.CallExpression, pos: {
    line: number;
    col: number;
}): void;
export declare function isGdMatchCall(node: ts.Expression): boolean;
export declare function visitGdMatchStatement(t: TransformerDelegate, node: ts.CallExpression, visitStatement: (t: TransformerDelegate, node: ts.Statement) => void): void;
/**
 * Convert a TS expression to a GDScript match pattern.
 * @param bindings - Set of variable names that should be emitted as `var name` pattern bindings
 */
export declare function emitMatchPatternExpr(t: TransformerDelegate, node: ts.Expression, bindings?: Set<string>): string;
//# sourceMappingURL=gd-helpers.d.ts.map