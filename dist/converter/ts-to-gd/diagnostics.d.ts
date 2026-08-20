import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import type { DiagnosticsTypeInfo } from '../common/index.ts';
export type { DiagnosticsTypeInfo };
/**
 * Build the diagnostics type info from a Godot class registry.
 * If `registry` is undefined (registry unavailable), returns empty sets — callers
 * fall back to primitive / TS-array checks only.
 */
export declare function buildDiagnosticsTypeInfo(registry: GodotClassRegistry | undefined): DiagnosticsTypeInfo;
/**
 * Returns true if a GDScript type is a "class type" -- i.e. not a primitive and
 * not a variant/value type (Vector2, Color, etc.). Only class types need an
 * explicit type annotation when used as optional null-default parameters.
 */
export declare function isGdClassType(gdType: string, diagInfo: DiagnosticsTypeInfo): boolean;
/**
 * Returns true if a GDScript type is a variant/value type (Vector2, Color, etc.)
 * -- i.e. a registry constructor but not a primitive.
 */
export declare function isGdVariantType(gdType: string, diagInfo: DiagnosticsTypeInfo): boolean;
/**
 * If the type is banned as a right-hand side of `in`, return a human-readable
 * label for the error message; otherwise return null.
 */
export declare function classifyInRhsType(type: ts.Type, checker: ts.TypeChecker, diagInfo: DiagnosticsTypeInfo): string | null;
//# sourceMappingURL=diagnostics.d.ts.map