// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Allows reading the content of a ZIP file. */
declare class ZIPReader extends RefCounted {
  /** Closes the underlying resources used by this instance. */
  close(): int;
  /**
   * Returns `true` if the file exists in the loaded zip archive.
   * Must be called after {@link open}.
   */
  file_exists(path: string | NodePath, case_sensitive?: boolean): boolean;
  /**
   * Returns the compression level of the file in the loaded zip archive. Returns `-1` if the file doesn't exist or any other error occurs. Must be called after {@link open}.
   */
  get_compression_level(path: string | NodePath, case_sensitive?: boolean): int;
  /**
   * Returns the list of names of all files in the loaded archive.
   * Must be called after {@link open}.
   */
  get_files(): PackedStringArray;
  /** Opens the zip archive at the given `path` and reads its file index. */
  open(path: string | NodePath): int;
  /**
   * Loads the whole content of a file in the loaded zip archive into memory and returns it.
   * Must be called after {@link open}.
   */
  read_file(path: string | NodePath, case_sensitive?: boolean): PackedByteArray;
}
