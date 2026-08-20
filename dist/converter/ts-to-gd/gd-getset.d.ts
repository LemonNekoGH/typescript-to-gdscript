/**
 * `gd.getset()` property emitter for TS→GD conversion.
 *
 * `X = gd.getset<T>({ value?, get, set })` is the TS-side escape
 * hatch for GDScript setget patterns that don't fit the native
 * `get X() {} / set X(v) {}` accessor pair — specifically:
 *   - Properties with a default value + custom get/set
 *   - The `get = fn, set = fn` function-reference form in GDScript
 *
 * Two emission modes:
 *   - **Inline**: `get` / `set` are arrow functions — emitted as
 *     native GD `var X: get: ... set(v): ...`.
 *   - **Function-reference**: `get` / `set` are identifiers /
 *     `this.fn` accesses — emitted as GD `var X: get = fn, set = fn`.
 *
 * `null` on one side means "use GDScript's default" (backing-field
 * read/write) — the corresponding side is omitted from the GD
 * output. Both-null is an error. Mixing inline bodies with function
 * references in one call is also an error.
 *
 * Type resolution order (see `resolveGetsetType`):
 *   1. Explicit `gd.getset<T>({...})` type argument
 *   2. Property declaration's own annotation (`name: T = ...`)
 *   3. `set` callback parameter type (via call signature)
 *   4. `value` expression's type (numeric literal → `int` / `float`
 *      from source text; else `typeToString` + widening)
 */
import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
export declare function visitGdGetsetProperty(name: string, node: ts.PropertyDeclaration, call: ts.CallExpression, t: TransformerDelegate): void;
//# sourceMappingURL=gd-getset.d.ts.map