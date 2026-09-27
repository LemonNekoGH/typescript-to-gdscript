// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The OpenXR Frame synthesis extension allows for advanced reprojection at low(er) framerates. */
declare class OpenXRFrameSynthesisExtension extends OpenXRExtensionWrapper {
  /** Enable frame synthesis. When `true` motion vector and depth data is provided to the XR runtime. */
  enabled: boolean;
  /**
   * If `true` this informs the XR runtime we will be providing frames at a greatly reduced rate. Enable this when you expect your application to run at low framerates and wish to inject multiple reprojected frames.
   */
  relax_frame_interval: boolean;
  set_enabled(value: boolean): void;
  is_enabled(): boolean;
  set_relax_frame_interval(value: boolean): void;
  get_relax_frame_interval(): boolean;

  /**
   * Returns `true` if frame synthesis is enabled in the project settings and the current XR runtime supports frame synthesis. The value returned will only be valid once OpenXR has been initialized.
   */
  is_available(): boolean;
  /**
   * Queues the next frame to be skipped when supplying motion vector and depth data. Call this after teleporting your player or a similar action has moved the player to prevent incorrect reprojection results due to this movement.
   */
  skip_next_frame(): void;
}
