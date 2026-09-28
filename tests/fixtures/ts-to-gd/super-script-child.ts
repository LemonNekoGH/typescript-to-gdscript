import { SuperScriptParent } from './super-script-parent.ts';

// Imported script base: the constructor call and the method call go out
// as written, and both reach code the parent declares.
export class SuperScriptChild extends SuperScriptParent {
  constructor(hp: int) {
    super(hp);
  }

  hook(x: int): int {
    return super.hook(x) + 1;
  }
}
