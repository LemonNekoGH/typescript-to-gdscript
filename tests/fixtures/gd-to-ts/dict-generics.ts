export class DictGenerics extends Node {
  data_ready = gd.signal<[Dictionary<string, int>]>();
  untyped: Dictionary = {};
  simple: Dictionary<string, int> = {};
  name_keys: Dictionary<string, Node2D> = {};

  process(data: Dictionary<string, int>): Dictionary<int, string> {
    let local: Dictionary<string, Node2D> = {};
    return {};
  }
}
