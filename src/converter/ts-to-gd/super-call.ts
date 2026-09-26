import ts from 'typescript';
import { isAmbient } from '../common/gd-names.ts';
import type { TransformerDelegate } from './transformer-types.ts';

/**
 * What GDScript can do with a `super` call.
 *
 * `super` reaches a member only when a SCRIPT behind it implements one.
 * Verified against Godot:
 *
 * - `super.get_child(0)` on a `Node` base — fine, the engine method has
 *   an implementation.
 * - `super._ready()` on a `Node` base — `Cannot call the parent class'
 *   virtual function "_ready()" because it hasn't been defined`. A
 *   virtual is a slot the engine calls, not code it provides.
 * - `super()` (i.e. `super._init()`) on a `Node` base — the same error.
 * - Either one against a script ancestor that defines the member —
 *   fine, and it resolves THROUGH intermediate scripts that do not.
 */
export type SuperCall =
  | { kind: 'emit' }
  | { kind: 'drop' }
  | { kind: 'unsupported'; message: string };

/** The member a `super` call names — `super(...)` means `_init`. */
function superMemberName(node: ts.CallExpression): string | null {
  if (node.expression.kind === ts.SyntaxKind.SuperKeyword) return '_init';
  if (
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.expression.kind === ts.SyntaxKind.SuperKeyword
  ) {
    return node.expression.name.text;
  }
  return null;
}

/** True for a bare `super(...)`, the form TypeScript forces on a derived constructor. */
export function isBareSuperCall(node: ts.Node): node is ts.CallExpression {
  return (
    ts.isCallExpression(node) &&
    node.expression.kind === ts.SyntaxKind.SuperKeyword
  );
}

/**
 * Report `super.<name>` used as anything but a call target.
 *
 * GDScript's `super` is followed by a call and nothing else — a plain
 * `super.name` is `Expected "(" after function name`, whatever the
 * member is. There is nothing to emit instead: a property is one
 * storage slot shared with the parent, so `self.<name>` already reads
 * what `super.<name>` would in TypeScript.
 */
export function checkSuperPropertyAccess(
  t: TransformerDelegate,
  node: ts.PropertyAccessExpression,
): void {
  if (node.expression.kind !== ts.SyntaxKind.SuperKeyword) return;
  const parent = node.parent;
  const isCallTarget =
    !!parent && ts.isCallExpression(parent) && parent.expression === node;
  if (isCallTarget) return;
  t.addDiagnostic(
    node,
    'error',
    `GDScript allows \`super\` only in front of a CALL, so ` +
      `\`super.${node.name.text}\` has no GDScript spelling. A property ` +
      `is one storage slot shared with the base class — write ` +
      `\`this.${node.name.text}\` to read the same value.`,
  );
}

function enclosingClass(node: ts.Node): ts.ClassLikeDeclaration | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (ts.isClassLike(current)) return current;
    current = current.parent;
  }
  return undefined;
}

/** The class a heritage clause's expression resolves to, if it names one. */
function baseClassOf(
  t: TransformerDelegate,
  cls: ts.ClassLikeDeclaration,
): ts.ClassLikeDeclaration | undefined {
  const clause = cls.heritageClauses?.find(
    (c) => c.token === ts.SyntaxKind.ExtendsKeyword,
  );
  const expr = clause?.types[0]?.expression;
  if (!expr) return undefined;
  let symbol = t.ctx.checker.getSymbolAtLocation(expr);
  if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
    symbol = t.ctx.checker.getAliasedSymbol(symbol);
  }
  return symbol?.getDeclarations()?.find(ts.isClassLike);
}

/**
 * True when some SCRIPT ancestor implements `member` — the condition
 * Godot actually checks. An ambient declaration is the engine's own
 * typings and stops the walk: past it there is no more script.
 *
 * `_init` is matched against a constructor, every other name against a
 * method. A property holding a lambda is deliberately not matched:
 * `super.field.call()` is not a thing in GDScript.
 */
function scriptAncestorImplements(
  t: TransformerDelegate,
  cls: ts.ClassLikeDeclaration,
  member: string,
): boolean {
  const seen = new Set<ts.ClassLikeDeclaration>();
  let base = baseClassOf(t, cls);
  while (base && !seen.has(base)) {
    seen.add(base);
    if (isAmbient(base)) return false;
    const found = base.members.some((m) =>
      member === '_init'
        ? ts.isConstructorDeclaration(m)
        : ts.isMethodDeclaration(m) &&
          m.name.getText(base!.getSourceFile()) === member,
    );
    if (found) return true;
    base = baseClassOf(t, base);
  }
  return false;
}

/** The engine class at the end of the script chain, for the registry lookup. */
function engineBaseName(
  t: TransformerDelegate,
  cls: ts.ClassLikeDeclaration,
): string | undefined {
  const seen = new Set<ts.ClassLikeDeclaration>();
  let base = baseClassOf(t, cls);
  while (base && !seen.has(base)) {
    seen.add(base);
    if (isAmbient(base)) return base.name?.text;
    base = baseClassOf(t, base);
  }
  return undefined;
}

/**
 * Decide what to emit for a `super` call, or null when this is not one.
 *
 * The bare `super()` TypeScript forces at the top of a derived
 * constructor is DROPPED when no script ancestor defines `_init`: there
 * is nothing to call, and Godot rejects the call outright. Dropping is
 * safe only in that case — GDScript does NOT run a parent `_init`
 * implicitly (verified: a child `_init` without `super()` leaves the
 * parent's body unrun), so a script ancestor's constructor must keep
 * its call. `super(args)` with nowhere to send the arguments is
 * reported rather than dropped.
 *
 * An unreachable virtual is reported, not dropped: unlike `super()` the
 * user wrote it on purpose, and quietly removing it would change what
 * the program does.
 */
export function resolveSuperCall(
  t: TransformerDelegate,
  node: ts.CallExpression,
): SuperCall | null {
  const member = superMemberName(node);
  if (member === null) return null;

  const cls = enclosingClass(node);
  if (!cls) return { kind: 'emit' };
  if (scriptAncestorImplements(t, cls, member)) return { kind: 'emit' };

  if (member === '_init') {
    if (node.arguments.length > 0) {
      return {
        kind: 'unsupported',
        message:
          'No base class constructor to forward these arguments to — the ' +
          'base resolves to a Godot engine class, whose `_init` is a ' +
          'virtual with no implementation behind it. Drop the arguments, ' +
          'or give the base class a constructor of its own.',
      };
    }
    return { kind: 'drop' };
  }

  // Past the script chain the registry decides: a regular engine method
  // is reachable through `super`, a virtual is not.
  const engineBase = engineBaseName(t, cls);
  const registry = t.ctx.registry;
  if (!engineBase || !registry) return { kind: 'emit' };
  if (!registry.isVirtualMethod(engineBase, member)) return { kind: 'emit' };

  return {
    kind: 'unsupported',
    message:
      `\`super.${member}()\` has nothing to call — \`${member}\` is a ` +
      `virtual of \`${engineBase}\`, a slot the engine calls rather than ` +
      'code it provides, and no ancestor script defines it. Godot rejects ' +
      'the call. Drop it, or define ' +
      `\`${member}\` on a base class of your own.`,
  };
}
