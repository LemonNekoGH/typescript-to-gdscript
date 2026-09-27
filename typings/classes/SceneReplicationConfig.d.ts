// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Configuration for properties to synchronize with a {@link MultiplayerSynchronizer}. */
declare class SceneReplicationConfig extends Resource {
  /**
   * Adds the property identified by the given `path` to the list of the properties being synchronized, optionally passing an `index`.
   * **Note:** For details on restrictions and limitations on property synchronization, see {@link MultiplayerSynchronizer}.
   */
  add_property(path: NodePath | string, index?: int): void;
  /** Returns a list of synchronized property {@link NodePath}s. */
  get_properties(): Array<NodePath>;
  /** Returns `true` if the given `path` is configured for synchronization. */
  has_property(path: NodePath | string): boolean;
  /** Finds the index of the given `path`. */
  property_get_index(path: NodePath | string): int;
  /** Returns the replication mode for the property identified by the given `path`. */
  property_get_replication_mode(path: NodePath | string): int;
  /**
   * Returns `true` if the property identified by the given `path` is configured to be synchronized on spawn.
   */
  property_get_spawn(path: NodePath | string): boolean;
  /**
   * Returns `true` if the property identified by the given `path` is configured to be synchronized on process.
   */
  property_get_sync(path: NodePath | string): boolean;
  /**
   * Returns `true` if the property identified by the given `path` is configured to be reliably synchronized when changes are detected on process.
   */
  property_get_watch(path: NodePath | string): boolean;
  /** Sets the synchronization mode for the property identified by the given `path`. */
  property_set_replication_mode(path: NodePath | string, mode: int): void;
  /** Sets whether the property identified by the given `path` is configured to be synchronized on spawn. */
  property_set_spawn(path: NodePath | string, enabled: boolean): void;
  /**
   * Sets whether the property identified by the given `path` is configured to be synchronized on process.
   */
  property_set_sync(path: NodePath | string, enabled: boolean): void;
  /**
   * Sets whether the property identified by the given `path` is configured to be reliably synchronized when changes are detected on process.
   */
  property_set_watch(path: NodePath | string, enabled: boolean): void;
  /** Removes the property identified by the given `path` from the configuration. */
  remove_property(path: NodePath | string): void;

  // enum ReplicationMode
  /** Do not keep the given property synchronized. */
  static readonly REPLICATION_MODE_NEVER: int;
  /**
   * Replicate the given property on process by constantly sending updates using unreliable transfer mode.
   */
  static readonly REPLICATION_MODE_ALWAYS: int;
  /**
   * Replicate the given property on process by sending updates using reliable transfer mode when its value changes.
   */
  static readonly REPLICATION_MODE_ON_CHANGE: int;
}
