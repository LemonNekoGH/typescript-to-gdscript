// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the queries plane semantic label result data. */
declare class OpenXRSpatialComponentPlaneSemanticLabelList extends OpenXRSpatialComponentData {
  /** Returns the plane semantic label for the parent entity at this `index`. */
  get_plane_semantic_label(index: int): int;

  // enum PlaneSemanticLabel
  /** Uncategorized plane. */
  static readonly PLANE_SEMANTIC_LABEL_UNCATEGORIZED: int;
  /** Plane represents a floor. */
  static readonly PLANE_SEMANTIC_LABEL_FLOOR: int;
  /** Plane represents a wall. */
  static readonly PLANE_SEMANTIC_LABEL_WALL: int;
  /** Plane represents a ceiling. */
  static readonly PLANE_SEMANTIC_LABEL_CEILING: int;
  /** Plane represents the surface of a table. */
  static readonly PLANE_SEMANTIC_LABEL_TABLE: int;
}
