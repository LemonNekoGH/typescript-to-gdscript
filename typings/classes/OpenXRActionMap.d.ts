// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Collection of {@link OpenXRActionSet} and {@link OpenXRInteractionProfile} resources for the OpenXR module.
 */
declare class OpenXRActionMap extends Resource {
  /** Collection of {@link OpenXRActionSet}s that are part of this action map. */
  action_sets: Array<unknown>;
  /** Collection of {@link OpenXRInteractionProfile}s that are part of this action map. */
  interaction_profiles: Array<unknown>;
  set_action_sets(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_action_sets(): Array<unknown>;
  set_interaction_profiles(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_interaction_profiles(): Array<unknown>;

  /** Add an action set. */
  add_action_set(action_set: OpenXRActionSet): void;
  /** Add an interaction profile. */
  add_interaction_profile(interaction_profile: OpenXRInteractionProfile): void;
  /** Setup this action set with our default actions. */
  create_default_action_sets(): void;
  /** Retrieve an action set by name. */
  find_action_set(name: string | NodePath): OpenXRActionSet | null;
  /** Find an interaction profile by its name (path). */
  find_interaction_profile(name: string | NodePath): OpenXRInteractionProfile | null;
  /** Retrieve the action set at this index. */
  get_action_set(idx: int): OpenXRActionSet | null;
  /** Retrieve the number of actions sets in our action map. */
  get_action_set_count(): int;
  /** Get the interaction profile at this index. */
  get_interaction_profile(idx: int): OpenXRInteractionProfile | null;
  /** Retrieve the number of interaction profiles in our action map. */
  get_interaction_profile_count(): int;
  /** Remove an action set. */
  remove_action_set(action_set: OpenXRActionSet): void;
  /** Remove an interaction profile. */
  remove_interaction_profile(interaction_profile: OpenXRInteractionProfile): void;
}
