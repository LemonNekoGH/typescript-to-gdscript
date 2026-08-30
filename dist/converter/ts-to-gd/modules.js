import { existsSync, readFileSync } from 'fs';
import { dirname, isAbsolute, join, relative, resolve } from 'path';
import ts from 'typescript';
const MODULES_DIR = '.tstogd_modules';
/** True when an import has at least one runtime binding. */
export function hasRuntimeImport(stmt) {
    const clause = stmt.importClause;
    if (!clause || clause.isTypeOnly)
        return false;
    if (clause.name)
        return true;
    if (!clause.namedBindings)
        return false;
    if (ts.isNamespaceImport(clause.namedBindings))
        return true;
    return clause.namedBindings.elements.some((element) => !element.isTypeOnly);
}
/** Resolve an import through the compiler options of the active TS program. */
export function resolveImportSource(specifier, sourceFile, program) {
    const resolved = ts.resolveModuleName(specifier, sourceFile.fileName, program.getCompilerOptions(), ts.sys).resolvedModule;
    if (!resolved || !isSourceFile(resolved.resolvedFileName))
        return undefined;
    return resolve(resolved.resolvedFileName);
}
/**
 * Collect every source module reached by value imports from the given entry
 * files. Type-only imports never enter the runtime graph.
 */
export function collectRuntimeModules(entryFiles, program) {
    const files = new Set();
    const pending = entryFiles.map((file) => resolve(file));
    while (pending.length > 0) {
        const filePath = pending.pop();
        if (files.has(filePath))
            continue;
        const sourceFile = program.getSourceFile(filePath);
        if (!sourceFile)
            continue;
        files.add(filePath);
        for (const stmt of sourceFile.statements) {
            if (!ts.isImportDeclaration(stmt) || !hasRuntimeImport(stmt))
                continue;
            if (!ts.isStringLiteral(stmt.moduleSpecifier))
                continue;
            const imported = resolveImportSource(stmt.moduleSpecifier.text, sourceFile, program);
            if (imported)
                pending.push(imported);
        }
    }
    return [...files];
}
/** Return the generated `.gd` destination for a project or package source. */
export function gdOutputPath(sourcePath, options) {
    const absoluteSource = resolve(sourcePath);
    const relativeSource = relative(options.tsDir, absoluteSource);
    if (!isOutside(relativeSource)) {
        return resolve(options.gdDir, toGdPath(relativeSource));
    }
    const pkg = findPackage(absoluteSource);
    if (!pkg)
        return undefined;
    const relativePackageSource = relative(pkg.root, absoluteSource);
    if (isOutside(relativePackageSource))
        return undefined;
    return resolve(options.projectRoot, MODULES_DIR, pkg.name, pkg.version, toGdPath(relativePackageSource));
}
/** Convert a generated output path into a Godot resource path. */
export function gdResourcePath(sourcePath, options) {
    const outputPath = gdOutputPath(sourcePath, options);
    if (!outputPath)
        return undefined;
    const pathFromProject = relative(options.projectRoot, outputPath);
    if (isOutside(pathFromProject))
        return undefined;
    return `res://${pathFromProject.replace(/\\/g, '/')}`;
}
function isSourceFile(filePath) {
    return filePath.endsWith('.ts') && !filePath.endsWith('.d.ts');
}
function toGdPath(filePath) {
    return filePath.replace(/\.ts$/, '.gd');
}
function isOutside(pathFromRoot) {
    return (isAbsolute(pathFromRoot) ||
        pathFromRoot === '..' ||
        pathFromRoot.startsWith('../') ||
        pathFromRoot.startsWith('..\\'));
}
function findPackage(sourcePath) {
    let dir = dirname(sourcePath);
    for (;;) {
        const manifestPath = join(dir, 'package.json');
        if (existsSync(manifestPath)) {
            const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
            if (typeof manifest.name !== 'string' ||
                typeof manifest.version !== 'string') {
                return undefined;
            }
            return { name: manifest.name, version: manifest.version, root: dir };
        }
        const parent = dirname(dir);
        if (parent === dir)
            return undefined;
        dir = parent;
    }
}
//# sourceMappingURL=modules.js.map