export class ArgumentComments extends Node {
  calc(a: float, b: float, c: float): float {
    return a + b + c;
  }

  run(): void {
    // A `#` comment between the arguments of a call spanning several
    // lines is a sibling of the arguments in the tree, so it reaches the
    // expression emitter even though it carries no value.
    let total: float = this.calc(1.0 /* first */, 2.0 /* second */, 3.0);
    let list: Array<any> = [1 /* one */, 2];
    print(total, list);
    // trailing
  }
}

