// An anonymous class has no `class_name` and a `static` member has no
// `self`, leaving only the bare name — which a same-named parameter
// or local captures silently. Godot accepts the result, so the
// converter has to be the one to notice.
export class __CLASS__ extends Node {
  static LIMIT: int = 10;

  static clamp_to(LIMIT: int): int {
    return __CLASS__.LIMIT + LIMIT;
  }
}
