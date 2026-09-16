export class Foo extends Node {
  test() {
    let x = undefined;
  }

  // A case label is an ordinary expression, so the restriction holds
  // there too. `gd.match` spells its wildcard `undefined`, and reading
  // a label that way would make this branch a catch-all and the one
  // below it dead.
  in_case(value: int) {
    switch (value) {
      case undefined:
        print('u');
      case 1:
        print('one');
    }
  }
}
