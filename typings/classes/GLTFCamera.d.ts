// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a glTF camera. */
declare class GLTFCamera extends Resource {
  /**
   * The distance to the far culling boundary for this camera relative to its local Z axis, in meters. This maps to glTF's `zfar` property.
   */
  depth_far: float;
  /**
   * The distance to the near culling boundary for this camera relative to its local Z axis, in meters. This maps to glTF's `znear` property.
   */
  depth_near: float;
  /**
   * The FOV of the camera. This class and glTF define the camera FOV in radians, while Godot uses degrees. This maps to glTF's `yfov` property. This value is only used for perspective cameras, when {@link perspective} is `true`.
   */
  fov: float;
  /**
   * If `true`, the camera is in perspective mode. Otherwise, the camera is in orthographic/orthogonal mode. This maps to glTF's camera `type` property. See {@link Camera3D.projection} and the glTF spec for more information.
   */
  perspective: boolean;
  /**
   * The size of the camera. This class and glTF define the camera size magnitude as a radius in meters, while Godot defines it as a diameter in meters. This maps to glTF's `ymag` property. This value is only used for orthographic/orthogonal cameras, when {@link perspective} is `false`.
   */
  size_mag: float;
  set_depth_far(value: float): void;
  get_depth_far(): float;
  set_depth_near(value: float): void;
  get_depth_near(): float;
  set_fov(value: float): void;
  get_fov(): float;
  set_perspective(value: boolean): void;
  get_perspective(): boolean;
  set_size_mag(value: float): void;
  get_size_mag(): float;

  /** Creates a new GLTFCamera instance by parsing the given {@link Dictionary}. */
  static from_dictionary(dictionary: Dictionary): GLTFCamera | null;
  /** Create a new GLTFCamera instance from the given Godot {@link Camera3D} node. */
  static from_node(camera_node: Camera3D): GLTFCamera | null;
  /** Serializes this GLTFCamera instance into a {@link Dictionary}. */
  to_dictionary(): Dictionary;
  /** Converts this GLTFCamera instance into a Godot {@link Camera3D} node. */
  to_node(): Camera3D | null;
}
