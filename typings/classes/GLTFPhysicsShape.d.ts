// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a glTF physics shape. */
declare class GLTFPhysicsShape extends Resource {
  /**
   * The height of the shape, in meters. This is only used when the shape type is `"capsule"` or `"cylinder"`. This value should not be negative, and for `"capsule"` it should be at least twice the radius.
   */
  height: float;
  /**
   * The {@link ImporterMesh} resource of the shape. This is only used when the shape type is `"hull"` (convex hull) or `"trimesh"` (concave trimesh).
   */
  importer_mesh: ImporterMesh | null;
  /**
   * If `true`, indicates that this shape is a trigger. For Godot, this means that the shape should be a child of an {@link Area3D} node.
   * This is the only variable not used in the {@link to_node} method, it's intended to be used alongside when deciding where to add the generated node as a child.
   */
  is_trigger: boolean;
  /**
   * The index of the shape's mesh in the glTF file. This is only used when the shape type is `"hull"` (convex hull) or `"trimesh"` (concave trimesh).
   */
  mesh_index: int;
  /**
   * The radius of the shape, in meters. This is only used when the shape type is `"capsule"`, `"cylinder"`, or `"sphere"`. This value should not be negative.
   */
  radius: float;
  /**
   * The type of shape this shape represents. Valid values are `"box"`, `"capsule"`, `"cylinder"`, `"sphere"`, `"hull"`, and `"trimesh"`.
   */
  shape_type: string;
  /**
   * The size of the shape, in meters. This is only used when the shape type is `"box"`, and it represents the `"diameter"` of the box. This value should not be negative.
   */
  size: Vector3;
  set_height(value: float): void;
  get_height(): float;
  set_importer_mesh(value: ImporterMesh | null): void;
  get_importer_mesh(): ImporterMesh | null;
  set_is_trigger(value: boolean): void;
  get_is_trigger(): boolean;
  set_mesh_index(value: int): void;
  get_mesh_index(): int;
  set_radius(value: float): void;
  get_radius(): float;
  set_shape_type(value: string | NodePath): void;
  get_shape_type(): string;
  set_size(value: Vector3 | Vector3i): void;
  get_size(): Vector3;

  /** Creates a new GLTFPhysicsShape instance by parsing the given {@link Dictionary}. */
  static from_dictionary(dictionary: Dictionary): GLTFPhysicsShape | null;
  /** Creates a new GLTFPhysicsShape instance from the given Godot {@link CollisionShape3D} node. */
  static from_node(shape_node: CollisionShape3D): GLTFPhysicsShape | null;
  /** Creates a new GLTFPhysicsShape instance from the given Godot {@link Shape3D} resource. */
  static from_resource(shape_resource: Shape3D): GLTFPhysicsShape | null;
  /**
   * Serializes this GLTFPhysicsShape instance into a {@link Dictionary} in the format defined by `OMI_physics_shape`.
   */
  to_dictionary(): Dictionary;
  /** Converts this GLTFPhysicsShape instance into a Godot {@link CollisionShape3D} node. */
  to_node(cache_shapes?: boolean): CollisionShape3D | null;
  /** Converts this GLTFPhysicsShape instance into a Godot {@link Shape3D} resource. */
  to_resource(cache_shapes?: boolean): Shape3D | null;
}
