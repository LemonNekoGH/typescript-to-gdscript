// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a glTF accessor. */
declare class GLTFAccessor extends Resource {
  /** The glTF accessor type, as an enum. */
  accessor_type: int;
  /**
   * The index of the buffer view this accessor is referencing. If `-1`, this accessor is not referencing any buffer view.
   */
  buffer_view: int;
  /** The offset relative to the start of the buffer view in bytes. */
  byte_offset: int;
  /**
   * The glTF component type as an enum. See {@link GLTFComponentType} for possible values. Within the core glTF specification, a value of 5125 or "UNSIGNED_INT" must not be used for any accessor that is not referenced by mesh.primitive.indices.
   */
  component_type: int;
  /** The number of elements referenced by this accessor. */
  count: int;
  /** Maximum value of each component in this accessor. */
  max: PackedFloat64Array;
  /** Minimum value of each component in this accessor. */
  min: PackedFloat64Array;
  /** Specifies whether integer data values are normalized before usage. */
  normalized: boolean;
  /** Number of deviating accessor values stored in the sparse array. */
  sparse_count: int;
  /**
   * The index of the buffer view with sparse indices. The referenced buffer view MUST NOT have its target or byteStride properties defined. The buffer view and the optional byteOffset MUST be aligned to the componentType byte length.
   */
  sparse_indices_buffer_view: int;
  /** The offset relative to the start of the buffer view in bytes. */
  sparse_indices_byte_offset: int;
  /**
   * The indices component data type as an enum. Possible values are 5121 for "UNSIGNED_BYTE", 5123 for "UNSIGNED_SHORT", and 5125 for "UNSIGNED_INT".
   */
  sparse_indices_component_type: int;
  /**
   * The index of the bufferView with sparse values. The referenced buffer view MUST NOT have its target or byteStride properties defined.
   */
  sparse_values_buffer_view: int;
  /** The offset relative to the start of the bufferView in bytes. */
  sparse_values_byte_offset: int;
  /**
   * The glTF accessor type, as an [int]. Possible values are `0` for "SCALAR", `1` for "VEC2", `2` for "VEC3", `3` for "VEC4", `4` for "MAT2", `5` for "MAT3", and `6` for "MAT4".
   */
  type: int;
  set_accessor_type(value: int): void;
  get_accessor_type(): int;
  set_buffer_view(value: int): void;
  get_buffer_view(): int;
  set_byte_offset(value: int): void;
  get_byte_offset(): int;
  set_component_type(value: int): void;
  get_component_type(): int;
  set_count(value: int): void;
  get_count(): int;
  set_max(value: PackedFloat64Array | Array<unknown>): void;
  get_max(): PackedFloat64Array;
  set_min(value: PackedFloat64Array | Array<unknown>): void;
  get_min(): PackedFloat64Array;
  set_normalized(value: boolean): void;
  get_normalized(): boolean;
  set_sparse_count(value: int): void;
  get_sparse_count(): int;
  set_sparse_indices_buffer_view(value: int): void;
  get_sparse_indices_buffer_view(): int;
  set_sparse_indices_byte_offset(value: int): void;
  get_sparse_indices_byte_offset(): int;
  set_sparse_indices_component_type(value: int): void;
  get_sparse_indices_component_type(): int;
  set_sparse_values_buffer_view(value: int): void;
  get_sparse_values_buffer_view(): int;
  set_sparse_values_byte_offset(value: int): void;
  get_sparse_values_byte_offset(): int;
  set_type(value: int): void;
  get_type(): int;

  /** Creates a new GLTFAccessor instance by parsing the given {@link Dictionary}. */
  static from_dictionary(dictionary: Dictionary): GLTFAccessor | null;
  /** Serializes this GLTFAccessor instance into a {@link Dictionary}. */
  to_dictionary(): Dictionary;

  // enum GLTFAccessorType
  /**
   * Accessor type "SCALAR". For the glTF object model, this can be used to map to a single float, int, or bool value, or a float array.
   */
  static readonly TYPE_SCALAR: int;
  /**
   * Accessor type "VEC2". For the glTF object model, this maps to "float2", represented in the glTF JSON as an array of two floats.
   */
  static readonly TYPE_VEC2: int;
  /**
   * Accessor type "VEC3". For the glTF object model, this maps to "float3", represented in the glTF JSON as an array of three floats.
   */
  static readonly TYPE_VEC3: int;
  /**
   * Accessor type "VEC4". For the glTF object model, this maps to "float4", represented in the glTF JSON as an array of four floats.
   */
  static readonly TYPE_VEC4: int;
  /**
   * Accessor type "MAT2". For the glTF object model, this maps to "float2x2", represented in the glTF JSON as an array of four floats.
   */
  static readonly TYPE_MAT2: int;
  /**
   * Accessor type "MAT3". For the glTF object model, this maps to "float3x3", represented in the glTF JSON as an array of nine floats.
   */
  static readonly TYPE_MAT3: int;
  /**
   * Accessor type "MAT4". For the glTF object model, this maps to "float4x4", represented in the glTF JSON as an array of sixteen floats.
   */
  static readonly TYPE_MAT4: int;
  // enum GLTFComponentType
  /**
   * Component type "NONE". This is not a valid component type, and is used to indicate that the component type is not set.
   */
  static readonly COMPONENT_TYPE_NONE: int;
  /**
   * Component type "BYTE". The value is `0x1400` which comes from OpenGL. This indicates data is stored in 1-byte or 8-bit signed integers. This is a core part of the glTF specification.
   */
  static readonly COMPONENT_TYPE_SIGNED_BYTE: int;
  /**
   * Component type "UNSIGNED_BYTE". The value is `0x1401` which comes from OpenGL. This indicates data is stored in 1-byte or 8-bit unsigned integers. This is a core part of the glTF specification.
   */
  static readonly COMPONENT_TYPE_UNSIGNED_BYTE: int;
  /**
   * Component type "SHORT". The value is `0x1402` which comes from OpenGL. This indicates data is stored in 2-byte or 16-bit signed integers. This is a core part of the glTF specification.
   */
  static readonly COMPONENT_TYPE_SIGNED_SHORT: int;
  /**
   * Component type "UNSIGNED_SHORT". The value is `0x1403` which comes from OpenGL. This indicates data is stored in 2-byte or 16-bit unsigned integers. This is a core part of the glTF specification.
   */
  static readonly COMPONENT_TYPE_UNSIGNED_SHORT: int;
  /**
   * Component type "INT". The value is `0x1404` which comes from OpenGL. This indicates data is stored in 4-byte or 32-bit signed integers. This is NOT a core part of the glTF specification, and may not be supported by all glTF importers. May be used by some extensions including `KHR_interactivity`.
   */
  static readonly COMPONENT_TYPE_SIGNED_INT: int;
  /**
   * Component type "UNSIGNED_INT". The value is `0x1405` which comes from OpenGL. This indicates data is stored in 4-byte or 32-bit unsigned integers. This is a core part of the glTF specification.
   */
  static readonly COMPONENT_TYPE_UNSIGNED_INT: int;
  /**
   * Component type "FLOAT". The value is `0x1406` which comes from OpenGL. This indicates data is stored in 4-byte or 32-bit floating-point numbers. This is a core part of the glTF specification.
   */
  static readonly COMPONENT_TYPE_SINGLE_FLOAT: int;
  /**
   * Component type "DOUBLE". The value is `0x140A` which comes from OpenGL. This indicates data is stored in 8-byte or 64-bit floating-point numbers. This is NOT a core part of the glTF specification, and may not be supported by all glTF importers. May be used by some extensions including `KHR_interactivity`.
   */
  static readonly COMPONENT_TYPE_DOUBLE_FLOAT: int;
  /**
   * Component type "HALF_FLOAT". The value is `0x140B` which comes from OpenGL. This indicates data is stored in 2-byte or 16-bit floating-point numbers. This is NOT a core part of the glTF specification, and may not be supported by all glTF importers. May be used by some extensions including `KHR_interactivity`.
   */
  static readonly COMPONENT_TYPE_HALF_FLOAT: int;
  /**
   * Component type "LONG". The value is `0x140E` which comes from OpenGL. This indicates data is stored in 8-byte or 64-bit signed integers. This is NOT a core part of the glTF specification, and may not be supported by all glTF importers. May be used by some extensions including `KHR_interactivity`.
   */
  static readonly COMPONENT_TYPE_SIGNED_LONG: int;
  /**
   * Component type "UNSIGNED_LONG". The value is `0x140F` which comes from OpenGL. This indicates data is stored in 8-byte or 64-bit unsigned integers. This is NOT a core part of the glTF specification, and may not be supported by all glTF importers. May be used by some extensions including `KHR_interactivity`.
   */
  static readonly COMPONENT_TYPE_UNSIGNED_LONG: int;
}
