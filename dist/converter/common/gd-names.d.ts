import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
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
export declare function isAmbient(d: ts.Declaration): boolean;
/**
 * True when the user's own code declares this name, so Godot's meaning
 * for it does not apply. A name that resolves nowhere is not the
 * user's — it just means the typings are not loaded.
 */
export declare function isUserDeclared(declarations: readonly ts.Declaration[]): boolean;
/** True when the registry knows this name as a GDScript type. */
export declare function isGdTypeName(name: string, registry?: GodotClassRegistry): boolean;
//# sourceMappingURL=gd-names.d.ts.map