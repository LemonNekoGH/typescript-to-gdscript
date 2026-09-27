// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a glTF buffer view. */
declare class GLTFBufferView extends Resource {
  /**
   * The index of the buffer this buffer view is referencing. If `-1`, this buffer view is not referencing any buffer.
   */
  buffer: int;
  /** The length, in bytes, of this buffer view. If `0`, this buffer view is empty. */
  byte_length: int;
  /** The offset, in bytes, from the start of the buffer to the start of this buffer view. */
  byte_offset: int;
  /** The stride, in bytes, between interleaved data. If `-1`, this buffer view is not interleaved. */
  byte_stride: int;
  /**
   * `true` if the GLTFBufferView's OpenGL GPU buffer type is an `ELEMENT_ARRAY_BUFFER` used for vertex indices (integer constant `34963`). `false` if the buffer type is any other value. See Buffers, BufferViews, and Accessors (https://github.com/KhronosGroup/glTF-Tutorials/blob/master/gltfTutorial/gltfTutorial_005_BuffersBufferViewsAccessors.md) for possible values. This property is set on import and used on export.
   */
  indices: boolean;
  /**
   * `true` if the GLTFBufferView's OpenGL GPU buffer type is an `ARRAY_BUFFER` used for vertex attributes (integer constant `34962`). `false` if the buffer type is any other value. See Buffers, BufferViews, and Accessors (https://github.com/KhronosGroup/glTF-Tutorials/blob/master/gltfTutorial/gltfTutorial_005_BuffersBufferViewsAccessors.md) for possible values. This property is set on import and used on export.
   */
  vertex_attributes: boolean;
  set_buffer(value: int): void;
  get_buffer(): int;
  set_byte_length(value: int): void;
  get_byte_length(): int;
  set_byte_offset(value: int): void;
  get_byte_offset(): int;
  set_byte_stride(value: int): void;
  get_byte_stride(): int;
  set_indices(value: boolean): void;
  get_indices(): boolean;
  set_vertex_attributes(value: boolean): void;
  get_vertex_attributes(): boolean;

  /** Creates a new GLTFBufferView instance by parsing the given {@link Dictionary}. */
  static from_dictionary(dictionary: Dictionary): GLTFBufferView | null;
  /**
   * Loads the buffer view data from the buffer referenced by this buffer view in the given {@link GLTFState}. Interleaved data with a byte stride is not yet supported by this method. The data is returned as a {@link PackedByteArray}.
   */
  load_buffer_view_data(state: GLTFState): PackedByteArray;
  /** Serializes this GLTFBufferView instance into a {@link Dictionary}. */
  to_dictionary(): Dictionary;
}
