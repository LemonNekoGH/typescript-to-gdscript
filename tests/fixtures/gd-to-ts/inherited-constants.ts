export class InheritedConstants extends Control {
  // GDScript reads an engine class's constants and enum values bare in any
  // subclass. TypeScript reaches them through `this`, as statics.
  hit = gd.signal();

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

  static flags(): int {
    return this.NOTIFICATION_READY + this.CONNECT_ONE_SHOT;
  }
}
