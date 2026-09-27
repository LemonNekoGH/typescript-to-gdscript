// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** GLTFTexture represents a texture in a glTF file. */
declare class GLTFTexture extends Resource {
  /**
   * ID of the texture sampler to use when sampling the image. If -1, then the default texture sampler is used (linear filtering, and repeat wrapping in both axes).
   */
  sampler: int;
  /**
   * The index of the image associated with this texture, see {@link GLTFState.get_images}. If -1, then this texture does not have an image assigned.
   */
  src_image: int;
  set_sampler(value: int): void;
  get_sampler(): int;
  set_src_image(value: int): void;
  get_src_image(): int;
}
