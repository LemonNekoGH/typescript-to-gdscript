// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the query persistence result data. */
declare class OpenXRSpatialComponentPersistenceList extends OpenXRSpatialComponentData {
  /** Returns the persistent state (`XrSpatialPersistenceStateEXT`) for the entity at this `index`. */
  get_persistent_state(index: int): int;
  /** Returns the persistent uuid for the entity at this `index`. */
  get_persistent_uuid(index: int): string;
}
