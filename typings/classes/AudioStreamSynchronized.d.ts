// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Stream that can be fitted with sub-streams, which will be played in-sync. */
declare class AudioStreamSynchronized extends AudioStream {
  /** Set the total amount of streams that will be played back synchronized. */
  stream_count: int;
  set_stream_count(value: int): void;
  get_stream_count(): int;

  /** Get one of the synchronized streams, by index. */
  get_sync_stream(stream_index: int): AudioStream | null;
  /** Get the volume of one of the synchronized streams, by index. */
  get_sync_stream_volume(stream_index: int): float;
  /** Set one of the synchronized streams, by index. */
  set_sync_stream(stream_index: int, audio_stream: AudioStream): void;
  /** Set the volume of one of the synchronized streams, by index. */
  set_sync_stream_volume(stream_index: int, volume_db: float): void;

  /** Maximum amount of streams that can be synchronized. */
  static readonly MAX_STREAMS: int;
}
