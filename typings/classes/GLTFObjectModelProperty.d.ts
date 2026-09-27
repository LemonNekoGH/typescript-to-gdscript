// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Describes how to access a property as defined in the glTF object model. */
declare class GLTFObjectModelProperty extends RefCounted {
  /**
   * If set, this {@link Expression} will be used to convert the property value from the glTF object model to the value expected by the Godot property. This is useful when the glTF object model uses a different unit system, or when the data needs to be transformed in some way. If `null`, the value will be copied as-is.
   */
  gltf_to_godot_expression: Expression | null;
  /**
   * If set, this {@link Expression} will be used to convert the property value from the Godot property to the value expected by the glTF object model. This is useful when the glTF object model uses a different unit system, or when the data needs to be transformed in some way. If `null`, the value will be copied as-is.
   */
  godot_to_gltf_expression: Expression | null;
  /**
   * The glTF object model JSON pointers used to identify the property in the glTF object model. In most cases, there will be only one item in this array, but specific cases may require multiple pointers. The items are themselves arrays which represent the JSON pointer split into its components.
   */
  json_pointers: Array<PackedStringArray>;
  /**
   * An array of {@link NodePath}s that point to a property, or multiple properties, in the Godot scene tree. On import, this will either be set by {@link GLTFDocument}, or by a {@link GLTFDocumentExtension} class. For simple cases, use {@link append_path_to_property} to add properties to this array.
   * In most cases {@link node_paths} will only have one item, but in some cases a single glTF JSON pointer will map to multiple Godot properties. For example, a {@link GLTFCamera} or {@link GLTFLight} used on multiple glTF nodes will be represented by multiple Godot nodes.
   */
  node_paths: Array<NodePath>;
  /**
   * The type of data stored in the glTF file as defined by the object model. This is a superset of the available accessor types, and determines the accessor type.
   */
  object_model_type: int;
  /**
   * The type of data stored in the Godot property. This is the type of the property that the {@link node_paths} point to.
   */
  variant_type: int;
  set_gltf_to_godot_expression(value: Expression | null): void;
  get_gltf_to_godot_expression(): Expression | null;
  set_godot_to_gltf_expression(value: Expression | null): void;
  get_godot_to_gltf_expression(): Expression | null;
  set_json_pointers(value: Array<PackedStringArray>): void;
  get_json_pointers(): Array<PackedStringArray>;
  set_node_paths(value: Array<NodePath>): void;
  get_node_paths(): Array<NodePath>;
  set_object_model_type(value: int): void;
  get_object_model_type(): int;
  set_variant_type(value: int): void;
  get_variant_type(): int;

  /**
   * Appends a {@link NodePath} to {@link node_paths}. This can be used by {@link GLTFDocumentExtension} classes to define how a glTF object model property maps to a Godot property, or multiple Godot properties. Prefer using {@link append_path_to_property} for simple cases. Be sure to also call {@link set_types} once (the order does not matter).
   */
  append_node_path(node_path: NodePath | string): void;
  /**
   * High-level wrapper over {@link append_node_path} that handles the most common cases. It constructs a new {@link NodePath} using `node_path` as a base and appends `prop_name` to the subpath. Be sure to also call {@link set_types} once (the order does not matter).
   */
  append_path_to_property(node_path: NodePath | string, prop_name: string): void;
  /**
   * The GLTF accessor type associated with this property's {@link object_model_type}. See {@link GLTFAccessor.accessor_type} for possible values, and see {@link GLTFObjectModelType} for how the object model type maps to accessor types.
   */
  get_accessor_type(): int;
  /**
   * Returns `true` if {@link json_pointers} is not empty. This is used during export to determine if a {@link GLTFObjectModelProperty} can handle converting a Godot property to a glTF object model property.
   */
  has_json_pointers(): boolean;
  /**
   * Returns `true` if {@link node_paths} is not empty. This is used during import to determine if a {@link GLTFObjectModelProperty} can handle converting a glTF object model property to a Godot property.
   */
  has_node_paths(): boolean;
  /**
   * Sets the {@link variant_type} and {@link object_model_type} properties. This is a convenience method to set both properties at once, since they are almost always known at the same time. This method should be called once. Calling it again with the same values will have no effect.
   */
  set_types(variant_type: int, obj_model_type: int): void;

  // enum GLTFObjectModelType
  /**
   * Unknown or not set object model type. If the object model type is set to this value, the real type still needs to be determined.
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_UNKNOWN: int;
  /**
   * Object model type "bool". Represented in the glTF JSON as a boolean, and encoded in a {@link GLTFAccessor} as "SCALAR". When encoded in an accessor, a value of `0` is `false`, and any other value is `true`.
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_BOOL: int;
  /**
   * Object model type "float". Represented in the glTF JSON as a number, and encoded in a {@link GLTFAccessor} as "SCALAR".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT: int;
  /**
   * Object model type "float[lb][rb]". Represented in the glTF JSON as an array of numbers, and encoded in a {@link GLTFAccessor} as "SCALAR".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT_ARRAY: int;
  /**
   * Object model type "float2". Represented in the glTF JSON as an array of two numbers, and encoded in a {@link GLTFAccessor} as "VEC2".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT2: int;
  /**
   * Object model type "float3". Represented in the glTF JSON as an array of three numbers, and encoded in a {@link GLTFAccessor} as "VEC3".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT3: int;
  /**
   * Object model type "float4". Represented in the glTF JSON as an array of four numbers, and encoded in a {@link GLTFAccessor} as "VEC4".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT4: int;
  /**
   * Object model type "float2x2". Represented in the glTF JSON as an array of four numbers, and encoded in a {@link GLTFAccessor} as "MAT2".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT2X2: int;
  /**
   * Object model type "float3x3". Represented in the glTF JSON as an array of nine numbers, and encoded in a {@link GLTFAccessor} as "MAT3".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT3X3: int;
  /**
   * Object model type "float4x4". Represented in the glTF JSON as an array of sixteen numbers, and encoded in a {@link GLTFAccessor} as "MAT4".
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_FLOAT4X4: int;
  /**
   * Object model type "int". Represented in the glTF JSON as a number, and encoded in a {@link GLTFAccessor} as "SCALAR". The range of values is limited to signed integers. For `KHR_interactivity`, only 32-bit integers are supported.
   */
  static readonly GLTF_OBJECT_MODEL_TYPE_INT: int;
}
