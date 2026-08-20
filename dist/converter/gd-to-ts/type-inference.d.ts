import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import type { GdToTsContext } from './context.ts';
/**
 * True when a function/constructor definition carries the `static` keyword.
 * tree-sitter-gdscript represents it as a `static_keyword` NAMED CHILD of the
 * `FunctionDefinition` (unlike variable statements, which expose a `static`
 * field), so `childForFieldName('static')` does NOT find it — we scan the
 * named children instead.
 */
export declare function isStaticFunction(node: SyntaxNode): boolean;
/** Extract raw GD type name from a type node */
export declare function extractGdTypeName(typeNode: SyntaxNode): string | null;
/** Infer type from expression without context (for parseGdClassInfo). Only handles constructor calls. */
export declare function inferExprTypeStatic(node: SyntaxNode, registry?: GodotClassRegistry): string | null;
/** Infer the GD type of an expression (best-effort, for gd.ops detection) */
export declare function inferExprType(node: SyntaxNode, ctx: GdToTsContext): string | null;
export declare const GD_OPS_MAP: Record<string, string>;
/** Comparison operators where GDScript `not` has lower precedence than the op,
 *  but tree-sitter-gdscript incorrectly parses `not X op Y` as `(not X) op Y`.
 *  In real GDScript, `not a == 0` means `not (a == 0)`. */
export declare const NOT_LIFT_OPS: Set<string>;
/** GDScript primitive types that use `gd.is()` instead of `instanceof` */
export declare const GD_IS_PRIMITIVE_TYPES: Set<string>;
/**
 * True when `node` contains an `await` that belongs to the function/lambda
 * owning `node`. Does NOT recurse into nested lambda bodies — a `func(): …:
 * await …` inside the body defines its own async scope and shouldn't force
 * the enclosing function to be async.
 */
export declare function containsAwait(node: SyntaxNode): boolean;
/**
 * Qualify a GD type reference against the current enclosing class's
 * type names. Handles both bare (`Inner`) and qualified
 * (`Config.Inner`) forms — if the FIRST segment matches a class-level
 * type name (enum or inner class declared directly in the current
 * class body), prepend the current class name so the type is
 * addressable through TypeScript's namespace+class merge.
 *
 *   Inner                 (inside Config, Inner ∈ Config types)    → Config.Inner
 *   Config.Inner          (inside _Anonym, Config ∈ _Anonym types) → _Anonym.Config.Inner
 *   Node                  (not in class types)                      → null
 *
 * Returns `null` when the type is not a class-level reference so
 * callers can fall back to `gdTypeToTs` / primitive mapping.
 */
export declare function qualifyClassType(raw: string, classTypeNames: Set<string>, enclosingClassName: string): string | null;
/**
 * If `raw` names the CURRENT class — accounting for the GD `_Foo` → TS
 * `G_Foo` escape applied to the class declaration (`escapeUnderscoreClassName`,
 * non-addon) — return the emitted TS class name (`ctx.className`). Otherwise
 * `null`.
 *
 * Only the self class is matched here: other user classes are left verbatim so
 * the batch import-injection pass (which keys on the un-escaped GD name) keeps
 * resolving them. Anonymous (filename-derived) class names like `_Anonym` are
 * never `G_`-escaped, so they only match via the exact-equality branch — a
 * no-op — and qualified forms (`G_Foo.Inner`, `_Anonym.Mode`) never match.
 */
export declare function selfClassNameIfMatches(raw: string, ctx: GdToTsContext): string | null;
/**
 * Escape an already-mapped TS type string when it refers to the self class
 * (`_Foo` → `G_Foo`). No-op for primitives, Godot types, qualified
 * enum/inner-class names, and other user classes.
 */
export declare function escapeSelfClassType(tsType: string | null, ctx: GdToTsContext): string | null;
export declare function gdTypeToTs(gdType: string): string | null;
/**
 * Split a GDScript generic argument list (the text inside `[...]`) on its
 * top-level commas, ignoring commas nested inside further `[...]` groups.
 * E.g. `int, Dictionary[String, float]` → ['int', 'Dictionary[String, float]'].
 */
export declare function splitTopLevelTypeArgs(inner: string): string[];
//# sourceMappingURL=type-inference.d.ts.map