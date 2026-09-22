import { godotTypeToTs, INTERFACE_CLASSES } from "./type-mapping.js";
import { emitJsDoc, sanitizeParamName, sanitizeFunctionName, sanitizeClassName, OPERATOR_SYMBOL_MAP, } from "./class-generator.js";
// ─── Constants ───────────────────────────────────────────────────
/** Classes to skip entirely (handled by gd-helpers.d.ts or TS builtins) */
export const SKIP_CLASSES = new Set(['int', 'float', 'bool', 'Nil']);
// ─── Global scope generators ─────────────────────────────────────
/**
 * Emits one `const enum` block (without a leading `declare`) at the given
 * indentation. Descriptions come from the matching constant entries.
 */
function emitConstEnum(cls, e, name, indent) {
    const lines = [`${indent}const enum ${name} {`];
    for (const v of e.values) {
        const constInfo = cls.constants.find((c) => c.name === v.name);
        lines.push(...emitJsDoc(constInfo?.description, `${indent}  `));
        lines.push(`${indent}  ${v.name} = ${v.value},`);
    }
    lines.push(`${indent}}`);
    return lines.join('\n');
}
/**
 * Generates global scope declarations (top-level functions, constants, enums).
 */
export function generateGlobalScopeDeclaration(cls, ctx) {
    const lines = [];
    lines.push('// @GlobalScope — global functions and constants');
    lines.push('');
    // Global functions. A name TypeScript cannot spell (`typeof`) is left
    // out: declaring it under a sanitized alias would only let users write
    // a call that converts back to GDScript under the wrong name. Those
    // globals live in the `gd` namespace instead — see `gd.typeof`.
    for (const method of cls.methods) {
        if (sanitizeFunctionName(method.name) !== method.name)
            continue;
        lines.push(...emitJsDoc(method.description, ''));
        let seenOptional = false;
        const params = method.parameters.map((p) => {
            const tsType = godotTypeToTs(p.type, ctx);
            if (p.defaultValue !== undefined)
                seenOptional = true;
            const optional = seenOptional ? '?' : '';
            return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
        });
        if (method.isVararg) {
            params.push('...args: any[]');
        }
        const returnType = godotTypeToTs(method.returnType, ctx);
        lines.push(`declare function ${sanitizeFunctionName(method.name)}(${params.join(', ')}): ${returnType};`);
    }
    // Global enums. A dotted Godot name (`Variant.Type`) is a namespaced
    // enum: GDScript spells the dot in both type and value position, so
    // TypeScript has to as well, which means a `namespace` wrapper. Split
    // on the LAST dot, so a deeper name nests as `namespace A.B` rather
    // than producing `const enum B.C`. Enums sharing a prefix merge into
    // one block.
    //
    // The prefix may also name a class (`Variant` is documented as one),
    // in which case TypeScript merges the namespace into that class
    // declaration. That is what makes `Variant.Type` reachable at all, and
    // it is safe while the class is empty — a future dotted enum whose
    // prefix is a NON-empty class would silently add members to it.
    if (cls.enums.length > 0) {
        lines.push('');
        const namespaced = new Map();
        for (const e of cls.enums) {
            const dot = e.name.lastIndexOf('.');
            if (dot === -1) {
                lines.push(`declare ${emitConstEnum(cls, e, e.name, '')}`);
                lines.push('');
            }
            else {
                const prefix = e.name.slice(0, dot);
                const group = namespaced.get(prefix);
                if (group)
                    group.push(e);
                else
                    namespaced.set(prefix, [e]);
            }
        }
        for (const [prefix, group] of namespaced) {
            lines.push(`declare namespace ${prefix} {`);
            for (const e of group) {
                lines.push(emitConstEnum(cls, e, e.name.slice(prefix.length + 1), '  '));
            }
            lines.push('}');
            lines.push('');
        }
    }
    // Non-enum constants
    const nonEnumConstants = cls.constants.filter((c) => !c.enumName);
    if (nonEnumConstants.length > 0) {
        lines.push('');
        for (const c of nonEnumConstants) {
            lines.push(...emitJsDoc(c.description, ''));
            lines.push(`declare const ${c.name}: int;`);
        }
    }
    // Singleton instances are emitted in per-class .d.ts files
    // (as `declare interface` + `declare const`), not here.
    return lines.join('\n');
}
/**
 * Generates TypeScript declarations from @GDScript.xml:
 * constants, methods, and annotation decorators.
 */
export function generateGDScriptDeclaration(cls, ctx) {
    const lines = [];
    lines.push('');
    lines.push('// @GDScript — built-in constants, functions, and annotations');
    // Constants
    if (cls.constants.length > 0) {
        lines.push('');
        for (const c of cls.constants) {
            lines.push(...emitJsDoc(c.description, ''));
            const tsType = c.value === 'inf' || c.value === 'nan' ||
                c.value.includes('.') ? 'float' : 'int';
            lines.push(`declare const ${c.name}: ${tsType};`);
        }
    }
    // Methods
    if (cls.methods.length > 0) {
        lines.push('');
        for (const method of cls.methods) {
            lines.push(...emitJsDoc(method.description, ''));
            let seenOptional = false;
            const params = method.parameters.map((p) => {
                const tsType = godotTypeToTs(p.type, ctx);
                if (p.defaultValue !== undefined)
                    seenOptional = true;
                const optional = seenOptional ? '?' : '';
                return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
            });
            if (method.isVararg) {
                params.push('...args: any[]');
            }
            const returnType = godotTypeToTs(method.returnType, ctx);
            lines.push(`declare function ${sanitizeFunctionName(method.name)}(${params.join(', ')}): ${returnType};`);
        }
    }
    // Annotations → global decorator functions
    if (cls.annotations.length > 0) {
        lines.push('');
        lines.push('// GDScript annotations as TypeScript decorators');
        for (const ann of cls.annotations) {
            lines.push(...emitJsDoc(ann.description, ''));
            // Strip @ prefix and rename 'export' → 'exports' to avoid TS keyword conflict
            let tsName = ann.name;
            if (tsName === 'export')
                tsName = 'exports';
            if (ann.parameters.length === 0 && !ann.isVararg) {
                // No-param decorator: bare decorator function
                lines.push(`declare function ${tsName}(target: any, context: any): void;`);
            }
            else {
                // Parameterized decorator: factory function returning decorator
                let seenOptional = false;
                const params = ann.parameters.map((p) => {
                    const tsType = godotTypeToTs(p.type, ctx);
                    if (p.defaultValue !== undefined)
                        seenOptional = true;
                    const optional = seenOptional ? '?' : '';
                    return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
                });
                if (ann.isVararg) {
                    params.push('...args: any[]');
                }
                lines.push(`declare function ${tsName}(${params.join(', ')}): (target: any, context: any) => void;`);
            }
        }
    }
    return lines.join('\n');
}
// ─── Number operator overloads ───────────────────────────────────
/**
 * Generates a Number interface extension with operator overloads from int and float XML docs.
 * Since int/float are `type number`, their operators need to be on the Number interface.
 * We merge both int and float operators, deduplicating where they overlap.
 */
export function generateNumberOperatorOverloads(classes, ctx) {
    const intCls = classes.get('int');
    const floatCls = classes.get('float');
    if (!intCls && !floatCls)
        return null;
    // Merge all operators from both int and float, grouped by symbol
    const grouped = new Map();
    for (const cls of [intCls, floatCls]) {
        if (!cls)
            continue;
        for (const op of cls.operators) {
            const symbolName = OPERATOR_SYMBOL_MAP[op.operator];
            if (!symbolName)
                continue;
            if (!grouped.has(symbolName)) {
                grouped.set(symbolName, {
                    entries: new Set(),
                    isUnary: op.operator.startsWith('unary'),
                });
            }
            const group = grouped.get(symbolName);
            const returnType = godotTypeToTs(op.returnType, ctx);
            if (group.isUnary) {
                group.entries.add(`{ ret: ${returnType} }`);
            }
            else {
                const rightType = godotTypeToTs(op.rightType ?? 'Variant', ctx);
                group.entries.add(`{ right: ${rightType}; ret: ${returnType} }`);
            }
        }
    }
    if (grouped.size === 0)
        return null;
    const lines = [];
    lines.push('// Operator overloads for int/float (number type)');
    lines.push('declare interface Number {');
    for (const [symbolName, group] of grouped) {
        lines.push(`  [${symbolName}]: ${[...group.entries].join(' | ')};`);
    }
    lines.push('}');
    return lines.join('\n');
}
// ─── Dictionary helpers ──────────────────────────────────────────
/**
 * Computes Dictionary member names that no class in the Object hierarchy defines.
 * These are safe to override with `never` on GodotObject to block Dictionary API leaking
 * through the Object interface to all Godot classes.
 */
export function computeDictOnlyOverrides(classes) {
    const dictClass = classes.get('Dictionary');
    if (!dictClass)
        return new Set();
    // Collect all Dictionary member names (methods + properties)
    const dictMembers = new Set();
    for (const m of dictClass.methods)
        dictMembers.add(m.name);
    for (const p of dictClass.properties)
        dictMembers.add(p.name);
    // Collect all member names used by any class that inherits from Object
    const objectSubclassMembers = new Set();
    for (const [name, cls] of classes) {
        if (name === 'Object' ||
            name === 'Dictionary' ||
            name.startsWith('@') ||
            SKIP_CLASSES.has(name))
            continue;
        if (!cls.inherits)
            continue; // no parent — not in Object hierarchy
        for (const m of cls.methods)
            objectSubclassMembers.add(m.name);
        for (const p of cls.properties)
            objectSubclassMembers.add(p.name);
    }
    // Also exclude names that Object itself defines (they'd conflict)
    const objectClass = classes.get('Object');
    if (objectClass) {
        for (const m of objectClass.methods)
            objectSubclassMembers.add(m.name);
        for (const p of objectClass.properties)
            objectSubclassMembers.add(p.name);
    }
    // Dictionary-only = in Dictionary but not in any Object-hierarchy class
    const result = new Set();
    for (const name of dictMembers) {
        if (!objectSubclassMembers.has(name))
            result.add(name);
    }
    return result;
}
/**
 * Collects all Dictionary interface member names (methods + properties).
 * Used to override them with `never` on value type interfaces, preventing
 * Dictionary methods from leaking through the TS Object interface.
 */
export function collectAllDictMembers(classes) {
    const dictClass = classes.get('Dictionary');
    if (!dictClass)
        return new Set();
    const members = new Set();
    for (const m of dictClass.methods)
        members.add(m.name);
    for (const p of dictClass.properties)
        members.add(p.name);
    return members;
}
//# sourceMappingURL=global-generator.js.map