import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
/** Convert a triple-quoted GDScript string to a JS block comment */
export declare function emitBlockComment(text: string, indent: string): string;
export declare function emitComment(node: SyntaxNode): string;
export declare function emitCommentInline(node: SyntaxNode): string;
export declare function emitSignal(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitSignalParamTypes(paramsNode: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitEnum(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitClassVariable(node: SyntaxNode, ctx: GdToTsContext): string;
export declare function emitLocalVariable(node: SyntaxNode, ctx: GdToTsContext, indent: string): string;
export declare function emitTypeAnnotation(typeNode: SyntaxNode, ctx: GdToTsContext): string;
export declare function getAnnotations(node: SyntaxNode): SyntaxNode[];
export declare function emitAnnotationAsDecorator(node: SyntaxNode, ctx: GdToTsContext): string;
//# sourceMappingURL=members.d.ts.map