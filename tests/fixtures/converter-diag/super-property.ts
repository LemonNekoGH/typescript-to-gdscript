export class SuperProperty extends Node2D {
  // GDScript's `super` may only be followed by a call — `super.name`
  // is `Expected "(" after function name`, whatever the member is.
  read(): String {
    return super.name;
  }

  write(): void {
    super.name = 'x';
  }
}
