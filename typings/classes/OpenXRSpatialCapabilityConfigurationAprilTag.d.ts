// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Configuration header for April tag markers. */
declare class OpenXRSpatialCapabilityConfigurationAprilTag extends OpenXRSpatialCapabilityConfigurationBaseHeader {
  /**
   * Dictionary to use to decode April tags.
   * **Note:** Must be set before using this configuration to create a spatial context.
   */
  april_dict: int;
  set_april_dict(value: int): void;
  get_april_dict(): int;

  /**
   * Returns the components enabled by this configuration.
   * **Note:** Only valid after this configuration was used to create a spatial context.
   */
  get_enabled_components(): PackedInt64Array;

  // enum AprilTagDict
  /** 4 by 4 bits, minimum Hamming distance between any two codes = 5, 30 codes. */
  static readonly APRIL_TAG_DICT_16H5: int;
  /** 5 by 5 bits, minimum Hamming distance between any two codes = 9, 35 codes. */
  static readonly APRIL_TAG_DICT_25H9: int;
  /** 6 by 6 bits, minimum Hamming distance between any two codes = 10, 2320 codes. */
  static readonly APRIL_TAG_DICT_36H10: int;
  /** 6 by 6 bits, minimum Hamming distance between any two codes = 11, 587 codes. */
  static readonly APRIL_TAG_DICT_36H11: int;
}
