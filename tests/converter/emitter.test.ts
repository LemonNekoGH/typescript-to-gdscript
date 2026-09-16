import { describe, it, expect } from 'vitest';
import { GDScriptEmitter } from '../../src/converter/ts-to-gd/emitter.js';

/**
 * `hasCodeSince` decides whether an indented GDScript block got a real
 * statement, and therefore whether it needs a `pass`. Getting it wrong
 * in one direction costs a redundant `pass`; getting it wrong in the
 * other emits a block GDScript refuses to parse. These pin the second
 * direction.
 */
describe('GDScriptEmitter: hasCodeSince', () => {
  function after(write: (e: GDScriptEmitter) => void): boolean {
    const e = new GDScriptEmitter('a.ts');
    const mark = e.mark();
    write(e);
    return e.hasCodeSince(mark);
  }

  it('reports no code for a blank line', () => {
    expect(after((e) => e.writeLine('', 1, 1))).toBe(false);
  });

  it('reports no code for a comment', () => {
    expect(after((e) => e.writeLine('# just a note', 1, 1))).toBe(false);
  });

  it('reports code for a statement', () => {
    expect(after((e) => e.writeLine('print("x")', 1, 1))).toBe(true);
  });

  it('reports no code for a bare annotation', () => {
    expect(after((e) => e.writeLine('@onready', 1, 1))).toBe(false);
  });

  it('reports no code for a bare annotation with arguments', () => {
    expect(
      after((e) => e.writeLine('@warning_ignore("unused_variable")', 1, 1)),
    ).toBe(false);
  });

  // The argument is free-form text (it can reach the emitter through
  // `gd.eval`), so a `)` inside a string must not end the argument list
  // early and make the line read as a statement.
  it('reports no code for a bare annotation whose argument contains `)`', () => {
    expect(
      after((e) => e.writeLine('@export_placeholder("name (x)")', 1, 1)),
    ).toBe(false);
  });

  // The flip side: an annotation followed by a statement on the same
  // line IS code — the annotation attaches to that statement.
  it('reports code for an annotation with a statement after it', () => {
    expect(after((e) => e.writeLine('@export var x = 1', 1, 1))).toBe(true);
    expect(
      after((e) => e.writeLine('@export_range(0, 1) var x = 1', 1, 1)),
    ).toBe(true);
  });
});
