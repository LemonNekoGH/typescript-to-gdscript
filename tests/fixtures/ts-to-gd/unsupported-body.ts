export class UnsupportedBody extends Node {
  // Two kinds of statement produce no GDScript, and a body has to
  // handle both. A REJECTED one emits only an `# ERROR:` marker, and a
  // comment does not fill an indented block — so the body still needs
  // `pass` for the `--emit-on-error` output to parse.
  rejected_body(value: int) {
    if (value > 0) {
      throw new Error('boom');
    }
  }

  // A TYPE-ONLY one is erased outright, with no diagnostic: it has no
  // runtime meaning, so there is nothing to convert and nothing to
  // report. Same rule file scope and namespaces already apply.
  type_only_body(value: int) {
    type Inner = int;
    interface Local {
      a: int;
    }
    let x: Inner = value;
    print(x);
  }

  // A rejected `break` marks the branch it was written in, not the
  // line above the `match` — the marker goes where the emitter is, so
  // reporting has to happen while the branch is being emitted.
  switch_break_marker(value: int) {
    switch (value) {
      case 1:
        print('one');
        break;
      case 2:
        break;
    }
  }

  // Erased down to nothing, so the block still needs `pass`.
  type_only_alone(value: int) {
    if (value > 0) {
      type Inner = int;
    }
  }
}
