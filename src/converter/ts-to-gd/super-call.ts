import ts from 'typescript';
import { isAmbient } from '../common/gd-names.ts';
import { godotClassName } from '../../typings/type-mapping.ts';
import type { TransformerDelegate } from './transformer-types.ts';

/**
 * What GDScript can do with a `super` call.
 *
 * `super` reaches a member only when something implements it.
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

/**
 * The class declaration an `extends` expression stands for, or
 * undefined when that cannot be told.
 *
 * A NAME (identifier, dotted name, import alias) resolves through its
 * symbol. Anything else — in this dialect, `preload("res://…")` —
 * names a SCRIPT by its path, so only a resolution to the user's own
 * TS class counts. An ambient answer there is a stand-in, not evidence
 * about the base: `preload`'s fallback overload is typed `Resource`,
 * which would otherwise pass for an engine base and let a script's
 * constructor call be dropped.
 */
function baseClassOf(
  t: TransformerDelegate,
  cls: ts.ClassLikeDeclaration,
): ts.ClassLikeDeclaration | undefined {
  const clause = cls.heritageClauses?.find(
    (c) => c.token === ts.SyntaxKind.ExtendsKeyword,
  );
  const expr = clause?.types[0]?.expression;
  if (!expr) return undefined;
  const checker = t.ctx.checker;

  if (ts.isIdentifier(expr) || ts.isPropertyAccessExpression(expr)) {
    const nameNode = ts.isPropertyAccessExpression(expr) ? expr.name : expr;
    let symbol = checker.getSymbolAtLocation(nameNode);
    if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
      symbol = checker.getAliasedSymbol(symbol);
    }
    return symbol?.getDeclarations()?.find(ts.isClassLike);
  }

  const instance = checker
    .getTypeAtLocation(expr)
    .getConstructSignatures()[0]
    ?.getReturnType();
  const decl = instance?.getSymbol()?.getDeclarations()?.find(ts.isClassLike);
  return decl && !isAmbient(decl) ? decl : undefined;
}

/**
 * The registry name of a Godot engine class declaration, or undefined
 * when `decl` is not one. The typings rename a few classes that clash
 * with JS globals (`Object` → `GodotObject`), so the TS name is mapped
 * back before the registry is asked. Without a registry nothing can be
 * proven to be an engine class.
 */
function engineClassName(
  t: TransformerDelegate,
  decl: ts.ClassLikeDeclaration,
): string | undefined {
  if (!isAmbient(decl) || !decl.name) return undefined;
  const name = godotClassName(decl.name.text);
  return t.ctx.registry?.hasClass(name) ? name : undefined;
}

/**
 * `_init` is matched against a constructor, every other name against a
 * method — declarations included, so a `.d.ts` standing in for a script
 * answers for it. A property holding a lambda is deliberately not
 * matched: `super.field.call()` is not a thing in GDScript.
 */
function declaresMember(
  decl: ts.ClassLikeDeclaration,
  member: string,
): boolean {
  return decl.members.some((m) =>
    member === '_init'
      ? ts.isConstructorDeclaration(m)
      : ts.isMethodDeclaration(m) &&
        m.name.getText(decl.getSourceFile()) === member,
  );
}

/**
 * Where the member a `super` call names is implemented, as far as the
 * converter can PROVE it — the only basis on which anything may be
 * dropped or reported.
 */
type Implementer =
  /** Some script ancestor declares it — resolved THROUGH ones that don't. */
  | { kind: 'script' }
  /** The chain reached this engine class with no script declaring it first. */
  | { kind: 'engine'; name: string }
  /** The chain could not be followed to either end. */
  | { kind: 'unknown' };

/**
 * Walk the `extends` chain looking for whoever implements `member`.
 *
 * An ambient class that is NOT an engine class stands in for a script:
 * the global wrapper the typings generator emits for every script class
 * (`class Foo extends ScriptClass {}`, usable without an import), or an
 * emitted declaration. It is read like any other script — it answers
 * if it declares the member — and otherwise followed through to its own
 * base. Stopping at it read every such base as "no constructor" and
 * dropped the `super()` of a script whose constructor then silently
 * never ran.
 */
function findImplementer(
  t: TransformerDelegate,
  cls: ts.ClassLikeDeclaration,
  member: string,
): Implementer {
  const seen = new Set<ts.ClassLikeDeclaration>();
  let base = baseClassOf(t, cls);
  while (base && !seen.has(base)) {
    seen.add(base);
    const engine = engineClassName(t, base);
    if (engine) return { kind: 'engine', name: engine };
    if (declaresMember(base, member)) return { kind: 'script' };
    base = baseClassOf(t, base);
  }
  return { kind: 'unknown' };
}

/**
 * Decide what to emit for a `super` call, or null when this is not one.
 *
 * Only a PROVEN engine base changes anything. There the bare `super()`
 * at the top of a derived constructor is dropped — nothing implements
 * `_init`, and Godot rejects the call outright — and `super(args)` is
 * reported, since dropping it would lose the arguments. Everywhere
 * else the call is emitted as written: GDScript does NOT run a parent
 * `_init` implicitly (verified: a child `_init` without `super()`
 * leaves the parent's body unrun), so dropping on a guess could
 * silently skip a constructor. Emitting when unsure costs at worst a
 * Godot parse error, which is visible.
 *
 * An unreachable engine virtual is reported, not dropped: unlike the
 * bare `super()`, the user wrote it on purpose.
 */
export function resolveSuperCall(
  t: TransformerDelegate,
  node: ts.CallExpression,
): SuperCall | null {
  const member = superMemberName(node);
  if (member === null) return null;

  const cls = enclosingClass(node);
  if (!cls) return { kind: 'emit' };
  const implementer = findImplementer(t, cls, member);
  if (implementer.kind !== 'engine') return { kind: 'emit' };

  if (member === '_init') {
    if (node.arguments.length > 0) {
      return {
        kind: 'unsupported',
        message:
          'No base class constructor to forward these arguments to — the ' +
          `base resolves to the Godot engine class \`${implementer.name}\`, ` +
          'whose `_init` is a virtual with no implementation behind it. ' +
          'Drop the arguments, or give the base class a constructor of ' +
          'its own.',
      };
    }
    return { kind: 'drop' };
  }

  // A regular engine method is reachable through `super`, a virtual is not.
  if (!t.ctx.registry?.isVirtualMethod(implementer.name, member)) {
    return { kind: 'emit' };
  }
  return {
    kind: 'unsupported',
    message:
      `\`super.${member}()\` has nothing to call — \`${member}\` is a ` +
      `virtual of \`${implementer.name}\`, a slot the engine calls rather ` +
      'than code it provides, and no ancestor script defines it. Godot ' +
      `rejects the call. Drop it, or define \`${member}\` on a base class ` +
      'of your own.',
  };
}
