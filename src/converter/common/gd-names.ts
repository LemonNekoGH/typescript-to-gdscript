import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import {
  CLASS_NAME_CONFLICTS,
  godotClassName,
} from '../../typings/type-mapping.ts';

/**
 * True when nothing in the converted program declares the binding — it
 * is read out of a `.d.ts`, or written `declare` at the top level of a
 * `.ts` (a declaration nested in a `declare global` / `declare module`
 * block is NOT detected; `ts.getCombinedModifierFlags` walks only the
 * variable-statement chain, and the flag that would catch it is
 * internal to TypeScript).
 *
 * In this dialect that answers "is this the engine's or the user's".
 * An ambient declaration describes something GDScript already provides
 * and creates nothing in the emitted script; anything else was written
 * in code that is being converted.
 */
export function isAmbient(d: ts.Declaration): boolean {
  return (
    d.getSourceFile().isDeclarationFile ||
    (ts.getCombinedModifierFlags(d) & ts.ModifierFlags.Ambient) !== 0
  );
}

/**
 * True when the user's own code declares this name, so Godot's meaning
 * for it does not apply. A name that resolves nowhere is not the
 * user's — it just means the typings are not loaded.
 */
export function isUserDeclared(
  declarations: readonly ts.Declaration[],
): boolean {
  return declarations.length > 0 && !declarations.some(isAmbient);
}

/** True when the registry knows this name as a GDScript type. */
export function isGdTypeName(
  name: string,
  registry?: GodotClassRegistry,
): boolean {
  return (
    !!registry &&
    (registry.hasClass(name) ||
      registry.isConstructor(name) ||
      registry.isGlobalEnum(name))
  );
}

/**
 * GDScript's name for an engine class the typings renamed to dodge a JS
 * global — `GodotObject` is `Object` (`CLASS_NAME_CONFLICTS`). Returns
 * `name` unchanged for anything else, including a class of the user's
 * own that happens to share the renamed spelling: only a name that
 * resolves to the typings' declaration is the engine's.
 */
export function gdClassSpelling(
  name: string,
  declarations: readonly ts.Declaration[],
): string {
  if (declarations.length === 0 || isUserDeclared(declarations)) return name;
  return godotClassName(name);
}

/**
 * True for a name the typings gave AWAY — `Object` — because TypeScript
 * already owns it. In TS it keeps TS's meaning (the type is the
 * plain-object interface, the value is aliased to the engine class), so
 * as a TYPE it is no GDScript type and must not be matched against the
 * registry, where `Object` is the engine class.
 */
export function isRenamedAwayClassName(name: string): boolean {
  return CLASS_NAME_CONFLICTS.has(name);
}
