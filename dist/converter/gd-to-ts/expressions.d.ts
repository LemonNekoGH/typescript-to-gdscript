import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
export declare function emitExpr(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitCall(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitAttribute(node: SyntaxNode, ctx: GdToTsContext): string;
/**
 * Detect %"UniqueNode"/Child or %UniqueNode/Child patterns.
 * Tree-sitter parses the `/` as a binary division operator.
 * Returns { path, suffix } where path is e.g. "%UniqueNode/Child" and suffix is
 * any trailing attribute chain (e.g. ".text" from `%"UniqueNode"/Child.text`), or null.
 */
export declare function tryEmitUniqueNodePath(node: SyntaxNode): {
    path: string;
    suffix: string;
} | null;
export declare function emitBinaryOp(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitUnaryOp(node: SyntaxNode, ctx: GdToTsContext): string;
//# sourceMappingURL=expressions.d.ts.map