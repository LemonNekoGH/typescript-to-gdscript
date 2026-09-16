import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import {
  isLabeledJump,
  isSwitchBreak,
  unlabeledBreakTarget,
} from '../../src/converter/ts-to-gd/statement-body.js';

function parse(code: string): ts.SourceFile {
  return ts.createSourceFile(
    'a.ts',
    code,
    ts.ScriptTarget.ES2022,
    /* setParentNodes */ true,
  );
}

function collect(sf: ts.SourceFile, pred: (n: ts.Node) => boolean): ts.Node[] {
  const out: ts.Node[] = [];
  const walk = (n: ts.Node): void => {
    if (pred(n)) out.push(n);
    ts.forEachChild(n, walk);
  };
  walk(sf);
  return out;
}

const jumps = (sf: ts.SourceFile): ts.Node[] =>
  collect(sf, (n) => ts.isBreakStatement(n) || ts.isContinueStatement(n));

/**
 * GDScript has no labels, so a `break`/`continue` naming one cannot be
 * emitted: a bare `break` would bind to the nearest loop instead of the
 * labelled one, which is a different program. `unlabeledBreakTarget`
 * answers `undefined` for those — the same answer it gives for a
 * `break` with no target at all — so the label has to be recognised on
 * its own rather than inferred from that.
 */
describe('statement-body: labeled jumps', () => {
  it('flags a labeled `break`', () => {
    const sf = parse('outer: for (;;) { while (true) { break outer; } }');
    const found = jumps(sf);
    expect(found).toHaveLength(1);
    expect(isLabeledJump(found[0]!)).toBe(true);
  });

  it('flags a labeled `continue`', () => {
    const sf = parse('outer: for (;;) { while (true) { continue outer; } }');
    const found = jumps(sf);
    expect(found).toHaveLength(1);
    expect(isLabeledJump(found[0]!)).toBe(true);
  });

  it('does not flag a plain `break` or `continue`', () => {
    const sf = parse('for (;;) { break; } while (true) { continue; }');
    const found = jumps(sf);
    expect(found).toHaveLength(2);
    expect(found.map((n) => isLabeledJump(n))).toEqual([false, false]);
  });

  it('does not flag a statement that is not a jump', () => {
    const sf = parse('for (;;) { print(1); }');
    const [stmt] = collect(sf, ts.isExpressionStatement);
    expect(isLabeledJump(stmt!)).toBe(false);
  });

  // The reason the label check has to exist separately: a labeled
  // `break` reports no target, which is indistinguishable from a
  // `break` that binds to nothing — and "no target" is what makes
  // `isSwitchBreak` false, i.e. "emit it as a plain `break`".
  it('reports no target for a labeled `break`, same as an unbound one', () => {
    const sf = parse('outer: for (;;) { switch (x) { case 1: break outer; } }');
    const [brk] = jumps(sf);
    expect(unlabeledBreakTarget(brk as ts.BreakStatement)).toBeUndefined();
    expect(isSwitchBreak(brk!)).toBe(false);
  });
});
