// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Collection of {@link OpenXRAction} resources that make up an action set. */
declare class OpenXRActionSet extends Resource {
  /** Collection of actions for this action set. */
  actions: Array<unknown>;
  /** The localized name of this action set. */
  localized_name: string;
  /** The priority for this action set. */
  priority: int;
  set_actions(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_actions(): Array<unknown>;
  set_localized_name(value: string | NodePath): void;
  get_localized_name(): string;
  set_priority(value: int): void;
  get_priority(): int;

  /** Add an action to this action set. */
  add_action(action: OpenXRAction): void;
  /** Retrieve the number of actions in our action set. */
  get_action_count(): int;
  /** Remove an action from this action set. */
  remove_action(action: OpenXRAction): void;
}
