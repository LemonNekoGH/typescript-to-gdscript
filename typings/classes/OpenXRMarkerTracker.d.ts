// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Spatial entity tracker for our spatial entity marker tracking extension. */
declare class OpenXRMarkerTracker extends OpenXRSpatialEntityTracker {
  /** The bounds size for this marker. */
  bounds_size: Vector2;
  /**
   * The marker ID for this marker, this is only returned for Aruco and April Tag markers. Call {@link get_marker_data} for QRCode markers.
   */
  marker_id: int;
  /** The type of marker. */
  marker_type: int;
  set_bounds_size(value: Vector2 | Vector2i): void;
  get_bounds_size(): Vector2;
  set_marker_id(value: int): void;
  get_marker_id(): int;
  set_marker_type(value: int): void;
  get_marker_type(): int;

  /**
   * Returns the marker data for this marker. This can return a {@link String} or {@link PackedByteArray}. Only applicable to QR Code based markers.
   */
  get_marker_data(): unknown;
  /**
   * Sets the marker data for this marker.
   * **Note:** This should only be set by marker discovery logic.
   */
  set_marker_data(marker_data: unknown): void;
}
