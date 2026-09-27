// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a glTF physics body. */
declare class GLTFPhysicsBody extends Resource {
  /**
   * The angular velocity of the physics body, in radians per second. This is only used when the body type is "rigid" or "vehicle".
   */
  angular_velocity: Vector3;
  /**
   * The type of the body.
   * When importing, this controls what type of {@link CollisionObject3D} node Godot should generate. Valid values are `"static"`, `"animatable"`, `"character"`, `"rigid"`, `"vehicle"`, and `"trigger"`.
   * When exporting, this will be squashed down to one of `"static"`, `"kinematic"`, or `"dynamic"` motion types, or the `"trigger"` property.
   */
  body_type: string;
  /**
   * The center of mass of the body, in meters. This is in local space relative to the body. By default, the center of the mass is the body's origin.
   */
  center_of_mass: Vector3;
  /**
   * The inertia strength of the physics body, in kilogram meter squared (kg⋅m²). This represents the inertia around the principle axes, the diagonal of the inertia tensor matrix. This is only used when the body type is "rigid" or "vehicle".
   * When converted to a Godot {@link RigidBody3D} node, if this value is zero, then the inertia will be calculated automatically.
   */
  inertia_diagonal: Vector3;
  /**
   * The inertia orientation of the physics body. This defines the rotation of the inertia's principle axes relative to the object's local axes. This is only used when the body type is "rigid" or "vehicle" and {@link inertia_diagonal} is set to a non-zero value.
   */
  inertia_orientation: Quaternion;
  /**
   * The inertia tensor of the physics body, in kilogram meter squared (kg⋅m²). This is only used when the body type is "rigid" or "vehicle".
   * When converted to a Godot {@link RigidBody3D} node, if this value is zero, then the inertia will be calculated automatically.
   */
  inertia_tensor: Basis;
  /**
   * The linear velocity of the physics body, in meters per second. This is only used when the body type is "rigid" or "vehicle".
   */
  linear_velocity: Vector3;
  /**
   * The mass of the physics body, in kilograms. This is only used when the body type is "rigid" or "vehicle".
   */
  mass: float;
  set_angular_velocity(value: Vector3 | Vector3i): void;
  get_angular_velocity(): Vector3;
  set_body_type(value: string | NodePath): void;
  get_body_type(): string;
  set_center_of_mass(value: Vector3 | Vector3i): void;
  get_center_of_mass(): Vector3;
  set_inertia_diagonal(value: Vector3 | Vector3i): void;
  get_inertia_diagonal(): Vector3;
  set_inertia_orientation(value: Quaternion | Basis): void;
  get_inertia_orientation(): Quaternion;
  set_inertia_tensor(value: Basis | Quaternion): void;
  get_inertia_tensor(): Basis;
  set_linear_velocity(value: Vector3 | Vector3i): void;
  get_linear_velocity(): Vector3;
  set_mass(value: float): void;
  get_mass(): float;

  /**
   * Creates a new GLTFPhysicsBody instance by parsing the given {@link Dictionary} in the `OMI_physics_body` glTF extension format.
   */
  static from_dictionary(dictionary: Dictionary): GLTFPhysicsBody | null;
  /** Creates a new GLTFPhysicsBody instance from the given Godot {@link CollisionObject3D} node. */
  static from_node(body_node: CollisionObject3D): GLTFPhysicsBody | null;
  /**
   * Serializes this GLTFPhysicsBody instance into a {@link Dictionary}. It will be in the format expected by the `OMI_physics_body` glTF extension.
   */
  to_dictionary(): Dictionary;
  /** Converts this GLTFPhysicsBody instance into a Godot {@link CollisionObject3D} node. */
  to_node(): CollisionObject3D | null;
}
