// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Implementation for handling spatial entity anchor logic. */
declare class OpenXRSpatialAnchorCapability extends OpenXRExtensionWrapper {
  /**
   * Calls {@link create_persistence_context} with a configuration that likely works with the XR runtime.
   * `user_callback` is called when the context is created.
   */
  create_default_persistence_context(user_callback?: Callable): OpenXRFutureResult | null;
  /**
   * Creates a new anchor that will be tracked by the XR runtime. The `transform` should be a transform in the local space of your {@link XROrigin3D} node. If `spatial_context` is not specified the default will be used, this requires {@link ProjectSettings.xr/openxr/extensions/spatial_entity/enable_builtin_anchor_detection} to be set. The returned tracker will track the location in case our reference space changes.
   * `next` must be a valid next object for the `XrSpatialAnchorCreateInfoEXT` chain.
   */
  create_new_anchor(transform: Transform3D | Projection, spatial_context?: RID, next?: OpenXRStructureBase): OpenXRAnchorTracker | null;
  /**
   * Creates a new persistence context for storing persistent data.
   * **Note:** This is an asynchronous method and returns an {@link OpenXRFutureResult} object with which to track the status, discarding this object will not cancel the creation process. On success `user_callback` will be called if specified. The result value for this function is the {@link RID} for our persistence context.
   */
  create_persistence_context(scope: int, user_callback?: Callable): OpenXRFutureResult | null;
  /**
   * Calls {@link OpenXRSpatialEntityExtension.update_spatial_entities} and {@link OpenXRSpatialEntityExtension.query_snapshot} with the anchor entities associated with `spatial_context`.
   * `component_data` are the {@link OpenXRSpatialComponentData}s to update for this anchor capability.
   * If `next_snapshot_create` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.update_spatial_entities}.
   * If `next_snapshot_query` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.query_snapshot}.
   */
  do_entity_update(spatial_context: RID, component_data: Array<OpenXRSpatialComponentData>, next_snapshot_create?: OpenXRStructureBase, next_snapshot_query?: OpenXRStructureBase): void;
  /** Frees a persistence context previously created with {@link create_persistence_context}. */
  free_persistence_context(persistence_context: RID): void;
  /**
   * Returns the internal handle for this persistence context.
   * **Note:** For GDExtension implementations.
   */
  get_persistence_context_handle(persistence_context: RID): int;
  /**
   * Returns `true` if this persistence scope is supported by our spatial anchor capability.
   * **Note:** Only valid after an OpenXR instance has been created.
   */
  is_persistence_scope_supported(scope: int): boolean;
  /**
   * Returns `true` if spatial anchors are supported by the hardware. Only returns a valid value after OpenXR has been initialized.
   */
  is_spatial_anchor_supported(): boolean;
  /**
   * Returns `true` if persistent spatial anchors are supported by the hardware. Only returns a valid value after OpenXR has been initialized.
   */
  is_spatial_persistence_supported(): boolean;
  /**
   * Changes this anchor into a persistent anchor. This means its location will be stored on the device and the anchor will be restored the next time your application starts. If `persistence_context` is not specified the default will be used, this requires {@link ProjectSettings.xr/openxr/extensions/spatial_entity/enable_builtin_anchor_detection} to be set.
   * **Note:** This is an asynchronous method and returns an {@link OpenXRFutureResult} object with which to track the status, discarding this object will not cancel the creation process. On success `user_callback` will be called if specified. The result value for this function is a boolean which will be set to `true` on successful completion.
   */
  persist_anchor(anchor_tracker: OpenXRAnchorTracker, persistence_context?: RID, user_callback?: Callable): OpenXRFutureResult | null;
  /**
   * Remove an anchor previously created with {@link create_new_anchor}. If this anchor was persistent you must first call {@link unpersist_anchor} and await its callback.
   */
  remove_anchor(anchor_tracker: OpenXRAnchorTracker): void;
  /**
   * Calls {@link OpenXRSpatialEntityExtension.discover_spatial_entities} and {@link OpenXRSpatialEntityExtension.query_snapshot} with the anchor entities associated with `spatial_context`.
   * `component_data` are the {@link OpenXRSpatialComponentData}s to discover for this anchor capability.
   * If `next_snapshot_create` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.discover_spatial_entities}.
   * If `next_snapshot_query` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.query_snapshot}.
   * `user_callback`, when non-null, is called with two parameters usually twice. The first parameter is the {@link RID} of the discovery snapshot and the second parameter is a boolean where `false` indicates the discovery snapshot is about to be processed, and `true` indicates the discovery snapshot has been processed and `component_data` has valid data. The second call is skipped if an error was encountered.
   * The returned {@link OpenXRFutureResult} is identical to the return from {@link OpenXRSpatialEntityExtension.discover_spatial_entities}.
   */
  start_entity_discovery(spatial_context: RID, component_data: Array<OpenXRSpatialComponentData>, next_snapshot_create?: OpenXRStructureBase, next_snapshot_query?: OpenXRStructureBase, user_callback?: Callable): OpenXRFutureResult | null;
  /**
   * Removes the persistent data from this anchor. The runtime will not recreate the anchor when your application restarts. If `persistence_context` is not specified the default will be used, this requires {@link ProjectSettings.xr/openxr/extensions/spatial_entity/enabled} to be set.
   * **Note:** This is an asynchronous method and returns an {@link OpenXRFutureResult} object with which to track the status, discarding this object will not cancel the creation process. On success `user_callback` will be called if specified. The result value for this function is a boolean which will be set to `true` on successful completion.
   */
  unpersist_anchor(anchor_tracker: OpenXRAnchorTracker, persistence_context?: RID, user_callback?: Callable): OpenXRFutureResult | null;

  // enum PersistenceScope
  /**
   * Provides the application with read-only access (i.e. application cannot modify this scope) to spatial entities persisted and managed by the system. The application can use the UUID in the persistence component for this scope to correlate entities across spatial contexts and device reboots.
   */
  static readonly PERSISTENCE_SCOPE_SYSTEM_MANAGED: int;
  /**
   * Persistence operations and data access is limited to spatial anchors, on the same device, for the same user and same app (using {@link persist_anchor} and {@link unpersist_anchor} functions)
   */
  static readonly PERSISTENCE_SCOPE_LOCAL_ANCHORS: int;
}
