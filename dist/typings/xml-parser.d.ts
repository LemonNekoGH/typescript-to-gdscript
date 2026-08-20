/**
 * Godot XML class documentation parser.
 * Parses Godot's XML class reference files into structured data.
 */
import type { GodotEnumInfo } from './godot-registry.ts';
export interface GodotClassXml {
    name: string;
    inherits?: string;
    briefDescription?: string;
    description?: string;
    methods: GodotMethodXml[];
    constructors: GodotMethodXml[];
    properties: GodotPropertyXml[];
    signals: GodotSignalXml[];
    constants: GodotConstantXml[];
    enums: GodotEnumInfo[];
    operators: GodotOperatorXml[];
    annotations: GodotAnnotationXml[];
}
export interface GodotMethodXml {
    name: string;
    returnType: string;
    parameters: GodotParamXml[];
    description?: string;
    isVirtual: boolean;
    isStatic: boolean;
    isConst: boolean;
    isVararg: boolean;
}
export interface GodotParamXml {
    name: string;
    type: string;
    defaultValue?: string;
}
export interface GodotPropertyXml {
    name: string;
    type: string;
    description?: string;
    setter?: string;
    getter?: string;
}
export interface GodotSignalXml {
    name: string;
    parameters: GodotParamXml[];
    description?: string;
}
export interface GodotConstantXml {
    name: string;
    value: string;
    description?: string;
    enumName?: string;
}
export interface GodotAnnotationXml {
    name: string;
    parameters: GodotParamXml[];
    description?: string;
    isVararg: boolean;
}
export interface GodotOperatorXml {
    /** e.g., "+", "-", "*", "/", "==", "!=", "<", "<=", ">", ">=", "unary+", "unary-" */
    operator: string;
    returnType: string;
    /** For binary operators, the right-hand operand type. Absent for unary. */
    rightType?: string;
    description?: string;
}
/**
 * Converts Godot BBCode-style markup to plain text for JSDoc.
 * Strips [code], [b], [i], [url], [param], etc. tags.
 */
export declare function gdDocToPlain(text: string): string;
/**
 * Parses a Godot XML class documentation file.
 */
export declare function parseClassXml(xmlContent: string): GodotClassXml | null;
/**
 * Parses all Godot XML class docs from one or more directories.
 *
 * Godot's docs are spread across several locations — `doc/classes/` for
 * core classes plus `modules/<module>/doc_classes/` for per-module
 * additions (notably `modules/gdscript/doc_classes/@GDScript.xml`).
 * Pass an array to merge all of them into one class map.
 *
 * Merge order: directories are processed in the given order; later
 * directories overwrite same-named classes from earlier ones. This
 * mirrors the override-dir convention elsewhere in the codebase
 * ("later wins") and lets a user point a custom dir at the end of
 * the list to patch a single class without forking the whole tree.
 */
export declare function parseAllClassXmls(classDocsDir: string | string[]): Map<string, GodotClassXml>;
//# sourceMappingURL=xml-parser.d.ts.map