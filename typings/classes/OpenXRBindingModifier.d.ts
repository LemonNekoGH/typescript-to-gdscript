// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Binding modifier base class. */
declare class OpenXRBindingModifier extends Resource {
  /** Return the description of this class that is used for the title bar of the binding modifier editor. */
  _get_description(): string;
  /**
   * Returns the data that is sent to OpenXR when submitting the suggested interacting bindings this modifier is a part of.
   * **Note:** This must be data compatible with an `XrBindingModificationBaseHeaderKHR` structure.
   */
  _get_ip_modification(): PackedByteArray;
}
