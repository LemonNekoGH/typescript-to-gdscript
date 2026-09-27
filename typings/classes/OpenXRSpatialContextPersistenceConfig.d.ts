// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Configuration header for spatial persistence. */
declare class OpenXRSpatialContextPersistenceConfig extends OpenXRStructureBase {
  /**
   * Adds a persistence context to this configuration. You must add at least one persistence context to create a valid configuration. You can create a persistence context by calling {@link OpenXRSpatialAnchorCapability.create_persistence_context}.
   */
  add_persistence_context(persistence_context: RID): void;
  /** Gets the persistence context(s) (as {@link RID}s) received by {@link add_persistence_context}. */
  get_persistence_contexts(): Array<unknown>;
  /** Removes a persistence context. */
  remove_persistence_context(persistence_context: RID): void;
}
