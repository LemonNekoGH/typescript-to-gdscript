// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A CSG Torus shape. */
declare class CSGTorus3D extends CSGPrimitive3D {
  /** The inner radius of the torus. */
  inner_radius: float;
  /** The material used to render the torus. */
  material: Material | null;
  /** The outer radius of the torus. */
  outer_radius: float;
  /** The number of edges each ring of the torus is constructed of. */
  ring_sides: int;
  /** The number of slices the torus is constructed of. */
  sides: int;
  /**
   * If `true` the normals of the torus are set to give a smooth effect making the torus seem rounded. If `false` the torus will have a flat shaded look.
   */
  smooth_faces: boolean;
  set_inner_radius(value: float): void;
  get_inner_radius(): float;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_outer_radius(value: float): void;
  get_outer_radius(): float;
  set_ring_sides(value: int): void;
  get_ring_sides(): int;
  set_sides(value: int): void;
  get_sides(): int;
  set_smooth_faces(value: boolean): void;
  get_smooth_faces(): boolean;
}
