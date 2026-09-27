// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A CSG Cylinder shape. */
declare class CSGCylinder3D extends CSGPrimitive3D {
  /** If `true` a cone is created, the {@link radius} will only apply to one side. */
  cone: boolean;
  /** The height of the cylinder. */
  height: float;
  /** The material used to render the cylinder. */
  material: Material | null;
  /** The radius of the cylinder. */
  radius: float;
  /**
   * The number of sides of the cylinder, the higher this number the more detail there will be in the cylinder.
   */
  sides: int;
  /**
   * If `true` the normals of the cylinder are set to give a smooth effect making the cylinder seem rounded. If `false` the cylinder will have a flat shaded look.
   */
  smooth_faces: boolean;
  set_cone(value: boolean): void;
  is_cone(): boolean;
  set_height(value: float): void;
  get_height(): float;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_radius(value: float): void;
  get_radius(): float;
  set_sides(value: int): void;
  get_sides(): int;
  set_smooth_faces(value: boolean): void;
  get_smooth_faces(): boolean;
}
