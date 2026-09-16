export class Foo extends Node {
  run(): void {
    this.side_effect();
  }

  side_effect(): void {}

  discard(): void {
    void this.side_effect();
  }

  discard_as_value(): void {
    const x = void this.side_effect();
    print(x);
  }
}
