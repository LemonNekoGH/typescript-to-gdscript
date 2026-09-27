// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Makes the OpenXR API available for GDExtension. */
declare class OpenXRAPIExtension extends RefCounted {
  /** Returns the corresponding `XrAction` OpenXR handle for the given action RID. */
  action_get_handle(action: RID): int;
  /**
   * Begins a new debug label region, this label will be reported in debug messages for any calls following this until {@link end_debug_label_region} is called. Debug labels can be stacked.
   */
  begin_debug_label_region(label_name: string | NodePath): void;
  /** Returns `true` if OpenXR is initialized for rendering with an XR viewport. */
  can_render(): boolean;
  /**
   * Marks the end of a debug label region. Removes the latest debug label region added by calling {@link begin_debug_label_region}.
   */
  end_debug_label_region(): void;
  /**
   * Returns the {@link RID} corresponding to an `Action` of a matching name, optionally limited to a specified action set.
   */
  find_action(name: string | NodePath, action_set: RID): RID;
  /**
   * Returns an error string for the given XrResult (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrResult.html).
   */
  get_error_string(result: int): string;
  /** Returns the corresponding `XRHandTrackerEXT` handle for the given hand index value. */
  get_hand_tracker(hand_index: int): int;
  /**
   * Returns the XrInstance (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrInstance.html) created during the initialization of the OpenXR API.
   */
  get_instance(): int;
  /**
   * Returns the function pointer of the OpenXR function with the specified name, cast to an integer. If the function with the given name does not exist, the method returns `0`.
   * **Note:** `openxr/util.h` contains utility macros for acquiring OpenXR functions, e.g. `GDEXTENSION_INIT_XR_FUNC_V(xrCreateAction)`.
   */
  get_instance_proc_addr(name: string | NodePath): int;
  /** Returns the predicted display timing for the next frame. */
  get_next_frame_time(): int;
  /**
   * Returns the version of OpenXR that was initialized. Only valid after the OpenXR instance has been created. See XR_MAKE_VERSION (https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#XR_MAKE_VERSION) for how the version is calculated.
   */
  get_openxr_version(): int;
  /**
   * Returns the play space, which is an XrSpace (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrSpace.html) cast to an integer.
   */
  get_play_space(): int;
  /** Returns the predicted display timing for the current frame. */
  get_predicted_display_time(): int;
  /**
   * Returns a pointer to the render state's `XrCompositionLayerProjection` struct.
   * **Note:** This method should only be called from the rendering thread.
   */
  get_projection_layer(): int;
  /**
   * Returns the far boundary value of the camera frustum.
   * **Note:** This is only accessible in the render thread.
   */
  get_render_state_z_far(): float;
  /**
   * Returns the near boundary value of the camera frustum.
   * **Note:** This is only accessible in the render thread.
   */
  get_render_state_z_near(): float;
  /**
   * Returns the OpenXR session, which is an XrSession (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrSession.html) cast to an integer.
   */
  get_session(): int;
  /** Returns an array of supported swapchain formats. */
  get_supported_swapchain_formats(): PackedInt64Array;
  /** Returns the name of the specified swapchain format. */
  get_swapchain_format_name(swapchain_format: int): string;
  /**
   * Returns the ID of the system, which is an XrSystemId (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrSystemId.html) cast to an integer.
   */
  get_system_id(): int;
  /**
   * Returns the view configuration type, which is an XrViewConfigurationType (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrViewConfigurationType.html) cast to an integer.
   */
  get_view_configuration(): int;
  /**
   * Returns the number of views. It is usually two, one for each eye, but may differ with different view configurations.
   */
  get_view_count(): int;
  /**
   * Inserts a debug label, this label is reported in any debug message resulting from the OpenXR calls that follows, until any of {@link begin_debug_label_region}, {@link end_debug_label_region}, or {@link insert_debug_label} is called.
   */
  insert_debug_label(label_name: string | NodePath): void;
  /**
   * Returns {@link OpenXRAPIExtension.OpenXRAlphaBlendModeSupport} denoting if {@link XRInterface.XR_ENV_BLEND_MODE_ALPHA_BLEND} is really supported, emulated or not supported at all.
   */
  is_environment_blend_mode_alpha_supported(): int;
  /** Returns `true` if OpenXR is initialized. */
  is_initialized(): boolean;
  /**
   * Returns `true` if OpenXR is running (xrBeginSession (https://registry.khronos.org/OpenXR/specs/1.0/man/html/xrBeginSession.html) was successfully called and the swapchains were created).
   */
  is_running(): boolean;
  /** Returns `true` if OpenXR is enabled. */
  static openxr_is_enabled(check_run_in_editor: boolean): boolean;
  /** Acquires the image of the provided swapchain. */
  openxr_swapchain_acquire(swapchain: int): void;
  /** Returns a pointer to a new swapchain created using the provided parameters. */
  openxr_swapchain_create(create_flags: int, usage_flags: int, swapchain_format: int, width: int, height: int, sample_count: int, array_size: int): int;
  /** Destroys the provided swapchain and frees it from memory. */
  openxr_swapchain_free(swapchain: int): void;
  /** Returns the RID of the provided swapchain's image. */
  openxr_swapchain_get_image(swapchain: int): RID;
  /** Returns the `XrSwapchain` handle of the provided swapchain. */
  openxr_swapchain_get_swapchain(swapchain: int): int;
  /** Releases the image of the provided swapchain. */
  openxr_swapchain_release(swapchain: int): void;
  /**
   * Registers the given extension as a composition layer provider.
   * **Note:** This cannot be called after the OpenXR session has started. However, it can be called in {@link OpenXRExtensionWrapper._on_session_created}.
   */
  register_composition_layer_provider(extension: OpenXRExtensionWrapper): void;
  /**
   * Registers the given extension as modifying frame info via the {@link OpenXRExtensionWrapper._set_frame_wait_info_and_get_next_pointer}, {@link OpenXRExtensionWrapper._set_view_locate_info_and_get_next_pointer}, or {@link OpenXRExtensionWrapper._set_frame_end_info_and_get_next_pointer} virtual methods.
   * **Note:** This cannot be called after the OpenXR session has started. However, it can be called in {@link OpenXRExtensionWrapper._on_session_created}.
   */
  register_frame_info_extension(extension: OpenXRExtensionWrapper): void;
  /**
   * Registers the given extension as modifying `XrCompositionLayerProjection` via the {@link OpenXRExtensionWrapper._set_projection_layer_and_get_next_pointer} virtual method.
   * **Note:** This cannot be called after the OpenXR session has started. However, it can be called in {@link OpenXRExtensionWrapper._on_session_created}.
   */
  register_projection_layer_extension(extension: OpenXRExtensionWrapper): void;
  /**
   * Registers the given extension as a provider of additional data structures to projections views.
   * **Note:** This cannot be called after the OpenXR session has started. However, it can be called in {@link OpenXRExtensionWrapper._on_session_created}.
   */
  register_projection_views_extension(extension: OpenXRExtensionWrapper): void;
  /**
   * Sets the reference space used by OpenXR to the given XrSpace (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrSpace.html) (cast to a `void *`).
   */
  set_custom_play_space(space: void): void;
  /**
   * If set to `true`, an OpenXR extension is loaded which is capable of emulating the {@link XRInterface.XR_ENV_BLEND_MODE_ALPHA_BLEND} blend mode.
   */
  set_emulate_environment_blend_mode_alpha_blend(enabled: boolean): void;
  /**
   * Set the object name of an OpenXR object, used for debug output. `object_type` must be a valid OpenXR `XrObjectType` enum and `object_handle` must be a valid OpenXR object handle.
   */
  set_object_name(object_type: int, object_handle: int, object_name: string | NodePath): void;
  /** Sets the render region to `render_region`, overriding the normal render target's rect. */
  set_render_region(render_region: Rect2i | Rect2): void;
  /** Sets the render target of the velocity depth texture. */
  set_velocity_depth_texture(render_target: RID): void;
  /** Sets the target size of the velocity and velocity depth textures. */
  set_velocity_target_size(target_size: Vector2i | Vector2): void;
  /** Sets the render target of the velocity texture. */
  set_velocity_texture(render_target: RID): void;
  /**
   * Creates a {@link Transform3D} from an XrPosef (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrPosef.html).
   */
  transform_from_pose(pose: void): Transform3D;
  /**
   * Unregisters the given extension as a composition layer provider.
   * **Note:** This cannot be called while the OpenXR session is still running.
   */
  unregister_composition_layer_provider(extension: OpenXRExtensionWrapper): void;
  /**
   * Unregisters the given extension as modifying frame info.
   * **Note:** This cannot be called while the OpenXR session is still running.
   */
  unregister_frame_info_extension(extension: OpenXRExtensionWrapper): void;
  /**
   * Unregisters the given extension as modifying `XrCompositionLayerProjection`.
   * **Note:** This cannot be called while the OpenXR session is still running.
   */
  unregister_projection_layer_extension(extension: OpenXRExtensionWrapper): void;
  /**
   * Unregisters the given extension as a provider of additional data structures to projections views.
   * **Note:** This cannot be called while the OpenXR session is still running.
   */
  unregister_projection_views_extension(extension: OpenXRExtensionWrapper): void;
  /**
   * Request the recommended resolution from the OpenXR runtime and update the main swapchain size if it has changed.
   */
  update_main_swapchain_size(): void;
  /**
   * Returns `true` if the provided XrResult (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrResult.html) (cast to an integer) is successful. Otherwise returns `false` and prints the XrResult (https://registry.khronos.org/OpenXR/specs/1.0/man/html/XrResult.html) converted to a string, with the specified additional information.
   */
  xr_result(result: int, format: string | NodePath, args: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): boolean;

  // enum OpenXRAlphaBlendModeSupport
  /** Means that {@link XRInterface.XR_ENV_BLEND_MODE_ALPHA_BLEND} isn't supported at all. */
  static readonly OPENXR_ALPHA_BLEND_MODE_SUPPORT_NONE: int;
  /** Means that {@link XRInterface.XR_ENV_BLEND_MODE_ALPHA_BLEND} is really supported. */
  static readonly OPENXR_ALPHA_BLEND_MODE_SUPPORT_REAL: int;
  /** Means that {@link XRInterface.XR_ENV_BLEND_MODE_ALPHA_BLEND} is emulated. */
  static readonly OPENXR_ALPHA_BLEND_MODE_SUPPORT_EMULATING: int;
}
