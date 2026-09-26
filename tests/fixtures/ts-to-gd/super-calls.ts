export class SuperCalls extends Node2D {
  // TypeScript forces `super()` on a derived constructor. GDScript
  // rejects it against an engine base — `_init` is a virtual, a slot
  // the engine calls rather than code it provides — and there is no
  // parent `_init` whose run would be lost, so it is dropped.
  constructor() {
    super();
    print("built");
  }

  // A regular engine method DOES have an implementation behind it, so
  // `super` reaches it.
  engine_method(): Node {
    return super.get_child(0);
  }
}
