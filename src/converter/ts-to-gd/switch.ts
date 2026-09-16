import ts from 'typescript';
import { emitMatchPatternExpr } from './gd-helpers.ts';
import { emitStatements } from './statement-body.ts';
import type { TransformerDelegate } from './transformer-types.ts';

/**
 * Reported by `visitStatement` on the `break` itself rather than from
 * here over the whole `switch`: `addDiagnostic` writes its `# ERROR:`
 * marker at the emitter's CURRENT position, and from this visitor that
 * position is still above the `match` line — every marker would stack
 * there, detached from the branch it belongs to. Visiting reaches each
 * one exactly once anyway, since the only clauses whose statements go
 * unvisited are the empty ones stacked onto a following body.
 */
export const SWITCH_BREAK_ERROR =
  '`break` has no GDScript equivalent inside a `match` branch. ' +
  'Branches never fall through, so a case ends on its own — ' +
  'remove the `break`, and restructure the case if it needs to ' +
  'exit early.';

/** Split into [matching, rest], each keeping its relative order. */
function partition<T>(items: T[], pred: (item: T) => boolean): [T[], T[]] {
  const yes: T[] = [];
  const no: T[] = [];
  for (const item of items) (pred(item) ? yes : no).push(item);
  return [yes, no];
}

/**
 * Emit one `match` branch for a run of clauses. Only the last clause of
 * the run carries a body — the ones before it were empty and stack onto
 * it as extra patterns.
 */
function emitMatchBranch(
  t: TransformerDelegate,
  clauses: ts.CaseOrDefaultClause[],
  trailing?: ts.Node,
): void {
  const pos = t.getLineAndCol(clauses[0]!);
  // A comment between two branches is leading trivia of the `case`
  // below it, not of any statement — so nothing a branch body visits
  // ever reaches it. Emitting it here is what keeps it in the output.
  // This lands in the pattern section, above the `1:` line, where
  // GDScript takes no statement — so no comment form that is one.
  for (const clause of clauses)
    t.emitLeadingComments(clause, { statementsAllowed: false });
  // `_` already matches everything, so a run containing `default` needs
  // no other pattern next to it.
  const pattern = clauses.some(ts.isDefaultClause)
    ? '_'
    : clauses
        .filter(ts.isCaseClause)
        // `undefined` is restricted in the dialect, so a case label
        // never spells the wildcard — see `emitMatchPatternExpr`.
        .map((c) => emitMatchPatternExpr(t, c.expression, undefined, false))
        .join(', ');
  t.emitter.writeLine(`${pattern}:`, pos.line, pos.col);

  t.emitter.indent();
  emitStatements(t, clauses.at(-1)!.statements, pos, trailing);
  t.emitter.dedent();
}

// ---- Switch -> Match ----

export function visitSwitchStatement(
  t: TransformerDelegate,
  node: ts.SwitchStatement,
): void {
  // A `match` with no branch below it does not parse, so the whole
  // statement goes. Not diagnosed: a `switch` with no cases is dead
  // code either way, and it is not the converter's job to say so.
  if (node.caseBlock.clauses.length === 0) return;

  const pos = t.getLineAndCol(node);
  t.emitter.writeLine(
    `match ${t.emitExpression(node.expression)}:`,
    pos.line,
    pos.col,
  );
  t.emitter.indent();

  // A `case` with no body falls through in TS; GDScript has no
  // fall-through but takes several patterns per branch, so a run of
  // empty clauses stacks onto the body that follows it.
  const runs: ts.CaseOrDefaultClause[][] = [];
  let stacked: ts.CaseOrDefaultClause[] = [];
  for (const clause of node.caseBlock.clauses) {
    stacked.push(clause);
    if (clause.statements.length === 0) continue;
    runs.push(stacked);
    stacked = [];
  }
  // Trailing empty clauses have nothing to stack onto — they do nothing.
  if (stacked.length > 0) runs.push(stacked);

  // `default` becomes `_`, which matches everything, so GDScript only
  // reaches a branch written below it if there is none — it has to go
  // last. Moving it is what PRESERVES the meaning rather than changing
  // it: TypeScript tests every `case` label before falling back to
  // `default`, wherever `default` sits, so the branch order carries no
  // information to lose. The rest keep their order, and a run's
  // comments travel with it.
  const [fallback, rest] = partition(runs, (r) => r.some(ts.isDefaultClause));
  // A comment after the last clause's statements is leading trivia of
  // the case block's `}` — no clause below it to carry it — so the run
  // that ENDED the source closes it out, wherever the reordering put
  // that run.
  const lastClause = node.caseBlock.clauses.at(-1);
  const closeBrace = node.caseBlock.getLastToken();
  for (const run of [...rest, ...fallback]) {
    emitMatchBranch(t, run, run.at(-1) === lastClause ? closeBrace : undefined);
  }

  t.emitter.dedent();
}
