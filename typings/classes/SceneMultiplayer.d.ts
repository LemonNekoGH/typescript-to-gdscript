// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** High-level multiplayer API implementation. */
declare class SceneMultiplayer extends MultiplayerAPI {
  /**
   * If `true`, the MultiplayerAPI will allow encoding and decoding of object during RPCs.
   * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threat such as remote code execution.
   */
  allow_object_decoding: boolean;
  /**
   * The callback to execute when receiving authentication data sent via {@link send_auth}. If the {@link Callable} is empty (default), peers will be automatically accepted as soon as they connect.
   */
  auth_callback: Callable;
  /**
   * If set to a value greater than `0.0`, the maximum duration in seconds peers can stay in the authenticating state, after which the authentication will automatically fail. See the {@link peer_authenticating} and {@link peer_authentication_failed} signals.
   */
  auth_timeout: float;
  /**
   * Maximum size of each delta packet. Higher values increase the chance of receiving full updates in a single frame, but also the chance of causing networking congestion (higher latency, disconnections). See {@link MultiplayerSynchronizer}.
   */
  max_delta_packet_size: int;
  /**
   * Maximum size of each synchronization packet. Higher values increase the chance of receiving full updates in a single frame, but also the chance of packet loss. See {@link MultiplayerSynchronizer}.
   */
  max_sync_packet_size: int;
  /**
   * If `true`, the MultiplayerAPI's {@link MultiplayerAPI.multiplayer_peer} refuses new incoming connections.
   */
  refuse_new_connections: boolean;
  /**
   * The root path to use for RPCs and replication. Instead of an absolute path, a relative path will be used to find the node upon which the RPC should be executed.
   * This effectively allows to have different branches of the scene tree to be managed by different MultiplayerAPI, allowing for example to run both client and server in the same scene.
   */
  root_path: NodePath;
  /**
   * Enable or disable the server feature that notifies clients of other peers' connection/disconnection, and relays messages between them. When this option is `false`, clients won't be automatically notified of other peers and won't be able to send them packets through the server.
   * **Note:** Changing this option while other peers are connected may lead to unexpected behaviors.
   * **Note:** Support for this feature may depend on the current {@link MultiplayerPeer} configuration. See {@link MultiplayerPeer.is_server_relay_supported}.
   */
  server_relay: boolean;
  set_allow_object_decoding(value: boolean): void;
  is_object_decoding_allowed(): boolean;
  set_auth_callback(value: Callable): void;
  get_auth_callback(): Callable;
  set_auth_timeout(value: float): void;
  get_auth_timeout(): float;
  set_max_delta_packet_size(value: int): void;
  get_max_delta_packet_size(): int;
  set_max_sync_packet_size(value: int): void;
  get_max_sync_packet_size(): int;
  set_refuse_new_connections(value: boolean): void;
  is_refusing_new_connections(): boolean;
  set_root_path(value: NodePath | string): void;
  get_root_path(): NodePath;
  set_server_relay_enabled(value: boolean): void;
  is_server_relay_enabled(): boolean;

  /**
   * Clears the current SceneMultiplayer network state (you shouldn't call this unless you know what you are doing).
   */
  clear(): void;
  /**
   * Mark the authentication step as completed for the remote peer identified by `id`. The {@link MultiplayerAPI.peer_connected} signal will be emitted for this peer once the remote side also completes the authentication. No further authentication messages are expected to be received from this peer.
   * If a peer disconnects before completing authentication, either due to a network issue, the {@link auth_timeout} expiring, or manually calling {@link disconnect_peer}, the {@link peer_authentication_failed} signal will be emitted instead of {@link MultiplayerAPI.peer_disconnected}.
   */
  complete_auth(id: int): int;
  /**
   * Disconnects the peer identified by `id`, removing it from the list of connected peers, and closing the underlying connection with it.
   */
  disconnect_peer(id: int): void;
  /** Returns the IDs of the peers currently trying to authenticate with this {@link MultiplayerAPI}. */
  get_authenticating_peers(): PackedInt32Array;
  /**
   * Sends the specified `data` to the remote peer identified by `id` as part of an authentication message. This can be used to authenticate peers, and control when {@link MultiplayerAPI.peer_connected} is emitted (and the remote peer accepted as one of the connected peers).
   */
  send_auth(id: int, data: PackedByteArray | Array<unknown>): int;
  /**
   * Sends the given raw `bytes` to a specific peer identified by `id` (see {@link MultiplayerPeer.set_target_peer}). Default ID is `0`, i.e. broadcast to all peers.
   */
  send_bytes(bytes: PackedByteArray | Array<unknown>, id?: int, mode?: int, channel?: int): int;

  /**
   * Emitted when this MultiplayerAPI's {@link MultiplayerAPI.multiplayer_peer} connects to a new peer and a valid {@link auth_callback} is set. In this case, the {@link MultiplayerAPI.peer_connected} will not be emitted until {@link complete_auth} is called with given peer `id`. While in this state, the peer will not be included in the list returned by {@link MultiplayerAPI.get_peers} (but in the one returned by {@link get_authenticating_peers}), and only authentication data will be sent or received. See {@link send_auth} for sending authentication data.
   */
  peer_authenticating: Signal<[int]>;
  /**
   * Emitted when this MultiplayerAPI's {@link MultiplayerAPI.multiplayer_peer} disconnects from a peer for which authentication had not yet completed. See {@link peer_authenticating}.
   */
  peer_authentication_failed: Signal<[int]>;
  /**
   * Emitted when this MultiplayerAPI's {@link MultiplayerAPI.multiplayer_peer} receives a `packet` with custom data (see {@link send_bytes}). ID is the peer ID of the peer that sent the packet.
   */
  peer_packet: Signal<[int, PackedByteArray]>;
}
