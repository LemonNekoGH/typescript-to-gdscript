// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** OpenXR extension that handles spatial entities. */
declare class OpenXRSpatialEntityExtension extends OpenXRExtensionWrapper {
  /** Registers an entity that was created directly on the OpenXR runtime. */
  add_spatial_entity(spatial_context: RID, entity_id: int, entity: int): RID;
  /**
   * Creates a new spatial context that handles entities for the provided capability configurations. `capability_configurations` is an array of {@link OpenXRSpatialCapabilityConfigurationBaseHeader} with the needed capability configuration data.
   * `next` is an optional parameter that can contain additional information for creating our spatial context.
   * **Note:** This is an asynchronous method and returns an {@link OpenXRFutureResult} object with which to track the status, discarding this object will not cancel the creation process. On success `user_callback` will be called if specified. The result data for this function is the {@link RID} for our spatial context.
   */
  create_spatial_context(capability_configurations: Array<OpenXRSpatialCapabilityConfigurationBaseHeader>, next?: OpenXRStructureBase, user_callback?: Callable): OpenXRFutureResult | null;
  /**
   * Starts a new discovery query, this will gather all objects tracked by the `spatial_context` that have at least one of the component types specified in `component_types`.
   * `next` is an optional parameter that can contain additional information for executing the discovery query.
   * **Note:** This is an asynchronous method and returns an {@link OpenXRFutureResult} object with which to track the status, discarding this object will not cancel the discovery process. On success `user_callback` will be called if specified. The result data for this function is the {@link RID} for our snapshot.
   */
  discover_spatial_entities(spatial_context: RID, component_types: PackedInt64Array | Array<unknown>, next?: OpenXRStructureBase, user_callback?: Callable): OpenXRFutureResult | null;
  /**
   * Convenience method when the caller only has an {@link Array} of {@link OpenXRSpatialComponentData} and needs to discover spatial entities.
   */
  discover_spatial_entities_with_component_data(spatial_context: RID, component_data: Array<OpenXRSpatialComponentData>, next?: OpenXRStructureBase, user_callback?: Callable): OpenXRFutureResult | null;
  /** Returns the {@link RID} for the specified spatial entity ID. */
  find_spatial_entity(entity_id: int): RID;
  /**
   * Frees a spatial context previously created when calling {@link create_spatial_context}. If the spatial context creation is still ongoing, the asynchronous process is cancelled.
   */
  free_spatial_context(spatial_context: RID): void;
  /**
   * Frees an entity previously created when calling {@link add_spatial_entity} or {@link make_spatial_entity}.
   */
  free_spatial_entity(entity: RID): void;
  /**
   * Frees a spatial snapshot previously created when calling {@link discover_spatial_entities}. If the spatial snapshot creation is still ongoing, the asynchronous process is cancelled.
   */
  free_spatial_snapshot(spatial_snapshot: RID): void;
  /** Returns a buffer with floats from a buffer that was retrieved when taking a snapshot. */
  get_float_buffer(spatial_snapshot: RID, buffer_id: int): PackedFloat32Array;
  /**
   * Returns the OpenXR spatial context handle for this snapshot.
   * **Note:** This method is intended to be used from GDExtensions that implement spatial entity capability handlers.
   */
  get_spatial_context_handle(spatial_context: RID): int;
  /** Returns `true` if the spatial context finished its creation and is ready to be used. */
  get_spatial_context_ready(spatial_context: RID): boolean;
  /** Returns the spatial context for this entity. */
  get_spatial_entity_context(entity: RID): RID;
  /** Returns the internal `XrSpatialEntityIdEXT` associated with the entity. */
  get_spatial_entity_id(entity: RID): int;
  /** Returns the spatial context related to this spatial snapshot. */
  get_spatial_snapshot_context(spatial_snapshot: RID): RID;
  /**
   * Returns the OpenXR spatial snapshot handle for this snapshot.
   * **Note:** This method is intended to be used from GDExtensions that implement spatial entity capability handlers.
   */
  get_spatial_snapshot_handle(spatial_snapshot: RID): int;
  /** Returns a string from a buffer that was retrieved when taking a snapshot. */
  get_string(spatial_snapshot: RID, buffer_id: int): string;
  /** Returns a buffer with 8 bit ints from a buffer that was retrieved when taking a snapshot. */
  get_uint8_buffer(spatial_snapshot: RID, buffer_id: int): PackedByteArray;
  /** Returns a buffer with 16 bit ints from a buffer that was retrieved when taking a snapshot. */
  get_uint16_buffer(spatial_snapshot: RID, buffer_id: int): PackedInt32Array;
  /** Returns a buffer with 32 bit ints from a buffer that was retrieved when taking a snapshot. */
  get_uint32_buffer(spatial_snapshot: RID, buffer_id: int): PackedInt32Array;
  /**
   * Returns a buffer with {@link Vector2} entries from a buffer that was retrieved when taking a snapshot.
   */
  get_vector2_buffer(spatial_snapshot: RID, buffer_id: int): PackedVector2Array;
  /**
   * Returns a buffer with {@link Vector3} entries from a buffer that was retrieved when taking a snapshot.
   */
  get_vector3_buffer(spatial_snapshot: RID, buffer_id: int): PackedVector3Array;
  /**
   * Creates a new entity for this `entity_id`. The `spatial_context` should match the context that discovered the entity.
   */
  make_spatial_entity(spatial_context: RID, entity_id: int): RID;
  /**
   * Queries the snapshot data. This will find all entities in the snapshot that contain all requested components in `component_data`. The objects held within `component_data` will then be populated with the queried data. `component_data` must always have an object of {@link OpenXRSpatialQueryResultData} as the first entry.
   * `next` is an optional parameter that can contain additional information passed when setting our query conditions.
   */
  query_snapshot(spatial_snapshot: RID, component_data: Array<OpenXRSpatialComponentData>, next?: OpenXRStructureBase): boolean;
  /** Returns `true` if this spatial entity `capability` is supported by the hardware used. */
  supports_capability(capability: int): boolean;
  /** Returns `true` if this `capability` supports the `component_type`. */
  supports_component_type(capability: int, component_type: int): boolean;
  /**
   * Performs a snapshot for a limited number of entities. This is NOT an asynchronous method and will return the snapshot immediately.
   */
  update_spatial_entities(spatial_context: RID, entities: Array<RID>, component_types: PackedInt64Array | Array<unknown>, next?: OpenXRStructureBase): RID;

  /**
   * Emitted when OpenXR recommends running a discovery query because entities managed by this spatial context have (likely) changed.
   */
  spatial_discovery_recommended: Signal<[RID]>;

  // enum Capability
  /** Plane tracking capability. */
  static readonly CAPABILITY_PLANE_TRACKING: int;
  /** QR code based marker tracking capability. */
  static readonly CAPABILITY_MARKER_TRACKING_QR_CODE: int;
  /** Micro QR code based marker tracking capability. */
  static readonly CAPABILITY_MARKER_TRACKING_MICRO_QR_CODE: int;
  /** Aruco marker based marker tracking capability. */
  static readonly CAPABILITY_MARKER_TRACKING_ARUCO_MARKER: int;
  /** April tag based marker tracking capability. */
  static readonly CAPABILITY_MARKER_TRACKING_APRIL_TAG: int;
  /** Anchor capability. */
  static readonly CAPABILITY_ANCHOR: int;
  // enum ComponentType
  /**
   * Component that provides the 2D bounds for a spatial entity. The corresponding list structure is `XrSpatialComponentBounded2DListEXT`; the corresponding data structure is `XrSpatialBounded2DDataEXT`.
   */
  static readonly COMPONENT_TYPE_BOUNDED_2D: int;
  /**
   * Component that provides the 3D bounds for a spatial entity. The corresponding list structure is `XrSpatialComponentBounded3DListEXT`; the corresponding data structure is `XrBoxf`.
   */
  static readonly COMPONENT_TYPE_BOUNDED_3D: int;
  /**
   * Component that provides the XrSpatialEntityIdEXT of the parent for a spatial entity. The corresponding list structure is `XrSpatialComponentParentListEXT`; the corresponding data structure is `XrSpatialEntityIdEXT`.
   */
  static readonly COMPONENT_TYPE_PARENT: int;
  /**
   * Component that provides a 3D mesh for a spatial entity. The corresponding list structure is `XrSpatialComponentMesh3DListEXT`; the corresponding data structure is `XrSpatialMeshDataEXT`.
   */
  static readonly COMPONENT_TYPE_MESH_3D: int;
  /**
   * Component that provides the plane alignment enum for a spatial entity. The corresponding list structure is `XrSpatialComponentPlaneAlignmentListEXT`; the corresponding data structure is `XrSpatialPlaneAlignmentEXT` (Added by the `XR_EXT_spatial_plane_tracking` extension).
   */
  static readonly COMPONENT_TYPE_PLANE_ALIGNMENT: int;
  /**
   * Component that provides a 2D mesh for a spatial entity. The corresponding list structure is `XrSpatialComponentMesh2DListEXT`; the corresponding data structure is `XrSpatialMeshDataEXT` (Added by the `XR_EXT_spatial_plane_tracking` extension).
   */
  static readonly COMPONENT_TYPE_MESH_2D: int;
  /**
   * Component that provides a 2D boundary polygon for a spatial entity. The corresponding list structure is `XrSpatialComponentPolygon2DListEXT`; the corresponding data structure is `XrSpatialPolygon2DDataEXT` (Added by the `XR_EXT_spatial_plane_tracking` extension).
   */
  static readonly COMPONENT_TYPE_POLYGON_2D: int;
  /**
   * Component that provides a semantic label for a plane. The corresponding list structure is `XrSpatialComponentPlaneSemanticLabelListEXT`; the corresponding data structure is `XrSpatialPlaneSemanticLabelEXT` (Added by the `XR_EXT_spatial_plane_tracking` extension).
   */
  static readonly COMPONENT_TYPE_PLANE_SEMANTIC_LABEL: int;
  /**
   * A component describing the marker type, ID and location. The corresponding list structure is `XrSpatialComponentMarkerListEXT`; the corresponding data structure is `XrSpatialMarkerDataEXT` (Added by the `XR_EXT_spatial_marker_tracking` extension).
   */
  static readonly COMPONENT_TYPE_MARKER: int;
  /**
   * Component that provides the location for an anchor. The corresponding list structure is `XrSpatialComponentAnchorListEXT`; the corresponding data structure is `XrPosef` (Added by the `XR_EXT_spatial_anchor` extension).
   */
  static readonly COMPONENT_TYPE_ANCHOR: int;
  /**
   * Component that provides the persisted UUID for a spatial entity. The corresponding list structure is `XrSpatialComponentPersistenceListEXT; the corresponding data structure is [code]XrSpatialPersistenceDataEXT` (Added by the `XR_EXT_spatial_persistence` extension).
   */
  static readonly COMPONENT_TYPE_PERSISTENCE: int;
}
