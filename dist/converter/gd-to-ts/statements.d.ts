import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
export declare function emitBody(node: SyntaxNode, ctx: GdToTsContext, depth: number): string;
export declare function emitAssignment(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitAugmentedAssignment(node: SyntaxNode, ctx: GdToTsContext): string;
//# sourceMappingURL=statements.d.ts.map