// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Generic mobile VR implementation. */
declare class MobileVRInterface extends XRInterface {
  /** The distance between the display and the lenses inside of the device in centimeters. */
  display_to_lens: float;
  /** The width of the display in centimeters. */
  display_width: float;
  /** The height at which the camera is placed in relation to the ground (i.e. {@link XROrigin3D} node). */
  eye_height: float;
  /**
   * The interocular distance, also known as the interpupillary distance. The distance between the pupils of the left and right eye.
   */
  iod: float;
  /**
   * The k1 lens factor is one of the two constants that define the strength of the lens used and directly influences the lens distortion effect.
   */
  k1: float;
  /** The k2 lens factor, see k1. */
  k2: float;
  /**
   * Set the offset rect relative to the area being rendered. A length of 1 represents the whole rendering area on that axis.
   */
  offset_rect: Rect2;
  /**
   * The oversample setting. Because of the lens distortion we have to render our buffers at a higher resolution then the screen can natively handle. A value between 1.5 and 2.0 often provides good results but at the cost of performance.
   */
  oversample: float;
  /**
   * The minimum radius around the focal point where full quality is guaranteed if VRS is used as a percentage of screen size.
   * **Note:** Mobile and Forward+ renderers only. Requires {@link Viewport.vrs_mode} to be set to {@link Viewport.VRS_XR}.
   */
  vrs_min_radius: float;
  /**
   * The strength used to calculate the VRS density map. The greater this value, the more noticeable VRS is. This improves performance at the cost of quality.
   * **Note:** Mobile and Forward+ renderers only. Requires {@link Viewport.vrs_mode} to be set to {@link Viewport.VRS_XR}.
   */
  vrs_strength: float;
  xr_play_area_mode: int;
  set_display_to_lens(value: float): void;
  get_display_to_lens(): float;
  set_display_width(value: float): void;
  get_display_width(): float;
  set_eye_height(value: float): void;
  get_eye_height(): float;
  set_iod(value: float): void;
  get_iod(): float;
  set_k1(value: float): void;
  get_k1(): float;
  set_k2(value: float): void;
  get_k2(): float;
  set_offset_rect(value: Rect2 | Rect2i): void;
  get_offset_rect(): Rect2;
  set_oversample(value: float): void;
  get_oversample(): float;
  set_vrs_min_radius(value: float): void;
  get_vrs_min_radius(): float;
  set_vrs_strength(value: float): void;
  get_vrs_strength(): float;
}
