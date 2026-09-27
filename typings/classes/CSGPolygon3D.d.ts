// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Extrudes a 2D polygon shape to create a 3D mesh. */
declare class CSGPolygon3D extends CSGPrimitive3D {
  /** When {@link mode} is {@link MODE_DEPTH}, the depth of the extrusion. */
  depth: float;
  /**
   * Material to use for the resulting mesh. The UV maps the top half of the material to the extruded shape (U along the length of the extrusions and V around the outline of the {@link polygon}), the bottom-left quarter to the front end face, and the bottom-right quarter to the back end face.
   */
  material: Material | null;
  /** The {@link mode} used to extrude the {@link polygon}. */
  mode: int;
  /**
   * When {@link mode} is {@link MODE_PATH}, by default, the top half of the {@link material} is stretched along the entire length of the extruded shape. If `false` the top half of the material is repeated every step of the extrusion.
   */
  path_continuous_u: boolean;
  /** When {@link mode} is {@link MODE_PATH}, the path interval or ratio of path points to extrusions. */
  path_interval: float;
  /**
   * When {@link mode} is {@link MODE_PATH}, this will determine if the interval should be by distance ({@link PATH_INTERVAL_DISTANCE}) or subdivision fractions ({@link PATH_INTERVAL_SUBDIVIDE}).
   */
  path_interval_type: int;
  /**
   * When {@link mode} is {@link MODE_PATH}, if `true` the ends of the path are joined, by adding an extrusion between the last and first points of the path.
   */
  path_joined: boolean;
  /**
   * When {@link mode} is {@link MODE_PATH}, if `true` the {@link Transform3D} of the {@link CSGPolygon3D} is used as the starting point for the extrusions, not the {@link Transform3D} of the {@link path_node}.
   */
  path_local: boolean;
  /**
   * When {@link mode} is {@link MODE_PATH}, the location of the {@link Path3D} object used to extrude the {@link polygon}.
   */
  path_node: NodePath;
  /**
   * When {@link mode} is {@link MODE_PATH}, the path rotation method used to rotate the {@link polygon} as it is extruded.
   */
  path_rotation: int;
  /**
   * When {@link mode} is {@link MODE_PATH}, if `true` the polygon will be rotated according to the proper tangent of the path at the sampled points. If `false` an approximation is used, which decreases in accuracy as the number of subdivisions decreases.
   */
  path_rotation_accurate: boolean;
  /**
   * When {@link mode} is {@link MODE_PATH}, extrusions that are less than this angle, will be merged together to reduce polygon count.
   */
  path_simplify_angle: float;
  /**
   * When {@link mode} is {@link MODE_PATH}, this is the distance along the path, in meters, the texture coordinates will tile. When set to 0, texture coordinates will match geometry exactly with no tiling.
   */
  path_u_distance: float;
  /**
   * The point array that defines the 2D polygon that is extruded. This can be a convex or concave polygon with 3 or more points. The polygon must *not* have any intersecting edges. Otherwise, triangulation will fail and no mesh will be generated.
   * **Note:** If only 1 or 2 points are defined in {@link polygon}, no mesh will be generated.
   */
  polygon: PackedVector2Array;
  /** If `true`, applies smooth shading to the extrusions. */
  smooth_faces: boolean;
  /**
   * When {@link mode} is {@link MODE_SPIN}, the total number of degrees the {@link polygon} is rotated when extruding.
   */
  spin_degrees: float;
  /** When {@link mode} is {@link MODE_SPIN}, the number of extrusions made. */
  spin_sides: int;
  set_depth(value: float): void;
  get_depth(): float;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_mode(value: int): void;
  get_mode(): int;
  set_path_continuous_u(value: boolean): void;
  is_path_continuous_u(): boolean;
  set_path_interval(value: float): void;
  get_path_interval(): float;
  set_path_interval_type(value: int): void;
  get_path_interval_type(): int;
  set_path_joined(value: boolean): void;
  is_path_joined(): boolean;
  set_path_local(value: boolean): void;
  is_path_local(): boolean;
  set_path_node(value: NodePath | string): void;
  get_path_node(): NodePath;
  set_path_rotation(value: int): void;
  get_path_rotation(): int;
  set_path_rotation_accurate(value: boolean): void;
  get_path_rotation_accurate(): boolean;
  set_path_simplify_angle(value: float): void;
  get_path_simplify_angle(): float;
  set_path_u_distance(value: float): void;
  get_path_u_distance(): float;
  set_polygon(value: PackedVector2Array | Array<unknown>): void;
  get_polygon(): PackedVector2Array;
  set_smooth_faces(value: boolean): void;
  get_smooth_faces(): boolean;
  set_spin_degrees(value: float): void;
  get_spin_degrees(): float;
  set_spin_sides(value: int): void;
  get_spin_sides(): int;

  // enum Mode
  /** The {@link polygon} shape is extruded along the negative Z axis. */
  static readonly MODE_DEPTH: int;
  /** The {@link polygon} shape is extruded by rotating it around the Y axis. */
  static readonly MODE_SPIN: int;
  /** The {@link polygon} shape is extruded along the {@link Path3D} specified in {@link path_node}. */
  static readonly MODE_PATH: int;
  // enum PathRotation
  /**
   * The {@link polygon} shape is not rotated.
   * **Note:** Requires the path Z coordinates to continually decrease to ensure viable shapes.
   */
  static readonly PATH_ROTATION_POLYGON: int;
  /**
   * The {@link polygon} shape is rotated along the path, but it is not rotated around the path axis.
   * **Note:** Requires the path Z coordinates to continually decrease to ensure viable shapes.
   */
  static readonly PATH_ROTATION_PATH: int;
  /** The {@link polygon} shape follows the path and its rotations around the path axis. */
  static readonly PATH_ROTATION_PATH_FOLLOW: int;
  // enum PathIntervalType
  /**
   * When {@link mode} is set to {@link MODE_PATH}, {@link path_interval} will determine the distance, in meters, each interval of the path will extrude.
   */
  static readonly PATH_INTERVAL_DISTANCE: int;
  /**
   * When {@link mode} is set to {@link MODE_PATH}, {@link path_interval} will subdivide the polygons along the path.
   */
  static readonly PATH_INTERVAL_SUBDIVIDE: int;
}
