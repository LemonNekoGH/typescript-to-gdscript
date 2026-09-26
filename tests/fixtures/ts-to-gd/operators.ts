export class MyClass extends Node {
  test_arithmetic() {
    let a: int = 10;
    let b: int = 3;
    let sum = a + b;
    let diff = a - b;
    let prod = a * b;
    let quot = a / b;
    let remainder = a % b;
    let power = a ** b;
  }

  test_comparison() {
    let x: int = 5;
    let is_equal = x === 5;
    let not_equal = x !== 3;
    let greater = x > 3;
    let less = x < 10;
    let gte = x >= 5;
    let lte = x <= 5;
  }

  test_logical() {
    let a: boolean = true;
    let b: boolean = false;
    let and_result = a && b;
    let or_result = a || b;
    let not_result = !a;
  }

  test_assignment() {
    let x: int = 10;
    x += 5;
    x -= 3;
    x *= 2;
    x /= 4;
    x %= 3;
  }

  test_vector_math() {
    let v1 = Vector2(1, 2);
    let v2 = Vector2(3, 4);
    let v3 = gd.ops.add(v1, v2);
    let v4 = gd.ops.mul(v1, v2);
    let v5 = gd.ops.sub(v1, v2);
    let vi1 = Vector2i(10, 20);
    let vi2 = Vector2i(3, 7);
    let vi3 = gd.ops.rem(vi1, vi2);
    let vi4 = gd.ops.rem(vi1, 3);
  }

  // `gd.ops` builds the operator expression itself, so an operand that is
  // already infix has to be parenthesised — nothing in the TS source marks
  // where it ends. Verified against Godot: `v * a + b` groups as `(v * a) + b`
  // and `v * a if c else b` as `(v * a) if c else b`, both wrong.
  test_ops_operand_precedence(cond: boolean) {
    let v = Vector2(1, 2);
    let vi = Vector2i(3, 4);
    let binary = gd.ops.mul(v, 1.0 + 2.0);
    let ternary = gd.ops.mul(v, cond ? 1.0 : 2.0);
    let cast = gd.ops.add(v, gd.as(vi, Vector2));
    let plain = gd.ops.mul(v, 2.0);
  }

  test_array_concat() {
    let a1 = [0, 1];
    let a2 = ['a', 'b'];
    let a3 = gd.ops.add(a1, a2);
  }

  test_multipple_vector_math() {
    let v3 = gd.ops.add(gd.ops.add(this.v1, this.v2), this.v1);
    let v4 = gd.ops.sub(gd.ops.mul(this.v1, this.v2), this.v1);
    let v5 = gd.ops.add(gd.ops.sub(this.v1, gd.ops.mul(this.v2, this.v2)), gd.ops.div(this.v1, this.v2));
    let v6 = gd.ops.add(gd.ops.sub(this.v1, 2 * 1), gd.ops.div(this.v1, this.v2));
  }
}
