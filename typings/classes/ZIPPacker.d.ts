// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Allows the creation of ZIP files. */
declare class ZIPPacker extends RefCounted {
  /**
   * The compression level used when {@link start_file} is called. Use {@link ZIPPacker.CompressionLevel} as a reference.
   */
  compression_level: int;
  set_compression_level(value: int): void;
  get_compression_level(): int;

  /**
   * Adds directory to the archive. If `modified_time` is set to `0`, current system time is used.
   * **Note:** Directories are automatically created when {@link start_file} is called, use this function before adding files to create directories with custom permissions and modification time.
   */
  add_directory(path: string | NodePath, permissions: int, modified_time?: int): int;
  /** Closes the underlying resources used by this instance. */
  close(): int;
  /**
   * Stops writing to a file within the archive.
   * It will fail if there is no open file.
   */
  close_file(): int;
  /**
   * Opens a zip file for writing at the given path using the specified write mode.
   * This must be called before everything else.
   */
  open(path: string | NodePath, append: int): int;
  /**
   * Starts writing to a file within the archive. Only one file can be written at the same time. If `modified_time` is set to `0`, current system time is used.
   * Must be called after {@link open}.
   */
  start_file(path: string | NodePath, permissions: int, modified_time?: int): int;
  /**
   * Write the given `data` to the file.
   * Needs to be called after {@link start_file}.
   */
  write_file(data: PackedByteArray | Array<unknown>): int;

  // enum ZipAppend
  /** Create a new zip archive at the given path. */
  static readonly APPEND_CREATE: int;
  /** Append a new zip archive to the end of the already existing file at the given path. */
  static readonly APPEND_CREATEAFTER: int;
  /** Add new files to the existing zip archive at the given path. */
  static readonly APPEND_ADDINZIP: int;
  // enum CompressionLevel
  /**
   * Start a file with the default Deflate compression level (`6`). This is a good compromise between speed and file size.
   */
  static readonly COMPRESSION_DEFAULT: int;
  /**
   * Start a file with no compression. This is also known as the "Store" compression mode and is the fastest method of packing files inside a ZIP archive. Consider using this mode for files that are already compressed (such as JPEG, PNG, MP3, or Ogg Vorbis files).
   */
  static readonly COMPRESSION_NONE: int;
  /**
   * Start a file with the fastest Deflate compression level (`1`). This is fast to compress, but results in larger file sizes than {@link COMPRESSION_DEFAULT}. Decompression speed is generally unaffected by the chosen compression level.
   */
  static readonly COMPRESSION_FAST: int;
  /**
   * Start a file with the best Deflate compression level (`9`). This is slow to compress, but results in smaller file sizes than {@link COMPRESSION_DEFAULT}. Decompression speed is generally unaffected by the chosen compression level.
   */
  static readonly COMPRESSION_BEST: int;
}
