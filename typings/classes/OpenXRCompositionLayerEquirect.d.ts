// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** An OpenXR composition layer that is rendered as an internal slice of a sphere. */
declare class OpenXRCompositionLayerEquirect extends OpenXRCompositionLayer {
  /** The central horizontal angle of the sphere. Used to set the width. */
  central_horizontal_angle: float;
  /** The number of segments to use in the fallback mesh. */
  fallback_segments: int;
  /**
   * The lower vertical angle of the sphere. Used (together with {@link upper_vertical_angle}) to set the height.
   */
  lower_vertical_angle: float;
  /** The radius of the sphere. */
  radius: float;
  /**
   * The upper vertical angle of the sphere. Used (together with {@link lower_vertical_angle}) to set the height.
   */
  upper_vertical_angle: float;
  set_central_horizontal_angle(value: float): void;
  get_central_horizontal_angle(): float;
  set_fallback_segments(value: int): void;
  get_fallback_segments(): int;
  set_lower_vertical_angle(value: float): void;
  get_lower_vertical_angle(): float;
  set_radius(value: float): void;
  get_radius(): float;
  set_upper_vertical_angle(value: float): void;
  get_upper_vertical_angle(): float;
}
