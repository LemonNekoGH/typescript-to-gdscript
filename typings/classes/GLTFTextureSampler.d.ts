// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a glTF texture sampler */
declare class GLTFTextureSampler extends Resource {
  /** Texture's magnification filter, used when texture appears larger on screen than the source image. */
  mag_filter: int;
  /**
   * Texture's minification filter, used when the texture appears smaller on screen than the source image.
   */
  min_filter: int;
  /** Wrapping mode to use for S-axis (horizontal) texture coordinates. */
  wrap_s: int;
  /** Wrapping mode to use for T-axis (vertical) texture coordinates. */
  wrap_t: int;
  set_mag_filter(value: int): void;
  get_mag_filter(): int;
  set_min_filter(value: int): void;
  get_min_filter(): int;
  set_wrap_s(value: int): void;
  get_wrap_s(): int;
  set_wrap_t(value: int): void;
  get_wrap_t(): int;
}
