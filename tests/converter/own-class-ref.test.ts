import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import ts from 'typescript';
import {
  getEnclosingClass,
  getOwnClassName,
  isStaticContext,
  resolveOwnClassRef,
} from '../../src/converter/ts-to-gd/own-class-ref.ts';

/**
 * Unit tests for own-class reference resolution. Fixtures cover the
 * emitted output end-to-end; these pin the decision table itself,
 * including the combinations a fixture can't hold at once (a script
 * class is either named or anonymous, never both).
 *
 * Each case is tagged by a unique property name (`aaa`, `bbb`, …) so
 * the test can pull the exact expression node out of the AST. The
 * properties don't exist — nothing asks the checker for diagnostics.
 */
const SOURCE = `
class Example {
  static S = 1;

  static viaThis() { return this.aaa; }
  static viaName() { return Example.bbb; }
  static viaOther() { return Other.ccc; }
  static viaLambda() { return () => Example.ddd; }
  static PROP = Example.eee;

  method() { return this.fff; }
  methodViaName() { return Example.ggg; }
  methodLambda() { return () => Example.hhh; }
  prop = Example.iii;

  static get sGet() { return Example.jjj; }
  get iGet() { return Example.qqq; }
  constructor() { this.rrr; }
  static viaClassExpr() { return class { m() { return Example.sss; } }; }
  static shadowedNamed(ccc1) { return Example.ccc1; }
}

class Other {
  static ccc = 1;
}

class Inner {
  static innerThis() { return this.nnn; }
  innerMethod() { return this.ooo; }
  static innerViaScriptClass() { return Example.ppp; }
}

class __CLASS__ {
  static anonViaName() { return __CLASS__.kkk; }
  static anonViaThis() { return this.lll; }
  anonInstance() { return __CLASS__.mmm; }

  static shadowParam(ttt) { return __CLASS__.ttt; }
  static shadowLocal() { let uuu = 1; return __CLASS__.uuu; }
  static shadowDestructured() { const { vvv } = src; return __CLASS__.vvv; }
  static shadowNested() { return [1].map((www) => __CLASS__.www); }
  static shadowCatch() { try { f(); } catch (xxx) { return __CLASS__.xxx; } }
  static shadowFor() { for (let yyy = 0;;) { return __CLASS__.yyy; } }
  static shadowSibling(other) { return __CLASS__.zzz; }
}

/** Stands in for an inner class of the anonymous script class. */
class AnonInner {
  static outerStatic() { return __CLASS__.a1; }
  outerInstance() { return __CLASS__.b1; }
}
`;

let tmpDir: string;
/** Marker property name → the object expression it hangs off. */
let objOf: (marker: string) => ts.Expression;

beforeAll(() => {
  tmpDir = join(
    tmpdir(),
    `tstogd-own-class-ref-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(tmpDir, { recursive: true });
  const filePath = join(tmpDir, 'own-class-ref-cases.ts');
  writeFileSync(filePath, SOURCE);

  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    noEmit: true,
  });
  // Binding is what sets `node.parent`, and every function under test
  // walks upwards. The converter always runs with a checker, so this
  // mirrors it rather than papering over anything.
  program.getTypeChecker();
  const sf = program.getSourceFile(filePath)!;

  const byMarker = new Map<string, ts.Expression>();
  const walk = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node)) {
      byMarker.set(node.name.text, node.expression);
    }
    ts.forEachChild(node, walk);
  };
  walk(sf);

  objOf = (marker) => {
    const expr = byMarker.get(marker);
    if (!expr) throw new Error(`no marker '${marker}' in source`);
    return expr;
  };
});

afterAll(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

describe('getEnclosingClass', () => {
  it('finds the class a node sits in', () => {
    expect(getEnclosingClass(objOf('aaa'))?.name?.text).toBe('Example');
    expect(getEnclosingClass(objOf('ccc'))?.name?.text).toBe('Example');
  });

  it('stops at the nearest class — an inner class shadows the script class', () => {
    expect(getEnclosingClass(objOf('nnn'))?.name?.text).toBe('Inner');
    expect(getEnclosingClass(objOf('ppp'))?.name?.text).toBe('Inner');
  });
});

describe('isStaticContext', () => {
  it('is true inside a static method body', () => {
    expect(isStaticContext(objOf('aaa'))).toBe(true);
    expect(isStaticContext(objOf('bbb'))).toBe(true);
  });

  it('is false inside an instance method body', () => {
    expect(isStaticContext(objOf('fff'))).toBe(false);
    expect(isStaticContext(objOf('ggg'))).toBe(false);
  });

  it('walks through lambdas — a GD lambda captures self lexically', () => {
    expect(isStaticContext(objOf('ddd'))).toBe(true);
    expect(isStaticContext(objOf('hhh'))).toBe(false);
  });

  it('covers property initializers, which run in the member’s own context', () => {
    expect(isStaticContext(objOf('eee'))).toBe(true);
    expect(isStaticContext(objOf('iii'))).toBe(false);
  });

  it('covers accessors', () => {
    expect(isStaticContext(objOf('jjj'))).toBe(true);
    expect(isStaticContext(objOf('qqq'))).toBe(false);
  });

  it('is false in a constructor — `_init` is an instance method', () => {
    expect(isStaticContext(objOf('rrr'))).toBe(false);
  });

  it('stops at a class expression nested inside a static member', () => {
    // The inner `m()` is an instance method of its own class, so the
    // enclosing `static` is irrelevant — the member predicate must win
    // over the outer class boundary.
    expect(isStaticContext(objOf('sss'))).toBe(false);
  });
});

describe('getOwnClassName', () => {
  it('returns the enclosing class name', () => {
    expect(getOwnClassName(objOf('aaa'), 'Example')).toBe('Example');
  });

  it('returns the inner class name, not the script class', () => {
    expect(getOwnClassName(objOf('nnn'), 'Example')).toBe('Inner');
  });

  it('returns null for an anonymous script class — it has no class_name', () => {
    expect(getOwnClassName(objOf('lll'), '__CLASS__')).toBe(null);
  });
});

/** Asserts a `prefix` result and unwraps its text. */
function prefixOf(marker: string, scriptClass: string): string {
  const ref = resolveOwnClassRef(objOf(marker), marker, scriptClass);
  expect(ref, `expected a prefix for '${marker}', got ${ref.kind}`).toEqual({
    kind: 'prefix',
    text: expect.any(String),
  });
  return ref.kind === 'prefix' ? ref.text : '<not a prefix>';
}

function kindOf(marker: string, scriptClass: string): string {
  return resolveOwnClassRef(objOf(marker), marker, scriptClass).kind;
}

function reasonOf(marker: string, scriptClass: string): string {
  const ref = resolveOwnClassRef(objOf(marker), marker, scriptClass);
  return ref.kind === 'unsupported' ? ref.reason : '<not unsupported>';
}

describe('resolveOwnClassRef — named script class', () => {
  it('resolves ClassName.X through the class name in every context', () => {
    expect(prefixOf('bbb', 'Example')).toBe('Example.');
    expect(prefixOf('ggg', 'Example')).toBe('Example.');
    expect(prefixOf('ddd', 'Example')).toBe('Example.');
    expect(prefixOf('hhh', 'Example')).toBe('Example.');
    expect(prefixOf('eee', 'Example')).toBe('Example.');
    expect(prefixOf('iii', 'Example')).toBe('Example.');
  });

  it('resolves `this` in a static member through the class name', () => {
    expect(prefixOf('aaa', 'Example')).toBe('Example.');
  });

  it('leaves `this` in instance context alone', () => {
    expect(kindOf('fff', 'Example')).toBe('fallthrough');
    expect(kindOf('ooo', 'Example')).toBe('fallthrough');
  });

  it('uses the inner class name for `this` inside an inner class', () => {
    expect(prefixOf('nnn', 'Example')).toBe('Inner.');
  });

  it('leaves another class’s name alone', () => {
    expect(kindOf('ccc', 'Example')).toBe('fallthrough');
  });

  it('still resolves the script class name from inside an inner class', () => {
    // A named class has a `class_name`, so it stays reachable from
    // anywhere — this is exactly what the anonymous case can't do.
    expect(prefixOf('ppp', 'Example')).toBe('Example.');
  });

  it('is immune to shadowing — the class name qualifies the member', () => {
    expect(prefixOf('ccc1', 'Example')).toBe('Example.');
  });
});

describe('resolveOwnClassRef — anonymous script class', () => {
  it('falls back to self. in instance context', () => {
    expect(prefixOf('mmm', '__CLASS__')).toBe('self.');
  });

  it('falls back to the bare name in static context, where self does not exist', () => {
    expect(prefixOf('kkk', '__CLASS__')).toBe('');
    expect(prefixOf('lll', '__CLASS__')).toBe('');
  });

  it('still uses the bare name when an unrelated local is in scope', () => {
    expect(prefixOf('zzz', '__CLASS__')).toBe('');
  });

  it('reports a shadowed bare name instead of silently reading the local', () => {
    // GDScript accepts the bare form here and resolves it to the
    // local, so nothing downstream would ever catch this.
    for (const marker of ['ttt', 'uuu', 'vvv', 'www', 'xxx', 'yyy']) {
      expect(kindOf(marker, '__CLASS__'), `marker '${marker}'`).toBe(
        'unsupported',
      );
    }
  });

  it('names the shadowed member and both remedies in the message', () => {
    const reason = reasonOf('ttt', '__CLASS__');
    expect(reason).toContain('`ttt`');
    expect(reason).toContain('class_name');
    expect(reason).toContain('Rename the local');
  });

  it('reports an outer member reached from inside an inner class', () => {
    // `self` is the inner instance and the bare name is out of scope,
    // so neither fallback reaches the script class.
    expect(kindOf('a1', '__CLASS__')).toBe('unsupported');
    expect(kindOf('b1', '__CLASS__')).toBe('unsupported');
    expect(reasonOf('a1', '__CLASS__')).toContain('inner class');
  });
});
