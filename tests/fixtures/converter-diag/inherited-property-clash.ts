// `name` and `owner` are properties of Node. GDScript cannot redefine
// an inherited property, so these must be reported, not emitted.
// `_ready` is a METHOD — overriding one is ordinary GDScript and must
// stay silent.
export class InheritedPropertyClash extends Node {
  name: string = "Player";
  owner: Node = null;
  player_name: string = "ok";

  _ready() {}
}
