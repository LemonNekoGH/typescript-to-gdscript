export class MyClass extends Node {
  test_casting() {
    let node: Node = this;
    let sprite = gd.as(node, Sprite2D);
    if (sprite !== null) {
      print("It is a Sprite2D");
    }

    let satisfies = 'string' satisfies string;
  }

  // `as` binds looser than `.`, `()` and `[]`, so a cast standing as the
  // receiver of one of them has to be parenthesised — `node as Sprite2D.texture`
  // reads as `node as (Sprite2D.texture)` and Godot rejects it.
  test_cast_receiver(node: Node, packed: PackedInt32Array) {
    let texture = gd.as(node, Sprite2D).texture;
    let rid = gd.as(node, Sprite2D).get_rid();
    let first = gd.as(packed, PackedInt32Array)[0];
  }

  // Every other position leaves the cast bare.
  test_cast_bare(node: Node) {
    print(gd.as(node, Sprite2D));
    let same = gd.as(node, Sprite2D) === null;
    let list = [gd.as(node, Sprite2D)];
  }
}
