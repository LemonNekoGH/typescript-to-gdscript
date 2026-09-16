export class MyClass extends Node {
  KIND_A: int = 1;

  stacked(value: int): int {
    switch (value) {
      case 1:
      case 2:
        return 0;
      case 3:
      case 4:
        return 1;
    }
    return -1;
  }

  stacked_into_default(value: int) {
    switch (value) {
      case 1:
      default:
        print('rest');
    }
  }

  trailing_empty(value: int) {
    switch (value) {
      case 1:
        print('one');
      case 2:
    }
  }

  // The shape `gd-to-ts` emits for a GDScript branch that has no
  // statement: an explicit empty block keeps the case off the one
  // below it, where a body-less `case` would stack onto it.
  blocked_empty_case(value: int) {
    switch (value) {
      case 1: {
      }
      case 2: {
        // only a comment
      }
      case 3: {
        // a note above the statement
        print('three');
        // and one below it
      }
      // An annotation attaches to the statement after it, so a branch
      // holding only one is still unfilled and needs `pass`.
      case 4: {
        // @gd.eval: @warning_ignore("unused_variable")
      }
    }
  }

  own_field_pattern(value: int) {
    switch (value) {
      case this.KIND_A:
        print('a');
    }
  }

  // A comment between two branches is leading trivia of the `case`
  // below it. Nothing inside a branch body reaches it, so the branch
  // itself has to emit it or it is dropped.
  //
  // It lands in the pattern section, where GDScript takes no
  // statement — so a block comment goes out as `#` here, not as the
  // `"""..."""` it becomes in a body. A bare string there would parse
  // as a pattern and take the branch's `:` with it.
  comment_between_branches(value: int) {
    switch (value) {
      // about the first branch
      case 1:
        print('one');
      /* about the branch below */
      case 2:
        print('two');
      /*
       * and one over
       * two lines
       */
      case 3:
        print('three');
    }
  }

  loop_break_in_case(value: int) {
    switch (value) {
      case 1:
        let i: int = 0;
        while (i < 10) {
          i += 1;
          if (i > 5) {
            break;
          }
        }
        print(i);
    }
  }

  empty_switch(value: int) {
    switch (value) {
    }
    print('after');
  }

  empty_switch_only(value: int) {
    switch (value) {
    }
  }

  // The discriminant goes with the dropped `switch`, side effects and
  // all — `bump()` is never called in the GDScript, and nothing is
  // reported. Accepted for now: an empty `switch` is dead code, and a
  // branchless `match` does not parse.
  empty_switch_call(value: int) {
    switch (this.bump(value)) {
    }
    print('after');
  }

  bump(value: int): int {
    return value + 1;
  }

  comment_only_if(value: int) {
    if (value > 0) {
      // just a note
    }
  }

  // GDScript has no multi-line comment, so each line gets its own
  // `##`. Written as one line with newlines in it, everything after
  // the first would sit at column 0 — ending the block, and reading
  // as a statement to the `pass` check.
  doc_comment_only_if(value: int) {
    if (value > 0) {
      /**
       * just a note
       * on two lines
       */
    }
  }

  // A comment after the last case's statements is trivia of the case
  // block's `}` — there is no `case` below it to carry it.
  trailing_comment_in_case(value: int) {
    switch (value) {
      case 1:
        print('one');
      // trailing note
    }
  }

  empty_switch_in_if(value: int) {
    if (value > 0) {
      switch (value) {
      }
    }
  }

  trailing_comment_in_if(value: int) {
    if (value > 0) {
      print('one');
      // trailing note
    }
  }

  match_empty_do(value: int) {
    gd.match(value, [
      {
        match: 1,
        do: () => {
          switch (value) {
          }
        },
      },
    ]);
  }
}
