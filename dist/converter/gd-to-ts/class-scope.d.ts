/**
 * Per-class context for GD→TS emission.
 *
 * Every class (top-level script class OR inner class) has its own set
 * of member names, static classification, inferred types, and lifted
 * type names. Rather than mutating these fields on `GdToTsContext`
 * directly and manually save/restore-ing around inner class emission
 * — which accumulated bugs across iterations — we collect them once
 * into an immutable `ClassScope` and install it via `withClassScope`,
 * which guarantees restore-on-exit through `try/finally`.
 *
 * ## Building a scope
 *
 * `buildClassScope(className, statements, ctx)` walks a class body
 * (or the file root for the script class) ONCE and returns the
 * populated scope. Pure — no mutation beyond temporarily installing
 * the partial scope's `classMemberTypes` on `ctx` so
 * `inferExprType` value inferences during the walk can see
 * same-class members already collected.
 *
 * ## Entering a scope
 *
 * `withClassScope(ctx, scope, fn)` swaps the six per-class fields
 * onto `ctx`, runs `fn`, then restores — even if `fn` throws.
 * Function-scope state (`localVars`, `localVarTypes`) is always reset
 * fresh on entry since function-scope doesn't leak across class
 * boundaries.
 */
import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
export interface ClassScope {
    /** TS-side class name (already-escaped, e.g. `G_Foo` for a GD `_Foo`). */
    className: string;
    /** Known instance + static member names — drives `this.X` prefixing. */
    classMembers: Set<string>;
    /**
     * Names accessed via `ClassName.X` rather than `this.X` — consts,
     * static vars, enums, inner classes, static funcs.
     */
    staticMembers: Set<string>;
    /** Resolved GD type strings per member name (for `gd.ops` detection). */
    classMemberTypes: Map<string, string>;
    /**
     * Class-level types that can qualify as `ClassName.X` in emitted TS
     * (enum names + inner class names). Used by `qualifyClassType`.
     */
    classTypeNames: Set<string>;
    /** Subset of {@link classTypeNames} that are enums (not inner classes). */
    classEnumNames: Set<string>;
}
/**
 * Walk a class body (or the file root for the script class) and
 * collect everything that belongs in the per-class scope. Returns a
 * fresh scope — doesn't persistently mutate `ctx`.
 *
 * @param className  TS-side class name (already escaped).
 * @param statements The class body's children (for inner classes)
 *                   or the file root's children (for script class).
 *                   Non-member node types are ignored.
 * @param ctx        Used only for `inferExprType` (reads
 *                   `registry`, `localVarTypes`, `classMemberTypes`).
 *                   The partial scope's `classMemberTypes` is
 *                   temporarily installed so value-expr inferences
 *                   during the walk see same-class members already
 *                   collected.
 */
export declare function buildClassScope(className: string, statements: readonly SyntaxNode[], ctx: GdToTsContext): ClassScope;
/**
 * Run `fn` with the given `ClassScope` installed on `ctx`. Swaps
 * `className`, `classMembers`, `staticMembers`, `classMemberTypes`,
 * `classTypeNames`, and RESETS `localVars` / `localVarTypes` to
 * fresh empty collections (function-scope doesn't carry across class
 * boundaries).
 *
 * Restores the previous values on return — including when `fn`
 * throws. This is the single point where per-class scope management
 * happens, replacing the earlier scatter of save/restore triples.
 */
export declare function withClassScope<T>(ctx: GdToTsContext, scope: ClassScope, fn: () => T): T;
//# sourceMappingURL=class-scope.d.ts.map