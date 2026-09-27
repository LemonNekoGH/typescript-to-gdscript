// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Positional tracker for our spatial entity anchor extension. */
declare class OpenXRAnchorTracker extends OpenXRSpatialEntityTracker {
  /** The UUID provided for persistent anchors. */
  uuid: string;
  set_uuid(value: string | NodePath): void;
  get_uuid(): string;

  /** Returns `true` if a non-zero UUID is set. */
  has_uuid(): boolean;

  /** Emitted when the UUID for this anchor was changed. */
  uuid_changed: Signal<[]>;
}
