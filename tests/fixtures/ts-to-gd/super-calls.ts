export class SuperCalls extends Node2D {
  // `super()` is optional in a constructor: GDScript's `_init` has no
  // JavaScript rule demanding it. Directly under an engine class there is
  // no parent `_init` to call at all, and a `super()` here would be
  // Godot's parse error to report.
  constructor() {
    print("built");
  }

  // A regular engine method DOES have an implementation behind it, so
  // `super` reaches it.
  engine_method(): Node | null {
    return super.get_child(0);
  }
}
