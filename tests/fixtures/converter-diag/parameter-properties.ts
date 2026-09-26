export class ParameterProperties extends RefCounted {
  // Each modifier makes a parameter a property — GDScript has none of
  // them, so every one is reported, on the parameter itself.
  constructor(
    public speed: int,
    private readonly name: String,
    plain: int,
  ) {
    print(plain);
  }
}
