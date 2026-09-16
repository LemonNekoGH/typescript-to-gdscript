export class Foo extends Node {
  // A labeled `break` targets its label, not the `switch`. GDScript
  // has no labels, so the labeled statement is rejected as a unit and
  // its body is never visited.
  labeled_break(x: number) {
    outer: for (let i: int = 0; i < 3; i += 1) {
      switch (x) {
        case 1:
          break outer;
      }
    }
  }

  // Same for `continue`: emitted bare it would bind to the inner
  // loop rather than the labeled one.
  labeled_continue(x: number) {
    outer: for (let i: int = 0; i < 3; i += 1) {
      for (let j: int = 0; j < 3; j += 1) {
        continue outer;
      }
    }
  }
}
