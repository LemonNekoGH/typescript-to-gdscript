// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** An OpenXR composition layer that is rendered as an internal slice of a cylinder. */
declare class OpenXRCompositionLayerCylinder extends OpenXRCompositionLayer {
  /** The aspect ratio of the slice. Used to set the height relative to the width. */
  aspect_ratio: float;
  /** The central angle of the cylinder. Used to set the width. */
  central_angle: float;
  /** The number of segments to use in the fallback mesh. */
  fallback_segments: int;
  /** The radius of the cylinder. */
  radius: float;
  set_aspect_ratio(value: float): void;
  get_aspect_ratio(): float;
  set_central_angle(value: float): void;
  get_central_angle(): float;
  set_fallback_segments(value: int): void;
  get_fallback_segments(): int;
  set_radius(value: float): void;
  get_radius(): float;
}
