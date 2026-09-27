// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** glTF node class. */
declare class GLTFNode extends Resource {
  /**
   * If this glTF node is a camera, the index of the {@link GLTFCamera} in the {@link GLTFState} that describes the camera's properties. If `-1`, this node is not a camera.
   */
  camera: int;
  /**
   * The indices of the child nodes in the {@link GLTFState}. If this glTF node has no children, this will be an empty array.
   */
  children: PackedInt32Array;
  /**
   * How deep into the node hierarchy this node is. A root node will have a height of 0, its children will have a height of 1, and so on. If -1, the height has not been calculated.
   */
  height: int;
  /**
   * If this glTF node is a light, the index of the {@link GLTFLight} in the {@link GLTFState} that describes the light's properties. If -1, this node is not a light.
   */
  light: int;
  /**
   * If this glTF node is a mesh, the index of the {@link GLTFMesh} in the {@link GLTFState} that describes the mesh's properties. If -1, this node is not a mesh.
   */
  mesh: int;
  /** The original name of the node. */
  original_name: string;
  /** The index of the parent node in the {@link GLTFState}. If -1, this node is a root node. */
  parent: int;
  /** The position of the glTF node relative to its parent. */
  position: Vector3;
  /** The rotation of the glTF node relative to its parent. */
  rotation: Quaternion;
  /** The scale of the glTF node relative to its parent. */
  scale: Vector3;
  /**
   * If this glTF node has a skeleton, the index of the {@link GLTFSkeleton} in the {@link GLTFState} that describes the skeleton's properties. If -1, this node does not have a skeleton.
   */
  skeleton: int;
  /**
   * If this glTF node has a skin, the index of the {@link GLTFSkin} in the {@link GLTFState} that describes the skin's properties. If -1, this node does not have a skin.
   */
  skin: int;
  /**
   * If `true`, the GLTF node is visible. If `false`, the GLTF node is not visible. This is converted to the {@link Node3D.visible} property in the Godot scene, and is exported to `KHR_node_visibility` when `false`.
   */
  visible: boolean;
  /**
   * The transform of the glTF node relative to its parent. This property is usually unused since the position, rotation, and scale properties are preferred.
   */
  xform: Transform3D;
  set_camera(value: int): void;
  get_camera(): int;
  set_children(value: PackedInt32Array | Array<unknown>): void;
  get_children(): PackedInt32Array;
  set_height(value: int): void;
  get_height(): int;
  set_light(value: int): void;
  get_light(): int;
  set_mesh(value: int): void;
  get_mesh(): int;
  set_original_name(value: string | NodePath): void;
  get_original_name(): string;
  set_parent(value: int): void;
  get_parent(): int;
  set_position(value: Vector3 | Vector3i): void;
  get_position(): Vector3;
  set_rotation(value: Quaternion | Basis): void;
  get_rotation(): Quaternion;
  set_scale(value: Vector3 | Vector3i): void;
  get_scale(): Vector3;
  set_skeleton(value: int): void;
  get_skeleton(): int;
  set_skin(value: int): void;
  get_skin(): int;
  set_visible(value: boolean): void;
  get_visible(): boolean;
  set_xform(value: Transform3D | Projection): void;
  get_xform(): Transform3D;

  /** Appends the given child node index to the {@link children} array. */
  append_child_index(child_index: int): void;
  /**
   * Gets additional arbitrary data in this {@link GLTFNode} instance. This can be used to keep per-node state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the return value can be anything you set. If nothing was set, the return value is `null`.
   */
  get_additional_data(extension_name: string): unknown;
  /**
   * Returns the {@link NodePath} that this GLTF node will have in the Godot scene tree after being imported. This is useful when importing glTF object model pointers with {@link GLTFObjectModelProperty}, for handling extensions such as `KHR_animation_pointer` or `KHR_interactivity`.
   * If `handle_skeletons` is `true`, paths to skeleton bone glTF nodes will be resolved properly. For example, a path that would be `^"A/B/C/Bone1/Bone2/Bone3"` if `false` will become `^"A/B/C/Skeleton3D:Bone3"`.
   */
  get_scene_node_path(gltf_state: GLTFState, handle_skeletons?: boolean): NodePath;
  /**
   * Sets additional arbitrary data in this {@link GLTFNode} instance. This can be used to keep per-node state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The first argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the second argument can be anything you want.
   */
  set_additional_data(extension_name: string, additional_data: unknown): void;
}
