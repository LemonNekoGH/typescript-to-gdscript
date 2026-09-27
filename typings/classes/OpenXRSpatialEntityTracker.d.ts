// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class for Positional trackers managed by OpenXR's spatial entity extensions. */
declare class OpenXRSpatialEntityTracker extends XRPositionalTracker {
  /** The spatial entity associated with this tracker. */
  entity: RID;
  /** The spatial tracking state for this tracker. */
  spatial_tracking_state: int;
  type: int;
  set_entity(value: RID): void;
  get_entity(): RID;
  set_spatial_tracking_state(value: int): void;
  get_spatial_tracking_state(): int;

  /**
   * Adds a new {@link OpenXRStructureBase} to the next-chain.
   * {@link get_next} will return this `next` until either {@link add_next} is called again or it's removed in {@link remove_next}.
   */
  add_next(next: OpenXRStructureBase): void;
  /**
   * Gets the head {@link OpenXRStructureBase} in the next-chain.
   * See also {@link add_next} and {@link remove_next}.
   */
  get_next(): OpenXRStructureBase | null;
  /** Gets the spatial context used to create this {@link OpenXRSpatialEntityTracker}. */
  get_spatial_context(): RID;
  /** Removes a `next` object previously added in {@link add_next} from the next-chain. */
  remove_next(next: OpenXRStructureBase): void;
  /** Sets the spatial context used to create this tracker. */
  set_spatial_context(spatial_context: RID): void;

  /** Emitted when the next-chain changes, from either {@link add_next} or {@link remove_next}. */
  next_changed: Signal<[]>;
  spatial_tracking_state_changed: Signal<[int]>;

  // enum EntityTrackingState
  /** This anchor has stopped tracking. */
  static readonly ENTITY_TRACKING_STATE_STOPPED: int;
  /** Tracking is currently paused. */
  static readonly ENTITY_TRACKING_STATE_PAUSED: int;
  /** This anchor is currently being tracked. */
  static readonly ENTITY_TRACKING_STATE_TRACKING: int;
}
