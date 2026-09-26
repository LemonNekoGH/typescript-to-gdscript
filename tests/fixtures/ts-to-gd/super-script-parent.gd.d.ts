// The global wrapper the typings generator emits for every script class
// (`types/<Name>.gd.d.ts`), cut down to the part that matters here: it
// makes `SuperScriptParent` usable without an import. It is ambient but
// NOT an engine class, so `super` resolution must follow it through to
// the script behind it rather than read it as a dead end.
import type { SuperScriptParent as ScriptClass } from './super-script-parent';

declare global {
  class SuperScriptParent extends ScriptClass {}
}
