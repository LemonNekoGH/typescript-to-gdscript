// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Helper node that will automatically manage displaying render models. */
declare class OpenXRRenderModelManager extends Node3D {
  /**
   * Position render models local to this pose (this will adjust the position of the render models container node).
   */
  make_local_to_pose: string;
  /**
   * Limits render models to the specified tracker. Include: 0 = All render models, 1 = Render models not related to a tracker, 2 = Render models related to the left hand tracker, 3 = Render models related to the right hand tracker.
   */
  tracker: int;
  set_make_local_to_pose(value: string | NodePath): void;
  get_make_local_to_pose(): string;
  set_tracker(value: int): void;
  get_tracker(): int;

  /** Emitted when a render model node is added as a child to this node. */
  render_model_added: Signal<[OpenXRRenderModel]>;
  /** Emitted when a render model child node is about to be removed from this node. */
  render_model_removed: Signal<[OpenXRRenderModel]>;

  // enum RenderModelTracker
  /** All active render models are shown regardless of what tracker they relate to. */
  static readonly RENDER_MODEL_TRACKER_ANY: int;
  /** Only active render models are shown that are not related to any tracker we manage. */
  static readonly RENDER_MODEL_TRACKER_NONE_SET: int;
  /** Only active render models are shown that are related to the left hand tracker. */
  static readonly RENDER_MODEL_TRACKER_LEFT_HAND: int;
  /** Only active render models are shown that are related to the right hand tracker. */
  static readonly RENDER_MODEL_TRACKER_RIGHT_HAND: int;
}
