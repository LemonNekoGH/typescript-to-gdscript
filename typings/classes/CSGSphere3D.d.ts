// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A CSG Sphere shape. */
declare class CSGSphere3D extends CSGPrimitive3D {
  /** The material used to render the sphere. */
  material: Material | null;
  /** Number of vertical slices for the sphere. */
  radial_segments: int;
  /** Radius of the sphere. */
  radius: float;
  /** Number of horizontal slices for the sphere. */
  rings: int;
  /**
   * If `true` the normals of the sphere are set to give a smooth effect making the sphere seem rounded. If `false` the sphere will have a flat shaded look.
   */
  smooth_faces: boolean;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_radial_segments(value: int): void;
  get_radial_segments(): int;
  set_radius(value: float): void;
  get_radius(): float;
  set_rings(value: int): void;
  get_rings(): int;
  set_smooth_faces(value: boolean): void;
  get_smooth_faces(): boolean;
}
