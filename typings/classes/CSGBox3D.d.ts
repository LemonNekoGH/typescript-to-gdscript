// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A CSG Box shape. */
declare class CSGBox3D extends CSGPrimitive3D {
  /** The material used to render the box. */
  material: Material | null;
  /** The box's width, height and depth. */
  size: Vector3;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_size(value: Vector3 | Vector3i): void;
  get_size(): Vector3;
}
