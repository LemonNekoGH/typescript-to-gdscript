export class DictGenerics extends Node {
  data_ready = gd.signal<[Dictionary<string, int>]>();
  untyped: Dictionary = {};
  simple: Dictionary<string, int> = {};
  name_keys: Dictionary<string, Node2D> = {};

  process(data: Dictionary<string, int>): Dictionary<int, string> {
    let local: Dictionary<string, Node2D> = {};
    return {};
  }

  // A class key: the pipeline's post-pass turns each empty `{}` into
  // `gd.dict([])`, which TypeScript accepts as a typed dictionary.
  by_node: Dictionary<Node, int> = {};

  fresh(): Dictionary<Node, float> {
    let nodes: Dictionary<Node, float> = gd.dict([
      [this, 1.0],
    ]);
    nodes = {};
    return {};
  }
}
