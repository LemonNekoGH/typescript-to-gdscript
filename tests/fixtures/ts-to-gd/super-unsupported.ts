export class SuperUnsupported extends Node2D {
  // A virtual is a slot the engine calls, not code it provides, so
  // `super` has nothing to reach and Godot rejects the call. Like
  // every rejected construct this emits only its marker, and the
  // emptied body falls back to `pass`.
  _ready(): void {
    super._ready();
  }
}
