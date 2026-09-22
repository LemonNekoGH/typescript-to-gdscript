import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
/** Construct an empty context (used during early bootstrap before all fields are populated). */
export function emptyTypeContext() {
    return {
        knownClasses: new Set(),
        globalEnumNames: new Set(),
        valueTypes: new Set(),
        nonNullableMembers: new Map(),
        variantParamConverts: new Map(),
    };
}
// ─── Constants ───────────────────────────────────────────────────
/** TS primitive types — widening between two primitives is excluded (too noisy). */
export const TS_PRIMITIVE_TYPES = new Set(['int', 'float', 'boolean', 'string', 'void', 'unknown']);
/** TS type names that are always non-nullable (primitives, void, unknown). */
export const NON_NULLABLE_TS_TYPES = new Set([
    'int', 'float', 'boolean', 'string', 'void', 'unknown', 'Dictionary',
]);
/** Names that conflict with TS/JS built-in globals and need prefixing */
export const CLASS_NAME_CONFLICTS = new Map([
    ['Object', 'GodotObject'],
]);
/**
 * GDScript classes emitted as TS interfaces (replacing standard TS built-in types).
 * Maps GD class name → TS interface name. These are generated from Godot docs
 * instead of being hardcoded in globals.d.ts.
 */
export const INTERFACE_CLASSES = new Map([
    ['Dictionary', 'Object'],
    ['Array', 'Array'],
    ['String', 'String'],
    ['Callable', 'Function'],
]);
export function sanitizeClassName(name) {
    return CLASS_NAME_CONFLICTS.get(name) ?? name;
}
// ─── Type mapping functions ──────────────────────────────────────
/**
 * Maps a Godot type string to a TypeScript type string.
 */
export function godotTypeToTs(type, ctx) {
    // Strip C++ pointer/reference markers (handle "type*", "type **", "const type*")
    const cleaned = type
        .replace(/[\s*]*\*+\s*$/, '')
        .replace(/^const\s+/, '')
        .trim();
    // Typed array suffix notation: "Node[]" → Array<Node>
    if (cleaned.endsWith('[]')) {
        const inner = cleaned.slice(0, -2);
        return `Array<${godotTypeToTs(inner, ctx)}>`;
    }
    switch (cleaned) {
        case 'int':
            return 'int';
        case 'float':
            return 'float';
        case 'bool':
            return 'boolean';
        case 'String':
            return 'string';
        case 'void':
            return 'void';
        case 'Nil':
            return 'void';
        case 'Variant':
            return 'unknown';
        case 'Array':
            return 'Array<unknown>';
        case 'Dictionary':
            return 'Dictionary';
        case 'StringName':
            return 'string';
        case 'Object':
            return 'GodotObject';
        case '':
            return 'void';
        // C++ internal types that leak from Godot docs
        case 'uint8_t':
            return 'int';
        case 'int32_t':
            return 'int';
        case 'int64_t':
            return 'int';
        case 'uint32_t':
            return 'int';
        case 'uint64_t':
            return 'int';
        case 'AudioFrame':
            return 'unknown';
        default:
            // Typed arrays like Array[Node]
            if (cleaned.startsWith('Array[')) {
                const inner = cleaned.slice(6, -1);
                return `Array<${godotTypeToTs(inner, ctx)}>`;
            }
            // Dictionary[K, V]
            if (cleaned.startsWith('Dictionary[')) {
                return 'Dictionary';
            }
            // Dotted references are enums, and which kind decides the mapping.
            // A GLOBAL enum (`Variant.Type`) is declared as a namespaced
            // `const enum` and keeps its spelling — matched on the whole name,
            // because the prefix alone does not distinguish the two kinds
            // (`Variant` is itself a documented class). A CLASS enum
            // (`Node.ProcessMode`) has no TS declaration of its own — its
            // members are emitted as `static readonly ...: int` — so `int` is
            // what it is. Anything else is a name nothing declares, and a
            // dangling reference is worse than `unknown`.
            if (cleaned.includes('.')) {
                if (ctx.globalEnumNames.has(cleaned))
                    return cleaned;
                const prefix = cleaned.slice(0, cleaned.indexOf('.'));
                if (ctx.knownClasses.has(prefix))
                    return 'int';
                return ctx.knownClasses.size > 0 ? 'unknown' : cleaned;
            }
            // Apply class name sanitization
            const sanitized = CLASS_NAME_CONFLICTS.get(cleaned);
            if (sanitized)
                return sanitized;
            // Unknown types not in Godot class list → unknown
            if (ctx.knownClasses.size > 0 && !ctx.knownClasses.has(cleaned)) {
                return 'unknown';
            }
            return cleaned;
    }
}
/**
 * Returns true when a Godot type should be made nullable (`T | null`) in
 * generated declarations.  Reference types (Node, Resource, Material, etc.)
 * are nullable; value/variant types, primitives, enums and arrays are not.
 */
export function isNullableGodotType(gdType, ctx) {
    const cleaned = gdType
        .replace(/[\s*]*\*+\s*$/, '')
        .replace(/^const\s+/, '')
        .trim();
    // Empty / void / Nil / Variant
    if (cleaned === '' || cleaned === 'Nil' || cleaned === 'Variant')
        return false;
    // Derived value types (Vector2, Color, Packed*Array, etc.)
    if (ctx.valueTypes.has(cleaned))
        return false;
    // Interface classes (Array, Dictionary, String, Callable)
    if (INTERFACE_CLASSES.has(cleaned))
        return false;
    // Typed arrays / dictionaries — the container is never null
    if (cleaned.endsWith('[]') || cleaned.startsWith('Array[') || cleaned.startsWith('Dictionary['))
        return false;
    // Enum references (Node.ProcessMode → int)
    if (cleaned.includes('.'))
        return false;
    // Check the mapped TS type for primitives (int, float, bool→boolean, String→string, etc.)
    if (NON_NULLABLE_TS_TYPES.has(godotTypeToTs(cleaned, ctx)))
        return false;
    // Everything else is a reference type → nullable
    return true;
}
/**
 * Widen a Godot type for use as a method parameter by including all types
 * that can be variant-converted to it.
 * Returns the TS type string, potentially as a union (e.g. `Vector2 | Vector2i`).
 */
export function widenParamType(gdType, ctx) {
    const tsType = godotTypeToTs(gdType, ctx);
    const converts = ctx.variantParamConverts.get(gdType);
    if (!converts || converts.length === 0)
        return tsType;
    const targetIsPrimitive = TS_PRIMITIVE_TYPES.has(tsType);
    const tsConverts = converts
        .map((t) => godotTypeToTs(t, ctx))
        .filter((t) => {
        if (t === tsType)
            return false; // no duplicate
        // Skip primitive→primitive widening (e.g. int accepting bool/string)
        if (targetIsPrimitive && TS_PRIMITIVE_TYPES.has(t))
            return false;
        return true;
    });
    if (tsConverts.length === 0)
        return tsType;
    return `${tsType} | ${tsConverts.join(' | ')}`;
}
/**
 * Derive value types from parsed XML class data.
 * A class is a value type if it has a constructor with a single parameter of
 * its own type (e.g. `Vector2(from: Vector2)`).
 */
export function deriveValueTypes(classes, ctx) {
    const result = new Set();
    for (const [name, cls] of classes) {
        if (name.startsWith('@'))
            continue;
        // Skip types that godotTypeToTs maps to a different name (e.g. StringName→string,
        // bool→boolean) — they're handled as primitives, not value types.
        if (godotTypeToTs(name, ctx) !== name)
            continue;
        // Skip types handled as TS interfaces (Array, Dictionary, String, Callable)
        if (INTERFACE_CLASSES.has(name))
            continue;
        const hasSelfCtor = cls.constructors.some((c) => c.parameters.length === 1 && c.parameters[0].type === name);
        if (hasSelfCtor)
            result.add(name);
    }
    return result;
}
/**
 * Derive variant conversion map from parsed XML class data.
 * For each class with single-parameter "from" constructors, records which types
 * can be converted to this class.
 */
export function deriveVariantParamConverts(classes) {
    const result = new Map();
    for (const [name, cls] of classes) {
        if (name.startsWith('@'))
            continue;
        const convertFrom = [];
        for (const ctor of cls.constructors) {
            if (ctor.parameters.length !== 1)
                continue;
            const param = ctor.parameters[0];
            if (param.name !== 'from' && !param.name.startsWith('from'))
                continue;
            if (param.type === name)
                continue; // skip self-copy constructor
            convertFrom.push(param.type);
        }
        if (convertFrom.length > 0)
            result.set(name, convertFrom);
    }
    return result;
}
/**
 * Load `non-nullable.json` from each override directory and merge.
 * Later directories override earlier ones (user > defaults).
 * Returns a map of ClassName → Set of member names that should be non-nullable.
 */
export function loadNonNullableOverrides(overrideDirs) {
    const result = new Map();
    for (const dir of overrideDirs) {
        const filePath = join(dir, 'non-nullable.json');
        if (!existsSync(filePath))
            continue;
        const data = JSON.parse(readFileSync(filePath, 'utf-8'));
        for (const [cls, members] of Object.entries(data)) {
            // Later dirs fully replace the class entry (consistent with override merging)
            result.set(cls, new Set(members));
        }
    }
    return result;
}
//# sourceMappingURL=type-mapping.js.map