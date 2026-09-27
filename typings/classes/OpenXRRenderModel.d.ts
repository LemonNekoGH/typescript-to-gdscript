// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** This node will display an OpenXR render model. */
declare class OpenXRRenderModel extends Node3D {
  /**
   * The render model RID for the render model to load, as returned by {@link OpenXRRenderModelExtension.render_model_create} or {@link OpenXRRenderModelExtension.render_model_get_all}.
   */
  render_model: RID;
  set_render_model(value: RID): void;
  get_render_model(): RID;

  /** Returns the top level path related to this render model. */
  get_top_level_path(): string;

  /** Emitted when the top level path of this render model has changed. */
  render_model_top_level_path_changed: Signal<[]>;
}
