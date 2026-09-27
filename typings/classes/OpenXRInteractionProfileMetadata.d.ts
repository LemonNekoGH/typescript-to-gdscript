// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Meta class registering supported devices in OpenXR. */
declare class OpenXRInteractionProfileMetadata extends GodotObject {
  /**
   * Registers an interaction profile using its OpenXR designation (e.g. `/interaction_profiles/khr/simple_controller` is the profile for OpenXR's simple controller profile).
   * `display_name` is the description shown to the user. `openxr_path` is the interaction profile path being registered. `openxr_extension_names` optionally restricts this profile to the given extension being enabled/available. If the extension is not available, the profile and all related entries used in an action map are filtered out.
   */
  register_interaction_profile(display_name: string | NodePath, openxr_path: string | NodePath, openxr_extension_names: string | NodePath): void;
  /**
   * Registers an input/output path for the given `interaction_profile`. The profile should previously have been registered using {@link register_interaction_profile}. `display_name` is the description shown to the user. `toplevel_path` specifies the bind path this input/output can be bound to (e.g. `/user/hand/left` or `/user/hand/right`). `openxr_path` is the action input/output being registered (e.g. `/user/hand/left/input/aim/pose`). `openxr_extension_names` restricts this input/output to an enabled/available extension, this doesn't need to repeat the extension on the profile but relates to overlapping extension (e.g. `XR_EXT_palm_pose` that introduces `…/input/palm_ext/pose` input paths). `action_type` defines the type of input or output provided by OpenXR.
   */
  register_io_path(interaction_profile: string | NodePath, display_name: string | NodePath, toplevel_path: string | NodePath, openxr_path: string | NodePath, openxr_extension_names: string | NodePath, action_type: int): void;
  /**
   * Allows for renaming old input/output paths to new paths in order to load and process older action maps.
   */
  register_path_rename(old_name: string | NodePath, new_name: string | NodePath): void;
  /**
   * Allows for renaming old interaction profile paths to new paths in order to load and process older action maps.
   */
  register_profile_rename(old_name: string | NodePath, new_name: string | NodePath): void;
  /**
   * Registers a top level path to which profiles can be bound. For instance `/user/hand/left` refers to the bind point for the player's left hand. Extensions can register additional top level paths, for instance a haptic vest extension might register `/user/body/vest`.
   * `display_name` is the name shown to the user. `openxr_path` is the top level path being registered. `openxr_extension_names` is optional and ensures the top level path is only used if the specified extension is available/enabled.
   * When a top level path ends up being bound by OpenXR, an {@link XRPositionalTracker} is instantiated to manage the state of the device.
   */
  register_top_level_path(display_name: string | NodePath, openxr_path: string | NodePath, openxr_extension_names: string | NodePath): void;
}
