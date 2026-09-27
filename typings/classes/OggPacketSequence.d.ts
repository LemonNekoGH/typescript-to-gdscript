// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A sequence of Ogg packets. */
declare class OggPacketSequence extends Resource {
  /** Contains the granule positions for each page in this packet sequence. */
  granule_positions: PackedInt64Array;
  /** Contains the raw packets that make up this OggPacketSequence. */
  packet_data: Array<Array<unknown>>;
  /**
   * Holds sample rate information about this sequence. Must be set by another class that actually understands the codec.
   */
  sampling_rate: float;
  set_packet_granule_positions(value: PackedInt64Array | Array<unknown>): void;
  get_packet_granule_positions(): PackedInt64Array;
  set_packet_data(value: Array<Array<unknown>>): void;
  get_packet_data(): Array<Array<unknown>>;
  set_sampling_rate(value: float): void;
  get_sampling_rate(): float;

  /** The length of this stream, in seconds. */
  get_length(): float;
}
