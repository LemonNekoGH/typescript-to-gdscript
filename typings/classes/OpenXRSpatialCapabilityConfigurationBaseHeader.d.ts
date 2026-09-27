// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Wrapper base class for OpenXR Spatial Capability Configuration headers. */
declare class OpenXRSpatialCapabilityConfigurationBaseHeader extends RefCounted {
  /**
   * Return a pointer (encoded as an `int64_t`) to a struct holding the spatial capability configuration data. The memory for this struct should remain accessible as long as this object remains instantiated.
   */
  _get_configuration(): int;
  /**
   * Return `true` if this object contains a valid configuration that can be retrieved when calling {@link _get_configuration}.
   */
  _has_valid_configuration(): boolean;
  /**
   * Gets a pointer to the `XrSpatialCapabilityConfigurationBaseHeaderEXT` struct.
   * **Note:** This method is intended to be used from GDExtensions.
   */
  get_configuration(): int;
  /**
   * Returns `true` if this object contains a valid configuration that can be used when calling {@link OpenXRSpatialEntityExtension.create_spatial_context}.
   */
  has_valid_configuration(): boolean;
}
