// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A class representing an Ogg Vorbis audio stream. */
declare class AudioStreamOggVorbis extends AudioStream {
  /** The number of beats within a single bar in the audio track. */
  bar_beats: int;
  /**
   * The length of the audio track, in beats. The actual duration of the audio file might be longer than what is indicated by this property. It defines the end of the audio for looping, {@link AudioStreamPlaylist}, and {@link AudioStreamInteractive}.
   */
  beat_count: int;
  /** The tempo of the audio track, measured in beats per minute. */
  bpm: float;
  /**
   * If `true`, the stream will play again from the specified {@link loop_offset} once it reaches the end of the audio track, or once it reaches the end of the last beat according to the amount specified in {@link beat_count}. Useful for ambient sounds and background music.
   */
  loop: boolean;
  /** Time in seconds at which the stream starts after being looped. */
  loop_offset: float;
  /** Contains the raw Ogg data for this stream. */
  packet_sequence: OggPacketSequence | null;
  /**
   * Contains user-defined tags if found in the Ogg Vorbis data.
   * Commonly used tags include `title`, `artist`, `album`, `tracknumber`, and `date` (`date` does not have a standard date format).
   * **Note:** No tag is *guaranteed* to be present in every file, so make sure to account for the keys not always existing.
   */
  tags: Dictionary;
  set_bar_beats(value: int): void;
  get_bar_beats(): int;
  set_beat_count(value: int): void;
  get_beat_count(): int;
  set_bpm(value: float): void;
  get_bpm(): float;
  set_loop(value: boolean): void;
  has_loop(): boolean;
  set_loop_offset(value: float): void;
  get_loop_offset(): float;
  set_packet_sequence(value: OggPacketSequence | null): void;
  get_packet_sequence(): OggPacketSequence | null;
  set_tags(value: Dictionary): void;
  get_tags(): Dictionary;

  /**
   * Creates a new {@link AudioStreamOggVorbis} instance from the given buffer. The buffer must contain Ogg Vorbis data.
   */
  static load_from_buffer(stream_data: PackedByteArray | Array<unknown>): AudioStreamOggVorbis | null;
  /**
   * Creates a new {@link AudioStreamOggVorbis} instance from the given file path. The file must be in Ogg Vorbis format.
   */
  static load_from_file(path: string | NodePath): AudioStreamOggVorbis | null;
}
