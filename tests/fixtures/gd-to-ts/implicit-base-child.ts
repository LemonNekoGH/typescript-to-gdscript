export class ImplicitBaseChild extends ImplicitBase {
  // The base class names no `extends` either; the chain still ends at RefCounted.

  count(): int {
    return this.get_reference_count();
  }
}
