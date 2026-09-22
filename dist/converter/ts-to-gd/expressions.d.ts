import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
export declare function emitExpression(t: TransformerDelegate, node: ts.Expression): string;
/**
 * Pre-pass: forbid EXPLICIT `Promise<T>` / `PromiseLike<T>` type
 * annotations anywhere except as the return type of an `async`
 * function / method / arrow.
 *
 * Walks the whole source file once so variable annotations,
 * parameter types, non-async return types, type aliases, generic
 * constraints, and nested positions (e.g. `Array<Promise<T>>`) are
 * all caught in a single place — no per-call-site sprinkling.
 *
 * Only flags USER-WRITTEN annotations (TypeReferenceNodes with a
 * forbidden name). Inferred Promise types from `async` functions
 * aren't touched here — those are handled by
 * `tsTypeNodeToGdType` stripping `Promise<T>` → `T` on emission,
 * and by `checkPromiseUsedAsValue` for value-position misuse.
 *
 * A symbol-level check (via `checker.getSymbolAtLocation`) runs
 * only when the name-based gate already matched, so the cost is
 * bounded by the number of Promise-named references in the file
 * (typically 0–5). It filters out user-shadowed names like
 * `class Promise {}` that aren't actually the global Promise.
 */
export declare function checkExplicitPromiseTypes(t: TransformerDelegate): void;
export declare function emitPropertyAccess(t: TransformerDelegate, node: ts.PropertyAccessExpression): string;
export declare function emitCallExpression(t: TransformerDelegate, node: ts.CallExpression): string;
export declare function emitBinaryExpression(t: TransformerDelegate, node: ts.BinaryExpression): string;
export declare function binaryOperator(kind: ts.SyntaxKind): string;
export declare function unaryOperator(op: ts.PrefixUnaryOperator): string;
export declare function emitStringLiteral(t: TransformerDelegate, node: ts.StringLiteral): string;
export declare function escapeGdString(text: string): string;
export declare function emitTemplateExpression(t: TransformerDelegate, node: ts.TemplateExpression): string;
/** Emit a multi-line GDScript dict with proper indentation */
export declare function emitMultiLineDict(t: TransformerDelegate, entries: string[]): string;
//# sourceMappingURL=expressions.d.ts.map