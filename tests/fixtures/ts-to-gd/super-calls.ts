export class SuperCalls extends Node2D {
  // `super()` is optional here, but when written against a provable
  // engine base it has nothing to call — `_init` is a virtual, a slot
  // the engine calls rather than code it provides — and Godot rejects
  // it. No parent `_init` runs either way, so it is dropped.
  constructor() {
    super();
    print("built");
  }

  // A regular engine method DOES have an implementation behind it, so
  // `super` reaches it.
  engine_method(): Node | null {
    return super.get_child(0);
  }
}
