/** Build a map of bare global enum constant names → qualified TS names (e.g. "KEY_F21" → "Key.KEY_F21") */
export function buildGlobalEnumMap(registry) {
    const map = new Map();
    const data = registry.getData();
    for (const e of data.globalEnums) {
        for (const v of e.values) {
            map.set(v.name, `${e.name}.${v.name}`);
        }
    }
    return map;
}
/**
 * Check if a name is a global function/constructor/class (not a class member).
 * In GDScript, bare identifiers that are not local, not global, and not class names
 * must be class members (self properties/methods).
 */
export function isGlobalName(name, ctx) {
    return (ctx.registry.isGlobal(name) ||
        ctx.registry.hasClass(name) ||
        ctx.userClasses.has(name));
}
/**
 * Resolves all inherited members for a class, walking through user classes and Godot registry.
 */
export function resolveAllInheritedMembers(extendsClass, userClasses, registry) {
    const allMembers = new Set();
    let current = extendsClass;
    const visited = new Set();
    while (current && !visited.has(current)) {
        visited.add(current);
        // Check Godot registry first
        if (registry.hasClass(current)) {
            const inherited = registry.getAllMembers(current);
            for (const name of inherited)
                allMembers.add(name);
            break; // Registry already walks the full Godot chain
        }
        // Check user classes
        const userClass = userClasses.get(current);
        if (userClass) {
            for (const name of userClass.members)
                allMembers.add(name);
            current = userClass.extends || null;
        }
        else {
            break;
        }
    }
    return allMembers;
}
/**
 * Walks user class inheritance chain and copies memberTypes into the target map.
 * Does not overwrite types already present (own types take priority).
 */
export function resolveInheritedMemberTypes(extendsClass, userClasses, target) {
    let current = extendsClass;
    const visited = new Set();
    while (current && !visited.has(current)) {
        visited.add(current);
        const userClass = userClasses.get(current);
        if (!userClass)
            break;
        for (const [name, type] of userClass.memberTypes) {
            if (!target.has(name))
                target.set(name, type);
        }
        current = userClass.extends || null;
    }
}
//# sourceMappingURL=context.js.map