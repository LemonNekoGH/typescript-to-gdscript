import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
export declare function visitBlock(t: TransformerDelegate, block: ts.Block): void;
export declare function visitStatement(t: TransformerDelegate, node: ts.Statement): void;
export declare function visitVariableStatement(t: TransformerDelegate, node: ts.VariableStatement): void;
export declare function visitIfStatement(t: TransformerDelegate, node: ts.IfStatement): void;
export declare function visitForOfStatement(t: TransformerDelegate, node: ts.ForOfStatement): void;
export declare function visitForStatement(t: TransformerDelegate, node: ts.ForStatement): void;
export declare function visitWhileStatement(t: TransformerDelegate, node: ts.WhileStatement): void;
export declare function visitStatementBody(t: TransformerDelegate, node: ts.Statement): void;
//# sourceMappingURL=statements.d.ts.map