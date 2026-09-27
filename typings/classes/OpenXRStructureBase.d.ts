// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Object for storing OpenXR structure data. */
declare class OpenXRStructureBase extends RefCounted {
  /**
   * Setting another structure object here chains these structures together to extend the API functionality. Consult the OpenXR documentation for which structures can be used with a given API call.
   */
  next: OpenXRStructureBase | null;
  set_next(value: OpenXRStructureBase | null): void;
  get_next(): OpenXRStructureBase | null;

  _get_header(next: int): int;
  /** Returns the structure type (OpenXR `XrStructureType`) used for this structure. */
  get_structure_type(): int;
}
