import { readFileSync, writeFileSync } from 'fs';
import { parseAllClassXmls } from "./xml-parser.js";
import { generateRegistryData } from "./registry-generator.js";
// Re-export everything that external consumers need from the sub-modules
export { gdDocToPlain, parseClassXml, parseAllClassXmls } from "./xml-parser.js";
export { generateRegistryData, parseGodotVersion } from "./registry-generator.js";
// ─── Registry Class (runtime) ─────────────────────────────────
export class GodotClassRegistry {
    data;
    allMembersCache = new Map();
    globalFunctionsSet;
    constructorsSet;
    singletonsSet;
    bareAnnotationsSet;
    operatorTypesSet;
    globalEnumNamesSet;
    constructor(data) {
        this.data = data;
        this.globalFunctionsSet = new Set(data.globalFunctions);
        this.constructorsSet = new Set(data.constructors);
        this.singletonsSet = new Set((data.singletons ?? []).map((s) => s.name));
        this.bareAnnotationsSet = new Set(data.bareAnnotations ?? []);
        this.operatorTypesSet = new Set(data.operatorTypes ?? []);
        this.globalEnumNamesSet = new Set((data.globalEnums ?? []).map((e) => e.name));
    }
    static fromJsonFile(jsonPath) {
        const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
        return new GodotClassRegistry(data);
    }
    static fromJson(json) {
        return new GodotClassRegistry(JSON.parse(json));
    }
    /**
     * Get all member names (own + inherited) for a class.
     * Includes methods, properties, signals, and constants.
     */
    getAllMembers(className) {
        const cached = this.allMembersCache.get(className);
        if (cached)
            return cached;
        const members = new Set();
        const chain = this.getInheritanceChain(className);
        for (const cn of chain) {
            const cls = this.data.classes[cn];
            if (!cls)
                continue;
            for (const m of cls.methods)
                members.add(m);
            for (const p of cls.properties)
                members.add(p);
            for (const s of cls.signals)
                members.add(s.name);
            for (const c of cls.constants)
                members.add(c);
        }
        this.allMembersCache.set(className, members);
        return members;
    }
    /** Check if a function name is a global/builtin function */
    isGlobalFunction(name) {
        return this.globalFunctionsSet.has(name);
    }
    /** Check if a name is a constructor type (Vector2, Color, etc) */
    isConstructor(name) {
        return this.constructorsSet.has(name);
    }
    /**
     * Check if a source type can be converted to a target type via `gd.as(value, Target)`.
     * Returns true when the target class has the source type in its `variantConverts` list.
     */
    canVariantConvert(source, target) {
        const targetCls = this.data.classes[target];
        if (!targetCls?.variantConverts)
            return false;
        return targetCls.variantConverts.includes(source);
    }
    /** Get the list of types that can be converted to a given target class. */
    getVariantConverts(target) {
        return this.data.classes[target]?.variantConverts ?? [];
    }
    /** Check if a name is a global singleton instance (Engine, Input, ProjectSettings, etc.) */
    isSingleton(name) {
        return this.singletonsSet.has(name);
    }
    /** Check if a name should not get `this.` prefix (global function, constructor, or singleton) */
    isGlobal(name) {
        return this.globalFunctionsSet.has(name) || this.constructorsSet.has(name) || this.singletonsSet.has(name);
    }
    /** Check if an annotation takes no parameters (bare decorator in TS, no `()` needed) */
    isBareAnnotation(name) {
        return this.bareAnnotationsSet.has(name);
    }
    /** Check if a class has operator overloads (needs gd.ops.* wrappers) */
    hasOperators(name) {
        return this.operatorTypesSet.has(name);
    }
    /** Check if a name is a Godot global enum type (e.g. Key, MouseButton). */
    isGlobalEnum(name) {
        return this.globalEnumNamesSet.has(name);
    }
    /** Get the inheritance chain for a class (including itself) */
    getInheritanceChain(className) {
        const chain = [];
        let current = className;
        const visited = new Set();
        while (current && !visited.has(current)) {
            visited.add(current);
            chain.push(current);
            const cls = this.data.classes[current];
            current = cls?.inherits ?? null;
        }
        return chain;
    }
    /** Check if className extends (directly or indirectly) parentName */
    isSubclassOf(className, parentName) {
        return this.getInheritanceChain(className).includes(parentName);
    }
    /** Check if a class exists in the registry */
    hasClass(className) {
        return className in this.data.classes;
    }
    /** Get class info */
    getClass(className) {
        return this.data.classes[className];
    }
    /**
     * Get signal parameters for a signal on a class (walks inheritance chain).
     * Returns null if the signal is not found on the class or any ancestor.
     */
    getSignalParams(className, signalName) {
        const chain = this.getInheritanceChain(className);
        for (const cn of chain) {
            const cls = this.data.classes[cn];
            if (!cls)
                continue;
            const sig = cls.signals.find((s) => s.name === signalName);
            if (sig)
                return sig.parameters;
        }
        return null;
    }
    /** Get registry data (for serialization) */
    getData() {
        return this.data;
    }
}
/**
 * Generates the Godot class registry JSON from XML class docs.
 */
export function generateGodotRegistry(options) {
    const classes = parseAllClassXmls(options.classDocsDir);
    const data = generateRegistryData(classes);
    data.version = options.version ?? '';
    writeFileSync(options.outputPath, JSON.stringify(data, null, 2));
    return new GodotClassRegistry(data);
}
//# sourceMappingURL=godot-registry.js.map