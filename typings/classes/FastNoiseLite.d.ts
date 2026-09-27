// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Generates noise using the FastNoiseLite library. */
declare class FastNoiseLite extends Noise {
  /** Determines how the distance to the nearest/second-nearest point is computed. */
  cellular_distance_function: int;
  /** Maximum distance a point can move off of its grid position. Set to `0` for an even grid. */
  cellular_jitter: float;
  /** Return type from cellular noise calculations. */
  cellular_return_type: int;
  /** Sets the maximum warp distance from the origin. */
  domain_warp_amplitude: float;
  /**
   * If enabled, another FastNoiseLite instance is used to warp the space, resulting in a distortion of the noise.
   */
  domain_warp_enabled: boolean;
  /**
   * Determines the strength of each subsequent layer of the noise which is used to warp the space.
   * A low value places more emphasis on the lower frequency base layers, while a high value puts more emphasis on the higher frequency layers.
   */
  domain_warp_fractal_gain: float;
  /**
   * The change in frequency between octaves, also known as "lacunarity", of the fractal noise which warps the space. Increasing this value results in higher octaves, producing noise with finer details and a rougher appearance.
   */
  domain_warp_fractal_lacunarity: float;
  /**
   * The number of noise layers that are sampled to get the final value for the fractal noise which warps the space.
   */
  domain_warp_fractal_octaves: int;
  /** The method for combining octaves into a fractal which is used to warp the space. */
  domain_warp_fractal_type: int;
  /**
   * Frequency of the noise which warps the space. Low frequency results in smooth noise while high frequency results in rougher, more granular noise.
   */
  domain_warp_frequency: float;
  /** The warp algorithm. */
  domain_warp_type: int;
  /**
   * Determines the strength of each subsequent layer of noise in fractal noise.
   * A low value places more emphasis on the lower frequency base layers, while a high value puts more emphasis on the higher frequency layers.
   */
  fractal_gain: float;
  /**
   * Frequency multiplier between subsequent octaves. Increasing this value results in higher octaves producing noise with finer details and a rougher appearance.
   */
  fractal_lacunarity: float;
  /** The number of noise layers that are sampled to get the final value for fractal noise types. */
  fractal_octaves: int;
  /** Sets the strength of the fractal ping pong type. */
  fractal_ping_pong_strength: float;
  /** The method for combining octaves into a fractal. */
  fractal_type: int;
  /** Higher weighting means higher octaves have less impact if lower octaves have a large impact. */
  fractal_weighted_strength: float;
  /**
   * The frequency for all noise types. Low frequency results in smooth noise while high frequency results in rougher, more granular noise.
   */
  frequency: float;
  /** The noise algorithm used. */
  noise_type: int;
  /** Translate the noise input coordinates by the given {@link Vector3}. */
  offset: Vector3;
  /** The random number seed for all noise types. */
  seed: int;
  set_cellular_distance_function(value: int): void;
  get_cellular_distance_function(): int;
  set_cellular_jitter(value: float): void;
  get_cellular_jitter(): float;
  set_cellular_return_type(value: int): void;
  get_cellular_return_type(): int;
  set_domain_warp_amplitude(value: float): void;
  get_domain_warp_amplitude(): float;
  set_domain_warp_enabled(value: boolean): void;
  is_domain_warp_enabled(): boolean;
  set_domain_warp_fractal_gain(value: float): void;
  get_domain_warp_fractal_gain(): float;
  set_domain_warp_fractal_lacunarity(value: float): void;
  get_domain_warp_fractal_lacunarity(): float;
  set_domain_warp_fractal_octaves(value: int): void;
  get_domain_warp_fractal_octaves(): int;
  set_domain_warp_fractal_type(value: int): void;
  get_domain_warp_fractal_type(): int;
  set_domain_warp_frequency(value: float): void;
  get_domain_warp_frequency(): float;
  set_domain_warp_type(value: int): void;
  get_domain_warp_type(): int;
  set_fractal_gain(value: float): void;
  get_fractal_gain(): float;
  set_fractal_lacunarity(value: float): void;
  get_fractal_lacunarity(): float;
  set_fractal_octaves(value: int): void;
  get_fractal_octaves(): int;
  set_fractal_ping_pong_strength(value: float): void;
  get_fractal_ping_pong_strength(): float;
  set_fractal_type(value: int): void;
  get_fractal_type(): int;
  set_fractal_weighted_strength(value: float): void;
  get_fractal_weighted_strength(): float;
  set_frequency(value: float): void;
  get_frequency(): float;
  set_noise_type(value: int): void;
  get_noise_type(): int;
  set_offset(value: Vector3 | Vector3i): void;
  get_offset(): Vector3;
  set_seed(value: int): void;
  get_seed(): int;

  // enum NoiseType
  /** A lattice of points are assigned random values then interpolated based on neighboring values. */
  static readonly TYPE_VALUE: int;
  /**
   * Similar to value noise ({@link TYPE_VALUE}), but slower. Has more variance in peaks and valleys.
   * Cubic noise can be used to avoid certain artifacts when using value noise to create a bumpmap. In general, you should always use this mode if the value noise is being used for a heightmap or bumpmap.
   */
  static readonly TYPE_VALUE_CUBIC: int;
  /**
   * A lattice of random gradients. Their dot products are interpolated to obtain values in between the lattices.
   */
  static readonly TYPE_PERLIN: int;
  /**
   * Cellular includes both Worley noise and Voronoi diagrams which creates various regions of the same value.
   */
  static readonly TYPE_CELLULAR: int;
  /**
   * As opposed to {@link TYPE_PERLIN}, gradients exist in a simplex lattice rather than a grid lattice, avoiding directional artifacts. Internally uses FastNoiseLite's OpenSimplex2 noise type.
   */
  static readonly TYPE_SIMPLEX: int;
  /**
   * Modified, higher quality version of {@link TYPE_SIMPLEX}, but slower. Internally uses FastNoiseLite's OpenSimplex2S noise type.
   */
  static readonly TYPE_SIMPLEX_SMOOTH: int;
  // enum FractalType
  /** No fractal noise. */
  static readonly FRACTAL_NONE: int;
  /** Method using Fractional Brownian Motion to combine octaves into a fractal. */
  static readonly FRACTAL_FBM: int;
  /** Method of combining octaves into a fractal resulting in a "ridged" look. */
  static readonly FRACTAL_RIDGED: int;
  /** Method of combining octaves into a fractal with a ping pong effect. */
  static readonly FRACTAL_PING_PONG: int;
  // enum CellularDistanceFunction
  /** Euclidean distance to the nearest point. */
  static readonly DISTANCE_EUCLIDEAN: int;
  /** Squared Euclidean distance to the nearest point. */
  static readonly DISTANCE_EUCLIDEAN_SQUARED: int;
  /** Manhattan distance (taxicab metric) to the nearest point. */
  static readonly DISTANCE_MANHATTAN: int;
  /** Blend of {@link DISTANCE_EUCLIDEAN} and {@link DISTANCE_MANHATTAN} to give curved cell boundaries. */
  static readonly DISTANCE_HYBRID: int;
  // enum CellularReturnType
  /** The cellular distance function will return the same value for all points within a cell. */
  static readonly RETURN_CELL_VALUE: int;
  /** The cellular distance function will return a value determined by the distance to the nearest point. */
  static readonly RETURN_DISTANCE: int;
  /** The cellular distance function returns the distance to the second-nearest point. */
  static readonly RETURN_DISTANCE2: int;
  /** The distance to the nearest point is added to the distance to the second-nearest point. */
  static readonly RETURN_DISTANCE2_ADD: int;
  /** The distance to the nearest point is subtracted from the distance to the second-nearest point. */
  static readonly RETURN_DISTANCE2_SUB: int;
  /** The distance to the nearest point is multiplied with the distance to the second-nearest point. */
  static readonly RETURN_DISTANCE2_MUL: int;
  /** The distance to the nearest point is divided by the distance to the second-nearest point. */
  static readonly RETURN_DISTANCE2_DIV: int;
  // enum DomainWarpType
  /** The domain is warped using the simplex noise algorithm. */
  static readonly DOMAIN_WARP_SIMPLEX: int;
  /** The domain is warped using a simplified version of the simplex noise algorithm. */
  static readonly DOMAIN_WARP_SIMPLEX_REDUCED: int;
  /**
   * The domain is warped using a simple noise grid (not as smooth as the other methods, but more performant).
   */
  static readonly DOMAIN_WARP_BASIC_GRID: int;
  // enum DomainWarpFractalType
  /** No fractal noise for warping the space. */
  static readonly DOMAIN_WARP_FRACTAL_NONE: int;
  /** Warping the space progressively, octave for octave, resulting in a more "liquified" distortion. */
  static readonly DOMAIN_WARP_FRACTAL_PROGRESSIVE: int;
  /** Warping the space independently for each octave, resulting in a more chaotic distortion. */
  static readonly DOMAIN_WARP_FRACTAL_INDEPENDENT: int;
}
