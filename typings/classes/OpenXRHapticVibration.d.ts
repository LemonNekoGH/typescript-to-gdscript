// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Vibration haptic feedback. */
declare class OpenXRHapticVibration extends OpenXRHapticBase {
  /** The amplitude of the pulse between `0.0` and `1.0`. */
  amplitude: float;
  /**
   * The duration of the pulse in nanoseconds. Use `-1` for a minimum duration pulse for the current XR runtime.
   */
  duration: int;
  /**
   * The frequency of the pulse in Hz. `0.0` will let the XR runtime chose an optimal frequency for the device used.
   */
  frequency: float;
  set_amplitude(value: float): void;
  get_amplitude(): float;
  set_duration(value: int): void;
  get_duration(): int;
  set_frequency(value: float): void;
  get_frequency(): float;
}
