export class Foo extends Node {
  // Bound straight to the `switch`.
  simple(x: number) {
    switch (x) {
      case 1:
        print('one');
        break;
      default:
        print('other');
    }
  }

  // Nested in an `if`, still bound to the `switch`. Dropping it would
  // start running `print('after')`, which is why tail position is not
  // treated as a special case.
  inside_if(x: number) {
    switch (x) {
      case 1:
        if (x > 0) {
          break;
        }
        print('after');
      default:
        print('other');
    }
  }

  // The `switch` sits in a loop. The `break` still binds to the
  // `switch` — emitted bare in GDScript it would exit the `while`.
  switch_in_loop(x: number) {
    while (x > 0) {
      switch (x) {
        case 1:
          break;
      }
      x -= 1;
    }
  }

  // Bound to the INNER `switch`, and reported once: the outer walk
  // must not also claim a `break` that a nested `switch` owns.
  nested_switch(x: number) {
    switch (x) {
      case 1:
        switch (x) {
          case 2:
            break;
        }
        print(x);
    }
  }

  // The negative case. This `break` belongs to a loop INSIDE the
  // case, where it still means "exit the loop" — exactly as in
  // GDScript — so it converts untouched and reports nothing.
  loop_inside_case(x: number) {
    switch (x) {
      case 1:
        let i: number = 0;
        while (i < 10) {
          i += 1;
          if (i > 5) {
            break;
          }
        }
        print(i);
    }
  }
}
