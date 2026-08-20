/**
 * Ready field types helper for GD-to-TS post-processing.
 * Collects TS7008/TS2564 errors on class properties and produces fixes
 * that add `!` and infer types from `_ready()` assignments.
 */
import ts from 'typescript';
import type { GodotClassRegistry } from '../../../typings/godot-registry.ts';
import type { SourceFix } from '../ts-helpers.ts';
/**
 * TS error codes for class properties that need type/initializer fixes.
 * - TS7008: Member 'X' implicitly has an 'any' type.
 * - TS2564: Property 'X' has no initializer and is not definitely assigned in the constructor.
 */
export declare const TS_CLASS_READY_ERROR_CODES: Set<number>;
/**
 * Walk up from a node to find the enclosing ClassDeclaration.
 */
export declare function findEnclosingClass(node: ts.Node): ts.ClassDeclaration | undefined;
/**
 * Find `this.<propName> = <expr>` assignment inside a `_ready` method body.
 * Returns the right-hand-side expression of the first matching assignment.
 */
export declare function findReadyAssignment(cls: ts.ClassDeclaration, propName: string): ts.Expression | undefined;
/**
 * Infer a type annotation text from an expression.
 * Uses `typeof <text>` for identifiers and property accesses, otherwise
 * falls back to the TS type checker's string representation.
 */
export declare function inferTypeFromExpression(expr: ts.Expression, checker: ts.TypeChecker, sourceFile: ts.SourceFile): string;
/**
 * Names of GDScript primitive/value types that always have a non-null default
 * value at runtime (so they're effectively initialized even without an
 * explicit assignment). For TS2564 fields of these types, we add `!` even if
 * there's no `_ready()` assignment.
 */
export declare const GD_BUILTIN_PRIMITIVE_TYPES: Set<string>;
export declare function isGdPrimitiveType(typeText: string, registry: GodotClassRegistry | undefined): boolean;
/**
 * Collect TS7008/TS2564 errors on class properties that are assigned in
 * `_ready()` and produce fixes:
 * - For both error codes, only fields assigned in `_ready()` are considered.
 * - Adds `!` (definite-assignment assertion) so TypeScript stops complaining
 *   about missing initializers.
 * - For TS7008 (no type declared), additionally inserts a type annotation
 *   inferred from the `_ready()` assignment expression.
 */
export declare function collectReadyFieldTypeFixes(program: ts.Program, filePaths: Set<string>, registry: GodotClassRegistry | undefined, unsafeUseAny: boolean): Map<string, SourceFix[]>;
//# sourceMappingURL=ready-field-types.d.ts.map