// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Archived glTF extension for specular/glossy materials. */
declare class GLTFSpecGloss extends Resource {
  /** The reflected diffuse factor of the material. */
  diffuse_factor: Color;
  /** The diffuse texture. */
  diffuse_img: Image | null;
  /** The glossiness or smoothness of the material. */
  gloss_factor: float;
  /** The specular-glossiness texture. */
  spec_gloss_img: Image | null;
  /** The specular RGB color of the material. The alpha channel is unused. */
  specular_factor: Color;
  set_diffuse_factor(value: Color): void;
  get_diffuse_factor(): Color;
  set_diffuse_img(value: Image | null): void;
  get_diffuse_img(): Image | null;
  set_gloss_factor(value: float): void;
  get_gloss_factor(): float;
  set_spec_gloss_img(value: Image | null): void;
  get_spec_gloss_img(): Image | null;
  set_specular_factor(value: Color): void;
  get_specular_factor(): Color;
}
