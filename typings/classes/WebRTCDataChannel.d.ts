// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

declare class WebRTCDataChannel extends PacketPeer {
  /** The transfer mode to use when sending outgoing packet. Either text or binary. */
  write_mode: int;
  set_write_mode(value: int): void;
  get_write_mode(): int;

  /** Closes this data channel, notifying the other peer. */
  close(): void;
  /** Returns the number of bytes currently queued to be sent over this channel. */
  get_buffered_amount(): int;
  /**
   * Returns the ID assigned to this channel during creation (or auto-assigned during negotiation).
   * If the channel is not negotiated out-of-band the ID will only be available after the connection is established (will return `65535` until then).
   */
  get_id(): int;
  /** Returns the label assigned to this channel during creation. */
  get_label(): string;
  /**
   * Returns the `maxPacketLifeTime` value assigned to this channel during creation.
   * Will be `65535` if not specified.
   */
  get_max_packet_life_time(): int;
  /**
   * Returns the `maxRetransmits` value assigned to this channel during creation.
   * Will be `65535` if not specified.
   */
  get_max_retransmits(): int;
  /**
   * Returns the sub-protocol assigned to this channel during creation. An empty string if not specified.
   */
  get_protocol(): string;
  /** Returns the current state of this channel. */
  get_ready_state(): int;
  /** Returns `true` if this channel was created with out-of-band configuration. */
  is_negotiated(): boolean;
  /** Returns `true` if this channel was created with ordering enabled (default). */
  is_ordered(): boolean;
  /** Reserved, but not used for now. */
  poll(): int;
  /** Returns `true` if the last received packet was transferred as text. See {@link write_mode}. */
  was_string_packet(): boolean;

  // enum WriteMode
  /**
   * Tells the channel to send data over this channel as text. An external peer (non-Godot) would receive this as a string.
   */
  static readonly WRITE_MODE_TEXT: int;
  /**
   * Tells the channel to send data over this channel as binary. An external peer (non-Godot) would receive this as array buffer or blob.
   */
  static readonly WRITE_MODE_BINARY: int;
  // enum ChannelState
  /** The channel was created, but it's still trying to connect. */
  static readonly STATE_CONNECTING: int;
  /** The channel is currently open, and data can flow over it. */
  static readonly STATE_OPEN: int;
  /**
   * The channel is being closed, no new messages will be accepted, but those already in queue will be flushed.
   */
  static readonly STATE_CLOSING: int;
  /** The channel was closed, or connection failed. */
  static readonly STATE_CLOSED: int;
}
