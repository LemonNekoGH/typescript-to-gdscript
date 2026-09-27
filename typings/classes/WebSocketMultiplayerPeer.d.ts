// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class for WebSocket server and client. */
declare class WebSocketMultiplayerPeer extends MultiplayerPeer {
  /**
   * The extra headers to use during handshake. See {@link WebSocketPeer.handshake_headers} for more details.
   */
  handshake_headers: PackedStringArray;
  /** The maximum time each peer can stay in a connecting state before being dropped. */
  handshake_timeout: float;
  /**
   * The inbound buffer size for connected peers. See {@link WebSocketPeer.inbound_buffer_size} for more details.
   */
  inbound_buffer_size: int;
  /**
   * The maximum number of queued packets for connected peers. See {@link WebSocketPeer.max_queued_packets} for more details.
   */
  max_queued_packets: int;
  /**
   * The outbound buffer size for connected peers. See {@link WebSocketPeer.outbound_buffer_size} for more details.
   */
  outbound_buffer_size: int;
  /**
   * The supported WebSocket sub-protocols. See {@link WebSocketPeer.supported_protocols} for more details.
   */
  supported_protocols: PackedStringArray;
  set_handshake_headers(value: PackedStringArray | Array<unknown>): void;
  get_handshake_headers(): PackedStringArray;
  set_handshake_timeout(value: float): void;
  get_handshake_timeout(): float;
  set_inbound_buffer_size(value: int): void;
  get_inbound_buffer_size(): int;
  set_max_queued_packets(value: int): void;
  get_max_queued_packets(): int;
  set_outbound_buffer_size(value: int): void;
  get_outbound_buffer_size(): int;
  set_supported_protocols(value: PackedStringArray | Array<unknown>): void;
  get_supported_protocols(): PackedStringArray;

  /**
   * Starts a new multiplayer client connecting to the given `url`. TLS certificates will be verified against the hostname when connecting using the `wss://` protocol. You can pass the optional `tls_client_options` parameter to customize the trusted certification authorities, or disable the common name verification. See {@link TLSOptions.client} and {@link TLSOptions.client_unsafe}.
   * **Note:** It is recommended to specify the scheme part of the URL, i.e. the `url` should start with either `ws://` or `wss://`.
   */
  create_client(url: string | NodePath, tls_client_options?: TLSOptions): int;
  /**
   * Starts a new multiplayer server listening on the given `port`. You can optionally specify a `bind_address`, and provide valid `tls_server_options` to use TLS. See {@link TLSOptions.server}.
   */
  create_server(port: int, bind_address?: string | NodePath, tls_server_options?: TLSOptions): int;
  /** Returns the {@link WebSocketPeer} associated to the given `peer_id`. */
  get_peer(peer_id: int): WebSocketPeer | null;
  /** Returns the IP address of the given peer. */
  get_peer_address(id: int): string;
  /** Returns the remote port of the given peer. */
  get_peer_port(id: int): int;
}
