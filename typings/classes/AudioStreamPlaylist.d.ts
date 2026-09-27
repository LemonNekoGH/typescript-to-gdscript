// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** {@link AudioStream} that includes sub-streams and plays them back like a playlist. */
declare class AudioStreamPlaylist extends AudioStream {
  /**
   * Fade time used when a stream ends, when going to the next one. Streams are expected to have an extra bit of audio after the end to help with fading.
   */
  fade_time: float;
  /**
   * If `true`, the playlist will loop, otherwise the playlist will end when the last stream is finished.
   */
  loop: boolean;
  /** If `true`, the playlist will shuffle each time playback starts and each time it loops. */
  shuffle: boolean;
  /** Amount of streams in the playlist. */
  stream_count: int;
  set_fade_time(value: float): void;
  get_fade_time(): float;
  set_loop(value: boolean): void;
  has_loop(): boolean;
  set_shuffle(value: boolean): void;
  get_shuffle(): boolean;
  set_stream_count(value: int): void;
  get_stream_count(): int;

  /** Returns the BPM of the playlist, which can vary depending on the clip being played. */
  get_bpm(): float;
  /** Returns the stream at playback position index. */
  get_list_stream(stream_index: int): AudioStream | null;
  /** Sets the stream at playback position index. */
  set_list_stream(stream_index: int, audio_stream: AudioStream): void;

  /** Maximum amount of streams supported in the playlist. */
  static readonly MAX_STREAMS: int;
}
