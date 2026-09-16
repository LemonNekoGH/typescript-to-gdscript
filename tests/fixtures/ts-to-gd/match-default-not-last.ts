export class MatchDefaultNotLast extends Node {
  // `default` becomes `_`, which matches everything, so in GDScript it
  // has to come last or nothing below it can run. TypeScript reaches
  // `default` only when no `case` matches, wherever it sits, so moving
  // the branch to the end is what preserves the meaning.
  first(value: int) {
    switch (value) {
      default:
        print('other');
      case 2:
        print('two');
      case 3:
        print('three');
    }
  }

  // `default` inside a run of empty clauses stacks onto the body below
  // it, so the whole run is one `_` branch — and that branch moves.
  in_run(value: int) {
    switch (value) {
      case 1:
      default:
      case 2:
        print('two');
      case 3:
        print('three');
    }
  }

  // `default` and everything after it are empty, so the run collapses
  // to a bodyless `_`. Already last; nothing to move.
  trailing_empty(value: int) {
    switch (value) {
      case 1:
        print('one');
      default:
      case 9:
    }
  }

  // A comment attached to the moved branch travels with it.
  with_comment(value: int) {
    switch (value) {
      // about the fallback
      default:
        print('other');
      case 1:
        print('one');
    }
  }
}
