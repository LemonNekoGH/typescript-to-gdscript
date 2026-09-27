// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * A simple interface to create a peer-to-peer mesh network composed of {@link WebRTCPeerConnection} that is compatible with the {@link MultiplayerAPI}.
 */
declare class WebRTCMultiplayerPeer extends MultiplayerPeer {
  /**
   * Add a new peer to the mesh with the given `peer_id`. The {@link WebRTCPeerConnection} must be in state {@link WebRTCPeerConnection.STATE_NEW}.
   * Three channels will be created for reliable, unreliable, and ordered transport. The value of `unreliable_lifetime` will be passed to the `"maxPacketLifetime"` option when creating unreliable and ordered channels (see {@link WebRTCPeerConnection.create_data_channel}).
   */
  add_peer(peer: WebRTCPeerConnection, peer_id: int, unreliable_lifetime?: int): int;
  /**
   * Initialize the multiplayer peer as a client with the given `peer_id` (must be between 2 and 2147483647). In this mode, you should only call {@link add_peer} once and with `peer_id` of `1`. This mode enables {@link MultiplayerPeer.is_server_relay_supported}, allowing the upper {@link MultiplayerAPI} layer to perform peer exchange and packet relaying.
   * You can optionally specify a `channels_config` array of {@link MultiplayerPeer.TransferMode} which will be used to create extra channels (WebRTC only supports one transfer mode per channel).
   */
  create_client(peer_id: int, channels_config?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): int;
  /**
   * Initialize the multiplayer peer as a mesh (i.e. all peers connect to each other) with the given `peer_id` (must be between 1 and 2147483647).
   */
  create_mesh(peer_id: int, channels_config?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): int;
  /**
   * Initialize the multiplayer peer as a server (with unique ID of `1`). This mode enables {@link MultiplayerPeer.is_server_relay_supported}, allowing the upper {@link MultiplayerAPI} layer to perform peer exchange and packet relaying.
   * You can optionally specify a `channels_config` array of {@link MultiplayerPeer.TransferMode} which will be used to create extra channels (WebRTC only supports one transfer mode per channel).
   */
  create_server(channels_config?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): int;
  /**
   * Returns a dictionary representation of the peer with given `peer_id` with three keys. `"connection"` containing the {@link WebRTCPeerConnection} to this peer, `"channels"` an array of three {@link WebRTCDataChannel}, and `"connected"` a boolean representing if the peer connection is currently connected (all three channels are open).
   */
  get_peer(peer_id: int): Dictionary;
  /**
   * Returns a dictionary which keys are the peer ids and values the peer representation as in {@link get_peer}.
   */
  get_peers(): Dictionary;
  /** Returns `true` if the given `peer_id` is in the peers map (it might not be connected though). */
  has_peer(peer_id: int): boolean;
  /**
   * Remove the peer with given `peer_id` from the mesh. If the peer was connected, and {@link MultiplayerPeer.peer_connected} was emitted for it, then {@link MultiplayerPeer.peer_disconnected} will be emitted.
   */
  remove_peer(peer_id: int): void;
}
