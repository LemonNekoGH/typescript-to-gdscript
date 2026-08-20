/**
 * File-scope emitters for GD→TS conversion — the symmetric reverse
 * of the TS→GD file-scope lift.
 *
 * GDScript class-body `const` / named `enum` / inner `class`
 * declarations lift OUT of the TS class body into file-scope decls
 * (wrapped in an `export namespace <ClassName> { ... }` pair with the
 * class), giving consumers `Foo.X` resolution via TypeScript's native
 * namespace+class merging. The forward TS→GD pass pulls them back
 * into the class body, so the round-trip stays stable.
 *
 * This module also owns the inner-class emission path
 * (`emitFileScopeClass`), which recurses through nested classes and
 * uses `buildClassScope` / `withClassScope` to isolate each class's
 * member-resolution state.
 */
import { SyntaxType } from "../../parser/gdscript/types.js";
import { resolveAllInheritedMembers } from "./context.js";
import { buildClassScope, withClassScope } from "./class-scope.js";
import { emitFunction, emitConstructor } from "./functions.js";
import { emitClassVariable, emitEnum, emitTypeAnnotation, getAnnotations, } from "./members.js";
import { emitExpr } from "./expressions.js";
// ─── extends helpers ─────────────────────────────────────────────
/**
 * Format a raw GD `extends` target for the TypeScript output.
 *
 * GDScript supports two forms:
 *   - `extends Identifier`        → emit identifier verbatim.
 *   - `extends "res://path.gd"`   → no TS-native equivalent; mirror via
 *     `preload(...)` so the TS class still has a constructable base.
 *
 * The extracted-from-AST string keeps the surrounding quotes for the
 * string form, so a leading `"` / `'` is the discriminator.
 */
export function formatExtendsForTs(extendsClass) {
    if (extendsClass.startsWith('"') || extendsClass.startsWith("'")) {
        return `preload(${extendsClass})`;
    }
    return extendsClass;
}
// ─── File-scope `const` lift ─────────────────────────────────────
export function emitFileScopeConst(node, ctx) {
    const name = node.childForFieldName('name')?.text ?? '';
    const typeNode = node.childForFieldName('type');
    const valueNode = node.childForFieldName('value');
    const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode, ctx) : '';
    const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';
    return `export const ${name}${typeAnnotation}${init};`;
}
// ─── File-scope `enum` lift ──────────────────────────────────────
//
// Named GD enum at class body → file-scope native TS
// `export enum X { ... }`. Auto-incrementing values are preserved;
// explicit numeric initializers map directly. We deliberately avoid
// the legacy `static X = gd.enum(...)` shape — native TS enums
// round-trip cleanly through the forward TS→GD lift.
export function emitFileScopeEnum(node, ctx) {
    void ctx; // kept in signature for symmetry / future expression inlining
    const nameNode = node.childForFieldName('name');
    const bodyNode = node.childForFieldName('body');
    if (!nameNode || !bodyNode)
        return '';
    const members = [];
    for (const e of bodyNode.namedChildren) {
        if (e.type !== SyntaxType.Enumerator)
            continue;
        const eName = e.childForFieldName('left')?.text;
        const eValue = e.childForFieldName('right');
        if (!eName)
            continue;
        members.push(eValue ? `${eName} = ${eValue.text}` : eName);
    }
    return `export enum ${nameNode.text} { ${members.join(', ')} }`;
}
// ─── File-scope `class` lift (GD inner class → TS inner class) ───
//
// A GD inner class becomes a TS file-scope `export class X { ... }`.
// Lifted-namespace members (`const`, named enums, nested inner
// classes) emit ABOVE the class as a paired
// `export namespace X { ... }` — TS's native declaration merging then
// gives `X.Y` access at any depth.
//
// When a GD class has no explicit `extends`, the output uses
// `extends RefCounted` — Godot's implicit base. Surfacing it
// explicitly keeps the generated `.d.ts` typings accurate (otherwise
// consumers would lose access to `RefCounted`'s methods).
export function emitFileScopeClass(node, ctx, isAbstractFromParent = false) {
    const className = node.childForFieldName('name')?.text ?? 'InnerClass';
    const annotations = getAnnotations(node);
    const isAbstract = isAbstractFromParent || annotations.some((ann) => ann.text === '@abstract');
    const bodyNode = node.childForFieldName('body');
    const bodyStatements = bodyNode?.namedChildren ?? [];
    // Extract explicit `extends ...` (if any). GD inner classes can't
    // have `class_name`, so we only look for ExtendsStatement.
    let extendsClass = '';
    for (const child of node.namedChildren) {
        if (child.type === SyntaxType.ExtendsStatement) {
            const typeNode = child.namedChildren[0];
            if (typeNode) {
                extendsClass =
                    typeNode.type === SyntaxType.Type
                        ? (typeNode.namedChildren[0]?.text ?? typeNode.text)
                        : typeNode.text;
            }
        }
    }
    // Build the class's scope from its body. Scope is immutable
    // afterward — any mutation (e.g. adding inherited members) happens
    // BEFORE `withClassScope` installs it. Pairs with the `try/finally`
    // inside `withClassScope` so exceptions during body emission can't
    // leak scope state into sibling classes.
    const scope = buildClassScope(className, bodyStatements, ctx);
    if (extendsClass) {
        const inherited = resolveAllInheritedMembers(extendsClass, ctx.userClasses, ctx.registry);
        for (const name of inherited)
            scope.classMembers.add(name);
    }
    const { memberLines, namespaceLines } = withClassScope(ctx, scope, () => emitInnerClassBody(bodyStatements, ctx));
    // Inner classes with no explicit `extends` default to `RefCounted`
    // in Godot — surface that explicitly in TS so the generated typings
    // carry the correct base-class member set.
    const resolvedExtends = extendsClass || 'RefCounted';
    const extendsClause = ` extends ${formatExtendsForTs(resolvedExtends)}`;
    const abstractKeyword = isAbstract ? 'abstract ' : '';
    const body = memberLines.join('\n').replace(/\n+$/, '');
    const classDecl = body.length === 0
        ? `export ${abstractKeyword}class ${className}${extendsClause} {}`
        : `export ${abstractKeyword}class ${className}${extendsClause} {\n${body}\n}`;
    // If anything lifted into the namespace, emit it ABOVE the class.
    // The TS namespace+class pattern merges declarations — namespace
    // members appear as static members of the class.
    if (namespaceLines.length === 0)
        return classDecl;
    const ns = `export namespace ${className} {\n${namespaceLines.join('\n')}\n}`;
    return `${ns}\n${classDecl}`;
}
/**
 * Walk an inner class's body and split emissions into:
 *   - `memberLines`: vars / methods / signals / constructors /
 *     anonymous enums — stay INSIDE the emitted `class X { ... }`.
 *   - `namespaceLines`: consts / named enums / nested inner classes
 *     — lift OUT into the paired `export namespace X { ... }` block.
 *
 * Must be called inside `withClassScope(ctx, scope, ...)` so
 * `ctx.classMembers` / `ctx.staticMembers` / etc. point at THIS
 * class's scope during emission.
 */
function emitInnerClassBody(statements, ctx) {
    const memberLines = [];
    const namespaceLines = [];
    for (const child of statements) {
        if (child.type === SyntaxType.FunctionDefinition) {
            memberLines.push(emitFunction(child, ctx));
        }
        else if (child.type === SyntaxType.ConstructorDefinition) {
            memberLines.push(emitConstructor(child, ctx));
        }
        else if (child.type === SyntaxType.VariableStatement ||
            child.type === SyntaxType.ExportVariableStatement) {
            memberLines.push(emitClassVariable(child, ctx));
        }
        else if (child.type === SyntaxType.EnumDefinition) {
            // Named enums lift; anonymous ones stay as static constants
            // inside the inner class (no clean namespace form).
            const named = child.childForFieldName('name') !== null;
            if (named) {
                namespaceLines.push(`  ${emitFileScopeEnum(child, ctx)}`);
            }
            else {
                memberLines.push(emitEnum(child, ctx));
            }
        }
        else if (child.type === SyntaxType.ConstStatement) {
            namespaceLines.push(`  ${emitFileScopeConst(child, ctx)}`);
        }
        else if (child.type === SyntaxType.ClassDefinition) {
            // Inner-of-inner class — recursive lift. The recursive call
            // returns either an `export class` line OR an
            // `export namespace ... + export class` pair; indent by 2
            // to slot it into the enclosing namespace block.
            const nested = emitFileScopeClass(child, ctx);
            const indented = nested
                .split('\n')
                .map((l) => (l ? `  ${l}` : l))
                .join('\n');
            namespaceLines.push(indented);
        }
    }
    return { memberLines, namespaceLines };
}
//# sourceMappingURL=file-scope-emitter.js.map