// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The CSG base class. */
declare class CSGShape3D extends GeometryInstance3D {
  /**
   * Enables automatic smoothing. This overrides any smoothing on the CSG node and instead uses {@link smoothing_angle} to calculate normals based on the angle between faces.
   * Children of a {@link CSGCombiner3D} node will be treated as a single mesh.
   */
  autosmooth: boolean;
  /**
   * Calculate tangents for the CSG shape which allows the use of normal and height maps. This is only applied on the root shape, this setting is ignored on any child. Setting this to `false` can speed up shape generation slightly.
   */
  calculate_tangents: boolean;
  /**
   * The physics layers this area is in.
   * Collidable objects can exist in any of 32 different layers. These layers work like a tagging system, and are not visual. A collidable can use these layers to select with which objects it can collide, using the collision_mask property.
   * A contact is detected if object A is in any of the layers that object B scans, or object B is in any layer scanned by object A. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_layer: int;
  /**
   * The physics layers this CSG shape scans for collisions. Only effective if {@link use_collision} is `true`. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * The priority used to solve colliding when occurring penetration. Only effective if {@link use_collision} is `true`. The higher the priority is, the lower the penetration into the object will be. This can for example be used to prevent the player from breaking through the boundaries of a level.
   */
  collision_priority: float;
  /**
   * The operation that is performed on this shape. This is ignored for the first CSG child node as the operation is between this node and the previous child of this nodes parent.
   */
  operation: int;
  /**
   * When autosmooth is enabled, faces with an angle between them greater than this will be smoothed, while faces with a smaller angle will remain sharp.
   * Note: An angle lower than 0.1 will cause all smoothing to be disabled, this can be used to increase performance.
   */
  smoothing_angle: float;
  /** This property does nothing. */
  snap: float;
  /**
   * Adds a collision shape to the physics engine for our CSG shape. This will always act like a static body. Note that the collision shape is still active even if the CSG shape itself is hidden. See also {@link collision_mask} and {@link collision_priority}.
   */
  use_collision: boolean;
  set_autosmooth(value: boolean): void;
  is_autosmooth(): boolean;
  set_calculate_tangents(value: boolean): void;
  is_calculating_tangents(): boolean;
  set_collision_layer(value: int): void;
  get_collision_layer(): int;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_collision_priority(value: float): void;
  get_collision_priority(): float;
  set_operation(value: int): void;
  get_operation(): int;
  set_smoothing_angle(value: float): void;
  get_smoothing_angle(): float;
  set_snap(value: float): void;
  get_snap(): float;
  set_use_collision(value: boolean): void;
  is_using_collision(): boolean;

  /**
   * Returns a baked physics {@link ConcavePolygonShape3D} of this node's CSG operation result. Returns an empty shape if the node is not a CSG root node or has no valid geometry.
   * **Performance:** If the CSG operation results in a very detailed geometry with many faces physics performance will be very slow. Concave shapes should in general only be used for static level geometry and not with dynamic objects that are moving.
   * **Note:** CSG mesh data updates are deferred, which means they are updated with a delay of one rendered frame. To avoid getting an empty shape or outdated mesh data, make sure to call `await get_tree().process_frame` before using {@link bake_collision_shape} in {@link Node._ready} or after changing properties on the {@link CSGShape3D}.
   */
  bake_collision_shape(): ConcavePolygonShape3D | null;
  /**
   * Returns a baked static {@link ArrayMesh} of this node's CSG operation result. Materials from involved CSG nodes are added as extra mesh surfaces. Returns an empty mesh if the node is not a CSG root node or has no valid geometry.
   * **Note:** CSG mesh data updates are deferred, which means they are updated with a delay of one rendered frame. To avoid getting an empty mesh or outdated mesh data, make sure to call `await get_tree().process_frame` before using {@link bake_static_mesh} in {@link Node._ready} or after changing properties on the {@link CSGShape3D}.
   */
  bake_static_mesh(): ArrayMesh | null;
  /**
   * Returns whether or not the specified layer of the {@link collision_layer} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_layer_value(layer_number: int): boolean;
  /**
   * Returns whether or not the specified layer of the {@link collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_mask_value(layer_number: int): boolean;
  /**
   * Returns an {@link Array} with two elements, the first is the {@link Transform3D} of this node and the second is the root {@link Mesh} of this node. Only works when this node is the root shape.
   * **Note:** CSG mesh data updates are deferred, which means they are updated with a delay of one rendered frame. To avoid getting an empty shape or outdated mesh data, make sure to call `await get_tree().process_frame` before using {@link get_meshes} in {@link Node._ready} or after changing properties on the {@link CSGShape3D}.
   */
  get_meshes(): Array<unknown>;
  /** Returns `true` if this is a root shape and is thus the object that is rendered. */
  is_root_shape(): boolean;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_layer}, given a `layer_number` between 1 and 32.
   */
  set_collision_layer_value(layer_number: int, value: boolean): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_collision_mask_value(layer_number: int, value: boolean): void;

  // enum Operation
  /** Geometry of both primitives is merged, intersecting geometry is removed. */
  static readonly OPERATION_UNION: int;
  /** Only intersecting geometry remains, the rest is removed. */
  static readonly OPERATION_INTERSECTION: int;
  /** The second shape is subtracted from the first, leaving a dent with its shape. */
  static readonly OPERATION_SUBTRACTION: int;
}
