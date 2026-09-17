/**
 * TS→GD import processing.
 *
 * Translates `import { … } from '…'` statements at the top of a TS source
 * file into the GDScript output, following the project's anonymous-class
 * convention:
 *
 *   - Non-anonymous (regular `class_name X`) class, no rename →
 *     skip emission. The class is globally available in GD by virtue of
 *     `class_name`; no `const` alias needed.
 *
 *   - Non-anonymous, renamed (`import { Foo as Bar }`) →
 *     `const Bar = preload("res://path/to/Foo.gd")` so the local TS
 *     identifier resolves to the same script in GD.
 *
 *   - Anonymous (`_FilenameClass` — see `gdFilenameToAnonymousClassName`)
 *     class, with or without rename →
 *     `const <local> = preload("res://path/to/file.gd")`. Anonymous
 *     classes have no `class_name`, so a `const` alias is the only way
 *     to refer to them at all.
 *
 *   - `import X from '…'` (default) and `import * as X from '…'`
 *     (namespace) → hard error. GDScript has no equivalent.
 *
 *   - `import type { … }` and per-binding `import { type X }` →
 *     skip silently (TS-only, erased at runtime).
 *
 * The collected `consts` list is emitted by the transformer right after
 * `class_name`/`extends`. The `importMap` is consulted later for the
 * `extends "res://…"` rewrite (when extending an anonymous class) and
 * for field-name conflict detection.
 */
import ts from 'typescript';
import { realpathSync } from 'fs';
import { dirname, isAbsolute, relative, resolve } from 'path';
import { TSTOGD_MODULES_DIR } from "../../external-packages/index.js";
import { isAnonymousClassName, } from "../common/index.js";
export function processImports(sourceFile, ctx) {
    const consts = [];
    const importMap = new Map();
    const errors = [];
    for (const stmt of sourceFile.statements) {
        if (!ts.isImportDeclaration(stmt))
            continue;
        // Whole-import `import type { … }` is TS-only — drop entirely.
        if (stmt.importClause?.isTypeOnly)
            continue;
        const clause = stmt.importClause;
        if (!clause) {
            // `import "./side-effect"` — no bindings, nothing to translate.
            continue;
        }
        // Default import: `import X from '…'` — unsupported.
        if (clause.name) {
            errors.push(diagOf(ctx, clause.name, `Default imports are not supported in TS→GD (no GDScript equivalent). Use \`import { X } from '...'\` instead.`));
            // Continue processing named bindings on the same statement, if any.
        }
        // Namespace import: `import * as X from '…'` — unsupported.
        if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
            errors.push(diagOf(ctx, clause.namedBindings, `Namespace imports (\`import * as X\`) are not supported in TS→GD (GDScript has no module namespace).`));
            continue;
        }
        if (!clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) {
            continue;
        }
        const pathImports = clause.namedBindings.elements.filter((element) => {
            if (element.isTypeOnly)
                return false;
            const importedName = element.propertyName?.text ?? element.name.text;
            return (isAnonymousClassName(importedName) || element.propertyName !== undefined);
        });
        if (pathImports.length === 0)
            continue;
        // Resolve the import specifier to an absolute `.ts` path.
        const specifier = stmt.moduleSpecifier;
        if (!ts.isStringLiteral(specifier))
            continue;
        const targetTsPath = resolveImportToTsPath(specifier.text, sourceFile, ctx.program);
        if (!targetTsPath) {
            errors.push(diagOf(ctx, specifier, `Runtime import ${JSON.stringify(specifier.text)} must resolve to a TypeScript source file.`));
            continue;
        }
        // Compute the corresponding `.gd` path and `res://` form.
        const resPath = computeImportPath(targetTsPath, ctx);
        if (!resPath) {
            errors.push(diagOf(ctx, specifier, `Runtime import ${JSON.stringify(specifier.text)} is outside tsDir and is not a linked tstogd library.`));
            continue;
        }
        for (const element of pathImports) {
            // `localName` is what the rest of the TS source uses; `importedName`
            // is what the target module exports (== localName when no `as`).
            const localName = element.name.text;
            const importedName = element.propertyName?.text ?? localName;
            const isAnonymous = isAnonymousClassName(importedName);
            consts.push(`const ${localName} = preload("${resPath}")`);
            importMap.set(localName, {
                importedName,
                isAnonymous,
                resPath,
                node: element,
            });
        }
    }
    return { consts, importMap, errors };
}
// ─── Path helpers ───────────────────────────────────────────────
/**
 * Resolve an import with the active TypeScript program and compiler options.
 */
function resolveImportToTsPath(specifier, sourceFile, program) {
    const resolved = ts.resolveModuleName(specifier, sourceFile.fileName, program.getCompilerOptions(), ts.sys).resolvedModule;
    if (!resolved)
        return undefined;
    const path = resolve(resolved.resolvedFileName);
    if (!path.endsWith('.ts') || path.endsWith('.d.ts'))
        return undefined;
    return path;
}
/**
 * Convert an absolute `.ts` path into a `res://`-prefixed forward-slash
 * path pointing at the corresponding `.gd` file. Path mirrors the
 * relative tree from {@link TransformContext.tsDir} to
 * {@link TransformContext.gdDir} and is then taken relative to
 * {@link TransformContext.projectRoot}.
 *
 * When `tsDir`/`gdDir` are the same directory, this collapses to a
 * trivial `.ts` → `.gd` extension swap.
 */
function computeImportPath(targetTsPath, ctx) {
    const projectRelative = relative(ctx.tsDir, targetTsPath);
    if (!isOutside(projectRelative)) {
        const targetGdPath = resolve(ctx.gdDir, toGdPath(projectRelative));
        if (ctx.lib) {
            const sourceRelative = relative(ctx.tsDir, ctx.filePath);
            const sourceGdPath = resolve(ctx.gdDir, toGdPath(sourceRelative));
            return toRelativeGdPath(dirname(sourceGdPath), targetGdPath);
        }
        return toResPath(ctx.projectRoot, targetGdPath);
    }
    const realTargetTsPath = realpathSync(targetTsPath);
    for (const pkg of ctx.externalPackages) {
        const packageRelative = relative(pkg.tsDir, realTargetTsPath);
        if (isOutside(packageRelative))
            continue;
        const targetGdPath = resolve(pkg.gdDir, toGdPath(packageRelative));
        const pathInPackage = relative(pkg.rootDir, targetGdPath);
        if (isOutside(pathInPackage))
            return undefined;
        return `res://${[TSTOGD_MODULES_DIR, pkg.mountName, pathInPackage]
            .join('/')
            .replace(/\\/g, '/')}`;
    }
    return undefined;
}
function toGdPath(path) {
    return path.replace(/\.ts$/, '.gd');
}
function toResPath(projectRoot, gdPath) {
    const pathFromProject = relative(projectRoot, gdPath);
    if (isOutside(pathFromProject))
        return undefined;
    return `res://${pathFromProject.replace(/\\/g, '/')}`;
}
function toRelativeGdPath(fromDir, gdPath) {
    const path = relative(fromDir, gdPath).replace(/\\/g, '/');
    return path.startsWith('.') ? path : `./${path}`;
}
function isOutside(pathFromRoot) {
    return (isAbsolute(pathFromRoot) ||
        pathFromRoot === '..' ||
        pathFromRoot.startsWith('../') ||
        pathFromRoot.startsWith('..\\'));
}
// ─── Diagnostic helper ──────────────────────────────────────────
function diagOf(ctx, node, message) {
    const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(node.getStart(ctx.sourceFile));
    return {
        message,
        severity: 'error',
        file: ctx.filePath,
        line: line + 1,
        column: character + 1,
    };
}
//# sourceMappingURL=imports.js.map