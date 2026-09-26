// The script typings the generator emits for every script class
// (`types/<Name>.gd.d.ts`), cut down to the parts the fixtures rely on.
// The fixture program loads the engine typings but not these, so each
// shape a fixture needs is mirrored here from `content-generators.ts`.
import type { SuperScriptParent as ScriptClass } from './super-script-parent';

declare global {
  // Makes `SuperScriptParent` usable without an import. Ambient but NOT
  // an engine class, so `super` resolution must follow it through to
  // the script behind it rather than read it as a dead end.
  class SuperScriptParent extends ScriptClass {}

  // What `preload("res://super-script-parent.gd")` returns — without it
  // `preload` falls back to its `Resource` overload, and
  // `extends preload(...)` is not a constructor type (TS2507).
  interface GodotResources {
    'res://super-script-parent.gd': typeof ScriptClass;
  }
}
