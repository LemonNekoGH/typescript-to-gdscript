// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** An OpenXR action. */
declare class OpenXRAction extends Resource {
  /** The type of action. */
  action_type: int;
  /** The localized description of this action. */
  localized_name: string;
  /** A collections of toplevel paths to which this action can be bound. */
  toplevel_paths: PackedStringArray;
  set_action_type(value: int): void;
  get_action_type(): int;
  set_localized_name(value: string | NodePath): void;
  get_localized_name(): string;
  set_toplevel_paths(value: PackedStringArray | Array<unknown>): void;
  get_toplevel_paths(): PackedStringArray;

  // enum ActionType
  /** This action provides a boolean value. */
  static readonly OPENXR_ACTION_BOOL: int;
  /** This action provides a float value between `0.0` and `1.0` for any analog input such as triggers. */
  static readonly OPENXR_ACTION_FLOAT: int;
  /** This action provides a {@link Vector2} value and can be bound to embedded trackpads and joysticks. */
  static readonly OPENXR_ACTION_VECTOR2: int;
  static readonly OPENXR_ACTION_POSE: int;
}
