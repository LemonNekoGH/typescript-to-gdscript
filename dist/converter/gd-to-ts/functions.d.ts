import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
export declare function widenInType(rawType: string, tsType: string | null, ctx: GdToTsContext): string | null;
export declare function emitFunction(node: SyntaxNode, ctx: GdToTsContext, isAbstract?: boolean): string;
export declare function emitConstructor(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function collectParamNames(paramsNode: SyntaxNode | null, ctx: GdToTsContext): void;
export declare function emitParams(paramsNode: SyntaxNode, ctx: GdToTsContext): string;
/**
 * Emit a TypeScript return-type annotation from a GDScript return type node.
 *
 * When `isAsync` is true the resolved type is wrapped in `Promise<…>` so the
 * emitted signature is valid TS for an `async` method/lambda (TS rejects a
 * bare non-Promise return type on an async function).
 *
 * Returns an empty string when no usable type was resolved — TS will then
 * infer (e.g. `Promise<void>` for an async function with no annotation).
 */
export declare function emitReturnType(typeNode: SyntaxNode, ctx: GdToTsContext, isAsync?: boolean): string;
export declare function emitLambda(node: SyntaxNode, ctx: GdToTsContext): string;
//# sourceMappingURL=functions.d.ts.map