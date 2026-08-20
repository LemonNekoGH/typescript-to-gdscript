/**
 * Operator fix helper for GD-to-TS post-processing.
 * Collects TS operator type errors and produces gd.ops.X() wrappers.
 */
import ts from 'typescript';
import type { SourceFix } from '../ts-helpers.ts';
/** TS operator token -> gd.ops function name */
export declare const TS_OP_TO_GD_OPS: Partial<Record<ts.SyntaxKind, string>>;
/** TS compound assignment operator -> gd.ops function name.
 *  `a += b` -> `a = gd.ops.add(a, b)` */
export declare const TS_COMPOUND_OP_TO_GD_OPS: Partial<Record<ts.SyntaxKind, string>>;
/** TS error codes for operator type mismatches */
export declare const TS_OPERATOR_ERROR_CODES: Set<number>;
/** Find the innermost BinaryExpression at a given position */
export declare function findBinaryExpressionAt(sourceFile: ts.SourceFile, pos: number): ts.BinaryExpression | undefined;
/**
 * Collect operator-related TS errors and produce source fixes.
 */
export declare function collectOperatorFixes(program: ts.Program, filePaths: Set<string>): Map<string, SourceFix[]>;
//# sourceMappingURL=operator-fix.d.ts.map