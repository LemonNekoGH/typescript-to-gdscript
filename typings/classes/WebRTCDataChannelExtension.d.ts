// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

declare class WebRTCDataChannelExtension extends WebRTCDataChannel {
  _close(): void;
  _get_available_packet_count(): int;
  _get_buffered_amount(): int;
  _get_id(): int;
  _get_label(): string;
  _get_max_packet_life_time(): int;
  _get_max_packet_size(): int;
  _get_max_retransmits(): int;
  _get_packet(r_buffer: int, r_buffer_size: int): int;
  _get_protocol(): string;
  _get_ready_state(): int;
  _get_write_mode(): int;
  _is_negotiated(): boolean;
  _is_ordered(): boolean;
  _poll(): int;
  _put_packet(buffer: int, buffer_size: int): int;
  _set_write_mode(write_mode: int): void;
  _was_string_packet(): boolean;
}
