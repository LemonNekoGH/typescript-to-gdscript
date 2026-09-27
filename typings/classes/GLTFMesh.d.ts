// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** GLTFMesh represents a glTF mesh. */
declare class GLTFMesh extends Resource {
  /** An array of floats representing the blend weights of the mesh. */
  blend_weights: PackedFloat32Array;
  /** An array of Material objects representing the materials used in the mesh. */
  instance_materials: Array<Material>;
  /** The {@link ImporterMesh} object representing the mesh itself. */
  mesh: ImporterMesh | null;
  /** The original name of the mesh. */
  original_name: string;
  set_blend_weights(value: PackedFloat32Array | Array<unknown>): void;
  get_blend_weights(): PackedFloat32Array;
  set_instance_materials(value: Array<Material>): void;
  get_instance_materials(): Array<Material>;
  set_mesh(value: ImporterMesh | null): void;
  get_mesh(): ImporterMesh | null;
  set_original_name(value: string | NodePath): void;
  get_original_name(): string;

  /**
   * Gets additional arbitrary data in this {@link GLTFMesh} instance. This can be used to keep per-node state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the return value can be anything you set. If nothing was set, the return value is `null`.
   */
  get_additional_data(extension_name: string): unknown;
  /**
   * Sets additional arbitrary data in this {@link GLTFMesh} instance. This can be used to keep per-node state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The first argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the second argument can be anything you want.
   */
  set_additional_data(extension_name: string, additional_data: unknown): void;
}
