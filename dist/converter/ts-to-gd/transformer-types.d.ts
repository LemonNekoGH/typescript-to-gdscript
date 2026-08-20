import type ts from 'typescript';
import type { TransformContext, TransformDiagnostic } from '../common/index.ts';
import type { GDScriptEmitter } from './emitter.ts';
/**
 * Interface exposed by TsToGdTransformer to module functions.
 * Module functions receive this delegate instead of the full class,
 * keeping the dependency surface explicit.
 */
export interface TransformerDelegate {
    readonly ctx: TransformContext;
    readonly emitter: GDScriptEmitter;
    readonly currentClassName: string;
    readonly currentAccessorName: string | null;
    setCurrentAccessorName(name: string | null): void;
    emitExpression(node: ts.Expression): string;
    visitStatement(node: ts.Statement): void;
    visitBlock(block: ts.Block): void;
    visitVariableStatement(node: ts.VariableStatement): void;
    emitParameters(params: ts.NodeArray<ts.ParameterDeclaration>): string;
    emitLeadingComments(node: ts.Node): void;
    emitStringLiteral(node: ts.StringLiteral): string;
    escapeGdString(text: string): string;
    isBlockLambda(node: ts.Expression): node is ts.ArrowFunction | ts.FunctionExpression;
    emitLambdaBody(node: ts.ArrowFunction | ts.FunctionExpression): void;
    addDiagnostic(node: ts.Node, severity: TransformDiagnostic['severity'], message: string): void;
    getLineAndCol(node: ts.Node): {
        line: number;
        col: number;
    };
    isGdHelperCall(node: ts.Expression, methodName: string): boolean;
    emitMultiLineDict(entries: string[]): string;
}
//# sourceMappingURL=transformer-types.d.ts.map