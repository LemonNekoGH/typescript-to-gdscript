// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** MP3 audio stream driver. */
declare class AudioStreamMP3 extends AudioStream {
  /** The number of beats within a single bar in the audio track. */
  bar_beats: int;
  /**
   * The length of the audio track, in beats. The actual duration of the audio file might be longer than what is indicated by this property. It defines the end of the audio for looping, {@link AudioStreamPlaylist}, and {@link AudioStreamInteractive}.
   */
  beat_count: int;
  /** The tempo of the audio track, measured in beats per minute. */
  bpm: float;
  /**
   * Contains the audio data in bytes.
   * You can load a file without having to import it beforehand using the code snippet below. Keep in mind that this snippet loads the whole file into memory and may not be ideal for huge files (hundreds of megabytes or more).
   */
  data: PackedByteArray;
  /**
   * If `true`, the stream will play again from the specified {@link loop_offset} once it reaches the end of the audio track, or once it reaches the end of the last beat according to the amount specified in {@link beat_count}. Useful for ambient sounds and background music.
   */
  loop: boolean;
  /** Time in seconds at which the stream starts after being looped. */
  loop_offset: float;
  set_bar_beats(value: int): void;
  get_bar_beats(): int;
  set_beat_count(value: int): void;
  get_beat_count(): int;
  set_bpm(value: float): void;
  get_bpm(): float;
  set_data(value: PackedByteArray | Array<unknown>): void;
  get_data(): PackedByteArray;
  set_loop(value: boolean): void;
  has_loop(): boolean;
  set_loop_offset(value: float): void;
  get_loop_offset(): float;

  /**
   * Creates a new {@link AudioStreamMP3} instance from the given buffer. The buffer must contain MP3 data.
   */
  static load_from_buffer(stream_data: PackedByteArray | Array<unknown>): AudioStreamMP3 | null;
  /**
   * Creates a new {@link AudioStreamMP3} instance from the given file path. The file must be in MP3 format.
   */
  static load_from_file(path: string | NodePath): AudioStreamMP3 | null;
}
