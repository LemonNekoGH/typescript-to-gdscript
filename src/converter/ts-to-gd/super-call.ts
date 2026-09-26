import ts from 'typescript';
import { isAmbient } from '../common/gd-names.ts';
import { godotClassName } from '../../typings/type-mapping.ts';
import type { TransformerDelegate } from './transformer-types.ts';

/**
 * What to emit for a bare `super(...)` call.
 *
 * `super` is emitted as written everywhere, and whether the member
 * behind it is reachable is left to Godot. `super.<name>()` reaches
 * only something that implements `<name>` — a regular engine method
 * does, an engine virtual does not ("Cannot call the parent class'
 * virtual function"), a script ancestor that declares it does — and
 * `super.<property>` is never valid ("Expected "(" after function
 * name"). Godot reports both at parse time, so a converter rule would
 * only duplicate that check (AGENTS.md rule 11).
 *
 * The bare `super()` is the one case decided here, because it can
 * reach the `.gd` without the user meaning anything by it: it is what
 * a TypeScript constructor used to require, and what a habit or a
 * migrated file still carries.
 */
export type SuperCall =
  | { kind: 'emit' }
  | { kind: 'drop' }
  | { kind: 'unsupported'; message: string };

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
 * Who implements the `_init` a bare `super()` calls, as far as the
 * converter can PROVE it — the only basis on which the call may be
 * dropped or reported.
 */
type ConstructorOwner =
  /** A script ancestor declares a constructor — resolved THROUGH ones that don't. */
  | { kind: 'script' }
  /** The chain reached this engine class with no script constructor first. */
  | { kind: 'engine'; name: string }
  /** The chain could not be followed to either end. */
  | { kind: 'unknown' };

/**
 * Walk the `extends` chain looking for a constructor.
 *
 * An ambient class that is NOT an engine class stands in for a script:
 * the global wrapper the typings generator emits for every script class
 * (`class Foo extends ScriptClass {}`, usable without an import), or an
 * emitted declaration. It is read like any other script — it answers
 * if it declares a constructor — and otherwise followed through to its
 * own base. Stopping at it read every such base as "no constructor" and
 * dropped the `super()` of a script whose constructor then silently
 * never ran.
 */
function findConstructorOwner(
  t: TransformerDelegate,
  cls: ts.ClassLikeDeclaration,
): ConstructorOwner {
  const seen = new Set<ts.ClassLikeDeclaration>();
  let base = baseClassOf(t, cls);
  while (base && !seen.has(base)) {
    seen.add(base);
    const engine = engineClassName(t, base);
    if (engine) return { kind: 'engine', name: engine };
    if (base.members.some(ts.isConstructorDeclaration)) {
      return { kind: 'script' };
    }
    base = baseClassOf(t, base);
  }
  return { kind: 'unknown' };
}

/**
 * Decide what to emit for a bare `super(...)`, or null for anything
 * else — every other use of `super` is emitted as written.
 *
 * Only a PROVEN engine base changes anything. There the bare `super()`
 * is dropped — nothing implements `_init`, and Godot rejects the call
 * outright — and `super(args)` is reported, since dropping it would
 * lose the arguments. Everywhere else the call is emitted as written:
 * GDScript does NOT run a parent `_init` implicitly (verified: a child
 * `_init` without `super()` leaves the parent's body unrun), so
 * dropping on a guess could silently skip a constructor. Emitting when
 * unsure costs at worst a Godot parse error, which is visible.
 */
export function resolveSuperCall(
  t: TransformerDelegate,
  node: ts.CallExpression,
): SuperCall | null {
  if (node.expression.kind !== ts.SyntaxKind.SuperKeyword) return null;

  const cls = enclosingClass(node);
  if (!cls) return { kind: 'emit' };
  const owner = findConstructorOwner(t, cls);
  if (owner.kind !== 'engine') return { kind: 'emit' };

  if (node.arguments.length > 0) {
    return {
      kind: 'unsupported',
      message:
        'No base class constructor to forward these arguments to — the ' +
        `base resolves to the Godot engine class \`${owner.name}\`, ` +
        'whose `_init` is a virtual with no implementation behind it. ' +
        'Drop the arguments, or give the base class a constructor of ' +
        'its own.',
    };
  }
  return { kind: 'drop' };
}
