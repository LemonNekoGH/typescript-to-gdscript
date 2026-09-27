// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A wrapper class for an ENetHost (http://enet.bespin.org/group__host.html). */
declare class ENetConnection extends RefCounted {
  /** Adjusts the bandwidth limits of a host. */
  bandwidth_limit(in_bandwidth?: int, out_bandwidth?: int): void;
  /**
   * Queues a `packet` to be sent to all peers associated with the host over the specified `channel`. See {@link ENetPacketPeer} `FLAG_*` constants for available packet flags.
   */
  broadcast(channel: int, packet: PackedByteArray | Array<unknown>, flags: int): void;
  /** Limits the maximum allowed channels of future incoming connections. */
  channel_limit(limit: int): void;
  /**
   * Sets the compression method used for network packets. These have different tradeoffs of compression speed versus bandwidth, you may need to test which one works best for your use case if you use compression at all.
   * **Note:** Most games' network design involve sending many small packets frequently (smaller than 4 KB each). If in doubt, it is recommended to keep the default compression algorithm as it works best on these small packets.
   * **Note:** The compression mode must be set to the same value on both the server and all its clients. Clients will fail to connect if the compression mode set on the client differs from the one set on the server.
   */
  compress(mode: int): void;
  /**
   * Initiates a connection to a foreign `address` using the specified `port` and allocating the requested `channels`. Optional `data` can be passed during connection in the form of a 32 bit integer.
   * **Note:** You must call either {@link create_host} or {@link create_host_bound} on both ends before calling this method.
   */
  connect_to_host(address: string | NodePath, port: int, channels?: int, data?: int): ENetPacketPeer | null;
  /**
   * Creates an ENetHost that allows up to `max_peers` connected peers, each allocating up to `max_channels` channels, optionally limiting bandwidth to `in_bandwidth` and `out_bandwidth` (if greater than zero).
   * This method binds a random available dynamic UDP port on the host machine at the *unspecified* address. Use {@link create_host_bound} to specify the address and port.
   * **Note:** It is necessary to create a host in both client and server in order to establish a connection.
   */
  create_host(max_peers?: int, max_channels?: int, in_bandwidth?: int, out_bandwidth?: int): int;
  /**
   * Creates an ENetHost bound to the given `bind_address` and `bind_port` that allows up to `max_peers` connected peers, each allocating up to `max_channels` channels, optionally limiting bandwidth to `in_bandwidth` and `out_bandwidth` (if greater than zero).
   * **Note:** It is necessary to create a host in both client and server in order to establish a connection.
   */
  create_host_bound(bind_address: string | NodePath, bind_port: int, max_peers?: int, max_channels?: int, in_bandwidth?: int, out_bandwidth?: int): int;
  /** Destroys the host and all resources associated with it. */
  destroy(): void;
  /**
   * Configure this ENetHost to use the custom Godot extension allowing DTLS encryption for ENet clients. Call this before {@link connect_to_host} to have ENet connect using DTLS validating the server certificate against `hostname`. You can pass the optional `client_options` parameter to customize the trusted certification authorities, or disable the common name verification. See {@link TLSOptions.client} and {@link TLSOptions.client_unsafe}.
   */
  dtls_client_setup(hostname: string | NodePath, client_options?: TLSOptions): int;
  /**
   * Configure this ENetHost to use the custom Godot extension allowing DTLS encryption for ENet servers. Call this right after {@link create_host_bound} to have ENet expect peers to connect using DTLS. See {@link TLSOptions.server}.
   */
  dtls_server_setup(server_options: TLSOptions): int;
  /** Sends any queued packets on the host specified to its designated peers. */
  flush(): void;
  /** Returns the local port to which this peer is bound. */
  get_local_port(): int;
  /** Returns the maximum number of channels allowed for connected peers. */
  get_max_channels(): int;
  /**
   * Returns the list of peers associated with this host.
   * **Note:** This list might include some peers that are not fully connected or are still being disconnected.
   */
  get_peers(): Array<ENetPacketPeer>;
  /** Returns and resets host statistics. */
  pop_statistic(statistic: int): float;
  /**
   * Configures the DTLS server to automatically drop new connections.
   * **Note:** This method is only relevant after calling {@link dtls_server_setup}.
   */
  refuse_new_connections(refuse: boolean): void;
  /**
   * Waits for events on this connection and shuttles packets between the host and its peers, with the given `timeout` (in milliseconds). The returned {@link Array} will have 4 elements. An {@link EventType}, the {@link ENetPacketPeer} which generated the event, the event associated data (if any), the event associated channel (if any). If the generated event is {@link EVENT_RECEIVE}, the received packet will be queued to the associated {@link ENetPacketPeer}.
   * Call this function regularly to handle connections, disconnections, and to receive new packets.
   * **Note:** This method must be called on both ends involved in the event (sending and receiving hosts).
   */
  service(timeout?: int): Array<unknown>;
  /**
   * Sends a `packet` toward a destination from the address and port currently bound by this ENetConnection instance.
   * This is useful as it serves to establish entries in NAT routing tables on all devices between this bound instance and the public facing internet, allowing a prospective client's connection packets to be routed backward through the NAT device(s) between the public internet and this host.
   * This requires forward knowledge of a prospective client's address and communication port as seen by the public internet - after any NAT devices have handled their connection request. This information can be obtained by a STUN (https://en.wikipedia.org/wiki/STUN) service, and must be handed off to your host by an entity that is not the prospective client. This will never work for a client behind a Symmetric NAT due to the nature of the Symmetric NAT routing algorithm, as their IP and Port cannot be known beforehand.
   */
  socket_send(destination_address: string | NodePath, destination_port: int, packet: PackedByteArray | Array<unknown>): void;

  // enum CompressionMode
  /**
   * No compression. This uses the most bandwidth, but has the upside of requiring the fewest CPU resources. This option may also be used to make network debugging using tools like Wireshark easier.
   */
  static readonly COMPRESS_NONE: int;
  /**
   * ENet's built-in range encoding. Works well on small packets, but is not the most efficient algorithm on packets larger than 4 KB.
   */
  static readonly COMPRESS_RANGE_CODER: int;
  /**
   * FastLZ (https://fastlz.org/) compression. This option uses less CPU resources compared to {@link COMPRESS_ZLIB}, at the expense of using more bandwidth.
   */
  static readonly COMPRESS_FASTLZ: int;
  /**
   * Zlib (https://www.zlib.net/) compression. This option uses less bandwidth compared to {@link COMPRESS_FASTLZ}, at the expense of using more CPU resources.
   */
  static readonly COMPRESS_ZLIB: int;
  /**
   * Zstandard (https://facebook.github.io/zstd/) compression. Note that this algorithm is not very efficient on packets smaller than 4 KB. Therefore, it's recommended to use other compression algorithms in most cases.
   */
  static readonly COMPRESS_ZSTD: int;
  // enum EventType
  /**
   * An error occurred during {@link service}. You will likely need to {@link destroy} the host and recreate it.
   */
  static readonly EVENT_ERROR: int;
  /** No event occurred within the specified time limit. */
  static readonly EVENT_NONE: int;
  /**
   * A connection request initiated by enet_host_connect has completed. The array will contain the peer which successfully connected.
   */
  static readonly EVENT_CONNECT: int;
  /**
   * A peer has disconnected. This event is generated on a successful completion of a disconnect initiated by {@link ENetPacketPeer.peer_disconnect}, if a peer has timed out, or if a connection request initialized by {@link connect_to_host} has timed out. The array will contain the peer which disconnected. The data field contains user supplied data describing the disconnection, or 0, if none is available.
   */
  static readonly EVENT_DISCONNECT: int;
  /**
   * A packet has been received from a peer. The array will contain the peer which sent the packet and the channel number upon which the packet was received. The received packet will be queued to the associated {@link ENetPacketPeer}.
   */
  static readonly EVENT_RECEIVE: int;
  // enum HostStatistic
  /** Total data sent. */
  static readonly HOST_TOTAL_SENT_DATA: int;
  /** Total UDP packets sent. */
  static readonly HOST_TOTAL_SENT_PACKETS: int;
  /** Total data received. */
  static readonly HOST_TOTAL_RECEIVED_DATA: int;
  /** Total UDP packets received. */
  static readonly HOST_TOTAL_RECEIVED_PACKETS: int;
}
