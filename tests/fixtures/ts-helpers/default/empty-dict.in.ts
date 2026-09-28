// A class-keyed typed dictionary is a method surface in the typings, and
// no object literal has its typed `find_key`, so the `{}` GDScript wrote
// is refused (TS2322). `gd.dict([])` is the same empty dictionary and
// takes its types from where it goes. String keys keep the literal.
export class TestEmptyDict extends Node {
  by_node: Dictionary<Node, int> = {};
  by_name: Dictionary<string, int> = {};
  untyped: Dictionary = {};

  take(d: Dictionary<Node, int> = {}): void {
    print(d);
  }

  fresh(): Dictionary<Node, float> {
    let local: Dictionary<Node, float> = {};
    local = {};
    return {};
  }
}
