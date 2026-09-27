// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the queries mesh2d result data. */
declare class OpenXRSpatialComponentMesh2DList extends OpenXRSpatialComponentData {
  /** Returns the mesh indices for the entity at this `index`. */
  get_indices(snapshot: RID, index: int): PackedInt32Array;
  /** Returns the transform for positioning our mesh for the entity at this `index`. */
  get_transform(index: int): Transform3D;
  /** Returns the mesh vertices for the entity at this `index`. */
  get_vertices(snapshot: RID, index: int): PackedVector2Array;
}
