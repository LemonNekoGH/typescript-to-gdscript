// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The DPad binding modifier converts an axis input to a dpad output. */
declare class OpenXRDpadBindingModifier extends OpenXRIPBindingModifier {
  /** Action set for which this dpad binding modifier is active. */
  action_set: OpenXRActionSet | null;
  /** Center region in which our center position of our dpad return `true`. */
  center_region: float;
  /** Input path for this dpad binding modifier. */
  input_path: string;
  /**
   * If `false`, when the joystick enters a new dpad zone this becomes `true`.
   * If `true`, when the joystick remains in active dpad zone, this remains `true` even if we overlap with another zone.
   */
  is_sticky: boolean;
  /** Haptic pulse to emit when the user releases the input. */
  off_haptic: OpenXRHapticBase | null;
  /** Haptic pulse to emit when the user presses the input. */
  on_haptic: OpenXRHapticBase | null;
  /**
   * When our input value is equal or larger than this value, our dpad in that direction becomes `true`. It stays `true` until it falls under the {@link threshold_released} value.
   */
  threshold: float;
  /** When our input value falls below this, our output becomes `false`. */
  threshold_released: float;
  /** The angle of each wedge that identifies the 4 directions of the emulated dpad. */
  wedge_angle: float;
  set_action_set(value: OpenXRActionSet | null): void;
  get_action_set(): OpenXRActionSet | null;
  set_center_region(value: float): void;
  get_center_region(): float;
  set_input_path(value: string | NodePath): void;
  get_input_path(): string;
  set_is_sticky(value: boolean): void;
  get_is_sticky(): boolean;
  set_off_haptic(value: OpenXRHapticBase | null): void;
  get_off_haptic(): OpenXRHapticBase | null;
  set_on_haptic(value: OpenXRHapticBase | null): void;
  get_on_haptic(): OpenXRHapticBase | null;
  set_threshold(value: float): void;
  get_threshold(): float;
  set_threshold_released(value: float): void;
  get_threshold_released(): float;
  set_wedge_angle(value: float): void;
  get_wedge_angle(): float;
}
