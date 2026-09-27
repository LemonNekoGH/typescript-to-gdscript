export class Lambda extends Node {
  test_lambda() {
    let double = (x: int): int => x * 2;
    let greet = () => { print("hello"); };
  }

  call_lambda(): int {
    // `call` and `bind` keep the lambda's own types: its parameters, its
    // return, and Godot's bind from the end.
    let double = (x: int): int => x * 2;
    let add = (a: int, b: int): int => a + b;
    let add_one = add.bind(1);
    return double.call(3) + add_one.call(2);
  }
}
