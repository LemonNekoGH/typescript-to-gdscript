// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Allows implementing OpenXR extensions with GDExtension. */
declare class OpenXRExtensionWrapper extends GodotObject {
  /**
   * Returns a pointer to an `XrCompositionLayerBaseHeader` struct to provide the given composition layer.
   * This will only be called if the extension previously registered itself with {@link OpenXRAPIExtension.register_composition_layer_provider}.
   * **Note:** This virtual method will be called on the render thread. Additionally, the data it returns will be used shortly after this method is called, so it needs to remain valid until the next time {@link _on_pre_render} runs.
   */
  _get_composition_layer(index: int): int;
  /**
   * Returns the number of composition layers this extension wrapper provides via {@link _get_composition_layer}.
   * This will only be called if the extension previously registered itself with {@link OpenXRAPIExtension.register_composition_layer_provider}.
   * **Note:** This virtual method will be called on the render thread. Additionally, the data it returns will be used shortly after this method is called, so it needs to remain valid until the next time {@link _on_pre_render} runs.
   */
  _get_composition_layer_count(): int;
  /**
   * Returns an integer that will be used to sort the given composition layer provided via {@link _get_composition_layer}. Lower numbers will move the layer to the front of the list, and higher numbers to the end. The default projection layer has an order of `0`, so layers provided by this method should probably be above or below (but not exactly) `0`.
   * This will only be called if the extension previously registered itself with {@link OpenXRAPIExtension.register_composition_layer_provider}.
   * **Note:** This virtual method will be called on the render thread. Additionally, the data it returns will be used shortly after this method is called, so it needs to remain valid until the next time {@link _on_pre_render} runs.
   */
  _get_composition_layer_order(index: int): int;
  /**
   * Returns a {@link Dictionary} of OpenXR extensions related to this extension. `xr_version` specifies the OpenXR version we're instantiating. This will be zero if the editor requests this list to flag supported features. The {@link Dictionary} should contain the name of the extension, mapped to a `bool *` cast to an integer:
   * - If the `bool *` is a `nullptr` this extension is mandatory.
   * - If the `bool *` points to a boolean, the boolean will be updated to `true` if the extension is enabled.
   */
  _get_requested_extensions(xr_version: int): Dictionary;
  /**
   * Returns a {@link PackedStringArray} of positional tracker names that are used within the extension wrapper.
   */
  _get_suggested_tracker_names(): PackedStringArray;
  /**
   * Gets an array of {@link Dictionary}s that represent properties, just like {@link Object._get_property_list}, that will be added to {@link OpenXRCompositionLayer} nodes.
   * **Note:** This virtual method will be called on the render thread.
   */
  _get_viewport_composition_layer_extension_properties(): Array<Dictionary>;
  /**
   * Gets a {@link Dictionary} containing the default values for the properties returned by {@link _get_viewport_composition_layer_extension_properties}.
   */
  _get_viewport_composition_layer_extension_property_defaults(): Dictionary;
  /**
   * Called before the OpenXR instance is created.
   * **Note:** This virtual method will be called on the main thread, however, it will be called *before* OpenXR becomes involved in rendering, so it is safe to write to data that will be used by the render thread.
   */
  _on_before_instance_created(): void;
  /**
   * Called when there is an OpenXR event to process. When implementing, return `true` if the event was handled, return `false` otherwise.
   */
  _on_event_polled(event: void): boolean;
  /**
   * Called right after the OpenXR instance is created.
   * **Note:** This virtual method will be called on the main thread, however, it will be called *before* OpenXR becomes involved in rendering, so it is safe to write to data that will be used by the render thread.
   */
  _on_instance_created(instance: int): void;
  /**
   * Called right before the OpenXR instance is destroyed.
   * **Note:** This virtual method will be called on the main thread, however, it will be called *after* OpenXR is done being involved in rendering, so it is safe to write to data that was used by the render thread.
   */
  _on_instance_destroyed(): void;
  /**
   * Called right after the main swapchains are (re)created.
   * **Note:** This virtual method will be called on the render thread.
   */
  _on_main_swapchains_created(): void;
  /**
   * Called right after the given viewport is rendered.
   * **Note:** The draw commands might only be queued at this point, not executed.
   * **Note:** This virtual method will be called on the render thread.
   */
  _on_post_draw_viewport(viewport: RID): void;
  /**
   * Called right before the given viewport is rendered.
   * **Note:** This virtual method will be called on the render thread.
   */
  _on_pre_draw_viewport(viewport: RID): void;
  /**
   * Called right before the XR viewports begin their rendering step.
   * **Note:** This virtual method will be called on the render thread.
   */
  _on_pre_render(): void;
  /**
   * Called as part of the OpenXR process handling. This happens right before general and physics processing steps of the main loop. During this step controller data is queried and made available to game logic.
   */
  _on_process(): void;
  /**
   * Allows extensions to register additional controller metadata. This function is called even when the OpenXR API is not constructed as the metadata needs to be available to the editor.
   * Extensions should also provide metadata regardless of whether they are supported on the host system. The controller data is used to setup action maps for users who may have access to the relevant hardware.
   */
  _on_register_metadata(interaction_profile_metadata: OpenXRInteractionProfileMetadata): void;
  /**
   * Called right after the OpenXR session is created.
   * **Note:** This virtual method will be called on the main thread, however, it will be called *before* OpenXR becomes involved in rendering, so it is safe to write to data that will be used by the render thread.
   */
  _on_session_created(session: int): void;
  /**
   * Called right before the OpenXR session is destroyed.
   * **Note:** This virtual method will be called on the main thread, however, it will be called *after* OpenXR is done being involved in rendering, so it is safe to write to data that was used by the render thread.
   */
  _on_session_destroyed(): void;
  /** Called when the OpenXR session state is changed to exiting. */
  _on_state_exiting(): void;
  /**
   * Called when the OpenXR session state is changed to focused. This state is the active state when the game runs.
   */
  _on_state_focused(): void;
  /** Called when the OpenXR session state is changed to idle. */
  _on_state_idle(): void;
  /** Called when the OpenXR session state is changed to loss pending. */
  _on_state_loss_pending(): void;
  /**
   * Called when the OpenXR session state is changed to ready. This means OpenXR is ready to set up the session.
   */
  _on_state_ready(): void;
  /** Called when the OpenXR session state is changed to stopping. */
  _on_state_stopping(): void;
  /**
   * Called when the OpenXR session state is changed to synchronized. OpenXR also returns to this state when the application loses focus.
   */
  _on_state_synchronized(): void;
  /**
   * Called when the OpenXR session state is changed to visible. This means OpenXR is now ready to receive frames.
   */
  _on_state_visible(): void;
  /** Called when OpenXR has performed its action sync. */
  _on_sync_actions(): void;
  /**
   * Called when a composition layer created via {@link OpenXRCompositionLayer} is destroyed.
   * `layer` is a pointer to an `XrCompositionLayerBaseHeader` struct.
   */
  _on_viewport_composition_layer_destroyed(layer: void): void;
  /**
   * Called before {@link _set_view_configuration_and_get_next_pointer} to allow the extension to reserve data for the given number of views.
   */
  _prepare_view_configuration(view_count: int): void;
  /**
   * Called to allow an extension to print additional information about its view configuration, if applicable. This will only be called if verbose output is enabled.
   */
  _print_view_configuration_info(view: int): void;
  /**
   * Add additional data structures to Android surface swapchains created by {@link OpenXRCompositionLayer}.
   * `property_values` contains the values of the properties returned by {@link _get_viewport_composition_layer_extension_properties}.
   * **Note:** This virtual method will be called on the render thread.
   */
  _set_android_surface_swapchain_create_info_and_get_next_pointer(property_values: Dictionary, next_pointer: void): int;
  /**
   * Add additional data structures to `XrFrameEndInfo`.
   * This will only be called if the extension previously registered itself with {@link OpenXRAPIExtension.register_frame_info_extension}.
   * **Note:** This virtual method will be called on the render thread. Additionally, the data it returns will be used shortly after this method is called, so it needs to remain valid until the next time {@link _on_pre_render} runs.
   */
  _set_frame_end_info_and_get_next_pointer(next_pointer: void): int;
  /**
   * Add additional data structures to `XrFrameWaitInfo`.
   * This will only be called if the extension previously registered itself with {@link OpenXRAPIExtension.register_frame_info_extension}.
   * **Note:** This virtual method will be called on the render thread.
   */
  _set_frame_wait_info_and_get_next_pointer(next_pointer: void): int;
  /** Add additional data structures when each hand tracker is created. */
  _set_hand_joint_locations_and_get_next_pointer(hand_index: int, next_pointer: void): int;
  /**
   * Add additional data structures when the OpenXR instance is created. `xr_version` specifies the OpenXR version we're instantiating.
   */
  _set_instance_create_info_and_get_next_pointer(xr_version: int, next_pointer: void): int;
  /**
   * Adds additional data structures to `XrCompositionLayerProjection`.
   * This will only be called if the extension previously registered itself with {@link OpenXRAPIExtension.register_projection_layer_extension}.
   */
  _set_projection_layer_and_get_next_pointer(next_pointer: void): int;
  /**
   * Add additional data structures to the projection view of the given `view_index`.
   * **Note:** This virtual method will be called on the render thread. Additionally, the data it returns will be used shortly after this method is called, so it needs to remain valid until the next time {@link _on_pre_render} runs.
   */
  _set_projection_views_and_get_next_pointer(view_index: int, next_pointer: void): int;
  /** Add additional data structures to `XrReferenceSpaceCreateInfo`. */
  _set_reference_space_create_info_and_get_next_pointer(reference_space_type: int, next_pointer: void): int;
  /** Add additional data structures when the OpenXR session is created. */
  _set_session_create_and_get_next_pointer(next_pointer: void): int;
  /** Add additional data structures when creating OpenXR swapchains. */
  _set_swapchain_create_info_and_get_next_pointer(next_pointer: void): int;
  /** Add additional data structures when querying OpenXR system abilities. */
  _set_system_properties_and_get_next_pointer(next_pointer: void): int;
  /** Add additional data structures when querying OpenXR view configuration. */
  _set_view_configuration_and_get_next_pointer(view: int, next_pointer: void): int;
  /**
   * Add additional data structures to `XrViewLocateInfo`.
   * This will only be called if the extension previously registered itself with {@link OpenXRAPIExtension.register_frame_info_extension}.
   * **Note:** This virtual method will be called on the render thread. Additionally, the data it returns will be used shortly after this method is called, so it needs to remain valid until the next time {@link _on_pre_render} runs.
   */
  _set_view_locate_info_and_get_next_pointer(next_pointer: void): int;
  /**
   * Add additional data structures to composition layers created by {@link OpenXRCompositionLayer}.
   * `property_values` contains the values of the properties returned by {@link _get_viewport_composition_layer_extension_properties}.
   * `layer` is a pointer to an `XrCompositionLayerBaseHeader` struct.
   * **Note:** This virtual method will be called on the render thread. Additionally, the data it returns will be used shortly after this method is called, so it needs to remain valid until the next time {@link _on_pre_render} runs.
   */
  _set_viewport_composition_layer_and_get_next_pointer(layer: void, property_values: Dictionary, next_pointer: void): int;
  /** Returns the created {@link OpenXRAPIExtension}, which can be used to access the OpenXR API. */
  get_openxr_api(): OpenXRAPIExtension | null;
  /**
   * Registers the extension. This should happen at core module initialization level.
   * **Note:** This cannot be called once OpenXR has been initialized.
   */
  register_extension_wrapper(): void;
}
