// The base is the generated global wrapper, used without an import. The
// wrapper declares no constructor itself; `super(7)` still goes out as
// written, and reaches the `_init` of the script behind it.
export class SuperGlobalChild extends SuperScriptParent {
  constructor() {
    super(7);
  }
}
