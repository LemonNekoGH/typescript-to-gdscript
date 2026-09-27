// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Class for searching text for patterns using regular expressions. */
declare class RegEx extends RefCounted {
  /**
   * This method resets the state of the object, as if it was freshly created. Namely, it unassigns the regular expression of this object.
   */
  clear(): void;
  /**
   * Compiles and assign the search pattern to use. Returns {@link OK} if the compilation is successful. If compilation fails, returns {@link FAILED} and when `show_error` is `true`, details are printed to standard output.
   */
  compile(pattern: string | NodePath, show_error?: boolean): int;
  /** Creates and compiles a new {@link RegEx} object. See also {@link compile}. */
  static create_from_string(pattern: string | NodePath, show_error?: boolean): RegEx | null;
  /** Returns the number of capturing groups in compiled pattern. */
  get_group_count(): int;
  /**
   * Returns an array of names of named capturing groups in the compiled pattern. They are ordered by appearance.
   */
  get_names(): PackedStringArray;
  /** Returns the original search pattern that was compiled. */
  get_pattern(): string;
  /** Returns whether this object has a valid search pattern assigned. */
  is_valid(): boolean;
  /**
   * Searches the text for the compiled pattern. Returns a {@link RegExMatch} container of the first matching result if found, otherwise `null`.
   * The region to search within can be specified with `offset` and `end`. This is useful when searching for another match in the same `subject` by calling this method again after a previous success. Note that setting these parameters differs from passing over a shortened string. For example, the start anchor `^` is not affected by `offset`, and the character before `offset` will be checked for the word boundary `\b`.
   */
  search(subject: string | NodePath, offset?: int, end?: int): RegExMatch | null;
  /**
   * Searches the text for the compiled pattern. Returns an array of {@link RegExMatch} containers for each non-overlapping result. If no results were found, an empty array is returned instead.
   * The region to search within can be specified with `offset` and `end`. This is useful when searching for another match in the same `subject` by calling this method again after a previous success. Note that setting these parameters differs from passing over a shortened string. For example, the start anchor `^` is not affected by `offset`, and the character before `offset` will be checked for the word boundary `\b`.
   */
  search_all(subject: string | NodePath, offset?: int, end?: int): Array<RegExMatch>;
  /**
   * Searches the text for the compiled pattern and replaces it with the specified string. Escapes and backreferences such as `$1` and `$name` are expanded and resolved. By default, only the first instance is replaced, but it can be changed for all instances (global replacement).
   * The region to search within can be specified with `offset` and `end`. This is useful when searching for another match in the same `subject` by calling this method again after a previous success. Note that setting these parameters differs from passing over a shortened string. For example, the start anchor `^` is not affected by `offset`, and the character before `offset` will be checked for the word boundary `\b`.
   */
  sub(subject: string | NodePath, replacement: string | NodePath, all?: boolean, offset?: int, end?: int): string;
}
