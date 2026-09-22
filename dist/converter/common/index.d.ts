import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import type { ResolvedExternalPackage } from '../../external-packages/index.ts';
/**
 * Pre-derived lookup sets for `in`-operator diagnostics and variant/class type
 * checks. Built once per converter run from the Godot class registry.
 */
export interface DiagnosticsTypeInfo {
    /** All variant/value type constructors (Vector2, Color, Packed*Array, Dictionary, ...). */
    constructors: Set<string>;
    /** Subset of {@link constructors} whose names match `Packed*Array`. */
    packedArrayTypes: Set<string>;
    /** Constructors banned from `in` RHS (excludes allowed containers and packed arrays). */
    bannedInTypes: Set<string>;
}
/**
 * Context passed through the transformation pipeline.
 */
export interface TransformContext {
    /** TypeScript program */
    program: ts.Program;
    /** TypeScript type checker */
    checker: ts.TypeChecker;
    /** Current source file being transformed */
    sourceFile: ts.SourceFile;
    /** File path of the source */
    filePath: string;
    /** Diagnostics / warnings collected during transformation */
    diagnostics: TransformDiagnostic[];
    /** Pre-derived sets of Godot variant types (for `in`-operator and param diagnostics). */
    diagInfo: DiagnosticsTypeInfo;
    /**
     * TypeScript source root. Used by import-resolution code to mirror
     * relative paths into the GDScript output tree.
     */
    tsDir: string;
    /** GDScript output root — sibling of {@link tsDir}. */
    gdDir: string;
    /**
     * Godot project root. `res://` paths emitted by `preload(...)` and
     * `extends "res://..."` are taken relative to this directory.
     */
    projectRoot: string;
    /** Emit package-internal imports as relative paths. */
    lib: boolean;
    /** Shared packages mounted below projectRoot/tstogd_modules. */
    externalPackages: ResolvedExternalPackage[];
    /**
     * Godot class registry. Used to recognise Godot built-in types (classes,
     * value-type constructors, global enums) by name when classifying TS type
     * annotations — see {@link tsTypeNodeToGdType}. May be `undefined` when the
     * registry could not be resolved, in which case classification can only
     * emit types it proves are classes/enums via the checker and drops every
     * other name (Godot built-ins can no longer be recognised by name).
     */
    registry?: GodotClassRegistry;
}
/**
 * Sentinel TS class name used for anonymous addon scripts (a `.gd`
 * file under `addons/` with no `class_name` declaration). `$` is not
 * a valid GDScript identifier character, so this name can never
 * collide with a real GD class. Each addon `.ts` is its own ES
 * module, so multiple files exporting `_$CLASS$_` don't collide
 * either — consumers of the addon's `.gd.d.ts` see the class via the
 * `import type { _$CLASS$_ as ScriptClass }` alias.
 *
 * Non-addon anonymous classes use {@link gdFilenameToAnonymousClassName}
 * instead — the filename-derived form is friendlier when users actually
 * read the generated TS source. Addons are auto-generated and read
 * mostly through their `.gd.d.ts` shadows, so the sentinel is fine.
 */
export declare const ANONYMOUS_ADDON_CLASS_NAME = "_$CLASS$_";
/**
 * Derive the TS class name for a `.gd` file that has no `class_name`
 * declaration. The convention: the leading underscore marks the class as
 * "module-scoped / anonymous in GD", and the body is the file's basename
 * converted to UpperCamelCase. Same on both conversion directions, so
 * round-tripping is stable.
 *
 * Examples:
 *   - `some_class.gd`  → `_SomeClass`
 *   - `Anonym.gd`      → `_Anonym`
 *   - `enemy.gd`       → `_Enemy`
 *   - `nested/foo.gd`  → `_Foo`  (path is ignored — only basename matters)
 */
export declare function gdFilenameToAnonymousClassName(filePath: string): string;
/**
 * True when a class name follows the "anonymous" convention — single
 * leading underscore that is NOT the `G_` global-class escape. Used
 * everywhere we need to decide whether to emit `class_name` (in TS→GD)
 * or `declare global` (in typings generation).
 */
export declare function isAnonymousClassName(name: string): boolean;
/**
 * One-way fallback applied during GD→TS conversion only: a GD
 * `class_name _Foo` would collide with the anonymous-class convention
 * (where `_`-prefixed TS names mean "no `class_name` in GD"), so the
 * TS shadow class is renamed to `G_Foo`. The TS→GD direction does NOT
 * un-escape — `G_Foo` in TS source emits `class_name G_Foo` in the
 * generated `.gd` verbatim. The escape happens at most once, when
 * generating addon shadows or running `initial-convert-gd-to-ts`; afterwards `G_Foo`
 * is the canonical identifier on both sides.
 */
export declare function escapeUnderscoreClassName(gdClassName: string): string;
/**
 * Diagnostic severity levels.
 *
 * - `error` — conversion failure (invalid/unsupported syntax). Blocks .gd
 *   output (unless `--emit-on-error`). Blocks Godot validation.
 * - `type-error` — semantic/type issue, but GD emission produced valid output.
 *   .gd IS written. Counted as an error by `convert`/`watch` and the ts-plugin.
 *   Godot validation still runs.
 * - `warning` — non-blocking advisory. Shown as WARN everywhere.
 * - `info` — debug-level; filtered out in most consumers.
 */
export type DiagnosticSeverity = 'error' | 'type-error' | 'warning' | 'info';
export interface TransformDiagnostic {
    message: string;
    severity: DiagnosticSeverity;
    file: string;
    /** 1-based line number (matches editor/CLI `line:col` convention). */
    line: number;
    /**
     * 1-based column number. Producers that obtain a 0-based character
     * index (TypeScript `getLineAndCharacterOfPosition`, tree-sitter
     * `startPosition.column`) MUST add `+1` before storing here.
     * Consumers that need a 0-based offset (e.g. TypeScript
     * `getPositionOfLineAndCharacter` in the ts-plugin) subtract `1`
     * on the way out.
     */
    column: number;
}
/**
 * True for severities that should surface as lint / ts-plugin errors (exit code 1 for CLI lint, red squiggle in the IDE).
 * Both `error` and `type-error` are user-facing errors; only `error` blocks
 * emission/Godot validation. Use {@link isConversionErrorSeverity} for that.
 */
export declare function isReportableErrorSeverity(sev: DiagnosticSeverity): boolean;
/**
 * True only for real conversion errors — the converter could not emit valid
 * GDScript. These block `.gd` write (unless `--emit-on-error`) AND block
 * Godot validation (unless `--godot-validate-on-error`).
 */
export declare function isConversionErrorSeverity(sev: DiagnosticSeverity): boolean;
export interface TransformResult {
    /** Generated GDScript code */
    code: string;
    /** Source map JSON (if generated) */
    sourceMap?: string;
    /** Diagnostics from transformation */
    diagnostics: TransformDiagnostic[];
}
/**
 * Checks if a TypeScript type is the `int` alias.
 */
export declare function isIntType(type: ts.Type, checker: ts.TypeChecker): boolean;
/**
 * Checks if a TypeScript type is the `float` alias.
 */
export declare function isFloatType(type: ts.Type, checker: ts.TypeChecker): boolean;
/**
 * Converts a TypeScript type to its GDScript type annotation string.
 * Returns null if the type should be omitted.
 *
 * NOTE: unlike {@link tsTypeNodeToGdType}, this `ts.Type`-based variant does
 * NOT classify reference types — it returns the symbol name verbatim for any
 * class-like type, so an `object`/`interface`/unknown type would leak a bogus
 * annotation. It is currently unused for emission (kept only for its own
 * recursion). Do not wire it into an emit path without adding the same
 * class/enum/registry classification `classifyTypeReferenceName` applies.
 */
export declare function tsTypeToGdType(type: ts.Type, checker: ts.TypeChecker): string | null;
/**
 * Converts a TypeScript type annotation node to GDScript type string.
 */
export declare function tsTypeNodeToGdType(typeNode: ts.TypeNode | undefined, checker: ts.TypeChecker, sourceFile: ts.SourceFile, className?: string, registry?: GodotClassRegistry): string | null;
/**
 * True when `gdType` refers to a Godot class (Node, Resource, Material, user
 * class, ...) — a type that can legitimately hold `null` in GDScript. False
 * for primitives (int, float, bool, String), variant/value types (Vector2,
 * Color, Packed*Array, Dictionary, Callable, Signal, StringName, NodePath, ...),
 * typed array/dictionary syntax, enum references, and special markers
 * (`void`, `Nil`, `Variant`, `any`, `unknown`).
 *
 * Reference types are candidates for `T | null` widening in the GD-to-TS
 * converter. Value types are not — Godot does not permit assigning null to
 * them.
 */
export declare function isReferenceType(gdType: string, registry: GodotClassRegistry): boolean;
//# sourceMappingURL=index.d.ts.map