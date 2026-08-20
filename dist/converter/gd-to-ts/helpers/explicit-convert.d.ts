/**
 * Explicit convert helper for GD-to-TS post-processing.
 * Collects variant-type assignment errors and produces gd.as(value, Target) fixes.
 */
import ts from 'typescript';
import type { GodotClassRegistry } from '../../../typings/godot-registry.ts';
import type { SourceFix } from '../ts-helpers.ts';
/** Map TS primitive type names back to Godot type names for registry lookups. */
export declare const TS_TO_GD_TYPE_NAMES: Map<string, string>;
/** TS error codes for argument/assignment type mismatches */
export declare const TS_ASSIGNMENT_ERROR_CODES: Set<number>;
/**
 * Extract source and target type names from a TS assignment-like error message.
 * Supported formats:
 *   "Argument of type 'Vector2' is not assignable to parameter of type 'Vector2i'."
 *   "Type 'Vector2' is not assignable to type 'Vector2i'."
 *   "Type '[]' is missing the following properties from type 'PackedVector2Array': ..."
 *   "Property 'x' is missing in type '[]' but required in type 'PackedVector2Array'."
 */
export declare function extractAssignmentTypes(messageText: string | ts.DiagnosticMessageChain): {
    source: string;
    target: string;
} | null;
/**
 * Strip TypeScript type qualifiers to get the base class name.
 * Examples:
 *   "Vector2 | null"   -> "Vector2"
 *   "readonly Vector2" -> "Vector2"
 *   "Array<Color>"     -> "Array"
 *   "Color[]"          -> "Array"
 */
export declare function simplifyTypeName(type: string): string;
/**
 * Find the node at a given position -- used for argument expressions.
 * Returns the smallest node that covers exactly the given position+length.
 */
export declare function findNodeAt(sourceFile: ts.SourceFile, pos: number, length: number): ts.Node | undefined;
/**
 * Collect variant-type assignment errors and produce `gd.as(value, Target)` fixes.
 */
export declare function collectExplicitConvertFixes(program: ts.Program, filePaths: Set<string>, registry: GodotClassRegistry): Map<string, SourceFix[]>;
//# sourceMappingURL=explicit-convert.d.ts.map