import ts from 'typescript';
import type { TransformContext, TransformResult, TransformDiagnostic } from '../common/index.ts';
import { GDScriptEmitter } from './emitter.ts';
import type { TransformerDelegate } from './transformer-types.ts';
export interface TransformerOptions {
    sourceMap: boolean;
}
/**
 * Transforms a TypeScript AST into GDScript code.
 *
 * The class acts as the orchestrator: it owns the emitter and
 * context, implements `TransformerDelegate`, and dispatches each
 * top-level statement to the appropriate module emitter.
 *
 * Major responsibilities split across modules:
 *   - `class-body.ts`   — `emitClassHeader` + `emitClassMembers`
 *   - `file-scope.ts`   — `emitFileScopeNamespace` + the four
 *                          lifting emitters (const / enum / class /
 *                          namespace body) + `collectLiftedNames`
 *   - `class-members.ts` — per-member emitters (signal / enum /
 *                          property / method / ctor / accessor)
 *   - `expressions.ts` / `statements.ts` / `parameters.ts` —
 *                          expression, statement, and parameter emitters
 */
export declare class TsToGdTransformer implements TransformerDelegate {
    readonly ctx: TransformContext;
    readonly emitter: GDScriptEmitter;
    private opts;
    private _currentClassName;
    /**
     * Name of the property whose get/set accessor body is currently being
     * emitted. Inside the body, `this.<accessorName>` is stripped to a bare
     * identifier to reference the GDScript backing field (emitting `self.X`
     * inside `get X`/`set X` would cause infinite recursion in GDScript).
     */
    private _currentAccessorName;
    /**
     * Local-name → import entry, populated once at the start of
     * `transform()` and reused across `emitClassHeader` (extends
     * rewrite) and field-conflict checks. Empty when the file has no
     * preload-worthy imports — see `processImports` for the inclusion
     * rules.
     */
    private _importMap;
    /**
     * Pre-rendered `const X = preload("res://…")` lines emitted between
     * `class_name` and the class body. Order preserved from source.
     */
    private _importConsts;
    /**
     * Names that lift into the script class body — file-scope `const`,
     * `enum`, `class`, and the same names re-exposed via a paired
     * `namespace`. Class fields/methods that collide with any of these
     * trigger a hard error during `emitClassHeader`. Populated once
     * per file in `visitSourceFile` before any emission begins so the
     * collision check can run before the first body line is written.
     */
    private _liftedNames;
    get currentClassName(): string;
    get currentAccessorName(): string | null;
    setCurrentAccessorName(name: string | null): void;
    constructor(ctx: TransformContext, opts: TransformerOptions);
    transform(): TransformResult;
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
    private visitSourceFile;
}
//# sourceMappingURL=transformer.d.ts.map