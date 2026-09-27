// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract base class for noise generators. */
declare class Noise extends Resource {
  /**
   * Returns an {@link Image} containing 2D noise values.
   * **Note:** With `normalize` set to `false`, the default implementation expects the noise generator to return values in the range `-1.0` to `1.0`.
   */
  get_image(width: int, height: int, invert?: boolean, in_3d_space?: boolean, normalize?: boolean): Image | null;
  /**
   * Returns an {@link Array} of {@link Image}s containing 3D noise values for use with {@link ImageTexture3D.create}.
   * **Note:** With `normalize` set to `false`, the default implementation expects the noise generator to return values in the range `-1.0` to `1.0`.
   */
  get_image_3d(width: int, height: int, depth: int, invert?: boolean, normalize?: boolean): Array<Image>;
  /** Returns the 1D noise value at the given (x) coordinate. */
  get_noise_1d(x: float): float;
  /** Returns the 2D noise value at the given position. */
  get_noise_2d(x: float, y: float): float;
  /** Returns the 2D noise value at the given position. */
  get_noise_2dv(v: Vector2 | Vector2i): float;
  /** Returns the 3D noise value at the given position. */
  get_noise_3d(x: float, y: float, z: float): float;
  /** Returns the 3D noise value at the given position. */
  get_noise_3dv(v: Vector3 | Vector3i): float;
  /**
   * Returns an {@link Image} containing seamless 2D noise values.
   * **Note:** With `normalize` set to `false`, the default implementation expects the noise generator to return values in the range `-1.0` to `1.0`.
   */
  get_seamless_image(width: int, height: int, invert?: boolean, in_3d_space?: boolean, skirt?: float, normalize?: boolean): Image | null;
  /**
   * Returns an {@link Array} of {@link Image}s containing seamless 3D noise values for use with {@link ImageTexture3D.create}.
   * **Note:** With `normalize` set to `false`, the default implementation expects the noise generator to return values in the range `-1.0` to `1.0`.
   */
  get_seamless_image_3d(width: int, height: int, depth: int, invert?: boolean, skirt?: float, normalize?: boolean): Array<Image>;
}
