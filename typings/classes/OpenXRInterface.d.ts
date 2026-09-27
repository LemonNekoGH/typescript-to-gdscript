// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Our OpenXR interface. */
declare class OpenXRInterface extends XRInterface {
  /**
   * The display refresh rate for the current HMD. Only functional if this feature is supported by the OpenXR runtime and after the interface has been initialized.
   */
  display_refresh_rate: float;
  /**
   * If `true`, enables dynamic foveation adjustment. The interface must be initialized before this is accessible. If enabled, foveation will automatically be adjusted between low and {@link foveation_level}.
   */
  foveation_dynamic: boolean;
  /**
   * The foveation level, from `0` (off) to `3` (high). The interface must be initialized before this is accessible.
   */
  foveation_level: int;
  /**
   * If `true`, enables subsampled images with foveation, which can provide a performance boost on Vulkan.
   */
  foveation_with_subsampled_images: boolean;
  /**
   * The render size multiplier for the current HMD. Must be set before the interface has been initialized.
   */
  render_target_size_multiplier: float;
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
  set_display_refresh_rate(value: float): void;
  get_display_refresh_rate(): float;
  set_foveation_dynamic(value: boolean): void;
  get_foveation_dynamic(): boolean;
  set_foveation_level(value: int): void;
  get_foveation_level(): int;
  set_foveation_with_subsampled_images(value: boolean): void;
  get_foveation_with_subsampled_images(): boolean;
  set_render_target_size_multiplier(value: float): void;
  get_render_target_size_multiplier(): float;
  set_vrs_min_radius(value: float): void;
  get_vrs_min_radius(): float;
  set_vrs_strength(value: float): void;
  get_vrs_strength(): float;

  /** Returns a list of action sets registered with Godot (loaded from the action map at runtime). */
  get_action_sets(): Array<unknown>;
  /**
   * Returns a list of display refresh rates supported by the current HMD. Only returned if this feature is supported by the OpenXR runtime and after the interface has been initialized.
   */
  get_available_display_refresh_rates(): Array<unknown>;
  /**
   * If handtracking is enabled, returns the angular velocity of a joint (`joint`) of a hand (`hand`) as provided by OpenXR. This is relative to {@link XROrigin3D}!
   */
  get_hand_joint_angular_velocity(hand: int, joint: int): Vector3;
  /** If handtracking is enabled, returns flags that inform us of the validity of the tracking data. */
  get_hand_joint_flags(hand: int, joint: int): int;
  /**
   * If handtracking is enabled, returns the linear velocity of a joint (`joint`) of a hand (`hand`) as provided by OpenXR. This is relative to {@link XROrigin3D} without worldscale applied!
   */
  get_hand_joint_linear_velocity(hand: int, joint: int): Vector3;
  /**
   * If handtracking is enabled, returns the position of a joint (`joint`) of a hand (`hand`) as provided by OpenXR. This is relative to {@link XROrigin3D} without worldscale applied!
   */
  get_hand_joint_position(hand: int, joint: int): Vector3;
  /**
   * If handtracking is enabled, returns the radius of a joint (`joint`) of a hand (`hand`) as provided by OpenXR. This is without worldscale applied!
   */
  get_hand_joint_radius(hand: int, joint: int): float;
  /**
   * If handtracking is enabled, returns the rotation of a joint (`joint`) of a hand (`hand`) as provided by OpenXR.
   */
  get_hand_joint_rotation(hand: int, joint: int): Quaternion;
  /**
   * If handtracking is enabled and hand tracking source is supported, gets the source of the hand tracking data for `hand`.
   */
  get_hand_tracking_source(hand: int): int;
  /**
   * If handtracking is enabled and motion range is supported, gets the currently configured motion range for `hand`.
   */
  get_motion_range(hand: int): int;
  /** Returns the current state of our OpenXR session. */
  get_session_state(): int;
  /** Returns `true` if the given action set is active. */
  is_action_set_active(name: string | NodePath): boolean;
  /**
   * Returns the capabilities of the eye gaze interaction extension.
   * **Note:** This only returns a valid value after OpenXR has been initialized.
   */
  is_eye_gaze_interaction_supported(): boolean;
  /**
   * Returns `true` if OpenXR's foveation extension is supported. The interface must be initialized before this returns a valid value.
   * **Note:** When using the Vulkan rendering driver, {@link Viewport.vrs_mode} must be set to {@link Viewport.VRS_XR} to support foveation.
   */
  is_foveation_supported(): boolean;
  /**
   * Returns `true` if OpenXR's hand interaction profile is supported and enabled.
   * **Note:** This only returns a valid value after OpenXR has been initialized.
   */
  is_hand_interaction_supported(): boolean;
  /**
   * Returns `true` if OpenXR's hand tracking is supported and enabled.
   * **Note:** This only returns a valid value after OpenXR has been initialized.
   */
  is_hand_tracking_supported(): boolean;
  /**
   * Returns `true` if OpenXR's user presence extension is supported and enabled.
   * **Note:** This only returns a valid value after OpenXR has been initialized.
   */
  is_user_presence_supported(): boolean;
  /** Returns `true` if system has detected the presence of a user in the XR experience. */
  is_user_present(): boolean;
  /** Sets the given action set as active or inactive. */
  set_action_set_active(name: string | NodePath, active: boolean): void;
  /** Sets the CPU performance level of the OpenXR device. */
  set_cpu_level(level: int): void;
  /** Sets the GPU performance level of the OpenXR device. */
  set_gpu_level(level: int): void;
  /**
   * If handtracking is enabled and motion range is supported, sets the currently configured motion range for `hand` to `motion_range`.
   */
  set_motion_range(hand: int, motion_range: int): void;

  /** Informs the device CPU performance level has changed in the specified subdomain. */
  cpu_level_changed: Signal<[int, int, int]>;
  /** Informs the device GPU performance level has changed in the specified subdomain. */
  gpu_level_changed: Signal<[int, int, int]>;
  /** Informs our OpenXR instance is exiting. */
  instance_exiting: Signal<[]>;
  /** Informs the user queued a recenter of the player position. */
  pose_recentered: Signal<[]>;
  /**
   * Informs the user the HMD refresh rate has changed.
   * **Note:** Only emitted if XR runtime supports the refresh rate extension.
   */
  refresh_rate_changed: Signal<[float]>;
  /** Informs our OpenXR session has been started. */
  session_begun: Signal<[]>;
  /**
   * Informs our OpenXR session now has focus, for example output is sent to the HMD and we're receiving XR input.
   */
  session_focussed: Signal<[]>;
  /** Informs our OpenXR session is in the process of being lost. */
  session_loss_pending: Signal<[]>;
  /** Informs our OpenXR session is stopping. */
  session_stopping: Signal<[]>;
  /** Informs our OpenXR session has been synchronized. */
  session_synchronized: Signal<[]>;
  /**
   * Informs our OpenXR session is now visible, for example output is sent to the HMD but we don't receive XR input.
   */
  session_visible: Signal<[]>;
  /**
   * Signal emitted when the user presence value changes.
   * **Note:** This signal will not be emitted during application startup and application shutdown. Developers should assume user presence is gained on startup and lost on shutdown.
   */
  user_presence_changed: Signal<[boolean]>;

  // enum SessionState
  /** The state of the session is unknown, we haven't tried setting up OpenXR yet. */
  static readonly SESSION_STATE_UNKNOWN: int;
  /** The initial state after the OpenXR session is created or after the session is destroyed. */
  static readonly SESSION_STATE_IDLE: int;
  /**
   * OpenXR is ready to begin our session. {@link session_begun} is emitted when we change to this state.
   */
  static readonly SESSION_STATE_READY: int;
  /**
   * The application has synched its frame loop with the runtime but we're not rendering anything. {@link session_synchronized} is emitted when we change to this state.
   */
  static readonly SESSION_STATE_SYNCHRONIZED: int;
  /**
   * The application has synched its frame loop with the runtime and we're rendering output to the user, however we receive no user input. {@link session_visible} is emitted when we change to this state.
   * **Note:** This is the current state just before we get the focused state, whenever the user opens a system menu, switches to another application, or takes off their headset.
   */
  static readonly SESSION_STATE_VISIBLE: int;
  /**
   * The application has synched its frame loop with the runtime, we're rendering output to the user and we're receiving XR input. {@link session_focussed} is emitted when we change to this state.
   * **Note:** This is the state OpenXR will be in when the user can fully interact with your game.
   */
  static readonly SESSION_STATE_FOCUSED: int;
  /** Our session is being stopped. {@link session_stopping} is emitted when we change to this state. */
  static readonly SESSION_STATE_STOPPING: int;
  /**
   * The session is about to be lost. {@link session_loss_pending} is emitted when we change to this state.
   */
  static readonly SESSION_STATE_LOSS_PENDING: int;
  /**
   * The OpenXR instance is about to be destroyed and we're exiting. {@link instance_exiting} is emitted when we change to this state.
   */
  static readonly SESSION_STATE_EXITING: int;
  // enum Hand
  /** Left hand. */
  static readonly HAND_LEFT: int;
  /** Right hand. */
  static readonly HAND_RIGHT: int;
  /** Maximum value for the hand enum. */
  static readonly HAND_MAX: int;
  // enum HandMotionRange
  /** Full hand range, if user closes their hands, we make a full fist. */
  static readonly HAND_MOTION_RANGE_UNOBSTRUCTED: int;
  /**
   * Conform to controller, if user closes their hands, the tracked data conforms to the shape of the controller.
   */
  static readonly HAND_MOTION_RANGE_CONFORM_TO_CONTROLLER: int;
  /** Maximum value for the motion range enum. */
  static readonly HAND_MOTION_RANGE_MAX: int;
  // enum HandTrackedSource
  /** The source of hand tracking data is unknown (the extension is likely unsupported). */
  static readonly HAND_TRACKED_SOURCE_UNKNOWN: int;
  /**
   * The source of hand tracking is unobstructed, this means that an accurate method of hand tracking is used, e.g. optical hand tracking, data gloves, etc.
   */
  static readonly HAND_TRACKED_SOURCE_UNOBSTRUCTED: int;
  /** The source of hand tracking is a controller, bone positions are inferred from controller inputs. */
  static readonly HAND_TRACKED_SOURCE_CONTROLLER: int;
  /** Represents the size of the {@link HandTrackedSource} enum. */
  static readonly HAND_TRACKED_SOURCE_MAX: int;
  // enum HandJoints
  /** Palm joint. */
  static readonly HAND_JOINT_PALM: int;
  /** Wrist joint. */
  static readonly HAND_JOINT_WRIST: int;
  /** Thumb metacarpal joint. */
  static readonly HAND_JOINT_THUMB_METACARPAL: int;
  /** Thumb proximal joint. */
  static readonly HAND_JOINT_THUMB_PROXIMAL: int;
  /** Thumb distal joint. */
  static readonly HAND_JOINT_THUMB_DISTAL: int;
  /** Thumb tip joint. */
  static readonly HAND_JOINT_THUMB_TIP: int;
  /** Index finger metacarpal joint. */
  static readonly HAND_JOINT_INDEX_METACARPAL: int;
  /** Index finger phalanx proximal joint. */
  static readonly HAND_JOINT_INDEX_PROXIMAL: int;
  /** Index finger phalanx intermediate joint. */
  static readonly HAND_JOINT_INDEX_INTERMEDIATE: int;
  /** Index finger phalanx distal joint. */
  static readonly HAND_JOINT_INDEX_DISTAL: int;
  /** Index finger tip joint. */
  static readonly HAND_JOINT_INDEX_TIP: int;
  /** Middle finger metacarpal joint. */
  static readonly HAND_JOINT_MIDDLE_METACARPAL: int;
  /** Middle finger phalanx proximal joint. */
  static readonly HAND_JOINT_MIDDLE_PROXIMAL: int;
  /** Middle finger phalanx intermediate joint. */
  static readonly HAND_JOINT_MIDDLE_INTERMEDIATE: int;
  /** Middle finger phalanx distal joint. */
  static readonly HAND_JOINT_MIDDLE_DISTAL: int;
  /** Middle finger tip joint. */
  static readonly HAND_JOINT_MIDDLE_TIP: int;
  /** Ring finger metacarpal joint. */
  static readonly HAND_JOINT_RING_METACARPAL: int;
  /** Ring finger phalanx proximal joint. */
  static readonly HAND_JOINT_RING_PROXIMAL: int;
  /** Ring finger phalanx intermediate joint. */
  static readonly HAND_JOINT_RING_INTERMEDIATE: int;
  /** Ring finger phalanx distal joint. */
  static readonly HAND_JOINT_RING_DISTAL: int;
  /** Ring finger tip joint. */
  static readonly HAND_JOINT_RING_TIP: int;
  /** Pinky finger metacarpal joint. */
  static readonly HAND_JOINT_LITTLE_METACARPAL: int;
  /** Pinky finger phalanx proximal joint. */
  static readonly HAND_JOINT_LITTLE_PROXIMAL: int;
  /** Pinky finger phalanx intermediate joint. */
  static readonly HAND_JOINT_LITTLE_INTERMEDIATE: int;
  /** Pinky finger phalanx distal joint. */
  static readonly HAND_JOINT_LITTLE_DISTAL: int;
  /** Pinky finger tip joint. */
  static readonly HAND_JOINT_LITTLE_TIP: int;
  /** Represents the size of the {@link HandJoints} enum. */
  static readonly HAND_JOINT_MAX: int;
  // enum PerfSettingsLevel
  /**
   * The application has entered a non-XR section (head-locked / static screen), during which power savings are to be prioritized.
   */
  static readonly PERF_SETTINGS_LEVEL_POWER_SAVINGS: int;
  /**
   * The application has entered a low and stable complexity section, during which reducing power is more important than occasional late rendering frames.
   */
  static readonly PERF_SETTINGS_LEVEL_SUSTAINED_LOW: int;
  /**
   * The application has entered a high or dynamic complexity section, during which the XR Runtime strives for consistent XR compositing and frame rendering within a thermally sustainable range.
   */
  static readonly PERF_SETTINGS_LEVEL_SUSTAINED_HIGH: int;
  /**
   * The application has entered a section with very high complexity, during which the XR Runtime is allowed to step up beyond the thermally sustainable range.
   */
  static readonly PERF_SETTINGS_LEVEL_BOOST: int;
  // enum PerfSettingsSubDomain
  /** The compositing performance within the runtime has reached a new level. */
  static readonly PERF_SETTINGS_SUB_DOMAIN_COMPOSITING: int;
  /** The application rendering performance has reached a new level. */
  static readonly PERF_SETTINGS_SUB_DOMAIN_RENDERING: int;
  /** The temperature of the device has reached a new level. */
  static readonly PERF_SETTINGS_SUB_DOMAIN_THERMAL: int;
  // enum PerfSettingsNotificationLevel
  /**
   * The sub-domain has reached a level where no further actions other than currently applied are necessary.
   */
  static readonly PERF_SETTINGS_NOTIF_LEVEL_NORMAL: int;
  /**
   * The sub-domain has reached an early warning level where the application should start proactive mitigation actions.
   */
  static readonly PERF_SETTINGS_NOTIF_LEVEL_WARNING: int;
  /**
   * The sub-domain has reached a critical level where the application should start drastic mitigation actions.
   */
  static readonly PERF_SETTINGS_NOTIF_LEVEL_IMPAIRED: int;
  // enum HandJointFlags
  /** No flags are set. */
  static readonly HAND_JOINT_NONE: int;
  /**
   * If set, the orientation data is valid, otherwise, the orientation data is unreliable and should not be used.
   */
  static readonly HAND_JOINT_ORIENTATION_VALID: int;
  /**
   * If set, the orientation data comes from tracking data, otherwise, the orientation data contains predicted data.
   */
  static readonly HAND_JOINT_ORIENTATION_TRACKED: int;
  /**
   * If set, the positional data is valid, otherwise, the positional data is unreliable and should not be used.
   */
  static readonly HAND_JOINT_POSITION_VALID: int;
  /**
   * If set, the positional data comes from tracking data, otherwise, the positional data contains predicted data.
   */
  static readonly HAND_JOINT_POSITION_TRACKED: int;
  /**
   * If set, our linear velocity data is valid, otherwise, the linear velocity data is unreliable and should not be used.
   */
  static readonly HAND_JOINT_LINEAR_VELOCITY_VALID: int;
  /**
   * If set, our angular velocity data is valid, otherwise, the angular velocity data is unreliable and should not be used.
   */
  static readonly HAND_JOINT_ANGULAR_VELOCITY_VALID: int;
}
