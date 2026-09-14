// An anonymous script class (the `_Name` convention emits no
// `class_name`) whose inner class reaches back to an outer static.
// Neither GDScript fallback works here: `self` is the Inner instance,
// and the bare name is out of scope inside `class Inner:`.
export namespace __CLASS__ {
  export class Inner {
    static read_static(): int {
      return __CLASS__.OUTER;
    }

    read_instance(): int {
      return __CLASS__.OUTER;
    }
  }
}

export class __CLASS__ extends Node {
  static OUTER: int = 5;
}
