import { SuperScriptParent } from './super-script-parent.ts';

// Imported script base: both the constructor call and the method call
// resolve to code the parent declares, so both are kept.
export class SuperScriptChild extends SuperScriptParent {
  constructor(hp: int) {
    super(hp);
  }

  hook(x: int): int {
    return super.hook(x) + 1;
  }
}
