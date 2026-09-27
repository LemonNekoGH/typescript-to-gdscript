// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the queries plane alignment result data. */
declare class OpenXRSpatialComponentPlaneAlignmentList extends OpenXRSpatialComponentData {
  /** Returns the plane alignment for the parent entity at this `index`. */
  get_plane_alignment(index: int): int;

  // enum PlaneAlignment
  /** Plane is facing upward. */
  static readonly PLANE_ALIGNMENT_HORIZONTAL_UPWARD: int;
  /** Plane is facing downwards. */
  static readonly PLANE_ALIGNMENT_HORIZONTAL_DOWNWARD: int;
  /** Plane is vertically aligned. */
  static readonly PLANE_ALIGNMENT_VERTICAL: int;
  /** Plane has an arbitrary alignment. */
  static readonly PLANE_ALIGNMENT_ARBITRARY: int;
}
