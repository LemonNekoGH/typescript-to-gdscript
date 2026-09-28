export class UnsupportedBody extends Node {
  // A parameter property is rejected, but the parameter itself is fine:
  // it stays in the signature, and the marker goes inside the body,
  // where the missing assignment belongs. The body still needs `pass`.
  constructor(public speed: int) {}

  // Two kinds of statement produce no GDScript, and a body has to
  // handle both. A REJECTED one emits only an `# ERROR:` marker, and a
  // comment does not fill an indented block — so the body still needs
  // `pass` for the `--emit-on-error` output to parse.
  rejected_body(value: int) {
    if (value > 0) {
      throw 'boom';
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

  // A rejected OPERATOR leaves `null` where its value would go: the
  // operator itself would fail the whole `--emit-on-error` file in Godot.
  rejected_operators(k: int): void {
    let unsigned = k >>> 1;
    let before = k++;
    print(unsigned, before);
  }

  // Erased down to nothing, so the block still needs `pass`.
  type_only_alone(value: int) {
    if (value > 0) {
      type Inner = int;
    }
  }
}
