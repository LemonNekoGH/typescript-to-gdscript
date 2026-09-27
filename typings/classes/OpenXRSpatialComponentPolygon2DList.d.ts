// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the queries polygon2d result data. */
declare class OpenXRSpatialComponentPolygon2DList extends OpenXRSpatialComponentData {
  /** Returns the transform for positioning our polygon for the entity at this `index`. */
  get_transform(index: int): Transform3D;
  /** Returns the polygon vertices for the entity at this `index`. */
  get_vertices(snapshot: RID, index: int): PackedVector2Array;
}
