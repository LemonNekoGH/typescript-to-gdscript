import { GDScriptParser } from "../../parser/gdscript/index.js";
import { SyntaxType } from "../../parser/gdscript/types.js";
import { buildGlobalEnumMap, } from "./context.js";
import { extractGdTypeName, inferExprTypeStatic } from "./type-inference.js";
import { emitSourceFile } from "./source-emitter.js";
/**
 * Fix comment indentation so tree-sitter doesn't break block structure.
 * In GDScript, comments don't affect block indentation. A comment at column 0
 * inside an indented block shouldn't break the block. This function aligns
 * such comments to the indentation of the next non-comment, non-empty line.
 */
function fixCommentIndentation(source) {
    const lines = source.split('\n');
    const result = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trimStart();
        // Check if this is a comment line (# or ##)
        if (trimmed.startsWith('#')) {
            // tree-sitter-gdscript bug: `#"` (no space) is not parsed as a comment.
            // Workaround: ensure a space after # or ## before non-space characters.
            const commentPrefix = trimmed.startsWith('##') ? '##' : '#';
            const afterPrefix = trimmed.slice(commentPrefix.length);
            let fixedTrimmed = trimmed;
            if (afterPrefix.length > 0 &&
                afterPrefix[0] !== ' ' &&
                afterPrefix[0] !== '\t') {
                fixedTrimmed = commentPrefix + ' ' + afterPrefix;
            }
            // Find the next non-empty, non-comment line
            let nextIndent = null;
            for (let j = i + 1; j < lines.length; j++) {
                const nextTrimmed = lines[j].trimStart();
                if (nextTrimmed === '' || nextTrimmed.startsWith('#'))
                    continue;
                // Get indentation of the next code line
                nextIndent = lines[j].substring(0, lines[j].length - nextTrimmed.length);
                break;
            }
            if (nextIndent !== null) {
                // Get current comment indentation
                const currentIndent = line.substring(0, line.length - trimmed.length);
                // If comment has less indentation than the next code line, re-indent it
                if (currentIndent.length < nextIndent.length) {
                    result.push(nextIndent + fixedTrimmed);
                    continue;
                }
            }
            if (fixedTrimmed !== trimmed) {
                const currentIndent = line.substring(0, line.length - trimmed.length);
                result.push(currentIndent + fixedTrimmed);
                continue;
            }
        }
        result.push(line);
    }
    return result.join('\n');
}
/**
 * Extracts class info (class_name, extends, own members) from a GD source without full conversion.
 *
 * `filePath` is optional but recommended — it's stored on the resulting
 * {@link UserClassInfo} and consumed by the GD→TS converter when it
 * needs to emit cross-file `import { Foo } from './foo.js'` lines (the
 * module-scoped layout used when `generateGlobalClassTypes` is `false`).
 */
export function parseGdClassInfo(source, registry, filePath) {
    const parser = new GDScriptParser();
    const root = parser.parse(fixCommentIndentation(source));
    let className = '';
    let extendsClass = '';
    const members = new Set();
    const memberTypes = new Map();
    for (const child of root.namedChildren) {
        if (child.type === SyntaxType.ExtendsStatement) {
            const typeNode = child.namedChildren[0];
            if (typeNode) {
                extendsClass =
                    typeNode.type === SyntaxType.Type
                        ? (typeNode.namedChildren[0]?.text ?? typeNode.text)
                        : typeNode.text;
            }
        }
        else if (child.type === SyntaxType.ClassNameStatement) {
            // `parseGdClassInfo` builds the user-class index keyed on the GD
            // identifier as written in the .gd source — keep it un-escaped
            // here so cross-file `extends Foo` lookups resolve regardless of
            // whether the parent has a `_`-prefix.
            className = child.childForFieldName('name')?.text ?? '';
        }
        else if (child.type === SyntaxType.FunctionDefinition ||
            child.type === SyntaxType.ConstructorDefinition) {
            const name = child.childForFieldName('name')?.text ?? '_init';
            members.add(name === '_init' ? 'constructor' : name);
        }
        else if (child.type === SyntaxType.VariableStatement ||
            child.type === SyntaxType.ExportVariableStatement ||
            child.type === SyntaxType.OnreadyVariableStatement) {
            const name = child.childForFieldName('name')?.text;
            if (name) {
                members.add(name);
                const typeNode = child.childForFieldName('type');
                const valueNode = child.childForFieldName('value');
                const inferredType = typeNode
                    ? extractGdTypeName(typeNode)
                    : valueNode
                        ? inferExprTypeStatic(valueNode, registry)
                        : null;
                if (inferredType)
                    memberTypes.set(name, inferredType);
            }
        }
        else if (child.type === SyntaxType.SignalStatement) {
            const name = child.childForFieldName('name')?.text;
            if (name)
                members.add(name);
        }
        else if (child.type === SyntaxType.ConstStatement) {
            const name = child.childForFieldName('name')?.text;
            if (name)
                members.add(name);
        }
    }
    if (!className)
        return null;
    return {
        name: className,
        extends: extendsClass,
        members,
        memberTypes,
        filePath,
    };
}
export function convertGdToTs(options) {
    // Build user class index from project sources. `filePath` flows
    // through so the import-emission post-pass can compute relative
    // import specifiers when `generateGlobalClassTypes` is disabled.
    const userClasses = new Map();
    if (options.projectSources) {
        for (const ps of options.projectSources) {
            const info = parseGdClassInfo(ps.source, options.registry, ps.filePath);
            if (info)
                userClasses.set(info.name, info);
        }
    }
    // Also parse the current file so it's available for inner class extends resolution
    const selfInfo = parseGdClassInfo(options.source, options.registry, options.filePath);
    if (selfInfo)
        userClasses.set(selfInfo.name, selfInfo);
    const parser = new GDScriptParser();
    const fixedSource = fixCommentIndentation(options.source);
    const root = parser.parse(fixedSource);
    const ctx = {
        source: fixedSource,
        filePath: options.filePath,
        diagnostics: [],
        classMembers: new Set(),
        localVars: new Set(),
        localVarTypes: new Map(),
        classMemberTypes: new Map(),
        registry: options.registry,
        userClasses,
        className: '',
        staticMembers: new Set(),
        signalHandlers: options.signalHandlers ?? new Map(),
        globalEnumMap: buildGlobalEnumMap(options.registry),
        classTypeNames: new Set(),
        classEnumNames: new Set(),
        unsafeUseAny: options.unsafeUseAny ?? false,
        isAddon: options.isAddon ?? false,
    };
    const code = emitSourceFile(root, ctx);
    // NOTE: cross-file `import { Foo } from './foo.js'` lines are NOT
    // emitted here. They're added by `injectMissingImports` (in
    // `./inject-imports.ts`) at the batch level, after every `.gd` in
    // the project has been converted and written to disk. That pass
    // builds a real TS program and uses unresolved-name diagnostics
    // (TS code 2304/2503) to decide what to import — much more precise
    // than a per-file regex. Single-file callers like `generateAddonTypings`
    // pass `generateGlobalClassTypes: true`, which makes the inject pass
    // a no-op anyway, so no change is needed there.
    return {
        code,
        diagnostics: ctx.diagnostics,
    };
}
// Re-export functions used by source-emitter (needed for backward compat + internal use)
export { resolveAllInheritedMembers, resolveInheritedMemberTypes, } from "./context.js";
//# sourceMappingURL=index.js.map