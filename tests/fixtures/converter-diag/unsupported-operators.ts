export class UnsupportedOperators extends RefCounted {
  flag: boolean = true;

  // GDScript has no counterpart for any of these, so each is reported
  // rather than guessed at.
  run(k: int): void {
    let unsigned = k >>> 1;
    this.flag &&= false;
    this.flag ||= true;
    let pair = (k, 5);
    // `+= 1` is a statement in GDScript, so there is no value to read.
    let before = k++;
    let after = --k;
    print(unsigned, pair, before, after);
  }
}
