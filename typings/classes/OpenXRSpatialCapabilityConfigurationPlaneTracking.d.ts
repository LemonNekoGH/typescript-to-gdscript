// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Configuration header for plane tracking. */
declare class OpenXRSpatialCapabilityConfigurationPlaneTracking extends OpenXRSpatialCapabilityConfigurationBaseHeader {
  /**
   * Returns the components enabled by this configuration.
   * **Note:** Only valid after this configuration was used to create a spatial context.
   */
  get_enabled_components(): PackedInt64Array;
  /**
   * Returns `true` if we support the plane semantic label component (only valid after the OpenXR session has started). You can query these using the {@link OpenXRSpatialComponentPlaneSemanticLabelList} data object.
   */
  supports_labels(): boolean;
  /**
   * Returns `true` if we support the mesh 2D component (only valid after the OpenXR session has started). You can query these using the {@link OpenXRSpatialComponentMesh2DList} data object.
   */
  supports_mesh_2d(): boolean;
  /**
   * Returns `true` if we support the polygon 2D component (only valid after the OpenXR session has started). You can query these using the {@link OpenXRSpatialComponentPolygon2DList} data object.
   */
  supports_polygons(): boolean;
}
