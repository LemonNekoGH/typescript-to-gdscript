// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The parent class of all OpenXR composition layer nodes. */
declare class OpenXRCompositionLayer extends Node3D {
  /**
   * Enables the blending the layer using its alpha channel.
   * Can be combined with {@link Viewport.transparent_bg} to give the layer a transparent background.
   */
  alpha_blend: boolean;
  /** The size of the Android surface to create if {@link use_android_surface} is enabled. */
  android_surface_size: Vector2i;
  /**
   * Enables a technique called "hole punching", which allows putting the composition layer behind the main projection layer (i.e. setting {@link sort_order} to a negative value) while "punching a hole" through everything rendered by Godot so that the layer is still visible.
   * This can be used to create the illusion that the composition layer exists in the same 3D space as everything rendered by Godot, allowing objects to appear to pass both behind or in front of the composition layer.
   */
  enable_hole_punch: boolean;
  /**
   * The eye(s) the composition layer is visible to.
   * **Note:** Not all composition layer types or runtimes support restricting visibility to a single eye.
   */
  eye_visibility: int;
  /** The {@link SubViewport} to render on the composition layer. */
  layer_viewport: SubViewport | null;
  /**
   * If enabled, the OpenXR swapchain will be created with the `XR_SWAPCHAIN_CREATE_PROTECTED_CONTENT_BIT` flag, which will protect its contents from CPU access.
   * When used with an Android Surface, this may allow DRM content to be presented, and will only take effect when the Surface is first created; later changes to this property will have no effect.
   */
  protected_content: boolean;
  /**
   * The sort order for this composition layer. Higher numbers will be shown in front of lower numbers.
   * **Note:** This will have no effect if a fallback mesh is being used.
   */
  sort_order: int;
  /**
   * The swizzle value for the alpha channel of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_alpha_swizzle: int;
  /**
   * The swizzle value for the blue channel of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_blue_swizzle: int;
  /**
   * The border color of the swapchain state that is used when the wrap mode clamps to the border.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_border_color: Color;
  /**
   * The swizzle value for the green channel of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_green_swizzle: int;
  /**
   * The horizontal wrap mode of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_horizontal_wrap: int;
  /**
   * The magnification filter of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_mag_filter: int;
  /**
   * The max anisotropy of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_max_anisotropy: float;
  /**
   * The minification filter of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_min_filter: int;
  /**
   * The mipmap mode of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_mipmap_mode: int;
  /**
   * The swizzle value for the red channel of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_red_swizzle: int;
  /**
   * The vertical wrap mode of the swapchain state.
   * **Note:** This property only has an effect on devices that support the OpenXR XR_FB_swapchain_update_state OpenGLES/Vulkan extensions.
   */
  swapchain_state_vertical_wrap: int;
  /**
   * If enabled, an Android surface will be created (with the dimensions from {@link android_surface_size}) which will provide the 2D content for the composition layer, rather than using {@link layer_viewport}.
   * See {@link get_android_surface} for information about how to get the surface so that your application can draw to it.
   * **Note:** This will only work in Android builds.
   */
  use_android_surface: boolean;
  set_alpha_blend(value: boolean): void;
  get_alpha_blend(): boolean;
  set_android_surface_size(value: Vector2i | Vector2): void;
  get_android_surface_size(): Vector2i;
  set_enable_hole_punch(value: boolean): void;
  get_enable_hole_punch(): boolean;
  set_eye_visibility(value: int): void;
  get_eye_visibility(): int;
  set_layer_viewport(value: SubViewport | null): void;
  get_layer_viewport(): SubViewport | null;
  set_protected_content(value: boolean): void;
  is_protected_content(): boolean;
  set_sort_order(value: int): void;
  get_sort_order(): int;
  set_alpha_swizzle(value: int): void;
  get_alpha_swizzle(): int;
  set_blue_swizzle(value: int): void;
  get_blue_swizzle(): int;
  set_border_color(value: Color): void;
  get_border_color(): Color;
  set_green_swizzle(value: int): void;
  get_green_swizzle(): int;
  set_horizontal_wrap(value: int): void;
  get_horizontal_wrap(): int;
  set_mag_filter(value: int): void;
  get_mag_filter(): int;
  set_max_anisotropy(value: float): void;
  get_max_anisotropy(): float;
  set_min_filter(value: int): void;
  get_min_filter(): int;
  set_mipmap_mode(value: int): void;
  get_mipmap_mode(): int;
  set_red_swizzle(value: int): void;
  get_red_swizzle(): int;
  set_vertical_wrap(value: int): void;
  get_vertical_wrap(): int;
  set_use_android_surface(value: boolean): void;
  get_use_android_surface(): boolean;

  /**
   * Returns a {@link JavaObject} representing an `android.view.Surface` if {@link use_android_surface} is enabled and OpenXR has created the surface. Otherwise, this will return `null`.
   * **Note:** The surface can only be created during an active OpenXR session. So, if {@link use_android_surface} is enabled outside of an OpenXR session, it won't be created until a new session fully starts.
   */
  get_android_surface(): JavaObject | null;
  /**
   * Returns UV coordinates where the given ray intersects with the composition layer. `origin` and `direction` must be in global space.
   * Returns `Vector2(-1.0, -1.0)` if the ray doesn't intersect.
   */
  intersects_ray(origin: Vector3 | Vector3i, direction: Vector3 | Vector3i): Vector2;
  /**
   * Returns `true` if the OpenXR runtime natively supports this composition layer type.
   * **Note:** This will only return an accurate result after the OpenXR session has started.
   */
  is_natively_supported(): boolean;

  // enum Filter
  /** Perform nearest-neighbor filtering when sampling the texture. */
  static readonly FILTER_NEAREST: int;
  /** Perform linear filtering when sampling the texture. */
  static readonly FILTER_LINEAR: int;
  /** Perform cubic filtering when sampling the texture. */
  static readonly FILTER_CUBIC: int;
  // enum MipmapMode
  /**
   * Disable mipmapping.
   * **Note:** Mipmapping can only be disabled in the Compatibility renderer.
   */
  static readonly MIPMAP_MODE_DISABLED: int;
  /** Use the mipmap of the nearest resolution. */
  static readonly MIPMAP_MODE_NEAREST: int;
  /** Use linear interpolation of the two mipmaps of the nearest resolution. */
  static readonly MIPMAP_MODE_LINEAR: int;
  // enum Wrap
  /** Clamp the texture to its specified border color. */
  static readonly WRAP_CLAMP_TO_BORDER: int;
  /** Clamp the texture to its edge color. */
  static readonly WRAP_CLAMP_TO_EDGE: int;
  /** Repeat the texture infinitely. */
  static readonly WRAP_REPEAT: int;
  /** Repeat the texture infinitely, mirroring it on each repeat. */
  static readonly WRAP_MIRRORED_REPEAT: int;
  /**
   * Mirror the texture once and then clamp the texture to its edge color.
   * **Note:** This wrap mode is not available in the Compatibility renderer.
   */
  static readonly WRAP_MIRROR_CLAMP_TO_EDGE: int;
  // enum Swizzle
  /** Maps a color channel to the value of the red channel. */
  static readonly SWIZZLE_RED: int;
  /** Maps a color channel to the value of the green channel. */
  static readonly SWIZZLE_GREEN: int;
  /** Maps a color channel to the value of the blue channel. */
  static readonly SWIZZLE_BLUE: int;
  /** Maps a color channel to the value of the alpha channel. */
  static readonly SWIZZLE_ALPHA: int;
  /** Maps a color channel to the value of zero. */
  static readonly SWIZZLE_ZERO: int;
  /** Maps a color channel to the value of one. */
  static readonly SWIZZLE_ONE: int;
  // enum EyeVisibility
  /** The layer is visible to both the left and right eyes. */
  static readonly EYE_VISIBILITY_BOTH: int;
  /** The layer is visible only to the left eye. */
  static readonly EYE_VISIBILITY_LEFT: int;
  /** The layer is visible only to the right eye. */
  static readonly EYE_VISIBILITY_RIGHT: int;
}
