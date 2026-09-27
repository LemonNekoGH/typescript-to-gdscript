export class InheritedConstants extends Control {
  // GDScript reads an engine class's constants and enum values bare in any
  // subclass. TypeScript reaches them through `this`, as statics.
  hit = gd.signal();
  // An engine class's enum is no TypeScript type — the typings declare only
  // its values, as ints — so an annotation naming one becomes `int`.
  mode: int = this.PROCESS_MODE_INHERIT;

  _ready(): void {
    // A constant from Node, an enum value from Object, one from Control.
    print(this.NOTIFICATION_READY);
    this.hit.connect(this._on_hit, this.CONNECT_ONE_SHOT);
    this.set_anchors_preset(this.PRESET_FULL_RECT);
    // A global enum value is not inherited — it names its enum instead.
    print(HorizontalAlignment.HORIZONTAL_ALIGNMENT_LEFT);
    // A local shadows the inherited name.
    let CONNECT_DEFERRED = 3;
    print(CONNECT_DEFERRED);
  }

  _on_hit(): void {
  }

  preset_for(anchors: int): int {
    print(anchors);
    return this.mode;
  }

  static flags(): int {
    return this.NOTIFICATION_READY + this.CONNECT_ONE_SHOT;
  }
}
