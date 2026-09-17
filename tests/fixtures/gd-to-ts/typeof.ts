export class TypeofRoundTrip extends Node {
  describe(value: any): string {
    let kind: Variant.Type = gd.typeof(value);
    if (kind === Variant.Type.TYPE_INT) {
      return "int";
    }
    return type_string(gd.typeof(value));
  }

  compare(op: Variant.Operator): boolean {
    return op === Variant.Operator.OP_EQUAL;
  }

  pressed(key: Key): boolean {
    return key === Key.KEY_A;
  }
}
