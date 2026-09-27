// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Suggested bindings object for OpenXR. */
declare class OpenXRInteractionProfile extends Resource {
  /** Binding modifiers for this interaction profile. */
  binding_modifiers: Array<unknown>;
  /** Action bindings for this interaction profile. */
  bindings: Array<unknown>;
  /** The interaction profile path identifying the XR device. */
  interaction_profile_path: string;
  set_binding_modifiers(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_binding_modifiers(): Array<unknown>;
  set_bindings(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_bindings(): Array<unknown>;
  set_interaction_profile_path(value: string | NodePath): void;
  get_interaction_profile_path(): string;

  /** Retrieve the binding at this index. */
  get_binding(index: int): OpenXRIPBinding | null;
  /** Get the number of bindings in this interaction profile. */
  get_binding_count(): int;
  /** Get the {@link OpenXRBindingModifier} at this index. */
  get_binding_modifier(index: int): OpenXRIPBindingModifier | null;
  /** Get the number of binding modifiers in this interaction profile. */
  get_binding_modifier_count(): int;
}
