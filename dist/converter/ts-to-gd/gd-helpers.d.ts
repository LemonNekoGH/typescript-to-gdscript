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
 * Handle a global whose GDScript name TypeScript cannot spell:
 * `gd.typeof(value)` -> `typeof(value)`.
 *
 * Keyed on the same predicate the typings generator uses to decide a
 * global gets no declaration of its own (`sanitizeFunctionName` changes
 * it), so the two cannot drift: every global `gd` has to carry is one
 * this rewrites back, under any Godot version. `typeof` is the only
 * one today. Returns null if this is not such a call.
 */
export declare function tryEmitGdUnspellableGlobal(t: TransformerDelegate, node: ts.CallExpression, obj: ts.Expression, method: string): string | null;
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
//# sourceMappingURL=gd-helpers.d.ts.map