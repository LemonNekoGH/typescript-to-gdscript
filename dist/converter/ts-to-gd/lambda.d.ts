import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
/**
 * Arrow function / function expression -> GDScript lambda.
 *
 * A block body is one expression that needs LINES, which an emitter
 * building a string cannot write. It is handed to the emitter as a
 * reserved block instead: `reserveBlock` takes the thunk and returns a
 * marker to leave in the string, and `writeLine` expands it once the
 * line it belongs to is written. That is what lets a lambda carry a
 * body in EVERY position — before, the body was written by whoever
 * emitted the line, which only two callers knew to do, and the rest
 * silently dropped it.
 */
export declare function emitLambda(t: TransformerDelegate, node: ts.ArrowFunction | ts.FunctionExpression): string;
//# sourceMappingURL=lambda.d.ts.map