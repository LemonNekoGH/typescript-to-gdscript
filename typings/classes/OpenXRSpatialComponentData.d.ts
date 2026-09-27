// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing OpenXR spatial entity component data. */
declare class OpenXRSpatialComponentData extends RefCounted {
  /** Return the component type for the component we store data for. */
  _get_component_type(): int;
  /**
   * Return a pointer to the structure data that will be submitted along with the snapshot query. This pointer must remain valid as long as this object is instantiated.
   */
  _get_structure_data(next: int): int;
  /**
   * Sets the expected capacity as provided by the spatial entities query system. Buffers should be initialized with the correct storage.
   */
  _set_capacity(capacity: int): void;
  /** Gets this {@link OpenXRSpatialComponentData}'s `XrSpatialComponentTypeEXT`. */
  get_component_type(): int;
  /**
   * Sets the expected capacity as provided by the spatial entities query system. Buffers should be initialized with the correct storage.
   */
  set_capacity(capacity: int): void;
}
