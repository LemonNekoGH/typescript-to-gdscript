// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the queries mesh3d result data. */
declare class OpenXRSpatialComponentMesh3DList extends OpenXRSpatialComponentData {
  /** Returns the mesh for the entity at this `index`. */
  get_mesh(index: int): Mesh | null;
  /** Returns the transform for positioning our mesh for the entity at this `index`. */
  get_transform(index: int): Transform3D;
}
