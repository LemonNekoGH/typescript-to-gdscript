/**
 * `gd.match(...)` -> GDScript `match`, and the TS-side pattern
 * language it shares with `switch` -> `match`.
 *
 * Split from `gd-helpers.ts` to keep that file under the 500-line cap;
 * this is the one `gd.*` helper that carries a whole statement form
 * rather than rewriting a single expression.
 */
import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
export declare function isGdMatchCall(node: ts.Expression): boolean;
export declare function visitGdMatchStatement(t: TransformerDelegate, node: ts.CallExpression): void;
/**
 * Convert a TS expression to a GDScript match pattern.
 * @param bindings - Set of variable names that should be emitted as `var name` pattern bindings
 * @param wildcardUndefined - Whether a bare `undefined` spells the `_`
 *   wildcard. True for `gd.match`, whose TS-side pattern language says
 *   it that way (it is what the GD→TS direction emits for `_`). False
 *   for a `switch` case, whose label is an ordinary TS expression:
 *   there `undefined` is restricted like anywhere else, and reading it
 *   as `_` would turn one branch into a catch-all and every branch
 *   below it into dead code, silently.
 */
export declare function emitMatchPatternExpr(t: TransformerDelegate, node: ts.Expression, bindings?: Set<string>, wildcardUndefined?: boolean): string;
//# sourceMappingURL=gd-match.d.ts.map