export namespace __CLASS__ {
  export enum Mode { EASY, HARD }

  export namespace Config {
    export enum HARD { A, B}

    export namespace Inner {
      const TYPE = 'inner'
    }
    export class Inner {
      static VAL = 10;
    }
  }
  export class Config extends RefCounted {
    difficulty: int = 0;
  }
}

export class __CLASS__ extends Node {
  static MAX_HEALTH = 100;

  get_health() {
    return __CLASS__.MAX_HEALTH;
  }

  set_mode(m: __CLASS__.Mode, c: __CLASS__.Config) {
    let mode: __CLASS__.Mode = __CLASS__.Mode.EASY;
  }

  // Anonymous class: no `class_name` to reference, and no `self` inside
  // `static func` — class-level members resolve as bare identifiers.
  static max_health(): int {
    return __CLASS__.MAX_HEALTH;
  }
}
