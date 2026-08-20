/**
 * Registry data generation from parsed Godot XML classes.
 * Produces GodotRegistryData from GodotClassXml maps.
 */
import type { GodotRegistryData } from './godot-registry.ts';
import type { GodotClassXml } from './xml-parser.ts';
export type { GodotClassXml, GodotMethodXml, GodotParamXml, GodotPropertyXml, GodotSignalXml, GodotConstantXml, GodotAnnotationXml, GodotOperatorXml, } from './xml-parser.ts';
export declare const GDSCRIPT_BUILTINS: string[];
/**
 * Derive constructor/value types from parsed XML classes.
 * A class is a value type if it has a copy constructor -- a constructor with
 * exactly one parameter whose type matches the class name (e.g. `Vector2(from: Vector2)`).
 */
export declare function deriveConstructorTypes(classes: Map<string, GodotClassXml>): string[];
/**
 * GDScript primitive types that use native JS operators (not gd.ops.* wrappers).
 * These have operator entries in the Godot XML docs but shouldn't be wrapped.
 */
export declare const NATIVE_OPERATOR_TYPES: Set<string>;
/**
 * Derive classes that have operator overloads from parsed XML.
 * These types need `gd.ops.*` wrappers in TypeScript.
 * Excludes primitive types that use native JS operators.
 */
export declare function deriveOperatorTypes(classes: Map<string, GodotClassXml>): string[];
/**
 * Generates the class registry data from parsed XML classes.
 */
export declare function generateRegistryData(classes: Map<string, GodotClassXml>, gdscriptCls?: GodotClassXml | null): GodotRegistryData;
export interface GodotVersion {
    major: number;
    minor: number;
    patch: number;
    status: string;
    /** e.g. "4.7" */
    short: string;
    /** e.g. "4.7.0" */
    full: string;
}
/**
 * Parses version.py from the Godot repo to extract version info.
 */
export declare function parseGodotVersion(versionPyPath: string): GodotVersion;
//# sourceMappingURL=registry-generator.d.ts.map