export class MyClass extends Node {
  test_dict() {
    let key1 = "key";
    let key2 = Vector2.DOWN;
    let key3 = new Node2D();
    let dict = gd.dict([
      [key1, "value"],
      [key2, "value"],
      [key3, "value"],
      ["key", "value"],
    ]);
    let dict2 = gd.dict([
      [key1, "value"],
      ["key2", "value"],
    ]);
    let s1 = "key1";
    let s2 = "key2";
    let dict3 = {
      [s1 + "_" + s2 + str(1)]: "value",
      [s1[0]]: "value",
      [s2.left(2)]: "value",
      [s2.left(2) + s1.left(1)]: "value",
    };
    // A Lua-style key is a name, not a variable: `key1` here is the
    // StringName &"key1", whatever the variable key1 holds.
    let lua = {
      [StringName('key1')]: "value",
      [StringName('hp')]: 3,
    };
    print(dict, dict2, dict3, lua);
  }
}
