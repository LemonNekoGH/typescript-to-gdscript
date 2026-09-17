import ts from 'typescript';

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
