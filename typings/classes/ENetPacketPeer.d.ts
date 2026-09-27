// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A wrapper class for an ENetPeer (http://enet.bespin.org/group__peer.html). */
declare class ENetPacketPeer extends PacketPeer {
  /** Returns the number of channels allocated for communication with peer. */
  get_channels(): int;
  /**
   * Returns the ENet flags of the next packet in the received queue. See `FLAG_*` constants for available packet flags. Note that not all flags are replicated from the sending peer to the receiving peer.
   */
  get_packet_flags(): int;
  /** Returns the IP address of this peer. */
  get_remote_address(): string;
  /** Returns the remote port of this peer. */
  get_remote_port(): int;
  /** Returns the current peer state. */
  get_state(): int;
  /** Returns the requested `statistic` for this peer. */
  get_statistic(statistic: int): float;
  /**
   * Returns `true` if the peer is currently active (i.e. the associated {@link ENetConnection} is still valid).
   */
  is_active(): boolean;
  /**
   * Request a disconnection from a peer. An {@link ENetConnection.EVENT_DISCONNECT} will be generated during {@link ENetConnection.service} once the disconnection is complete.
   */
  peer_disconnect(data?: int): void;
  /**
   * Request a disconnection from a peer, but only after all queued outgoing packets are sent. An {@link ENetConnection.EVENT_DISCONNECT} will be generated during {@link ENetConnection.service} once the disconnection is complete.
   */
  peer_disconnect_later(data?: int): void;
  /**
   * Force an immediate disconnection from a peer. No {@link ENetConnection.EVENT_DISCONNECT} will be generated. The foreign peer is not guaranteed to receive the disconnect notification, and is reset immediately upon return from this function.
   */
  peer_disconnect_now(data?: int): void;
  /**
   * Sends a ping request to a peer. ENet automatically pings all connected peers at regular intervals, however, this function may be called to ensure more frequent ping requests.
   */
  ping(): void;
  /**
   * Sets the `ping_interval` in milliseconds at which pings will be sent to a peer. Pings are used both to monitor the liveness of the connection and also to dynamically adjust the throttle during periods of low traffic so that the throttle has reasonable responsiveness during traffic spikes. The default ping interval is `500` milliseconds.
   */
  ping_interval(ping_interval: int): void;
  /**
   * Forcefully disconnects a peer. The foreign host represented by the peer is not notified of the disconnection and will timeout on its connection to the local host.
   */
  reset(): void;
  /**
   * Queues a `packet` to be sent over the specified `channel`. See `FLAG_*` constants for available packet flags.
   */
  send(channel: int, packet: PackedByteArray | Array<unknown>, flags: int): int;
  /**
   * Sets the timeout parameters for a peer. The timeout parameters control how and when a peer will timeout from a failure to acknowledge reliable traffic. Timeout values are expressed in milliseconds.
   * The `timeout` is a factor that, multiplied by a value based on the average round trip time, will determine the timeout limit for a reliable packet. When that limit is reached, the timeout will be doubled, and the peer will be disconnected if that limit has reached `timeout_min`. The `timeout_max` parameter, on the other hand, defines a fixed timeout for which any packet must be acknowledged or the peer will be dropped.
   */
  set_timeout(timeout: int, timeout_min: int, timeout_max: int): void;
  /**
   * Configures throttle parameter for a peer.
   * Unreliable packets are dropped by ENet in response to the varying conditions of the Internet connection to the peer. The throttle represents a probability that an unreliable packet should not be dropped and thus sent by ENet to the peer. By measuring fluctuations in round trip times of reliable packets over the specified `interval`, ENet will either increase the probability by the amount specified in the `acceleration` parameter, or decrease it by the amount specified in the `deceleration` parameter (both are ratios to {@link PACKET_THROTTLE_SCALE}).
   * When the throttle has a value of {@link PACKET_THROTTLE_SCALE}, no unreliable packets are dropped by ENet, and so 100% of all unreliable packets will be sent.
   * When the throttle has a value of `0`, all unreliable packets are dropped by ENet, and so 0% of all unreliable packets will be sent.
   * Intermediate values for the throttle represent intermediate probabilities between 0% and 100% of unreliable packets being sent. The bandwidth limits of the local and foreign hosts are taken into account to determine a sensible limit for the throttle probability above which it should not raise even in the best of conditions.
   */
  throttle_configure(interval: int, acceleration: int, deceleration: int): void;

  // enum PeerState
  /** The peer is disconnected. */
  static readonly STATE_DISCONNECTED: int;
  /** The peer is currently attempting to connect. */
  static readonly STATE_CONNECTING: int;
  /** The peer has acknowledged the connection request. */
  static readonly STATE_ACKNOWLEDGING_CONNECT: int;
  /** The peer is currently connecting. */
  static readonly STATE_CONNECTION_PENDING: int;
  /**
   * The peer has successfully connected, but is not ready to communicate with yet ({@link STATE_CONNECTED}).
   */
  static readonly STATE_CONNECTION_SUCCEEDED: int;
  /** The peer is currently connected and ready to communicate with. */
  static readonly STATE_CONNECTED: int;
  /** The peer is expected to disconnect after it has no more outgoing packets to send. */
  static readonly STATE_DISCONNECT_LATER: int;
  /** The peer is currently disconnecting. */
  static readonly STATE_DISCONNECTING: int;
  /** The peer has acknowledged the disconnection request. */
  static readonly STATE_ACKNOWLEDGING_DISCONNECT: int;
  /**
   * The peer has lost connection, but is not considered truly disconnected (as the peer didn't acknowledge the disconnection request).
   */
  static readonly STATE_ZOMBIE: int;
  // enum PeerStatistic
  /** Mean packet loss of reliable packets as a ratio with respect to the {@link PACKET_LOSS_SCALE}. */
  static readonly PEER_PACKET_LOSS: int;
  /** Packet loss variance. */
  static readonly PEER_PACKET_LOSS_VARIANCE: int;
  /**
   * The time at which packet loss statistics were last updated (in milliseconds since the connection started). The interval for packet loss statistics updates is 10 seconds, and at least one packet must have been sent since the last statistics update.
   */
  static readonly PEER_PACKET_LOSS_EPOCH: int;
  /** Mean packet round trip time for reliable packets. */
  static readonly PEER_ROUND_TRIP_TIME: int;
  /** Variance of the mean round trip time. */
  static readonly PEER_ROUND_TRIP_TIME_VARIANCE: int;
  /** Last recorded round trip time for a reliable packet. */
  static readonly PEER_LAST_ROUND_TRIP_TIME: int;
  /** Variance of the last trip time recorded. */
  static readonly PEER_LAST_ROUND_TRIP_TIME_VARIANCE: int;
  /** The peer's current throttle status. */
  static readonly PEER_PACKET_THROTTLE: int;
  /**
   * The maximum number of unreliable packets that should not be dropped. This value is always greater than or equal to `1`. The initial value is equal to {@link PACKET_THROTTLE_SCALE}.
   */
  static readonly PEER_PACKET_THROTTLE_LIMIT: int;
  /**
   * Internal value used to increment the packet throttle counter. The value is hardcoded to `7` and cannot be changed. You probably want to look at {@link PEER_PACKET_THROTTLE_ACCELERATION} instead.
   */
  static readonly PEER_PACKET_THROTTLE_COUNTER: int;
  /**
   * The time at which throttle statistics were last updated (in milliseconds since the connection started). The interval for throttle statistics updates is {@link PEER_PACKET_THROTTLE_INTERVAL}.
   */
  static readonly PEER_PACKET_THROTTLE_EPOCH: int;
  /**
   * The throttle's acceleration factor. Higher values will make ENet adapt to fluctuating network conditions faster, causing unrelaible packets to be sent *more* often. The default value is `2`.
   */
  static readonly PEER_PACKET_THROTTLE_ACCELERATION: int;
  /**
   * The throttle's deceleration factor. Higher values will make ENet adapt to fluctuating network conditions faster, causing unrelaible packets to be sent *less* often. The default value is `2`.
   */
  static readonly PEER_PACKET_THROTTLE_DECELERATION: int;
  /**
   * The interval over which the lowest mean round trip time should be measured for use by the throttle mechanism (in milliseconds). The default value is `5000`.
   */
  static readonly PEER_PACKET_THROTTLE_INTERVAL: int;

  /** The reference scale for packet loss. See {@link get_statistic} and {@link PEER_PACKET_LOSS}. */
  static readonly PACKET_LOSS_SCALE: int;
  /**
   * The reference value for throttle configuration. The default value is `32`. See {@link throttle_configure}.
   */
  static readonly PACKET_THROTTLE_SCALE: int;
  /** Mark the packet to be sent as reliable. */
  static readonly FLAG_RELIABLE: int;
  /** Mark the packet to be sent unsequenced (unreliable). */
  static readonly FLAG_UNSEQUENCED: int;
  /**
   * Mark the packet to be sent unreliable even if the packet is too big and needs fragmentation (increasing the chance of it being dropped).
   */
  static readonly FLAG_UNRELIABLE_FRAGMENT: int;
}
