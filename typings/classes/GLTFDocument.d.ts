// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Class for importing and exporting glTF files in and out of Godot. */
declare class GLTFDocument extends Resource {
  /**
   * The user-friendly name of the fallback image format. This is used when exporting the glTF file, including writing to a file and writing to a byte array.
   * This property may only be one of "None", "PNG", or "JPEG", and is only used when the {@link image_format} is not one of "None", "PNG", or "JPEG". If having multiple extension image formats is desired, that can be done using a {@link GLTFDocumentExtension} class - this property only covers the use case of providing a base glTF fallback image when using a custom image format.
   */
  fallback_image_format: string;
  /**
   * The quality of the fallback image, if any. For PNG files, this downscales the image on both dimensions by this factor. For JPEG files, this is the lossy quality of the image. A low value is recommended, since including multiple high quality images in a glTF file defeats the file size gains of using a more efficient image format.
   */
  fallback_image_quality: float;
  /**
   * The user-friendly name of the export image format. This is used when exporting the glTF file, including writing to a file and writing to a byte array.
   * By default, Godot allows the following options: "None", "PNG", "JPEG", "Lossless WebP", and "Lossy WebP". Support for more image formats can be added in {@link GLTFDocumentExtension} classes. A single extension class can provide multiple options for the specific format to use, or even an option that uses multiple formats at once.
   */
  image_format: string;
  /**
   * If {@link image_format} is a lossy image format, this determines the lossy quality of the image. On a range of `0.0` to `1.0`, where `0.0` is the lowest quality and `1.0` is the highest quality. A lossy quality of `1.0` is not the same as lossless.
   */
  lossy_quality: float;
  /**
   * How to process the root node during export. The default and recommended value is {@link ROOT_NODE_MODE_SINGLE_ROOT}.
   * **Note:** Regardless of how the glTF file is exported, when importing, the root node type and name can be overridden in the scene import settings tab.
   */
  root_node_mode: int;
  /**
   * How to handle texture maps during import. The default and recommended value is {@link TEXTURE_MAP_MODE_REMAP_TO_STANDARD_MATERIAL}, which automatically remaps from glTF's flexible texture map system to the more specific texture map slots in Godot's {@link StandardMaterial3D} class. Alternatively, {@link TEXTURE_MAP_MODE_DO_NOT_REMAP} can be used to preserve the original texture maps from the glTF file, which may be desirable if using the glTF file with custom shaders, but may not display correctly with Godot's built-in materials.
   */
  texture_map_mode: int;
  /**
   * How to deal with node visibility during export. This setting does nothing if all nodes are visible. The default and recommended value is {@link VISIBILITY_MODE_INCLUDE_REQUIRED}, which uses the `KHR_node_visibility` extension.
   */
  visibility_mode: int;
  set_fallback_image_format(value: string | NodePath): void;
  get_fallback_image_format(): string;
  set_fallback_image_quality(value: float): void;
  get_fallback_image_quality(): float;
  set_image_format(value: string | NodePath): void;
  get_image_format(): string;
  set_lossy_quality(value: float): void;
  get_lossy_quality(): float;
  set_root_node_mode(value: int): void;
  get_root_node_mode(): int;
  set_texture_map_mode(value: int): void;
  get_texture_map_mode(): int;
  set_visibility_mode(value: int): void;
  get_visibility_mode(): int;

  /**
   * Takes a {@link PackedByteArray} defining a glTF and imports the data to the given {@link GLTFState} object through the `state` parameter.
   * **Note:** The `base_path` tells {@link append_from_buffer} where to find dependencies and can be empty.
   */
  append_from_buffer(bytes: PackedByteArray | Array<unknown>, base_path: string | NodePath, state: GLTFState, flags?: int): int;
  /**
   * Takes a path to a glTF file and imports the data at that file path to the given {@link GLTFState} object through the `state` parameter.
   * **Note:** The `base_path` tells {@link append_from_file} where to find dependencies and can be empty.
   */
  append_from_file(path: string | NodePath, state: GLTFState, flags?: int, base_path?: string | NodePath): int;
  /**
   * Takes a Godot Engine scene node and exports it and its descendants to the given {@link GLTFState} object through the `state` parameter.
   */
  append_from_scene(node: Node, state: GLTFState, flags?: int): int;
  /**
   * Determines a mapping between the given Godot `node_path` and the corresponding glTF Object Model JSON pointer(s) in the generated glTF file. The details of this mapping are returned in a {@link GLTFObjectModelProperty} object. Additional mappings can be supplied via the {@link GLTFDocumentExtension._import_object_model_property} callback method.
   */
  static export_object_model_property(state: GLTFState, node_path: NodePath | string, godot_node: Node, gltf_node_index: int): GLTFObjectModelProperty | null;
  /**
   * Takes a {@link GLTFState} object through the `state` parameter and returns a glTF {@link PackedByteArray}.
   */
  generate_buffer(state: GLTFState): PackedByteArray;
  /**
   * Takes a {@link GLTFState} object through the `state` parameter and returns a Godot Engine scene node.
   * The `bake_fps` parameter overrides the bake_fps in `state`.
   */
  generate_scene(state: GLTFState, bake_fps?: float, trimming?: boolean, remove_immutable_tracks?: boolean): Node | null;
  /**
   * Returns a list of all support glTF extensions, including extensions supported directly by the engine, and extensions supported by user plugins registering {@link GLTFDocumentExtension} classes.
   * **Note:** If this method is run before a GLTFDocumentExtension is registered, its extensions won't be included in the list. Be sure to only run this method after all extensions are registered. If you run this when the engine starts, consider waiting a frame before calling this method to ensure all extensions are registered.
   */
  static get_supported_gltf_extensions(): PackedStringArray;
  /**
   * Determines a mapping between the given glTF Object Model `json_pointer` and the corresponding Godot node path(s) in the generated Godot scene. The details of this mapping are returned in a {@link GLTFObjectModelProperty} object. Additional mappings can be supplied via the {@link GLTFDocumentExtension._export_object_model_property} callback method.
   */
  static import_object_model_property(state: GLTFState, json_pointer: string | NodePath): GLTFObjectModelProperty | null;
  /**
   * Registers the given {@link GLTFDocumentExtension} instance with GLTFDocument. If `first_priority` is `true`, this extension will be run first. Otherwise, it will be run last.
   * **Note:** Like GLTFDocument itself, all GLTFDocumentExtension classes must be stateless in order to function properly. If you need to store data, use the `set_additional_data` and `get_additional_data` methods in {@link GLTFState} or {@link GLTFNode}.
   */
  static register_gltf_document_extension(extension: GLTFDocumentExtension, first_priority?: boolean): void;
  /** Unregisters the given {@link GLTFDocumentExtension} instance. */
  static unregister_gltf_document_extension(extension: GLTFDocumentExtension): void;
  /**
   * Takes a {@link GLTFState} object through the `state` parameter and writes a glTF file to the filesystem.
   * **Note:** The extension of the glTF file determines if it is a .glb binary file or a .gltf text file.
   */
  write_to_filesystem(state: GLTFState, path: string | NodePath): int;

  // enum RootNodeMode
  /**
   * Treat the Godot scene's root node as the root node of the glTF file, and mark it as the single root node via the `GODOT_single_root` glTF extension. This will be parsed the same as {@link ROOT_NODE_MODE_KEEP_ROOT} if the implementation does not support `GODOT_single_root`.
   */
  static readonly ROOT_NODE_MODE_SINGLE_ROOT: int;
  /**
   * Treat the Godot scene's root node as the root node of the glTF file, but do not mark it as anything special. An extra root node will be generated when importing into Godot. This uses only vanilla glTF features. This is equivalent to the behavior in Godot 4.1 and earlier.
   */
  static readonly ROOT_NODE_MODE_KEEP_ROOT: int;
  /**
   * Treat the Godot scene's root node as the name of the glTF scene, and add all of its children as root nodes of the glTF file. This uses only vanilla glTF features. This avoids an extra root node, but only the name of the Godot scene's root node will be preserved, as it will not be saved as a node.
   */
  static readonly ROOT_NODE_MODE_MULTI_ROOT: int;
  // enum TextureMapMode
  /**
   * Import the texture maps in the glTF file as they are, without trying to fit them into specific texture slots suitable for Godot's built-in materials. This may be desirable if using the glTF file with custom shaders, but may not display correctly with Godot's built-in materials. This is equivalent to the behavior in Godot 4.6 and earlier.
   */
  static readonly TEXTURE_MAP_MODE_DO_NOT_REMAP: int;
  /**
   * Import the texture maps in the glTF file remapped to the most suitable texture slots based on Godot's {@link StandardMaterial3D} class. This is the default behavior.
   */
  static readonly TEXTURE_MAP_MODE_REMAP_TO_STANDARD_MATERIAL: int;
  // enum VisibilityMode
  /**
   * If the scene contains any non-visible nodes, include them, mark them as non-visible with `KHR_node_visibility`, and require that importers respect their non-visibility. Downside: If the importer does not support `KHR_node_visibility`, the file cannot be imported.
   */
  static readonly VISIBILITY_MODE_INCLUDE_REQUIRED: int;
  /**
   * If the scene contains any non-visible nodes, include them, mark them as non-visible with `KHR_node_visibility`, and do not impose any requirements on importers. Downside: If the importer does not support `KHR_node_visibility`, invisible objects will be visible.
   */
  static readonly VISIBILITY_MODE_INCLUDE_OPTIONAL: int;
  /**
   * If the scene contains any non-visible nodes, do not include them in the export. This is the same as the behavior in Godot 4.4 and earlier. Downside: Invisible nodes will not exist in the exported file.
   */
  static readonly VISIBILITY_MODE_EXCLUDE: int;
  // enum ImportFlags
  /**
   * If `true`, generate vertex tangents using Mikktspace (http://www.mikktspace.com/) if the input meshes don't have tangent data. When possible, it's recommended to let the 3D modeling software generate tangents on export instead of relying on this option. Tangents are required for correct display of normal and height maps, along with any material/shader features that require tangents.
   * If you don't need material features that require tangents, disabling this can reduce output file size and speed up importing if the source 3D file doesn't contain tangents.
   */
  static readonly IMPORT_FLAG_GENERATE_TANGENT_ARRAYS: int;
  /**
   * If checked, use named {@link Skin}s for animation. The {@link MeshInstance3D} node contains 3 properties of relevance here: a skeleton {@link NodePath} pointing to the {@link Skeleton3D} node (usually `..`), a mesh, and a skin:
   * - The {@link Skeleton3D} node contains a list of bones with names, their pose and rest, a name, and a parent bone.
   * - The mesh is all of the raw vertex data needed to display a mesh. In terms of the mesh, it knows how vertices are weight-painted and uses some internal numbering often imported from 3D modeling software.
   * - The skin contains the information necessary to bind this mesh onto this Skeleton3D. For each of the internal bone IDs chosen by the 3D modeling software, it contains two things. Firstly, a matrix known as the Bind Pose Matrix, Inverse Bind Matrix, or IBM for short. Secondly, the {@link Skin} contains each bone's name (if this flag is enabled), or the bone's index within the {@link Skeleton3D} list (if this flag is disabled).
   * Together, this information is enough to tell Godot how to use the bone poses in the {@link Skeleton3D} node to render the mesh from each {@link MeshInstance3D}. Note that each {@link MeshInstance3D} may share binds, as is common in models exported from Blender, or each {@link MeshInstance3D} may use a separate {@link Skin} object, as is common in models exported from other tools such as Maya.
   */
  static readonly IMPORT_FLAG_USE_NAMED_SKIN_BINDS: int;
  /**
   * Ignore meshes and materials on import. When importing a scene as an {@link AnimationLibrary}, this flag is always enabled.
   */
  static readonly IMPORT_FLAG_DISCARD_MESHES_AND_MATERIALS: int;
  /**
   * If `true`, mesh compression will not be used. Consider enabling if you notice blocky artifacts in your mesh normals or UVs, or if you have meshes that are larger than a few thousand meters in each direction.
   */
  static readonly IMPORT_FLAG_FORCE_DISABLE_MESH_COMPRESSION: int;
}
