/**
 * Unsafe helper fixes for GD-to-TS post-processing.
 * - collectUnsafeAnyFieldFixes: adds `any` type annotations to untyped fields/params
 * - collectUnsafeNonNullFixes: adds `!` non-null assertions for "possibly null" errors
 * - collectExtendsTypeFixes: copies parent method param types to overrides
 */
import ts from 'typescript';
import type { SourceFix } from '../ts-helpers.ts';
/**
 * TS error code for implicit-any parameters.
 * - TS7006: Parameter 'X' implicitly has an 'any' type.
 */
export declare const TS_IMPLICIT_ANY_PARAM_CODE = 7006;
/**
 * Walk up from a node to find the enclosing MethodDeclaration.
 */
export declare function findEnclosingMethod(node: ts.Node): ts.MethodDeclaration | undefined;
/**
 * Look up the parent-class signature for a method by name, walking the
 * inheritance chain via the TS checker. Returns the first call signature found.
 */
export declare function findParentMethodSignature(cls: ts.ClassDeclaration, methodName: string, checker: ts.TypeChecker): ts.Signature | undefined;
/**
 * Collect TS7006 errors on parameters of methods that override inherited
 * methods, and produce type-annotation insertion fixes using the parent's
 * parameter types.
 */
export declare function collectExtendsTypeFixes(program: ts.Program, filePaths: Set<string>): Map<string, SourceFix[]>;
/**
 * (unsafe) Add `any` type annotations to any class properties and function
 * parameters that still have no explicit type after other helpers have run.
 * Only activated via `--unsafe-use-any`. Intended as a final cleanup pass so
 * the converted TS code compiles even when earlier helpers couldn't infer a
 * concrete type.
 *
 * - Class property without a type -> insert `!: any` after the name (or `: any`
 *   after an existing `!`/`?` token). Ignores properties that already have
 *   a type annotation.
 * - Function/method/arrow/constructor parameter without a type -> insert
 *   `: any` after the parameter name (or after its `?` token if optional).
 *   Rest parameters get `: any[]`.
 */
export declare function collectUnsafeAnyFieldFixes(program: ts.Program, filePaths: Set<string>): Map<string, SourceFix[]>;
/**
 * TS error codes for "possibly null/undefined" that can be suppressed with `!`.
 * - TS2531: Object is possibly 'null'.
 * - TS18047: 'X' is possibly 'null'.
 * - TS18048: 'X' is possibly 'null' or 'undefined'.
 * - TS18046: 'X' is of type 'unknown'.
 */
export declare const TS_POSSIBLY_NULL_CODES: Set<number>;
/**
 * Check if a TS2322 diagnostic is caused by null in a union type.
 * Looks for "Type 'null' is not assignable to type" in the message chain.
 */
export declare function isNullAssignmentError(messageText: string | ts.DiagnosticMessageChain): boolean;
/**
 * Collect "possibly null" errors and produce `!` (non-null assertion) fixes.
 * Also handles TS2322 where the error is caused by `T | null` assigned to `T`
 * (adds `!` after the RHS expression).
 * Only runs when `--unsafe-use-any` is set (Phase 2).
 */
export declare function collectUnsafeNonNullFixes(program: ts.Program, filePaths: Set<string>): Map<string, SourceFix[]>;
//# sourceMappingURL=unsafe-helpers.d.ts.map