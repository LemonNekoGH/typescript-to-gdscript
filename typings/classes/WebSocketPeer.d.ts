// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A WebSocket connection. */
declare class WebSocketPeer extends PacketPeer {
  /**
   * The extra HTTP headers to be sent during the WebSocket handshake.
   * **Note:** Not supported in Web exports due to browsers' restrictions.
   */
  handshake_headers: PackedStringArray;
  /**
   * The interval (in seconds) at which the peer will automatically send WebSocket "ping" control frames. When set to `0`, no "ping" control frames will be sent.
   * **Note:** Has no effect in Web exports due to browser restrictions.
   */
  heartbeat_interval: float;
  /**
   * The size of the input buffer in bytes (roughly the maximum amount of memory that will be allocated for the inbound packets).
   */
  inbound_buffer_size: int;
  /** The maximum amount of packets that will be allowed in the queues (both inbound and outbound). */
  max_queued_packets: int;
  /**
   * The size of the input buffer in bytes (roughly the maximum amount of memory that will be allocated for the outbound packets).
   */
  outbound_buffer_size: int;
  /** The WebSocket sub-protocols allowed during the WebSocket handshake. */
  supported_protocols: PackedStringArray;
  set_handshake_headers(value: PackedStringArray | Array<unknown>): void;
  get_handshake_headers(): PackedStringArray;
  set_heartbeat_interval(value: float): void;
  get_heartbeat_interval(): float;
  set_inbound_buffer_size(value: int): void;
  get_inbound_buffer_size(): int;
  set_max_queued_packets(value: int): void;
  get_max_queued_packets(): int;
  set_outbound_buffer_size(value: int): void;
  get_outbound_buffer_size(): int;
  set_supported_protocols(value: PackedStringArray | Array<unknown>): void;
  get_supported_protocols(): PackedStringArray;

  /**
   * Accepts a peer connection performing the HTTP handshake as a WebSocket server. The `stream` must be a valid TCP stream retrieved via {@link TCPServer.take_connection}, or a TLS stream accepted via {@link StreamPeerTLS.accept_stream}.
   * **Note:** Not supported in Web exports due to browsers' restrictions.
   */
  accept_stream(stream: StreamPeer): int;
  /**
   * Closes this WebSocket connection.
   * `code` is the status code for the closure (see RFC 6455 section 7.4 (https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.1) for a list of valid status codes). If `code` is negative, the connection will be closed immediately without notifying the remote peer.
   * `reason` is the human-readable reason for closing the connection. It can be any UTF-8 string that's smaller than 123 bytes.
   * **Note:** To achieve a clean closure, you will need to keep polling until {@link STATE_CLOSED} is reached.
   * **Note:** The Web export might not support all status codes. Please refer to browser-specific documentation for more details.
   */
  close(code?: int, reason?: string | NodePath): void;
  /**
   * Connects to the given URL. TLS certificates will be verified against the hostname when connecting using the `wss://` protocol. You can pass the optional `tls_client_options` parameter to customize the trusted certification authorities, or disable the common name verification. See {@link TLSOptions.client} and {@link TLSOptions.client_unsafe}.
   * **Note:** This method is non-blocking, and will return {@link OK} before the connection is established as long as the provided parameters are valid and the peer is not in an invalid state (e.g. already connected). Regularly call {@link poll} (e.g. during {@link Node} process) and check the result of {@link get_ready_state} to know whether the connection succeeds or fails.
   * **Note:** To avoid mixed content warnings or errors in Web, you may have to use a `url` that starts with `wss://` (secure) instead of `ws://`. When doing so, make sure to use the fully qualified domain name that matches the one defined in the server's TLS certificate. Do not connect directly via the IP address for `wss://` connections, as it won't match with the TLS certificate.
   */
  connect_to_url(url: string | NodePath, tls_client_options?: TLSOptions): int;
  /**
   * Returns the received WebSocket close frame status code, or `-1` when the connection was not cleanly closed. Only call this method when {@link get_ready_state} returns {@link STATE_CLOSED}.
   */
  get_close_code(): int;
  /**
   * Returns the received WebSocket close frame status reason string. Only call this method when {@link get_ready_state} returns {@link STATE_CLOSED}.
   */
  get_close_reason(): string;
  /**
   * Returns the IP address of the connected peer.
   * **Note:** Not available in the Web export.
   */
  get_connected_host(): string;
  /**
   * Returns the remote port of the connected peer.
   * **Note:** Not available in the Web export.
   */
  get_connected_port(): int;
  /**
   * Returns the current amount of data in the outbound websocket buffer. **Note:** Web exports use WebSocket.bufferedAmount, while other platforms use an internal buffer.
   */
  get_current_outbound_buffered_amount(): int;
  /** Returns the ready state of the connection. */
  get_ready_state(): int;
  /**
   * Returns the URL requested by this peer. The URL is derived from the `url` passed to {@link connect_to_url} or from the HTTP headers when acting as server (i.e. when using {@link accept_stream}).
   */
  get_requested_url(): string;
  /**
   * Returns the selected WebSocket sub-protocol for this connection or an empty string if the sub-protocol has not been selected yet.
   */
  get_selected_protocol(): string;
  /**
   * Updates the connection state and receive incoming packets. Call this function regularly to keep it in a clean state.
   */
  poll(): void;
  /**
   * Sends the given `message` using the desired `write_mode`. When sending a {@link String}, prefer using {@link send_text}.
   */
  send(message: PackedByteArray | Array<unknown>, write_mode: int): int;
  /**
   * Sends the given `message` using WebSocket text mode. Prefer this method over {@link PacketPeer.put_packet} when interacting with third-party text-based API (e.g. when using {@link JSON} formatted messages).
   */
  send_text(message: string | NodePath): int;
  /**
   * Disable Nagle's algorithm on the underlying TCP socket (default). See {@link StreamPeerTCP.set_no_delay} for more information.
   * **Note:** Not available in the Web export.
   */
  set_no_delay(enabled: boolean): void;
  /** Returns `true` if the last received packet was sent as a text payload. See {@link WriteMode}. */
  was_string_packet(): boolean;

  // enum WriteMode
  /**
   * Specifies that WebSockets messages should be transferred as text payload (only valid UTF-8 is allowed).
   */
  static readonly WRITE_MODE_TEXT: int;
  /**
   * Specifies that WebSockets messages should be transferred as binary payload (any byte combination is allowed).
   */
  static readonly WRITE_MODE_BINARY: int;
  // enum State
  /** Socket has been created. The connection is not yet open. */
  static readonly STATE_CONNECTING: int;
  /** The connection is open and ready to communicate. */
  static readonly STATE_OPEN: int;
  /**
   * The connection is in the process of closing. This means a close request has been sent to the remote peer but confirmation has not been received.
   */
  static readonly STATE_CLOSING: int;
  /** The connection is closed or couldn't be opened. */
  static readonly STATE_CLOSED: int;
}
