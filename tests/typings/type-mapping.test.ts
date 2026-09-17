import { describe, it, expect } from 'vitest';
import {
  godotTypeToTs,
  emptyTypeContext,
  type TypeContext,
} from '../../src/typings/type-mapping.js';

/**
 * A context shaped like a real generation run: `Variant` is deliberately
 * present in BOTH sets, because Godot documents it as a class *and*
 * prefixes its global enums with it. That overlap is the whole reason
 * the dotted branch cannot discriminate on the prefix alone.
 */
function ctx(): TypeContext {
  return {
    ...emptyTypeContext(),
    knownClasses: new Set(['Node', 'Variant', 'Sprite2D']),
    globalEnumNames: new Set(['Key', 'Variant.Type', 'Variant.Operator']),
  };
}

describe('godotTypeToTs: dotted enum references', () => {
  it('keeps a global enum spelled with its dot', () => {
    // Declared as `declare namespace Variant { const enum Type }`, and
    // GDScript spells it the same way — so it survives verbatim.
    expect(godotTypeToTs('Variant.Type', ctx())).toBe('Variant.Type');
    expect(godotTypeToTs('Variant.Operator', ctx())).toBe('Variant.Operator');
  });

  it('maps a class enum to int', () => {
    // `Node.ProcessMode` has no TS declaration — its members are emitted
    // as `static readonly ...: int` on the class interface — so the
    // dotted name would dangle.
    expect(godotTypeToTs('Node.ProcessMode', ctx())).toBe('int');
  });

  it('does not let a class prefix hide a global enum', () => {
    // Regression: discriminating on the prefix mapped `Variant.Type` to
    // `int`, because `Variant` is itself a documented class.
    const c = ctx();
    expect(c.knownClasses.has('Variant')).toBe(true);
    expect(godotTypeToTs('Variant.Type', c)).not.toBe('int');
    expect(godotTypeToTs('Variant.Type', c)).toBe('Variant.Type');
  });

  it('falls back to unknown for a dotted name nothing declares', () => {
    // Neither a global enum nor a known class: emitting the name would
    // reference something that does not exist.
    expect(godotTypeToTs('Mystery.Thing', ctx())).toBe('unknown');
  });

  it('passes dotted names through when no classes are loaded', () => {
    // Bootstrap context (`deriveValueTypes`) — with nothing to check
    // against, the name is left alone rather than flattened to unknown.
    expect(godotTypeToTs('Node.ProcessMode', emptyTypeContext())).toBe(
      'Node.ProcessMode',
    );
  });

  it('resolves a typed array of a global enum', () => {
    expect(godotTypeToTs('Array[Variant.Type]', ctx())).toBe(
      'Array<Variant.Type>',
    );
  });
});

describe('godotTypeToTs: undotted names', () => {
  it('maps primitives and special types', () => {
    const c = ctx();
    expect(godotTypeToTs('int', c)).toBe('int');
    expect(godotTypeToTs('String', c)).toBe('string');
    expect(godotTypeToTs('StringName', c)).toBe('string');
    expect(godotTypeToTs('Variant', c)).toBe('unknown');
    expect(godotTypeToTs('Nil', c)).toBe('void');
  });

  it('keeps a known class and rejects an unknown name', () => {
    expect(godotTypeToTs('Sprite2D', ctx())).toBe('Sprite2D');
    expect(godotTypeToTs('NotAClass', ctx())).toBe('unknown');
  });

  it('renames a class that collides with a TS global', () => {
    expect(godotTypeToTs('Object', ctx())).toBe('GodotObject');
  });
});
