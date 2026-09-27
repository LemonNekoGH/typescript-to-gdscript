// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the queries bounded3d result data. */
declare class OpenXRSpatialComponentBounded3DList extends OpenXRSpatialComponentData {
  /** Returns the center of our bounding box for the entity at this `index`. */
  get_center_pose(index: int): Transform3D;
  /** Returns the size of our bounding box for the entity at this `index`. */
  get_size(index: int): Vector3;
}
