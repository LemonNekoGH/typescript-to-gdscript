export { gdDocToPlain, parseClassXml, parseAllClassXmls } from './xml-parser.ts';
export type { GodotClassXml, GodotMethodXml, GodotParamXml, GodotPropertyXml, GodotSignalXml, GodotConstantXml, GodotAnnotationXml, GodotOperatorXml, } from './xml-parser.ts';
export { generateRegistryData, parseGodotVersion } from './registry-generator.ts';
export type { GodotVersion } from './registry-generator.ts';
export interface GodotSignalParamInfo {
    name: string;
    /** Godot type name (e.g. "RID", "Area2D", "int") */
    type: string;
}
export interface GodotSignalInfo {
    name: string;
    parameters: GodotSignalParamInfo[];
}
export interface GodotClassInfo {
    name: string;
    inherits: string | null;
    description?: string;
    methods: string[];
    properties: string[];
    signals: GodotSignalInfo[];
    constants: string[];
    enums: GodotEnumInfo[];
    /**
     * List of variant types that can be converted to this class via `gd.as(value, ClassName)`.
     * Computed from single-parameter "from" constructors.
     * Example: Vector2 has variantConverts = ["Vector2", "Vector2i"]
     */
    variantConverts?: string[];
}
export interface GodotEnumInfo {
    name: string;
    values: Array<{
        name: string;
        value: string;
    }>;
}
export interface GodotRegistryData {
    version: string;
    classes: Record<string, GodotClassInfo>;
    globalFunctions: string[];
    globalConstants: string[];
    globalEnums: GodotEnumInfo[];
    /** Constructors like Vector2, Color etc */
    constructors: string[];
    /** Global singleton instances from @GlobalScope (e.g. Engine, Input, ProjectSettings) */
    singletons: Array<{
        name: string;
        type: string;
    }>;
    /** GDScript annotations that take no parameters (bare decorators in TS) */
    bareAnnotations: string[];
    /** Classes that have operator overloads (need gd.ops.* wrappers in TS) */
    operatorTypes: string[];
}
export declare class GodotClassRegistry {
    private data;
    private allMembersCache;
    private globalFunctionsSet;
    private constructorsSet;
    private singletonsSet;
    private bareAnnotationsSet;
    private operatorTypesSet;
    private globalEnumNamesSet;
    constructor(data: GodotRegistryData);
    static fromJsonFile(jsonPath: string): GodotClassRegistry;
    static fromJson(json: string): GodotClassRegistry;
    /**
     * Get all member names (own + inherited) for a class.
     * Includes methods, properties, signals, and constants.
     */
    getAllMembers(className: string): Set<string>;
    /** Check if a function name is a global/builtin function */
    isGlobalFunction(name: string): boolean;
    /** Check if a name is a constructor type (Vector2, Color, etc) */
    isConstructor(name: string): boolean;
    /**
     * Check if a source type can be converted to a target type via `gd.as(value, Target)`.
     * Returns true when the target class has the source type in its `variantConverts` list.
     */
    canVariantConvert(source: string, target: string): boolean;
    /** Get the list of types that can be converted to a given target class. */
    getVariantConverts(target: string): string[];
    /** Check if a name is a global singleton instance (Engine, Input, ProjectSettings, etc.) */
    isSingleton(name: string): boolean;
    /** Check if a name should not get `this.` prefix (global function, constructor, or singleton) */
    isGlobal(name: string): boolean;
    /** Check if an annotation takes no parameters (bare decorator in TS, no `()` needed) */
    isBareAnnotation(name: string): boolean;
    /** Check if a class has operator overloads (needs gd.ops.* wrappers) */
    hasOperators(name: string): boolean;
    /** Check if a name is a Godot global enum type (e.g. Key, MouseButton). */
    isGlobalEnum(name: string): boolean;
    /** Get the inheritance chain for a class (including itself) */
    getInheritanceChain(className: string): string[];
    /** Check if className extends (directly or indirectly) parentName */
    isSubclassOf(className: string, parentName: string): boolean;
    /** Check if a class exists in the registry */
    hasClass(className: string): boolean;
    /** Get class info */
    getClass(className: string): GodotClassInfo | undefined;
    /**
     * Get signal parameters for a signal on a class (walks inheritance chain).
     * Returns null if the signal is not found on the class or any ancestor.
     */
    getSignalParams(className: string, signalName: string): GodotSignalParamInfo[] | null;
    /** Get registry data (for serialization) */
    getData(): GodotRegistryData;
}
export interface GenerateRegistryOptions {
    /**
     * Path(s) to Godot docs XML class reference directories. Accepts a
     * single dir (legacy) or an array; later dirs override earlier ones
     * for same-named classes. See {@link parseAllClassXmls} for details.
     */
    classDocsDir: string | string[];
    outputPath: string;
    version?: string;
}
/**
 * Generates the Godot class registry JSON from XML class docs.
 */
export declare function generateGodotRegistry(options: GenerateRegistryOptions): GodotClassRegistry;
//# sourceMappingURL=godot-registry.d.ts.map