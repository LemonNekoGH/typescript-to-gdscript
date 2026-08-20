import ts from 'typescript';
import { processImports } from "./imports.js";
import { GDScriptEmitter } from "./emitter.js";
import { emitClassHeader, emitClassMembers } from "./class-body.js";
import { collectLiftedNames, emitFileScopeNamespace } from "./file-scope.js";
import { emitParameters as emitParametersImpl } from "./parameters.js";
import { visitBlock as visitBlockImpl, visitStatement as visitStatementImpl, visitVariableStatement as visitVariableStatementImpl, } from "./statements.js";
import { emitExpression as emitExpressionImpl, emitStringLiteral as emitStringLiteralImpl, escapeGdString as escapeGdStringImpl, isBlockLambda as isBlockLambdaImpl, emitLambdaBody as emitLambdaBodyImpl, emitMultiLineDict as emitMultiLineDictImpl, checkExplicitPromiseTypes, } from "./expressions.js";
/**
 * Transforms a TypeScript AST into GDScript code.
 *
 * The class acts as the orchestrator: it owns the emitter and
 * context, implements `TransformerDelegate`, and dispatches each
 * top-level statement to the appropriate module emitter.
 *
 * Major responsibilities split across modules:
 *   - `class-body.ts`   — `emitClassHeader` + `emitClassMembers`
 *   - `file-scope.ts`   — `emitFileScopeNamespace` + the four
 *                          lifting emitters (const / enum / class /
 *                          namespace body) + `collectLiftedNames`
 *   - `class-members.ts` — per-member emitters (signal / enum /
 *                          property / method / ctor / accessor)
 *   - `expressions.ts` / `statements.ts` / `parameters.ts` —
 *                          expression, statement, and parameter emitters
 */
export class TsToGdTransformer {
    ctx;
    emitter;
    opts;
    _currentClassName = '';
    /**
     * Name of the property whose get/set accessor body is currently being
     * emitted. Inside the body, `this.<accessorName>` is stripped to a bare
     * identifier to reference the GDScript backing field (emitting `self.X`
     * inside `get X`/`set X` would cause infinite recursion in GDScript).
     */
    _currentAccessorName = null;
    /**
     * Local-name → import entry, populated once at the start of
     * `transform()` and reused across `emitClassHeader` (extends
     * rewrite) and field-conflict checks. Empty when the file has no
     * preload-worthy imports — see `processImports` for the inclusion
     * rules.
     */
    _importMap = new Map();
    /**
     * Pre-rendered `const X = preload("res://…")` lines emitted between
     * `class_name` and the class body. Order preserved from source.
     */
    _importConsts = [];
    /**
     * Names that lift into the script class body — file-scope `const`,
     * `enum`, `class`, and the same names re-exposed via a paired
     * `namespace`. Class fields/methods that collide with any of these
     * trigger a hard error during `emitClassHeader`. Populated once
     * per file in `visitSourceFile` before any emission begins so the
     * collision check can run before the first body line is written.
     */
    _liftedNames = new Set();
    get currentClassName() {
        return this._currentClassName;
    }
    get currentAccessorName() {
        return this._currentAccessorName;
    }
    setCurrentAccessorName(name) {
        this._currentAccessorName = name;
    }
    constructor(ctx, opts) {
        this.ctx = ctx;
        this.opts = opts;
        const gdFilePath = ctx.filePath.replace(/\.ts$/, '.gd');
        this.emitter = new GDScriptEmitter(ctx.filePath, gdFilePath, opts.sourceMap);
    }
    transform() {
        if (this.opts.sourceMap) {
            this.emitter.setSourceContent(this.ctx.sourceFile.getFullText());
        }
        // Build the import map BEFORE visiting any statements so the
        // class-emit path can consult it for `extends`-rewrites and the
        // member-emit path can flag field-name conflicts.
        const imports = processImports(this.ctx.sourceFile, this.ctx);
        this._importMap = imports.importMap;
        this._importConsts = imports.consts;
        for (const err of imports.errors) {
            this.ctx.diagnostics.push(err);
        }
        // Whole-file type-annotation checks that need to see every user
        // type reference — runs once, before emission, so the diagnostics
        // list is populated irrespective of which statements actually
        // reach the emitter.
        checkExplicitPromiseTypes(this);
        this.visitSourceFile(this.ctx.sourceFile);
        return {
            code: this.emitter.getOutput(),
            sourceMap: this.emitter.getSourceMap(),
            diagnostics: this.ctx.diagnostics,
        };
    }
    // ---- TransformerDelegate: delegated to modules ----
    emitExpression(node) {
        return emitExpressionImpl(this, node);
    }
    visitStatement(node) {
        visitStatementImpl(this, node);
    }
    visitBlock(block) {
        visitBlockImpl(this, block);
    }
    visitVariableStatement(node) {
        visitVariableStatementImpl(this, node);
    }
    emitParameters(params) {
        return emitParametersImpl(this, params);
    }
    emitLeadingComments(node) {
        const sourceText = this.ctx.sourceFile.getFullText();
        const ranges = ts.getLeadingCommentRanges(sourceText, node.getFullStart());
        if (!ranges)
            return;
        for (const range of ranges) {
            const commentText = sourceText.slice(range.pos, range.end);
            const { line, character } = this.ctx.sourceFile.getLineAndCharacterOfPosition(range.pos);
            const origLine = line + 1;
            const origCol = character;
            if (range.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
                const content = commentText.replace(/^\/\/\s?/, '');
                // @gd.eval: magic comment -> emit raw GDScript
                // Spaces after @gd.eval: are ignored, but tabs are preserved as indentation
                const gdEvalMatch = content.match(/^\s*@gd\.eval: *(.*)/);
                if (gdEvalMatch) {
                    this.emitter.writeLine(gdEvalMatch[1], origLine, origCol);
                }
                else {
                    // // comment -> # comment
                    this.emitter.writeLine(`# ${content}`, origLine, origCol);
                }
            }
            else if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                if (commentText.startsWith('/**')) {
                    // /** comment */ -> ## comment (doc comment)
                    const content = commentText
                        .replace(/^\/\*\*\s*/, '')
                        .replace(/\s*\*\/$/, '')
                        .replace(/^\s*\*\s?/gm, '')
                        .trim();
                    this.emitter.writeLine(`## ${content}`, origLine, origCol);
                }
                else {
                    // /* comment */ -> """comment""" (block comment)
                    const content = commentText
                        .replace(/^\/\*\s?/, '')
                        .replace(/\s?\*\/$/, '');
                    if (!content.includes('\n')) {
                        // Single-line block comment
                        this.emitter.writeLine(`"""${content.trim()}"""`, origLine, origCol);
                    }
                    else {
                        // Multiline block comment -- strip indent matching the comment's own column
                        const rawLines = content.split('\n');
                        const nonEmpty = rawLines.filter((l) => l.trim() !== '');
                        // Strip indent equal to the comment's own column position
                        const stripAmount = character;
                        this.emitter.writeLine(`"""`, origLine, origCol);
                        for (const ln of nonEmpty) {
                            // Strip up to stripAmount leading spaces/tabs
                            let stripped = ln;
                            let count = 0;
                            while (count < stripAmount &&
                                stripped.length > 0 &&
                                (stripped[0] === ' ' || stripped[0] === '\t')) {
                                stripped = stripped.slice(1);
                                count++;
                            }
                            this.emitter.writeLine(stripped.trimEnd(), origLine, origCol);
                        }
                        this.emitter.writeLine(`"""`, origLine, origCol);
                    }
                }
            }
        }
    }
    emitStringLiteral(node) {
        return emitStringLiteralImpl(this, node);
    }
    escapeGdString(text) {
        return escapeGdStringImpl(text);
    }
    isBlockLambda(node) {
        return isBlockLambdaImpl(node);
    }
    emitLambdaBody(node) {
        emitLambdaBodyImpl(this, node);
    }
    addDiagnostic(node, severity, message) {
        const { line, col } = this.getLineAndCol(node);
        // `col` is 0-based (source-map-native — the emitter below feeds
        // it into a source-map entry as-is). `TransformDiagnostic.column`
        // is 1-based per its documented convention (matches the CLI's
        // `line:col` display and what IDEs/editors expect). Add 1 on
        // the way into the diagnostic, leaving the source-map write
        // below untouched.
        this.ctx.diagnostics.push({
            message,
            severity,
            file: this.ctx.filePath,
            line,
            column: col + 1,
        });
        // Emit inline error comment in output for --emit-on-error visibility
        if (severity === 'error') {
            this.emitter.writeLine(`# ERROR: ${message}`, line, col);
        }
    }
    getLineAndCol(node) {
        const { line, character } = this.ctx.sourceFile.getLineAndCharacterOfPosition(node.getStart(this.ctx.sourceFile));
        // `line` is 1-based to match `TransformDiagnostic`'s line
        // convention and the GDScriptEmitter's line numbering; `col`
        // stays 0-based because the source-map spec is 0-based and the
        // emitter feeds this directly into source-map entries.
        // `addDiagnostic` does the `+1` when lifting to a diagnostic
        // (whose `column` IS 1-based — see `TransformDiagnostic` in
        // `common/index.ts`).
        return { line: line + 1, col: character };
    }
    isGdHelperCall(node, methodName) {
        if (!ts.isCallExpression(node))
            return false;
        if (!ts.isPropertyAccessExpression(node.expression))
            return false;
        const obj = node.expression.expression;
        return (ts.isIdentifier(obj) &&
            obj.text === 'gd' &&
            node.expression.name.text === methodName);
    }
    emitMultiLineDict(entries) {
        return emitMultiLineDictImpl(this, entries);
    }
    // ---- Source File ----
    //
    // Conversion model: the GDScript file IS the script class. The file's
    // header (`extends`, `class_name`, import-driven `const … = preload(…)`
    // lines) gets emitted once at the very top of the GD output —
    // regardless of where the user's `class Foo {}` appears in the TS
    // source. Then we walk the file's top-level statements in source
    // order, dispatching each to the right emitter; the script class
    // statement triggers a walk of its body members.
    //
    // File-scope statements OUTSIDE an `export namespace Foo { ... }`
    // block error with a migration-guidance message — users expressing
    // class-level consts / enums / inner classes must wrap them in the
    // script-class-paired namespace. Inside the namespace, the
    // `file-scope.ts` emitters take over.
    visitSourceFile(sf) {
        // Identify the script class — it's the single `export class` in
        // the file. Non-exported file-scope classes are inner-class lifts
        // (handled inside the namespace dispatch in `file-scope.ts`), not
        // duplicate script-class candidates.
        const classDecls = sf.statements.filter(ts.isClassDeclaration);
        const exportedClasses = classDecls.filter((c) => c.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword));
        if (exportedClasses.length > 1) {
            for (const cls of exportedClasses.slice(1)) {
                this.addDiagnostic(cls, 'error', 'Only one `export class` is allowed per file (it becomes the script class). Other file-scope classes must NOT be exported — they lift into the script class as inner classes.');
            }
        }
        const scriptClass = exportedClasses[0];
        if (!scriptClass) {
            // No exported class — nothing to convert. The file may only
            // re-export types/interfaces, or it may genuinely be empty.
            // We don't error here because some files (e.g. type-only modules)
            // are intentionally class-less; the typings layer flags missing
            // script classes when they're actually consumed.
            return;
        }
        // Pre-walk: collect every name that lifts into the script class
        // body (file-scope const/enum/class + direct namespace exports).
        // Used by `emitClassHeader` to flag any class field/method whose
        // name collides with one of these.
        this._liftedNames = collectLiftedNames(sf, scriptClass);
        // Leading comments on the script class — e.g. `@gd.eval: @tool`
        // magic comments — must surface BEFORE the header (`@tool`
        // precedes `extends`/`class_name` in idiomatic GDScript). Emitted
        // once here; `emitClassMembers` does NOT re-emit them.
        this.emitLeadingComments(scriptClass);
        // Emit the class header up front. Imports were processed in
        // `transform()` and surface here as `_importConsts` lines. The
        // header emitter returns the resolved class name so we can
        // update `_currentClassName` — downstream type lookups
        // (`Foo.X` qualifier resolution) read it off the delegate.
        this._currentClassName = emitClassHeader(scriptClass, this, {
            importMap: this._importMap,
            liftedNames: this._liftedNames,
            importConsts: this._importConsts,
        });
        // Top-down dispatch over file statements. The script class
        // statement triggers body emission; file-scope lifts inside the
        // script-class-paired namespace flow through `emitFileScopeNamespace`.
        for (const statement of sf.statements) {
            if (ts.isImportDeclaration(statement))
                continue;
            if (ts.isTypeAliasDeclaration(statement) ||
                ts.isInterfaceDeclaration(statement)) {
                continue;
            }
            if (ts.isExportDeclaration(statement) ||
                ts.isExportAssignment(statement)) {
                continue;
            }
            if (ts.isClassDeclaration(statement)) {
                if (statement === scriptClass) {
                    emitClassMembers(statement, this);
                }
                else {
                    // File-scope (non-script) classes are no longer supported
                    // outside a namespace. Wrap them in an
                    // `export namespace ScriptClass { ... }` block so the
                    // member dispatch lifts them as GDScript inner classes.
                    const name = statement.name?.text ?? '<anonymous>';
                    this.addDiagnostic(statement, 'error', `File-scope class '${name}' is not supported. Move it inside an \`export namespace ${scriptClass.name?.text ?? 'ScriptClass'} { ... }\` block — its members will lift into the GDScript script class as an inner class.`);
                }
                continue;
            }
            if (ts.isVariableStatement(statement)) {
                const declNames = statement.declarationList.declarations
                    .map((d) => (d.name && ts.isIdentifier(d.name) ? d.name.text : '?'))
                    .join(', ');
                this.addDiagnostic(statement, 'error', `File-scope \`const\`/\`let\`/\`var\` (${declNames}) is not supported. Move it inside an \`export namespace ${scriptClass.name?.text ?? 'ScriptClass'} { export const ... }\` block to lift into the GDScript script class as a class const.`);
                continue;
            }
            if (ts.isEnumDeclaration(statement)) {
                this.addDiagnostic(statement, 'error', `File-scope \`enum ${statement.name.text}\` is not supported. Move it inside an \`export namespace ${scriptClass.name?.text ?? 'ScriptClass'} { export enum ${statement.name.text} { ... } }\` block to lift into the GDScript script class as an enum.`);
                continue;
            }
            if (ts.isModuleDeclaration(statement)) {
                // TS namespace at file scope. Must pair with the script class
                // by name — its members lift into the script class body.
                emitFileScopeNamespace(statement, scriptClass, this, this._importMap);
                continue;
            }
            this.addDiagnostic(statement, 'error', `Top-level statement outside class is not supported: ${ts.SyntaxKind[statement.kind]}`);
        }
    }
}
//# sourceMappingURL=transformer.js.map