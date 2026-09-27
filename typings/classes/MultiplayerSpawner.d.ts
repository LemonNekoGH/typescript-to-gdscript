// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Automatically replicates spawnable nodes from the authority to other multiplayer peers. */
declare class MultiplayerSpawner extends Node {
  /**
   * Method called on all peers when a custom {@link spawn} is requested by the authority. Will receive the `data` parameter, and should return a {@link Node} that is not in the scene tree.
   * **Note:** The returned node should **not** be added to the scene with {@link Node.add_child}. This is done automatically.
   */
  spawn_function: Callable;
  /**
   * Maximum number of nodes allowed to be spawned by this spawner. Includes both spawnable scenes and custom spawns.
   * When set to `0` (the default), there is no limit.
   */
  spawn_limit: int;
  /**
   * Path to the spawn root. Spawnable scenes that are added as direct children are replicated to other peers.
   */
  spawn_path: NodePath;
  set_spawn_function(value: Callable): void;
  get_spawn_function(): Callable;
  set_spawn_limit(value: int): void;
  get_spawn_limit(): int;
  set_spawn_path(value: NodePath | string): void;
  get_spawn_path(): NodePath;

  /**
   * Adds a scene path to spawnable scenes, making it automatically replicated from the multiplayer authority to other peers when added as children of the node pointed by {@link spawn_path}.
   */
  add_spawnable_scene(path: string | NodePath): void;
  /** Clears all spawnable scenes. Does not despawn existing instances on remote peers. */
  clear_spawnable_scenes(): void;
  /** Returns the spawnable scene path by index. */
  get_spawnable_scene(index: int): string;
  /** Returns the count of spawnable scene paths. */
  get_spawnable_scene_count(): int;
  /**
   * Requests a custom spawn, with `data` passed to {@link spawn_function} on all peers. Returns the locally spawned node instance already inside the scene tree, and added as a child of the node pointed by {@link spawn_path}.
   * **Note:** Spawnable scenes are spawned automatically. {@link spawn} is only needed for custom spawns.
   */
  spawn(data?: unknown): Node | null;

  /**
   * Emitted when a spawnable scene or custom spawn was despawned by the multiplayer authority. Only called on remote peers.
   */
  despawned: Signal<[Node]>;
  /**
   * Emitted when a spawnable scene or custom spawn was spawned by the multiplayer authority. Only called on remote peers.
   */
  spawned: Signal<[Node]>;
}
