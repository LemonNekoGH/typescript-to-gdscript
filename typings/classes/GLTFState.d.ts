// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents all data of a glTF file. */
declare class GLTFState extends Resource {
  /** The baking fps of the animation for either import or export. */
  bake_fps: float;
  /**
   * The folder path associated with this glTF data. This is used to find other files the glTF file references, like images or binary buffers. This will be set during import when appending from a file, and will be set during export when writing to a file.
   */
  base_path: string;
  buffers: Array<PackedByteArray>;
  /**
   * The copyright string in the asset header of the glTF file. This is set during import if present and export if non-empty. See the glTF asset header documentation for more information.
   */
  copyright: string;
  create_animations: boolean;
  /**
   * The file name associated with this glTF data. If it ends with `.gltf`, this is text-based glTF, otherwise this is binary GLB. This will be set during import when appending from a file, and will be set during export when writing to a file. If writing to a buffer, this will be an empty string.
   */
  filename: string;
  /** The binary buffer attached to a .glb file. */
  glb_data: PackedByteArray;
  /**
   * When importing a glTF file with unimported raw binary images embedded inside of binary blob buffers, in data URIs, or separate files not imported by Godot, this controls how the images are handled. Images can be discarded, saved as separate files, or embedded in the scene lossily or losslessly. See {@link HandleBinaryImageMode} for options.
   * This property does nothing for image files in the `res://` folder imported by Godot, as those are handled by Godot's image importer directly, and then the Godot scene generated from the glTF file will use the images as Godot imported them.
   */
  handle_binary_image_mode: int;
  /**
   * If `true`, forces all GLTFNodes in the document to be bones of a single {@link Skeleton3D} Godot node.
   */
  import_as_skeleton_bones: boolean;
  /** The original raw JSON document corresponding to this GLTFState. */
  json: Dictionary;
  major_version: int;
  minor_version: int;
  /**
   * The root nodes of the glTF file. Typically, a glTF file will only have one scene, and therefore one root node. However, a glTF file may have multiple scenes and therefore multiple root nodes, which will be generated as siblings of each other and as children of the root node of the generated Godot scene.
   */
  root_nodes: PackedInt32Array;
  /**
   * The name of the scene. When importing, if not specified, this will be the file name. When exporting, if specified, the scene name will be saved to the glTF file.
   */
  scene_name: string;
  use_named_skin_binds: boolean;
  set_bake_fps(value: float): void;
  get_bake_fps(): float;
  set_base_path(value: string | NodePath): void;
  get_base_path(): string;
  set_buffers(value: Array<PackedByteArray>): void;
  get_buffers(): Array<PackedByteArray>;
  set_copyright(value: string | NodePath): void;
  get_copyright(): string;
  set_create_animations(value: boolean): void;
  get_create_animations(): boolean;
  set_filename(value: string | NodePath): void;
  get_filename(): string;
  set_glb_data(value: PackedByteArray | Array<unknown>): void;
  get_glb_data(): PackedByteArray;
  set_handle_binary_image_mode(value: int): void;
  get_handle_binary_image_mode(): int;
  set_import_as_skeleton_bones(value: boolean): void;
  get_import_as_skeleton_bones(): boolean;
  set_json(value: Dictionary): void;
  get_json(): Dictionary;
  set_major_version(value: int): void;
  get_major_version(): int;
  set_minor_version(value: int): void;
  get_minor_version(): int;
  set_root_nodes(value: PackedInt32Array | Array<unknown>): void;
  get_root_nodes(): PackedInt32Array;
  set_scene_name(value: string | NodePath): void;
  get_scene_name(): string;
  set_use_named_skin_binds(value: boolean): void;
  get_use_named_skin_binds(): boolean;

  /**
   * Appends an extension to the list of extensions used by this glTF file during serialization. If `required` is `true`, the extension will also be added to the list of required extensions. Do not run this in {@link GLTFDocumentExtension._export_post}, as that stage is too late to add extensions. The final list is sorted alphabetically.
   */
  add_used_extension(extension_name: string | NodePath, required: boolean): void;
  /**
   * Appends the given byte array `data` to the buffers and creates a {@link GLTFBufferView} for it. The index of the destination {@link GLTFBufferView} is returned. If `deduplication` is `true`, the buffers are first searched for duplicate data, otherwise new bytes are always appended.
   */
  append_data_to_buffers(data: PackedByteArray | Array<unknown>, deduplication: boolean): int;
  /**
   * Appends the given {@link GLTFNode} to the state, and returns its new index. This can be used to export one Godot node as multiple glTF nodes, or inject new glTF nodes at import time. On import, this must be called before {@link GLTFDocumentExtension._generate_scene_node} finishes for the parent node. On export, this must be called before {@link GLTFDocumentExtension._export_node} runs for the parent node.
   * The `godot_scene_node` parameter is the Godot scene node that corresponds to this glTF node. This is highly recommended to be set to a valid node, but may be `null` if there is no corresponding Godot scene node. One Godot scene node may be used for multiple glTF nodes, so if exporting multiple glTF nodes for one Godot scene node, use the same Godot scene node for each.
   * The `parent_node_index` parameter is the index of the parent {@link GLTFNode} in the state. If `-1`, the node will be a root node, otherwise the new node will be added to the parent's list of children. The index will also be written to the {@link GLTFNode.parent} property of the new node.
   */
  append_gltf_node(gltf_node: GLTFNode, godot_scene_node: Node, parent_node_index: int): int;
  get_accessors(): Array<GLTFAccessor>;
  /**
   * Gets additional arbitrary data in this {@link GLTFState} instance. This can be used to keep per-file state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the return value can be anything you set. If nothing was set, the return value is `null`.
   */
  get_additional_data(extension_name: string): unknown;
  /**
   * Returns the {@link AnimationPlayer} node with the given index. These nodes are only used during the export process when converting Godot {@link AnimationPlayer} nodes to glTF animations.
   */
  get_animation_player(anim_player_index: int): AnimationPlayer | null;
  /**
   * Returns the number of {@link AnimationPlayer} nodes in this {@link GLTFState}. These nodes are only used during the export process when converting Godot {@link AnimationPlayer} nodes to glTF animations.
   */
  get_animation_players_count(anim_player_index: int): int;
  /**
   * Returns an array of all {@link GLTFAnimation}s in the glTF file. When importing, these will be generated as animations in an {@link AnimationPlayer} node. When exporting, these will be generated from Godot {@link AnimationPlayer} nodes.
   */
  get_animations(): Array<GLTFAnimation>;
  get_buffer_views(): Array<GLTFBufferView>;
  /**
   * Returns an array of all {@link GLTFCamera}s in the glTF file. These are the cameras that the {@link GLTFNode.camera} index refers to.
   */
  get_cameras(): Array<GLTFCamera>;
  /**
   * Deprecated untyped alias for {@link handle_binary_image_mode}. When importing a glTF file with unimported raw binary images embedded inside of binary blob buffers, in data URIs, or separate files not imported by Godot, this controls how the images are handled.
   */
  get_handle_binary_image(): int;
  /**
   * Gets the images of the glTF file as an array of {@link Texture2D}s. These are the images that the {@link GLTFTexture.src_image} index refers to.
   */
  get_images(): Array<Texture2D>;
  /**
   * Returns an array of all {@link GLTFLight}s in the glTF file. These are the lights that the {@link GLTFNode.light} index refers to.
   */
  get_lights(): Array<GLTFLight>;
  get_materials(): Array<Material>;
  /**
   * Returns an array of all {@link GLTFMesh}es in the glTF file. These are the meshes that the {@link GLTFNode.mesh} index refers to.
   */
  get_meshes(): Array<GLTFMesh>;
  /**
   * Returns the index of the {@link GLTFNode} corresponding to this Godot scene node. This is the inverse of {@link get_scene_node}. Useful during the export process.
   * **Note:** Not every Godot scene node will have a corresponding {@link GLTFNode}, and not every {@link GLTFNode} will have a scene node generated. If there is no {@link GLTFNode} index for this scene node, `-1` is returned.
   */
  get_node_index(scene_node: Node): int;
  /**
   * Returns an array of all {@link GLTFNode}s in the glTF file. These are the nodes that {@link GLTFNode.children} and {@link root_nodes} refer to. This includes nodes that may not be generated in the Godot scene, or nodes that may generate multiple Godot scene nodes.
   */
  get_nodes(): Array<GLTFNode>;
  /**
   * Returns the Godot scene node that corresponds to the same index as the {@link GLTFNode} it was generated from. This is the inverse of {@link get_node_index}. Useful during the import process.
   * **Note:** Not every {@link GLTFNode} will have a scene node generated, and not every generated scene node will have a corresponding {@link GLTFNode}. If there is no scene node for this {@link GLTFNode} index, `null` is returned.
   */
  get_scene_node(gltf_node_index: int): Node | null;
  /**
   * Returns an array of all {@link GLTFSkeleton}s in the glTF file. These are the skeletons that the {@link GLTFNode.skeleton} index refers to.
   */
  get_skeletons(): Array<GLTFSkeleton>;
  /**
   * Returns an array of all {@link GLTFSkin}s in the glTF file. These are the skins that the {@link GLTFNode.skin} index refers to.
   */
  get_skins(): Array<GLTFSkin>;
  /** Retrieves the array of texture samplers that are used by the textures contained in the glTF. */
  get_texture_samplers(): Array<GLTFTextureSampler>;
  get_textures(): Array<GLTFTexture>;
  /** Returns an array of unique animation names. This is only used during the import process. */
  get_unique_animation_names(): Array<string>;
  /** Returns an array of unique node names. This is used in both the import process and export process. */
  get_unique_names(): Array<string>;
  set_accessors(accessors: Array<GLTFAccessor>): void;
  /**
   * Sets additional arbitrary data in this {@link GLTFState} instance. This can be used to keep per-file state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The first argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the second argument can be anything you want.
   */
  set_additional_data(extension_name: string, additional_data: unknown): void;
  /**
   * Sets the {@link GLTFAnimation}s in the state. When importing, these will be generated as animations in an {@link AnimationPlayer} node. When exporting, these will be generated from Godot {@link AnimationPlayer} nodes.
   */
  set_animations(animations: Array<GLTFAnimation>): void;
  set_buffer_views(buffer_views: Array<GLTFBufferView>): void;
  /**
   * Sets the {@link GLTFCamera}s in the state. These are the cameras that the {@link GLTFNode.camera} index refers to.
   */
  set_cameras(cameras: Array<GLTFCamera>): void;
  /**
   * Deprecated untyped alias for {@link handle_binary_image_mode}. When importing a glTF file with unimported raw binary images embedded inside of binary blob buffers, in data URIs, or separate files not imported by Godot, this controls how the images are handled.
   */
  set_handle_binary_image(method: int): void;
  /**
   * Sets the images in the state stored as an array of {@link Texture2D}s. This can be used during export. These are the images that the {@link GLTFTexture.src_image} index refers to.
   */
  set_images(images: Array<Texture2D>): void;
  /**
   * Sets the {@link GLTFLight}s in the state. These are the lights that the {@link GLTFNode.light} index refers to.
   */
  set_lights(lights: Array<GLTFLight>): void;
  set_materials(materials: Array<Material>): void;
  /**
   * Sets the {@link GLTFMesh}es in the state. These are the meshes that the {@link GLTFNode.mesh} index refers to.
   */
  set_meshes(meshes: Array<GLTFMesh>): void;
  /**
   * Sets the {@link GLTFNode}s in the state. These are the nodes that {@link GLTFNode.children} and {@link root_nodes} refer to. Some of the nodes set here may not be generated in the Godot scene, or may generate multiple Godot scene nodes.
   */
  set_nodes(nodes: Array<GLTFNode>): void;
  /**
   * Sets the {@link GLTFSkeleton}s in the state. These are the skeletons that the {@link GLTFNode.skeleton} index refers to.
   */
  set_skeletons(skeletons: Array<GLTFSkeleton>): void;
  /**
   * Sets the {@link GLTFSkin}s in the state. These are the skins that the {@link GLTFNode.skin} index refers to.
   */
  set_skins(skins: Array<GLTFSkin>): void;
  /** Sets the array of texture samplers that are used by the textures contained in the glTF. */
  set_texture_samplers(texture_samplers: Array<GLTFTextureSampler>): void;
  set_textures(textures: Array<GLTFTexture>): void;
  /** Sets the unique animation names in the state. This is only used during the import process. */
  set_unique_animation_names(unique_animation_names: Array<string>): void;
  /**
   * Sets the unique node names in the state. This is used in both the import process and export process.
   */
  set_unique_names(unique_names: Array<string>): void;

  // enum HandleBinaryImageMode
  /**
   * When importing a glTF file with embedded binary images, discards all images and uses untextured materials in their place. Images stored as separate files in the `res://` folder are not affected by this; those will be used as Godot imported them.
   */
  static readonly HANDLE_BINARY_IMAGE_MODE_DISCARD_TEXTURES: int;
  /**
   * When importing a glTF file with embedded binary images, extracts them and saves them to their own files. This allows the image to be imported by Godot's image importer, which can then have their import options customized by the user, including optionally compressing the image to VRAM texture formats.
   * This will save the images's bytes exactly as-is, without recompression. For image formats supplied by glTF extensions, the file will have a filename ending with the file extension supplied by {@link GLTFDocumentExtension._get_image_file_extension} of the extension class.
   * **Note:** This option is editor-only. At runtime, this acts the same as {@link HANDLE_BINARY_IMAGE_MODE_EMBED_AS_UNCOMPRESSED}.
   */
  static readonly HANDLE_BINARY_IMAGE_MODE_EXTRACT_TEXTURES: int;
  /**
   * When importing a glTF file with embedded binary images, embeds textures VRAM compressed with Basis Universal into the generated scene. Images stored as separate files in the `res://` folder are not affected by this; those will be used as Godot imported them.
   */
  static readonly HANDLE_BINARY_IMAGE_MODE_EMBED_AS_BASISU: int;
  /**
   * When importing a glTF file with embedded binary images, embeds textures compressed losslessly into the generated scene. Images stored as separate files in the `res://` folder are not affected by this; those will be used as Godot imported them.
   */
  static readonly HANDLE_BINARY_IMAGE_MODE_EMBED_AS_UNCOMPRESSED: int;

  /** Discards all embedded textures and uses untextured materials. */
  static readonly HANDLE_BINARY_DISCARD_TEXTURES: int;
  /**
   * Extracts embedded textures to be reimported and compressed. Editor only. Acts as uncompressed at runtime.
   */
  static readonly HANDLE_BINARY_EXTRACT_TEXTURES: int;
  /** Embeds textures VRAM compressed with Basis Universal into the generated scene. */
  static readonly HANDLE_BINARY_EMBED_AS_BASISU: int;
  /** Embeds textures compressed losslessly into the generated scene, matching old behavior. */
  static readonly HANDLE_BINARY_EMBED_AS_UNCOMPRESSED: int;
}
