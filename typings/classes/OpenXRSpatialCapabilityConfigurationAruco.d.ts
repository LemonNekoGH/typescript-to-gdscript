// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Configuration header for Aruco markers. */
declare class OpenXRSpatialCapabilityConfigurationAruco extends OpenXRSpatialCapabilityConfigurationBaseHeader {
  /**
   * Dictionary to use to decode Aruco markers.
   * **Note:** Must be set before using this configuration to create a spatial context.
   */
  aruco_dict: int;
  set_aruco_dict(value: int): void;
  get_aruco_dict(): int;

  /**
   * Returns the components enabled by this configuration.
   * **Note:** Only valid after this configuration was used to create a spatial context.
   */
  get_enabled_components(): PackedInt64Array;

  // enum ArucoDict
  /** 4 by 4 pixel Aruco marker dictionary with 50 IDs. */
  static readonly ARUCO_DICT_4X4_50: int;
  /** 4 by 4 pixel Aruco marker dictionary with 100 IDs. */
  static readonly ARUCO_DICT_4X4_100: int;
  /** 4 by 4 pixel Aruco marker dictionary with 250 IDs. */
  static readonly ARUCO_DICT_4X4_250: int;
  /** 4 by 4 pixel Aruco marker dictionary with 1000 IDs. */
  static readonly ARUCO_DICT_4X4_1000: int;
  /** 5 by 5 pixel Aruco marker dictionary with 50 IDs. */
  static readonly ARUCO_DICT_5X5_50: int;
  /** 5 by 5 pixel Aruco marker dictionary with 100 IDs. */
  static readonly ARUCO_DICT_5X5_100: int;
  /** 5 by 5 pixel Aruco marker dictionary with 250 IDs. */
  static readonly ARUCO_DICT_5X5_250: int;
  /** 5 by 5 pixel Aruco marker dictionary with 1000 IDs. */
  static readonly ARUCO_DICT_5X5_1000: int;
  /** 6 by 6 pixel Aruco marker dictionary with 50 IDs. */
  static readonly ARUCO_DICT_6X6_50: int;
  /** 6 by 6 pixel Aruco marker dictionary with 100 IDs. */
  static readonly ARUCO_DICT_6X6_100: int;
  /** 6 by 6 pixel Aruco marker dictionary with 250 IDs. */
  static readonly ARUCO_DICT_6X6_250: int;
  /** 6 by 6 pixel Aruco marker dictionary with 1000 IDs. */
  static readonly ARUCO_DICT_6X6_1000: int;
  /** 7 by 7 pixel Aruco marker dictionary with 50 IDs. */
  static readonly ARUCO_DICT_7X7_50: int;
  /** 7 by 7 pixel Aruco marker dictionary with 100 IDs. */
  static readonly ARUCO_DICT_7X7_100: int;
  /** 7 by 7 pixel Aruco marker dictionary with 250 IDs. */
  static readonly ARUCO_DICT_7X7_250: int;
  /** 7 by 7 pixel Aruco marker dictionary with 1000 IDs. */
  static readonly ARUCO_DICT_7X7_1000: int;
}
