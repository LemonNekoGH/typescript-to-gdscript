export class Functions extends RefCounted {
  no_args() {
  }

  with_args(a: int, b: string) {
    print(a, b);
  }

  with_return(): float {
    return 3.14;
  }

  with_default(name: string, hp: int = 100) {
    print(name, hp);
  }

  calculate(a: float, b: float): float {
    return a + b;
  }

  varargs_untyped(...args: any[]) {
  }

  varargs_typed(a: int, ...rest: Array<any>) {
  }

  optional_args(a: int = 0, b: unknown = null, c = '', d: Node | null = null) {
  }

  // `param := value` declares no type — GDScript infers one from the
  // default, and so does TypeScript.

  inferred_args(a = 1, b = 'x', c: unknown = null, d: int = 2) {
  }
}

