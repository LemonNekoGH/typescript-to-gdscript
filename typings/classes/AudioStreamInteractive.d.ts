// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Audio stream that can playback music interactively, combining clips and a transition table. */
declare class AudioStreamInteractive extends AudioStream {
  /** Amount of clips contained in this interactive player. */
  clip_count: int;
  /** Index of the initial clip, which will be played first when this stream is played. */
  initial_clip: int;
  set_clip_count(value: int): void;
  get_clip_count(): int;
  set_initial_clip(value: int): void;
  get_initial_clip(): int;

  /**
   * Add a transition between two clips. Provide the indices of the source and destination clips, or use the {@link CLIP_ANY} constant to indicate that transition happens to/from any clip to this one.
   * * `from_time` indicates the moment in the current clip the transition will begin after triggered.
   * * `to_time` indicates the time in the next clip that the playback will start from.
   * * `fade_mode` indicates how the fade will happen between clips. If unsure, just use {@link FADE_AUTOMATIC} which uses the most common type of fade for each situation.
   * * `fade_beats` indicates how many beats the fade will take. Using decimals is allowed.
   * * `use_filler_clip` indicates that there will be a filler clip used between the source and destination clips.
   * * `filler_clip` the index of the filler clip.
   * * If `hold_previous` is used, then this clip will be remembered. This can be used together with {@link AUTO_ADVANCE_RETURN_TO_HOLD} to return to this clip after another is done playing.
   */
  add_transition(from_clip: int, to_clip: int, from_time: int, to_time: int, fade_mode: int, fade_beats: float, use_filler_clip?: boolean, filler_clip?: int, hold_previous?: boolean): void;
  /**
   * Erase a transition by providing `from_clip` and `to_clip` clip indices. {@link CLIP_ANY} can be used for either argument or both.
   */
  erase_transition(from_clip: int, to_clip: int): void;
  /** Return whether a clip has auto-advance enabled. See {@link set_clip_auto_advance}. */
  get_clip_auto_advance(clip_index: int): int;
  /** Return the clip towards which the clip referenced by `clip_index` will auto-advance to. */
  get_clip_auto_advance_next_clip(clip_index: int): int;
  /** Return the name of a clip. */
  get_clip_name(clip_index: int): string;
  /** Return the {@link AudioStream} associated with a clip. */
  get_clip_stream(clip_index: int): AudioStream | null;
  /** Return the time (in beats) for a transition (see {@link add_transition}). */
  get_transition_fade_beats(from_clip: int, to_clip: int): float;
  /** Return the mode for a transition (see {@link add_transition}). */
  get_transition_fade_mode(from_clip: int, to_clip: int): int;
  /** Return the filler clip for a transition (see {@link add_transition}). */
  get_transition_filler_clip(from_clip: int, to_clip: int): int;
  /** Return the source time position for a transition (see {@link add_transition}). */
  get_transition_from_time(from_clip: int, to_clip: int): int;
  /** Return the list of transitions (from, to interleaved). */
  get_transition_list(): PackedInt32Array;
  /** Return the destination time position for a transition (see {@link add_transition}). */
  get_transition_to_time(from_clip: int, to_clip: int): int;
  /** Returns `true` if a given transition exists (was added via {@link add_transition}). */
  has_transition(from_clip: int, to_clip: int): boolean;
  /** Return whether a transition uses the *hold previous* functionality (see {@link add_transition}). */
  is_transition_holding_previous(from_clip: int, to_clip: int): boolean;
  /** Return whether a transition uses the *filler clip* functionality (see {@link add_transition}). */
  is_transition_using_filler_clip(from_clip: int, to_clip: int): boolean;
  /** Set whether a clip will auto-advance by changing the auto-advance mode. */
  set_clip_auto_advance(clip_index: int, mode: int): void;
  /**
   * Set the index of the next clip towards which this clip will auto advance to when finished. If the clip being played loops, then auto-advance will be ignored.
   */
  set_clip_auto_advance_next_clip(clip_index: int, auto_advance_next_clip: int): void;
  /** Set the name of the current clip (for easier identification). */
  set_clip_name(clip_index: int, name: string): void;
  /** Set the {@link AudioStream} associated with the current clip. */
  set_clip_stream(clip_index: int, stream: AudioStream): void;

  // enum TransitionFromTime
  /** Start transition as soon as possible, don't wait for any specific time position. */
  static readonly TRANSITION_FROM_TIME_IMMEDIATE: int;
  /** Transition when the clip playback position reaches the next beat. */
  static readonly TRANSITION_FROM_TIME_NEXT_BEAT: int;
  /** Transition when the clip playback position reaches the next bar. */
  static readonly TRANSITION_FROM_TIME_NEXT_BAR: int;
  /** Transition when the current clip finished playing. */
  static readonly TRANSITION_FROM_TIME_END: int;
  // enum TransitionToTime
  /**
   * Transition to the same position in the destination clip. This is useful when both clips have exactly the same length and the music should fade between them.
   */
  static readonly TRANSITION_TO_TIME_SAME_POSITION: int;
  /** Transition to the start of the destination clip. */
  static readonly TRANSITION_TO_TIME_START: int;
  /**
   * Transition to the last played position in the destination clip, if there was a previous transition from that clip. Otherwise, plays from the start of the destination clip.
   */
  static readonly TRANSITION_TO_TIME_PREVIOUS_POSITION: int;
  // enum FadeMode
  /**
   * Do not use fade for the transition. This is useful when transitioning from a clip-end to clip-beginning, and each clip has their begin/end.
   */
  static readonly FADE_DISABLED: int;
  /** Use a fade-in in the next clip, let the current clip finish. */
  static readonly FADE_IN: int;
  /** Use a fade-out in the current clip, the next clip will start by itself. */
  static readonly FADE_OUT: int;
  /** Use a cross-fade between clips. */
  static readonly FADE_CROSS: int;
  /**
   * Use automatic fade logic depending on the transition from/to. It is recommended to use this by default.
   */
  static readonly FADE_AUTOMATIC: int;
  // enum AutoAdvanceMode
  /** Disable auto-advance (default). */
  static readonly AUTO_ADVANCE_DISABLED: int;
  /** Enable auto-advance, a clip must be specified. */
  static readonly AUTO_ADVANCE_ENABLED: int;
  /**
   * Enable auto-advance, but instead of specifying a clip, the playback will return to hold (see {@link add_transition}).
   */
  static readonly AUTO_ADVANCE_RETURN_TO_HOLD: int;

  /**
   * This constant describes that any clip is valid for a specific transition as either source or destination.
   */
  static readonly CLIP_ANY: int;
}
