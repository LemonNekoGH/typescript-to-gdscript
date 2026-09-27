// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Defines a binding between an {@link OpenXRAction} and an XR input or output. */
declare class OpenXRIPBinding extends Resource {
  /** {@link OpenXRAction} that is bound to {@link binding_path}. */
  action: OpenXRAction | null;
  /** Binding modifiers for this binding. */
  binding_modifiers: Array<unknown>;
  /**
   * Binding path that defines the input or output bound to {@link action}.
   * **Note:** Binding paths are suggestions, an XR runtime may choose to bind the action to a different input or output emulating this input or output.
   */
  binding_path: string;
  /** Paths that define the inputs or outputs bound on the device. */
  paths: PackedStringArray;
  set_action(value: OpenXRAction | null): void;
  get_action(): OpenXRAction | null;
  set_binding_modifiers(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_binding_modifiers(): Array<unknown>;
  set_binding_path(value: string | NodePath): void;
  get_binding_path(): string;
  set_paths(value: PackedStringArray | Array<unknown>): void;
  get_paths(): PackedStringArray;

  /** Add an input/output path to this binding. */
  add_path(path: string | NodePath): void;
  /** Get the {@link OpenXRBindingModifier} at this index. */
  get_binding_modifier(index: int): OpenXRActionBindingModifier | null;
  /** Get the number of binding modifiers for this binding. */
  get_binding_modifier_count(): int;
  /** Get the number of input/output paths in this binding. */
  get_path_count(): int;
  /** Returns `true` if this input/output path is part of this binding. */
  has_path(path: string | NodePath): boolean;
  /** Removes this input/output path from this binding. */
  remove_path(path: string | NodePath): void;
}
