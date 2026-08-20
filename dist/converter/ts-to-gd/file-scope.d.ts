/**
 * File-scope declaration lifting for TS→GD conversion.
 *
 * The conversion model treats the `.ts` file as a GDScript script
 * class plus lifted file-scope declarations. TS users express class-
 * level consts / enums / inner classes via an explicit
 * `export namespace Foo { ... } export class Foo` pair — TypeScript's
 * native namespace+class merging makes `Foo.X` resolve cross-file
 * and `this.X` resolve on instance (matching GDScript's `self.X`).
 *
 * The namespace's members LIFT:
 *   - top-level (paired with the script class)    → GD top-level decls
 *   - nested (paired with a sibling inner class)  → inside that inner class's body
 *
 * The single shared walker `emitNamespaceBody` does the pairing —
 * both `emitFileScopeNamespace` (top-level) and `emitFileScopeClass`
 * (when given a `pairedNamespace`) call it, so the exact same
 * logic applies at every nesting depth.
 */
import ts from 'typescript';
import type { ImportEntry } from './imports.ts';
import type { TransformerDelegate } from './transformer-types.ts';
export declare function emitFileScopeVariable(node: ts.VariableStatement, t: TransformerDelegate, opts?: {
    leadingBlank?: boolean;
}): void;
export declare function emitFileScopeEnum(node: ts.EnumDeclaration, t: TransformerDelegate, opts?: {
    leadingBlank?: boolean;
}): void;
export declare function emitFileScopeClass(node: ts.ClassDeclaration, t: TransformerDelegate, importMap: Map<string, ImportEntry>, opts?: {
    leadingBlank?: boolean;
    /**
     * Flat list of statements from any namespace(s) paired with this
     * class by name. When the user writes multiple same-name namespace
     * blocks — which TypeScript merges natively — their statements are
     * concatenated in source order by `emitNamespaceBody` so all their
     * lifted members emit inside this class.
     */
    pairedStatements?: readonly ts.Statement[];
}): void;
export declare function emitFileScopeNamespace(node: ts.ModuleDeclaration, scriptClass: ts.ClassDeclaration, t: TransformerDelegate, importMap: Map<string, ImportEntry>): void;
export declare function collectLiftedNames(sf: ts.SourceFile, scriptClass: ts.ClassDeclaration): Set<string>;
//# sourceMappingURL=file-scope.d.ts.map