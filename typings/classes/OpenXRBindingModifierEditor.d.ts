// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Binding modifier editor. */
declare class OpenXRBindingModifierEditor extends PanelContainer {
  /** Returns the {@link OpenXRBindingModifier} currently being edited. */
  get_binding_modifier(): OpenXRBindingModifier | null;
  /** Setup this editor for the provided `action_map` and `binding_modifier`. */
  setup(action_map: OpenXRActionMap, binding_modifier: OpenXRBindingModifier): void;

  /** Signal emitted when the user presses the delete binding modifier button for this modifier. */
  binding_modifier_removed: Signal<[GodotObject]>;
}
