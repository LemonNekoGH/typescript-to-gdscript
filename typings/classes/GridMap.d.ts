// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Node for 3D tile-based maps. */
declare class GridMap extends Node3D {
  /**
   * If `true`, this GridMap creates a navigation region for each cell that uses a {@link mesh_library} item with a navigation mesh. The created navigation region will use the navigation layers bitmask assigned to the {@link MeshLibrary}'s item.
   */
  bake_navigation: boolean;
  /** If `true`, grid items are centered on the X axis. */
  cell_center_x: boolean;
  /** If `true`, grid items are centered on the Y axis. */
  cell_center_y: boolean;
  /** If `true`, grid items are centered on the Z axis. */
  cell_center_z: boolean;
  /** The size of each octant measured in number of cells. This applies to all three axis. */
  cell_octant_size: int;
  /**
   * The scale of the cell items.
   * This does not affect the size of the grid cells themselves, only the items in them. This can be used to make cell items overlap their neighbors.
   */
  cell_scale: float;
  /**
   * The dimensions of the grid's cells.
   * This does not affect the size of the meshes. See {@link cell_scale}.
   */
  cell_size: Vector3;
  /**
   * The physics layers this GridMap is in.
   * GridMaps act as static bodies, meaning they aren't affected by gravity or other forces. They only affect other physics bodies that collide with them.
   */
  collision_layer: int;
  /**
   * The physics layers this GridMap detects collisions in. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * The priority used to solve colliding when occurring penetration. The higher the priority is, the lower the penetration into the object will be. This can for example be used to prevent the player from breaking through the boundaries of a level.
   */
  collision_priority: float;
  /**
   * Show or hide the {@link GridMap}'s collision shapes. If set to {@link DEBUG_VISIBILITY_MODE_DEFAULT}, this depends on the show collision debug settings.
   */
  collision_visibility_mode: int;
  /** The assigned {@link MeshLibrary}. */
  mesh_library: MeshLibrary | null;
  /** Overrides the default friction and bounce physics properties for the whole {@link GridMap}. */
  physics_material: PhysicsMaterial | null;
  set_bake_navigation(value: boolean): void;
  is_baking_navigation(): boolean;
  set_center_x(value: boolean): void;
  get_center_x(): boolean;
  set_center_y(value: boolean): void;
  get_center_y(): boolean;
  set_center_z(value: boolean): void;
  get_center_z(): boolean;
  set_octant_size(value: int): void;
  get_octant_size(): int;
  set_cell_scale(value: float): void;
  get_cell_scale(): float;
  set_cell_size(value: Vector3 | Vector3i): void;
  get_cell_size(): Vector3;
  set_collision_layer(value: int): void;
  get_collision_layer(): int;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_collision_priority(value: float): void;
  get_collision_priority(): float;
  set_collision_visibility_mode(value: int): void;
  get_collision_visibility_mode(): int;
  set_mesh_library(value: MeshLibrary | null): void;
  get_mesh_library(): MeshLibrary | null;
  set_physics_material(value: PhysicsMaterial | null): void;
  get_physics_material(): PhysicsMaterial | null;

  /** Clear all cells. */
  clear(): void;
  /** Clears all baked meshes. See {@link make_baked_meshes}. */
  clear_baked_meshes(): void;
  /** Returns {@link RID} of a baked mesh with the given `idx`. */
  get_bake_mesh_instance(idx: int): RID;
  /**
   * Returns an array of {@link ArrayMesh}es and {@link Transform3D} references of all bake meshes that exist within the current GridMap. Even indices contain {@link ArrayMesh}es, while odd indices contain {@link Transform3D}s that are always equal to {@link Transform3D.IDENTITY}.
   * This method relies on the output of {@link make_baked_meshes}, which will be called with `gen_lightmap_uv` set to `true` and `lightmap_uv_texel_size` set to `0.1` if it hasn't been called yet.
   */
  get_bake_meshes(): Array<unknown>;
  /**
   * Returns one of 24 possible rotations that lie along the vectors (x,y,z) with each component being either -1, 0, or 1. For further details, refer to the Godot source code.
   */
  get_basis_with_orthogonal_index(index: int): Basis;
  /**
   * The {@link MeshLibrary} item index located at the given grid coordinates. If the cell is empty, {@link INVALID_CELL_ITEM} will be returned.
   */
  get_cell_item(position: Vector3i | Vector3): int;
  /** Returns the basis that gives the specified cell its orientation. */
  get_cell_item_basis(position: Vector3i | Vector3): Basis;
  /** The orientation of the cell at the given grid coordinates. `-1` is returned if the cell is empty. */
  get_cell_item_orientation(position: Vector3i | Vector3): int;
  /**
   * Returns whether or not the specified layer of the {@link collision_layer} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_layer_value(layer_number: int): boolean;
  /**
   * Returns whether or not the specified layer of the {@link collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_mask_value(layer_number: int): boolean;
  /**
   * Returns an array of {@link Transform3D} and {@link Mesh} references corresponding to the non-empty cells in the grid. The transforms are specified in local space. Even indices contain {@link Transform3D}s, while odd indices contain {@link Mesh}es related to the {@link Transform3D} in the index preceding it.
   */
  get_meshes(): Array<unknown>;
  /**
   * Returns the {@link RID} of the navigation map this GridMap node uses for its cell baked navigation meshes.
   * This function returns always the map set on the GridMap node and not the map on the NavigationServer. If the map is changed directly with the NavigationServer API the GridMap node will not be aware of the map change.
   */
  get_navigation_map(): RID;
  /**
   * Returns the {@link Vector3i} octant coordinates of the octant that the cell at `cell_coords` belongs to.
   */
  get_octant_coords_from_cell_coords(cell_coords: Vector3i | Vector3): Vector3i;
  /**
   * Returns an array of {@link Vector3i} octant coordinates that are inside the given `bounds`, including octants that have no cells in use.
   */
  get_octants_in_bounds(bounds: AABB): Array<Vector3i>;
  /**
   * This function considers a discretization of rotations into 24 points on unit sphere, lying along the vectors (x,y,z) with each component being either -1, 0, or 1, and returns the index (in the range from 0 to 23) of the point best representing the orientation of the object. For further details, refer to the Godot source code.
   */
  get_orthogonal_index_from_basis(basis: Basis | Quaternion): int;
  /** Returns an array of {@link Vector3} with the non-empty cell coordinates in the grid map. */
  get_used_cells(): Array<Vector3i>;
  /** Returns an array of all cells with the given item index specified in `item`. */
  get_used_cells_by_item(item: int): Array<Vector3i>;
  /**
   * Returns an array of {@link Vector3i}s with the cell coordinates of non-empty cells inside the octant at `octant_coords`.
   */
  get_used_cells_in_octant(octant_coords: Vector3i | Vector3): Array<Vector3i>;
  /**
   * Returns an array of {@link Vector3i}s with the cell coordinates of cells inside the octant at `octant_coords` that use the specified cell `item`.
   */
  get_used_cells_in_octant_by_item(octant_coords: Vector3i | Vector3, item: int): Array<Vector3i>;
  /**
   * Returns an array of {@link Vector3i}s with the octant coordinates of the non-empty octants in the grid map.
   */
  get_used_octants(): Array<Vector3i>;
  /**
   * Returns an array of {@link Vector3i}s with the octant coordinates of the octants that use the specified `item` in the grid map.
   */
  get_used_octants_by_item(item: int): Array<Vector3i>;
  /**
   * Returns an array of {@link Vector3i}s with the octant coordinates of non-empty octants that are inside the local `bounds`.
   */
  get_used_octants_in_bounds(bounds: AABB): Array<Vector3i>;
  /**
   * Returns the map coordinates of the cell containing the given `local_position`. If `local_position` is in global coordinates, consider using {@link Node3D.to_local} before passing it to this method. See also {@link map_to_local}.
   */
  local_to_map(local_position: Vector3 | Vector3i): Vector3i;
  /**
   * Generates a baked mesh that represents all meshes in the assigned {@link MeshLibrary} for use with {@link LightmapGI}. If `gen_lightmap_uv` is `true`, UV2 data will be generated for each mesh currently used in the {@link GridMap}. Otherwise, only meshes that already have UV2 data present will be able to use baked lightmaps. When generating UV2, `lightmap_uv_texel_size` controls the texel density for lightmaps, with lower values resulting in more detailed lightmaps. `lightmap_uv_texel_size` is ignored if `gen_lightmap_uv` is `false`. See also {@link get_bake_meshes}, which relies on the output of this method.
   * **Note:** Calling this method will not actually bake lightmaps, as lightmap baking is performed using the {@link LightmapGI} node.
   */
  make_baked_meshes(gen_lightmap_uv?: boolean, lightmap_uv_texel_size?: float): void;
  /**
   * Returns the position of a grid cell in the GridMap's local coordinate space. To convert the returned value into global coordinates, use {@link Node3D.to_global}. See also {@link local_to_map}.
   */
  map_to_local(map_position: Vector3i | Vector3): Vector3;
  /** This method does nothing. */
  resource_changed(resource: Resource): void;
  /**
   * Sets the mesh index for the cell referenced by its grid coordinates.
   * A negative item index such as {@link INVALID_CELL_ITEM} will clear the cell.
   * Optionally, the item's orientation can be passed. For valid orientation values, see {@link get_orthogonal_index_from_basis}.
   */
  set_cell_item(position: Vector3i | Vector3, item: int, orientation?: int): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_layer}, given a `layer_number` between 1 and 32.
   */
  set_collision_layer_value(layer_number: int, value: boolean): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_collision_mask_value(layer_number: int, value: boolean): void;
  /**
   * Sets the {@link RID} of the navigation map this GridMap node should use for its cell baked navigation meshes.
   */
  set_navigation_map(navigation_map: RID): void;

  /** Emitted when {@link cell_size} changes. */
  cell_size_changed: Signal<[Vector3]>;
  /** Emitted when the {@link MeshLibrary} of this GridMap changes. */
  changed: Signal<[]>;

  // enum DebugVisibilityMode
  /**
   * Hide the collisions debug shapes in the editor, and use the debug settings to determine their visibility in game (i.e. {@link SceneTree.debug_collisions_hint} or {@link SceneTree.debug_navigation_hint}).
   */
  static readonly DEBUG_VISIBILITY_MODE_DEFAULT: int;
  /** Always show the collisions debug shapes. */
  static readonly DEBUG_VISIBILITY_MODE_FORCE_SHOW: int;
  /** Always hide the collisions debug shapes. */
  static readonly DEBUG_VISIBILITY_MODE_FORCE_HIDE: int;

  /**
   * Invalid cell item that can be used in {@link set_cell_item} to clear cells (or represent an empty cell in {@link get_cell_item}).
   */
  static readonly INVALID_CELL_ITEM: int;
}
