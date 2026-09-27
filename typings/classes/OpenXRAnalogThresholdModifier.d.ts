// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * The analog threshold binding modifier can modify a float input to a boolean input with specified thresholds.
 */
declare class OpenXRAnalogThresholdModifier extends OpenXRActionBindingModifier {
  /** Haptic pulse to emit when the user releases the input. */
  off_haptic: OpenXRHapticBase | null;
  /** When our input value falls below this, our output becomes `false`. */
  off_threshold: float;
  /** Haptic pulse to emit when the user presses the input. */
  on_haptic: OpenXRHapticBase | null;
  /**
   * When our input value is equal or larger than this value, our output becomes `true`. It stays `true` until it falls under the {@link off_threshold} value.
   */
  on_threshold: float;
  set_off_haptic(value: OpenXRHapticBase | null): void;
  get_off_haptic(): OpenXRHapticBase | null;
  set_off_threshold(value: float): void;
  get_off_threshold(): float;
  set_on_haptic(value: OpenXRHapticBase | null): void;
  get_on_haptic(): OpenXRHapticBase | null;
  set_on_threshold(value: float): void;
  get_on_threshold(): float;
}
