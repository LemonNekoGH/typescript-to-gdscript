// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** XR interface using WebXR. */
declare class WebXRInterface extends XRInterface {
  /**
   * A comma-separated list of features that were successfully enabled by {@link XRInterface.initialize} when setting up the WebXR session.
   * This may include features requested by setting {@link required_features} and {@link optional_features}, and will only be available after {@link session_started} has been emitted.
   * **Note:** This may not be support by all web browsers, in which case it will be an empty string.
   */
  enabled_features: string;
  /**
   * A comma-seperated list of optional features used by {@link XRInterface.initialize} when setting up the WebXR session.
   * If a user's browser or device doesn't support one of the given features, initialization will continue, but you won't be able to use the requested feature.
   * This doesn't have any effect on the interface when already initialized.
   * See the MDN documentation on WebXR's session features (https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/requestSession#session_features) for a list of possible values.
   */
  optional_features: string;
  /**
   * The reference space type (from the list of requested types set in the {@link requested_reference_space_types} property), that was ultimately used by {@link XRInterface.initialize} when setting up the WebXR session.
   * Possible values come from WebXR's XRReferenceSpaceType (https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpaceType). If you want to use a particular reference space type, it must be listed in either {@link required_features} or {@link optional_features}.
   */
  reference_space_type: string;
  /**
   * A comma-seperated list of reference space types used by {@link XRInterface.initialize} when setting up the WebXR session.
   * The reference space types are requested in order, and the first one supported by the user's device or browser will be used. The {@link reference_space_type} property contains the reference space type that was ultimately selected.
   * This doesn't have any effect on the interface when already initialized.
   * Possible values come from WebXR's XRReferenceSpaceType (https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpaceType). If you want to use a particular reference space type, it must be listed in either {@link required_features} or {@link optional_features}.
   */
  requested_reference_space_types: string;
  /**
   * A comma-seperated list of required features used by {@link XRInterface.initialize} when setting up the WebXR session.
   * If a user's browser or device doesn't support one of the given features, initialization will fail and {@link session_failed} will be emitted.
   * This doesn't have any effect on the interface when already initialized.
   * See the MDN documentation on WebXR's session features (https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/requestSession#session_features) for a list of possible values.
   */
  required_features: string;
  /**
   * The session mode used by {@link XRInterface.initialize} when setting up the WebXR session.
   * This doesn't have any effect on the interface when already initialized.
   * Possible values come from WebXR's XRSessionMode (https://developer.mozilla.org/en-US/docs/Web/API/XRSessionMode), including: `"immersive-vr"`, `"immersive-ar"`, and `"inline"`.
   */
  session_mode: string;
  /**
   * Indicates if the WebXR session's imagery is visible to the user.
   * Possible values come from WebXR's XRVisibilityState (https://developer.mozilla.org/en-US/docs/Web/API/XRVisibilityState), including `"hidden"`, `"visible"`, and `"visible-blurred"`.
   */
  visibility_state: string;
  get_enabled_features(): string;
  set_optional_features(value: string | NodePath): void;
  get_optional_features(): string;
  get_reference_space_type(): string;
  set_requested_reference_space_types(value: string | NodePath): void;
  get_requested_reference_space_types(): string;
  set_required_features(value: string | NodePath): void;
  get_required_features(): string;
  set_session_mode(value: string | NodePath): void;
  get_session_mode(): string;
  get_visibility_state(): string;

  /**
   * Returns display refresh rates supported by the current HMD. Only returned if this feature is supported by the web browser and after the interface has been initialized.
   */
  get_available_display_refresh_rates(): Array<unknown>;
  /**
   * Returns the display refresh rate for the current HMD. Not supported on all HMDs and browsers. It may not report an accurate value until after using {@link set_display_refresh_rate}.
   */
  get_display_refresh_rate(): float;
  /**
   * Returns the target ray mode for the given `input_source_id`.
   * This can help interpret the input coming from that input source. See XRInputSource.targetRayMode (https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource/targetRayMode) for more information.
   */
  get_input_source_target_ray_mode(input_source_id: int): int;
  /**
   * Gets an {@link XRControllerTracker} for the given `input_source_id`.
   * In the context of WebXR, an input source can be an advanced VR controller like the Oculus Touch or Index controllers, or even a tap on the screen, a spoken voice command or a button press on the device itself. When a non-traditional input source is used, interpret the position and orientation of the {@link XRPositionalTracker} as a ray pointing at the object the user wishes to interact with.
   * Use this method to get information about the input source that triggered one of these signals:
   * - {@link selectstart}
   * - {@link select}
   * - {@link selectend}
   * - {@link squeezestart}
   * - {@link squeeze}
   * - {@link squeezestart}
   */
  get_input_source_tracker(input_source_id: int): XRControllerTracker | null;
  /** Returns `true` if there is an active input source with the given `input_source_id`. */
  is_input_source_active(input_source_id: int): boolean;
  /**
   * Checks if the given `session_mode` is supported by the user's browser.
   * Possible values come from WebXR's XRSessionMode (https://developer.mozilla.org/en-US/docs/Web/API/XRSessionMode), including: `"immersive-vr"`, `"immersive-ar"`, and `"inline"`.
   * This method returns nothing, instead it emits the {@link session_supported} signal with the result.
   */
  is_session_supported(session_mode: string | NodePath): void;
  /**
   * Sets the display refresh rate for the current HMD. Not supported on all HMDs and browsers. It won't take effect right away until after {@link display_refresh_rate_changed} is emitted.
   */
  set_display_refresh_rate(refresh_rate: float): void;

  /** Emitted after the display's refresh rate has changed. */
  display_refresh_rate_changed: Signal<[]>;
  /**
   * Emitted to indicate that the reference space has been reset or reconfigured.
   * When (or whether) this is emitted depends on the user's browser or device, but may include when the user has changed the dimensions of their play space (which you may be able to access via {@link XRInterface.get_play_area}) or pressed/held a button to recenter their position.
   * See WebXR's XRReferenceSpace reset event (https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace/reset_event) for more information.
   */
  reference_space_reset: Signal<[]>;
  /**
   * Emitted after one of the input sources has finished its "primary action".
   * Use {@link get_input_source_tracker} and {@link get_input_source_target_ray_mode} to get more information about the input source.
   */
  select: Signal<[int]>;
  /**
   * Emitted when one of the input sources has finished its "primary action".
   * Use {@link get_input_source_tracker} and {@link get_input_source_target_ray_mode} to get more information about the input source.
   */
  selectend: Signal<[int]>;
  /**
   * Emitted when one of the input source has started its "primary action".
   * Use {@link get_input_source_tracker} and {@link get_input_source_target_ray_mode} to get more information about the input source.
   */
  selectstart: Signal<[int]>;
  /**
   * Emitted when the user ends the WebXR session (which can be done using UI from the browser or device).
   * At this point, you should do `get_viewport().use_xr = false` to instruct Godot to resume rendering to the screen.
   */
  session_ended: Signal<[]>;
  /**
   * Emitted by {@link XRInterface.initialize} if the session fails to start.
   * `message` may optionally contain an error message from WebXR, or an empty string if no message is available.
   */
  session_failed: Signal<[string]>;
  /**
   * Emitted by {@link XRInterface.initialize} if the session is successfully started.
   * At this point, it's safe to do `get_viewport().use_xr = true` to instruct Godot to start rendering to the XR device.
   */
  session_started: Signal<[]>;
  /**
   * Emitted by {@link is_session_supported} to indicate if the given `session_mode` is supported or not.
   */
  session_supported: Signal<[string, boolean]>;
  /**
   * Emitted after one of the input sources has finished its "primary squeeze action".
   * Use {@link get_input_source_tracker} and {@link get_input_source_target_ray_mode} to get more information about the input source.
   */
  squeeze: Signal<[int]>;
  /**
   * Emitted when one of the input sources has finished its "primary squeeze action".
   * Use {@link get_input_source_tracker} and {@link get_input_source_target_ray_mode} to get more information about the input source.
   */
  squeezeend: Signal<[int]>;
  /**
   * Emitted when one of the input sources has started its "primary squeeze action".
   * Use {@link get_input_source_tracker} and {@link get_input_source_target_ray_mode} to get more information about the input source.
   */
  squeezestart: Signal<[int]>;
  /** Emitted when {@link visibility_state} has changed. */
  visibility_state_changed: Signal<[]>;

  // enum TargetRayMode
  /** We don't know the target ray mode. */
  static readonly TARGET_RAY_MODE_UNKNOWN: int;
  /** Target ray originates at the viewer's eyes and points in the direction they are looking. */
  static readonly TARGET_RAY_MODE_GAZE: int;
  /** Target ray from a handheld pointer, most likely a VR touch controller. */
  static readonly TARGET_RAY_MODE_TRACKED_POINTER: int;
  /** Target ray from touch screen, mouse or other tactile input device. */
  static readonly TARGET_RAY_MODE_SCREEN: int;
}
