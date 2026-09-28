export namespace ImplicitBase {
  export class Counter extends RefCounted {
    count(): int {
      return this.get_reference_count();
    }
  }
}

export class ImplicitBase extends RefCounted {
  // No `extends`: Godot's base is RefCounted, and its members are inherited
  // like any others — they read bare here and need `this.` in TypeScript.
  hit = gd.signal();

  connect_once(): void {
    this.hit.connect(this.connect_once, this.CONNECT_ONE_SHOT);
    print(this.get_reference_count(), this.NOTIFICATION_PREDELETE);
  }
}
