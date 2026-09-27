// A class of your own named `GodotObject` is yours: only the typings'
// engine class goes out as GDScript's `Object`.
export class GodotObject extends Node {
  twin: GodotObject | null = null;

  make(): GodotObject {
    return new GodotObject();
  }
}
