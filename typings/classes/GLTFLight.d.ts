// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a glTF light. */
declare class GLTFLight extends Resource {
  /**
   * The {@link Color} of the light in linear space. Defaults to white. A black color causes the light to have no effect.
   * This value is linear to match glTF, but will be converted to nonlinear sRGB when creating a Godot {@link Light3D} node upon import, or converted to linear when exporting a Godot {@link Light3D} to glTF.
   */
  color: Color;
  /**
   * The inner angle of the cone in a spotlight. Must be less than or equal to the outer cone angle.
   * Within this angle, the light is at full brightness. Between the inner and outer cone angles, there is a transition from full brightness to zero brightness. When creating a Godot {@link SpotLight3D}, the ratio between the inner and outer cone angles is used to calculate the attenuation of the light.
   */
  inner_cone_angle: float;
  /**
   * The intensity of the light. This is expressed in candelas (lumens per steradian) for point and spot lights, and lux (lumens per m²) for directional lights. When creating a Godot light, this value is converted to a unitless multiplier.
   */
  intensity: float;
  /**
   * The type of the light. The values accepted by Godot are "point", "spot", and "directional", which correspond to Godot's {@link OmniLight3D}, {@link SpotLight3D}, and {@link DirectionalLight3D} respectively.
   */
  light_type: string;
  /**
   * The outer angle of the cone in a spotlight. Must be greater than or equal to the inner angle.
   * At this angle, the light drops off to zero brightness. Between the inner and outer cone angles, there is a transition from full brightness to zero brightness. If this angle is a half turn, then the spotlight emits in all directions. When creating a Godot {@link SpotLight3D}, the outer cone angle is used as the angle of the spotlight.
   */
  outer_cone_angle: float;
  /**
   * The range of the light, beyond which the light has no effect. glTF lights with no range defined behave like physical lights (which have infinite range). When creating a Godot light, the range is clamped to `4096.0`.
   */
  range: float;
  set_color(value: Color): void;
  get_color(): Color;
  set_inner_cone_angle(value: float): void;
  get_inner_cone_angle(): float;
  set_intensity(value: float): void;
  get_intensity(): float;
  set_light_type(value: string | NodePath): void;
  get_light_type(): string;
  set_outer_cone_angle(value: float): void;
  get_outer_cone_angle(): float;
  set_range(value: float): void;
  get_range(): float;

  /** Creates a new GLTFLight instance by parsing the given {@link Dictionary}. */
  static from_dictionary(dictionary: Dictionary): GLTFLight | null;
  /** Create a new GLTFLight instance from the given Godot {@link Light3D} node. */
  static from_node(light_node: Light3D): GLTFLight | null;
  get_additional_data(extension_name: string): unknown;
  set_additional_data(extension_name: string, additional_data: unknown): void;
  /** Serializes this GLTFLight instance into a {@link Dictionary}. */
  to_dictionary(): Dictionary;
  /** Converts this GLTFLight instance into a Godot {@link Light3D} node. */
  to_node(): Light3D | null;
}
