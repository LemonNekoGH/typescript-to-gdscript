// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Implementation for handling spatial entity marker tracking logic. */
declare class OpenXRSpatialMarkerTrackingCapability extends OpenXRExtensionWrapper {
  /**
   * Calls {@link OpenXRSpatialEntityExtension.update_spatial_entities} and {@link OpenXRSpatialEntityExtension.query_snapshot} with the marker entities associated with `spatial_context`.
   * `component_data` are the {@link OpenXRSpatialComponentData}s to update for this marker capability.
   * If `next_snapshot_create` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.update_spatial_entities}.
   * If `next_snapshot_query` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.query_snapshot}.
   */
  do_entity_update(spatial_context: RID, component_data: Array<OpenXRSpatialComponentData>, next_snapshot_create?: OpenXRStructureBase, next_snapshot_query?: OpenXRStructureBase): void;
  /** Returns `true` if April tag marker tracking is supported by the current device. */
  is_april_tag_supported(): boolean;
  /** Returns `true` if Aruco marker tracking is supported by the current device. */
  is_aruco_supported(): boolean;
  /** Returns `true` if micro QR code marker tracking is supported by the current device. */
  is_micro_qrcode_supported(): boolean;
  /** Returns `true` if QR code marker tracking is supported by the current device. */
  is_qrcode_supported(): boolean;
  /**
   * Calls {@link OpenXRSpatialEntityExtension.discover_spatial_entities} and {@link OpenXRSpatialEntityExtension.query_snapshot} with the marker entities associated with `spatial_context`.
   * `component_data` are the {@link OpenXRSpatialComponentData}s to discover for this marker capability.
   * If `next_snapshot_create` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.discover_spatial_entities}.
   * If `next_snapshot_query` is non-null, then pass this to the `next` parameter in {@link OpenXRSpatialEntityExtension.query_snapshot}.
   * `user_callback`, when non-null, is called with two parameters usually twice. The first parameter is the {@link RID} of the discovery snapshot and the second parameter is a boolean where `false` indicates the discovery snapshot is about to be processed, and `true` indicates the discovery snapshot has been processed and `component_data` has valid data. The second call is skipped if an error was encountered.
   * The returned {@link OpenXRFutureResult} is identical to the return from {@link OpenXRSpatialEntityExtension.discover_spatial_entities}.
   */
  start_entity_discovery(spatial_context: RID, component_data: Array<OpenXRSpatialComponentData>, next_snapshot_create?: OpenXRStructureBase, next_snapshot_query?: OpenXRStructureBase, user_callback?: Callable): OpenXRFutureResult | null;
}
