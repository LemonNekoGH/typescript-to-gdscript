export namespace ConstClass {
  export const MAX_HP = 100;
}

export class ConstClass extends Node {
  get_health() {
    return ConstClass.MAX_HP;
  }

  // A `const` inside a function body is a local binding, not a class
  // member — the class-scope emitter never sees this one.

  local_consts(scale: float): float {
    const LIMIT = 10;
    const NAME: string = "x";
    print(NAME);
    return LIMIT * scale;
  }
}

