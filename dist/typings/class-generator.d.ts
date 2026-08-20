import { type GodotClassXml, type GodotMethodXml, type GodotOperatorXml } from './godot-registry.ts';
import { type TypeContext } from './type-mapping.ts';
/** TS reserved words and strict-mode identifiers that cannot be used as-is */
export declare const TS_RESERVED: Set<string>;
export declare function sanitizeParamName(name: string): string;
/** Check if a property name needs quoting (contains non-identifier chars or starts with digit) */
export declare function needsQuoting(name: string): boolean;
export declare function sanitizeFunctionName(name: string): string;
export { sanitizeClassName } from './type-mapping.ts';
/**
 * Formats a description string as JSDoc comment lines.
 * Returns array of lines like ["  /** Description here *​/"]
 * or multi-line JSDoc for longer descriptions.
 */
export declare function emitJsDoc(description: string | undefined, indent?: string): string[];
export declare function emitMethodSignature(method: GodotMethodXml, ctx: TypeContext, nonNullMembers?: Set<string>): string[];
/** Maps GDScript operator names to unique symbol names */
export declare const OPERATOR_SYMBOL_MAP: Record<string, string>;
/**
 * Generates operator overload declarations as symbol-keyed union properties.
 * Binary ops: [__add]: { right: T1, ret: R1 } | { right: T2, ret: R2 };
 * Unary ops:  [__minus]: { ret: R };
 *
 * This union-of-entries pattern enables extracting the set of valid right-hand
 * types and per-overload return type inference via distributive conditional types.
 */
export declare function emitOperatorOverloads(operators: GodotOperatorXml[], ctx: TypeContext): string[];
/**
 * Generates a TypeScript declaration for a single Godot class.
 */
export declare function generateClassDeclaration(cls: GodotClassXml, ctx: TypeContext, dictOnlyOverrides?: Set<string>, 
/** All explicit method names from ancestor classes (to avoid setter/getter conflicts) */
inheritedMethodNames?: Set<string>): string;
/**
 * Generates a value type declaration as interface + constructor function.
 * Value types in GDScript are called as functions (Vector2(1, 2)), not with `new`.
 */
export declare function generateValueTypeDeclaration(cls: GodotClassXml, dictMembers: Set<string> | undefined, ctx: TypeContext): string;
/**
 * Generate a constructor interface with call signatures, static methods,
 * enums, and constants from a Godot class XML. Used for value types (Vector2,
 * Color, etc.) and interface classes (Dictionary, Callable).
 *
 * @param cls - The parsed Godot class XML data
 * @param className - The TS class/interface name (may differ from cls.name)
 * @param returnType - The return type for constructor calls (defaults to className)
 */
export declare function generateConstructorInterface(cls: GodotClassXml, className: string, returnType: string | undefined, ctx: TypeContext): string;
/**
 * Generates a TS interface from a GDScript class, used for classes that map
 * to TS built-in interfaces (Object, Array, String, Function).
 */
export declare function generateInterfaceDeclaration(cls: GodotClassXml, tsName: string, ctx: TypeContext): string;
//# sourceMappingURL=class-generator.d.ts.map