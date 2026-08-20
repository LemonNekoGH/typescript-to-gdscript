import ts from 'typescript';
export interface ModulePathOptions {
    tsDir: string;
    gdDir: string;
    projectRoot: string;
}
/** True when an import has at least one runtime binding. */
export declare function hasRuntimeImport(stmt: ts.ImportDeclaration): boolean;
/** Resolve an import through the compiler options of the active TS program. */
export declare function resolveImportSource(specifier: string, sourceFile: ts.SourceFile, program: ts.Program): string | undefined;
/**
 * Collect every source module reached by value imports from the given entry
 * files. Type-only imports never enter the runtime graph.
 */
export declare function collectRuntimeModules(entryFiles: readonly string[], program: ts.Program): string[];
/**
 * Return the generated `.gd` destination for a source file. Project files
 * retain the normal tsDir → gdDir mirror; package sources are staged inside
 * the Godot project so generated `preload("res://…")` paths are valid.
 */
export declare function gdOutputPath(sourcePath: string, options: ModulePathOptions): string;
/**
 * Return the generated `.gd` destination for a module reached through an
 * import. Sources belonging to another package are staged in the Godot
 * project; local project sources retain the normal tsDir → gdDir mirror.
 */
export declare function gdImportOutputPath(sourcePath: string, options: ModulePathOptions): string | undefined;
/** Convert a generated output path into a Godot resource path. */
export declare function gdResourcePath(sourcePath: string, options: ModulePathOptions): string | undefined;
//# sourceMappingURL=modules.d.ts.map