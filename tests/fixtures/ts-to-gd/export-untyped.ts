// A TS-only shape: the converter cannot prove a GDScript type for it,
// so the annotation is dropped.
interface UnknownAddonThing {
  x: int;
}

export class ExportUntyped extends Node {
  // Bare `@export` is the one annotation that needs the type spelled
  // out: with no type AND no initializer Godot answers `Cannot use
  // simple "@export" annotation with variable without type or
  // initializer`. `Variant` is what an untyped GDScript variable
  // already is, so it changes nothing but makes the file load.
  @exports unprovable!: UnknownAddonThing;

  // An initializer gives Godot a type to infer, so nothing is added.
  @exports with_initializer = 1;

  // A provable type is emitted as itself.
  @exports provable: float = 1.0;

  // The typed export annotations carry the type themselves and accept
  // an untyped variable, so they are left alone.
  @export_range(0, 10) ranged!: UnknownAddonThing;
  @export_node_path('Node2D') path_export!: UnknownAddonThing;

  // Without `@export` a bare `var` is perfectly valid.
  plain!: UnknownAddonThing;
}
