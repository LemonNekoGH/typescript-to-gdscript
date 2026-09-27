// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Contains the results of a {@link RegEx} search. */
declare class RegExMatch extends RefCounted {
  /**
   * A dictionary of named groups and its corresponding group number. Only groups that were matched are included. If multiple groups have the same name, that name would refer to the first matching one.
   */
  names: Dictionary;
  /** An {@link Array} of the match and its capturing groups. */
  strings: PackedStringArray;
  /** The source string used with the search pattern to find this matching result. */
  subject: string;
  get_names(): Dictionary;
  get_strings(): PackedStringArray;
  get_subject(): string;

  /**
   * Returns the end position of the match within the source string. The end position of capturing groups can be retrieved by providing its group number as an integer or its string name (if it's a named group). The default value of 0 refers to the whole pattern.
   * Returns -1 if the group did not match or doesn't exist.
   */
  get_end(name?: unknown): int;
  /** Returns the number of capturing groups. */
  get_group_count(): int;
  /**
   * Returns the starting position of the match within the source string. The starting position of capturing groups can be retrieved by providing its group number as an integer or its string name (if it's a named group). The default value of 0 refers to the whole pattern.
   * Returns -1 if the group did not match or doesn't exist.
   */
  get_start(name?: unknown): int;
  /**
   * Returns the substring of the match from the source string. Capturing groups can be retrieved by providing its group number as an integer or its string name (if it's a named group). The default value of 0 refers to the whole pattern.
   * Returns an empty string if the group did not match or doesn't exist.
   */
  get_string(name?: unknown): string;
}
