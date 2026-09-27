// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the queries marker result data. */
declare class OpenXRSpatialComponentMarkerList extends OpenXRSpatialComponentData {
  /**
   * Returns either a {@link String} or a {@link PackedByteArray} buffer with data for the marker at this `index`. Only applicable for QR code markers.
   */
  get_marker_data(snapshot: RID, index: int): unknown;
  /**
   * Returns the marker ID for the marker at this `index`. Only applicable for Aruco or April Tag markers.
   */
  get_marker_id(index: int): int;
  /** Returns the marker type for the marker at this `index`. */
  get_marker_type(index: int): int;

  // enum MarkerType
  /** Unknown or unset marker type. */
  static readonly MARKER_TYPE_UNKNOWN: int;
  /** Marker based on a QR code. */
  static readonly MARKER_TYPE_QRCODE: int;
  /** Marker based on a micro QR code. */
  static readonly MARKER_TYPE_MICRO_QRCODE: int;
  /** Marker based on an Aruco code. */
  static readonly MARKER_TYPE_ARUCO: int;
  /** Marker based on an April Tag. */
  static readonly MARKER_TYPE_APRIL_TAG: int;
  /** Maximum value for this enum. */
  static readonly MARKER_TYPE_MAX: int;
}
