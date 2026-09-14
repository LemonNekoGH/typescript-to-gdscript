export class MyClass extends Node {
  static MAX_SPEED: float = 200.0;
  static instance_count: int = 0;

  // A static initializer reading another static. `self` is `Nil` while
  // statics initialize, so this can only go through the class name.
  static SPEED_LIMIT: float = MyClass.MAX_SPEED;

  // Static field holding a Callable — invoked with `.call()`.
  static on_spawn = (name: string) => {
    print(name);
  }

  static get_max_speed(): float {
    return MyClass.MAX_SPEED;
  }

  static increment_count() {
    MyClass.instance_count += 1;
  }

  // `this` inside a static method is the class itself in TS, and
  // GDScript has no `self` inside `static func`.
  static reset() {
    this.instance_count = 0;
    return this.get_max_speed();
  }

  // A lambda inside a static func is still static context — a GDScript
  // lambda captures `self` lexically, and there is none to capture.
  static speed_getter(): () => float {
    return () => MyClass.MAX_SPEED;
  }

  static spawn() {
    MyClass.on_spawn("player");
  }

  // Instance context reaches statics through the class name too.
  current_speed(): float {
    return MyClass.MAX_SPEED;
  }
}
