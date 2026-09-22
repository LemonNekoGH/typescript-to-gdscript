import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
/**
 * Statement an unlabeled `break` belongs to — the nearest enclosing
 * loop or `switch`, stopping at a function boundary (a `break` cannot
 * cross one). Mirrors how TypeScript resolves the target itself.
 * `undefined` for a labeled `break`: that one targets its label, not
 * any enclosing statement. Do not read that `undefined` as "safe to
 * emit bare" — {@link isLabeledJump} is what rejects those, and
 * `visitStatement` checks it first.
 */
export declare function unlabeledBreakTarget(node: ts.BreakStatement): ts.Node | undefined;
/**
 * True for a `break` or `continue` that names a label.
 *
 * Checked on its own rather than read off {@link unlabeledBreakTarget},
 * which answers `undefined` for a labeled `break` — the same answer it
 * gives for one that binds to nothing. That answer is what makes
 * {@link isSwitchBreak} false, i.e. "emit it as a plain `break`", and a
 * plain `break` binds to the NEAREST loop rather than the labeled one:
 * a different program, emitted silently. GDScript has no labels, so
 * there is nothing to emit instead and the jump is rejected.
 */
export declare function isLabeledJump(node: ts.Node): boolean;
/**
 * True for a `break` that exits a `switch` rather than a loop. GDScript
 * `match` has no such jump, so this is rejected outright — the
 * reporting lives in `switch.ts`, which walks each `switch` and
 * diagnoses every `break` bound to it. A `break` belonging to a loop
 * nested inside a case is left alone: there it still means "exit the
 * loop", exactly as in GDScript.
 */
export declare function isSwitchBreak(node: ts.Node): boolean;
/**
 * Emit a run of statements as a GDScript body. Every statement is
 * visited, including ones that produce no code — they emit nothing, but
 * they get to report why. A body that ends up with no statement in it
 * gets `pass`, since an unfilled body is a parse error in GDScript.
 * `trailing` is the node whose leading comments close the body out (a
 * block's `}`).
 *
 * Whether anything was emitted is read back off the emitter rather than
 * predicted from the AST: a statement can emit nothing for many reasons
 * (a `break` bound to a `switch`, a clause-less `switch`, a type-only
 * declaration, an unsupported construct that leaves only an error
 * marker), and enumerating them is a list that silently goes stale.
 */
export declare function emitStatements(t: TransformerDelegate, statements: readonly ts.Statement[], pos: {
    line: number;
    col: number;
}, trailing?: ts.Node): void;
//# sourceMappingURL=statement-body.d.ts.map