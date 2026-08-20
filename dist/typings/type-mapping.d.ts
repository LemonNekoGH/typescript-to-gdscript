import type { GodotClassXml } from './godot-registry.ts';
/**
 * Context passed explicitly through type-mapping functions.
 * Built once per typings generation run by `generateGodotDocsTypings()`.
 * Replaces the previous module-level singleton state.
 */
export interface TypeContext {
    /** Set of known Godot class names (excludes `@`-prefixed pseudo-classes). */
    knownClasses: Set<string>;
    /**
     * Fundamental value types constructed as function calls in GDScript (not `new`).
     * Derived set — classes with a copy constructor (single parameter of own type).
     */
    valueTypes: Set<string>;
    /**
     * Per-class set of member names whose types should stay non-nullable even
     * though they would normally be nullable reference types.
     * Loaded from `non-nullable.json` files in override directories.
     */
    nonNullableMembers: Map<string, Set<string>>;
    /**
     * Map of Godot type name → types that can be implicitly converted to it.
     * Used to widen method parameter types (e.g. `Vector2` also accepts `Vector2i`).
     */
    variantParamConverts: Map<string, string[]>;
}
/** Construct an empty context (used during early bootstrap before all fields are populated). */
export declare function emptyTypeContext(): TypeContext;
/** TS primitive types — widening between two primitives is excluded (too noisy). */
export declare const TS_PRIMITIVE_TYPES: Set<string>;
/** TS type names that are always non-nullable (primitives, void, unknown). */
export declare const NON_NULLABLE_TS_TYPES: Set<string>;
/** Names that conflict with TS/JS built-in globals and need prefixing */
export declare const CLASS_NAME_CONFLICTS: Map<string, string>;
/**
 * GDScript classes emitted as TS interfaces (replacing standard TS built-in types).
 * Maps GD class name → TS interface name. These are generated from Godot docs
 * instead of being hardcoded in globals.d.ts.
 */
export declare const INTERFACE_CLASSES: Map<string, string>;
export declare function sanitizeClassName(name: string): string;
/**
 * Maps a Godot type string to a TypeScript type string.
 */
export declare function godotTypeToTs(type: string, ctx: TypeContext): string;
/**
 * Returns true when a Godot type should be made nullable (`T | null`) in
 * generated declarations.  Reference types (Node, Resource, Material, etc.)
 * are nullable; value/variant types, primitives, enums and arrays are not.
 */
export declare function isNullableGodotType(gdType: string, ctx: TypeContext): boolean;
/**
 * Widen a Godot type for use as a method parameter by including all types
 * that can be variant-converted to it.
 * Returns the TS type string, potentially as a union (e.g. `Vector2 | Vector2i`).
 */
export declare function widenParamType(gdType: string, ctx: TypeContext): string;
/**
 * Derive value types from parsed XML class data.
 * A class is a value type if it has a constructor with a single parameter of
 * its own type (e.g. `Vector2(from: Vector2)`).
 */
export declare function deriveValueTypes(classes: Map<string, GodotClassXml>, ctx: TypeContext): Set<string>;
/**
 * Derive variant conversion map from parsed XML class data.
 * For each class with single-parameter "from" constructors, records which types
 * can be converted to this class.
 */
export declare function deriveVariantParamConverts(classes: Map<string, GodotClassXml>): Map<string, string[]>;
/**
 * Load `non-nullable.json` from each override directory and merge.
 * Later directories override earlier ones (user > defaults).
 * Returns a map of ClassName → Set of member names that should be non-nullable.
 */
export declare function loadNonNullableOverrides(overrideDirs: string[]): Map<string, Set<string>>;
//# sourceMappingURL=type-mapping.d.ts.map