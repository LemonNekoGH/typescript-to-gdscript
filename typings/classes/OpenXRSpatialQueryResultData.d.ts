// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing the main query result data. */
declare class OpenXRSpatialQueryResultData extends OpenXRSpatialComponentData {
  /** Returns the number of entities that were retrieved. */
  get_capacity(): int;
  /** Returns the entity id (`XrSpatialEntityIdEXT`) for the entity at this `index`. */
  get_entity_id(index: int): int;
  /** Returns the entity state for the entity at this `index`. */
  get_entity_state(index: int): int;
}
