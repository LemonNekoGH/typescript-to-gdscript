// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Spatial entity tracker for our spatial entity plane tracking extension. */
declare class OpenXRPlaneTracker extends OpenXRSpatialEntityTracker {
  /** The bounding size of the plane. This is a 2D size. */
  bounds_size: Vector2;
  /** The main alignment in space of this plane. */
  plane_alignment: int;
  /** The semantic label for this plane. */
  plane_label: string;
  set_bounds_size(value: Vector2 | Vector2i): void;
  get_bounds_size(): Vector2;
  set_plane_alignment(value: int): void;
  get_plane_alignment(): int;
  set_plane_label(value: string | NodePath): void;
  get_plane_label(): string;

  /**
   * Clears the mesh data for this tracker. You should only call this if you are handling your own discovery logic.
   */
  clear_mesh_data(): void;
  /** Gets a mesh created from either the mesh data or from our bounding size for this plane. */
  get_mesh(): Mesh | null;
  /**
   * Gets the transform by which to offset the mesh and collision shape from our pose to display these correctly.
   */
  get_mesh_offset(): Transform3D;
  /** Gets a collision shape built either from the mesh data or from our bounding size for this plane. */
  get_shape(thickness?: float): Shape3D | null;
  /**
   * Sets the mesh data for this plane. You should only call this if you are handling your own discovery logic.
   */
  set_mesh_data(origin: Transform3D | Projection, vertices: PackedVector2Array | Array<unknown>, indices?: PackedInt32Array | Array<unknown>): void;

  /** Emitted when our mesh data has changed the mesh instance and collision needs to be updated. */
  mesh_changed: Signal<[]>;
}
