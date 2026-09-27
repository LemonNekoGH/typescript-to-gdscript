// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Synchronizes properties from the multiplayer authority to the remote peers. */
declare class MultiplayerSynchronizer extends Node {
  /**
   * Time interval between delta synchronizations. Used when the replication is set to {@link SceneReplicationConfig.REPLICATION_MODE_ON_CHANGE}. If set to `0.0` (the default), delta synchronizations happen every network process frame.
   */
  delta_interval: float;
  /**
   * Whether synchronization should be visible to all peers by default. See {@link set_visibility_for} and {@link add_visibility_filter} for ways of configuring fine-grained visibility options.
   */
  public_visibility: boolean;
  /** Resource containing which properties to synchronize. */
  replication_config: SceneReplicationConfig | null;
  /**
   * Time interval between synchronizations. Used when the replication is set to {@link SceneReplicationConfig.REPLICATION_MODE_ALWAYS}. If set to `0.0` (the default), synchronizations happen every network process frame.
   */
  replication_interval: float;
  /**
   * Node path that replicated properties are relative to.
   * If {@link root_path} was spawned by a {@link MultiplayerSpawner}, the node will be also be spawned and despawned based on this synchronizer visibility options.
   */
  root_path: NodePath;
  /** Specifies when visibility filters are updated. */
  visibility_update_mode: int;
  set_delta_interval(value: float): void;
  get_delta_interval(): float;
  set_visibility_public(value: boolean): void;
  is_visibility_public(): boolean;
  set_replication_config(value: SceneReplicationConfig | null): void;
  get_replication_config(): SceneReplicationConfig | null;
  set_replication_interval(value: float): void;
  get_replication_interval(): float;
  set_root_path(value: NodePath | string): void;
  get_root_path(): NodePath;
  set_visibility_update_mode(value: int): void;
  get_visibility_update_mode(): int;

  /**
   * Adds a peer visibility filter for this synchronizer.
   * `filter` should take a peer ID [int] and return a [bool].
   */
  add_visibility_filter(filter: Callable): void;
  /** Queries the current visibility for peer `peer`. */
  get_visibility_for(peer: int): boolean;
  /** Removes a peer visibility filter from this synchronizer. */
  remove_visibility_filter(filter: Callable): void;
  /**
   * Sets the visibility of `peer` to `visible`. If `peer` is `0`, the value of {@link public_visibility} will be updated instead.
   */
  set_visibility_for(peer: int, visible: boolean): void;
  /**
   * Updates the visibility of `for_peer` according to visibility filters. If `for_peer` is `0` (the default), all peers' visibilties are updated.
   */
  update_visibility(for_peer?: int): void;

  /**
   * Emitted when a new delta synchronization state is received by this synchronizer after the properties have been updated.
   */
  delta_synchronized: Signal<[]>;
  /**
   * Emitted when a new synchronization state is received by this synchronizer after the properties have been updated.
   */
  synchronized: Signal<[]>;
  /** Emitted when visibility of `for_peer` is updated. See {@link update_visibility}. */
  visibility_changed: Signal<[int]>;

  // enum VisibilityUpdateMode
  /**
   * Visibility filters are updated during process frames (see {@link Node.NOTIFICATION_INTERNAL_PROCESS}).
   */
  static readonly VISIBILITY_PROCESS_IDLE: int;
  /**
   * Visibility filters are updated during physics frames (see {@link Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS}).
   */
  static readonly VISIBILITY_PROCESS_PHYSICS: int;
  /**
   * Visibility filters are not updated automatically, and must be updated manually by calling {@link update_visibility}.
   */
  static readonly VISIBILITY_PROCESS_NONE: int;
}
