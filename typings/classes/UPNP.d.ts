// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Universal Plug and Play (UPnP) functions for network device discovery, querying and port forwarding.
 */
declare class UPNP extends RefCounted {
  /** If `true`, IPv6 is used for {@link UPNPDevice} discovery. */
  discover_ipv6: boolean;
  /**
   * If `0`, the local port to use for discovery is chosen automatically by the system. If `1`, discovery will be done from the source port 1900 (same as destination port). Otherwise, the value will be used as the port.
   */
  discover_local_port: int;
  /** Multicast interface to use for discovery. Uses the default multicast interface if empty. */
  discover_multicast_if: string;
  set_discover_ipv6(value: boolean): void;
  is_discover_ipv6(): boolean;
  set_discover_local_port(value: int): void;
  get_discover_local_port(): int;
  set_discover_multicast_if(value: string | NodePath): void;
  get_discover_multicast_if(): string;

  /** Adds the given {@link UPNPDevice} to the list of discovered devices. */
  add_device(device: UPNPDevice): void;
  /**
   * Adds a mapping to forward the external `port` (between 1 and 65535, although recommended to use port 1024 or above) on the default gateway (see {@link get_gateway}) to the `port_internal` on the local machine for the given protocol `proto` (either `"TCP"` or `"UDP"`, with UDP being the default). If a port mapping for the given port and protocol combination already exists on that gateway device, this method tries to overwrite it. If that is not desired, you can retrieve the gateway manually with {@link get_gateway} and call {@link add_port_mapping} on it, if any. Note that forwarding a well-known port (below 1024) with UPnP may fail depending on the device.
   * Depending on the gateway device, if a mapping for that port already exists, it will either be updated or it will refuse this command due to that conflict, especially if the existing mapping for that port wasn't created via UPnP or points to a different network address (or device) than this one.
   * If `port_internal` is `0` (the default), the same port number is used for both the external and the internal port (the `port` value).
   * The description (`desc`) is shown in some routers management UIs and can be used to point out which application added the mapping.
   * The mapping's lease `duration` can be limited by specifying a duration in seconds. The default of `0` means no duration, i.e. a permanent lease and notably some devices only support these permanent leases. Note that whether permanent or not, this is only a request and the gateway may still decide at any point to remove the mapping (which usually happens on a reboot of the gateway, when its external IP address changes, or on some models when it detects a port mapping has become inactive, i.e. had no traffic for multiple minutes). If not `0` (permanent), the allowed range according to spec is between `120` (2 minutes) and `86400` seconds (24 hours).
   * See {@link UPNPResult} for possible return values.
   */
  add_port_mapping(port: int, port_internal?: int, desc?: string | NodePath, proto?: string | NodePath, duration?: int): int;
  /** Clears the list of discovered devices. */
  clear_devices(): void;
  /**
   * Deletes the port mapping for the given port and protocol combination on the default gateway (see {@link get_gateway}) if one exists. `port` must be a valid port between 1 and 65535, `proto` can be either `"TCP"` or `"UDP"`. May be refused for mappings pointing to addresses other than this one, for well-known ports (below 1024), or for mappings not added via UPnP. See {@link UPNPResult} for possible return values.
   */
  delete_port_mapping(port: int, proto?: string | NodePath): int;
  /**
   * Discovers local {@link UPNPDevice}s. Clears the list of previously discovered devices.
   * Filters for IGD (InternetGatewayDevice) type devices by default, as those manage port forwarding. `timeout` is the time to wait for responses in milliseconds. `ttl` is the time-to-live; only touch this if you know what you're doing.
   * See {@link UPNPResult} for possible return values.
   */
  discover(timeout?: int, ttl?: int, device_filter?: string | NodePath): int;
  /** Returns the {@link UPNPDevice} at the given `index`. */
  get_device(index: int): UPNPDevice | null;
  /** Returns the number of discovered {@link UPNPDevice}s. */
  get_device_count(): int;
  /**
   * Returns the default gateway. That is the first discovered {@link UPNPDevice} that is also a valid IGD (InternetGatewayDevice).
   */
  get_gateway(): UPNPDevice | null;
  /**
   * Returns the external {@link IP} address of the default gateway (see {@link get_gateway}) as string. Returns an empty string on error.
   */
  query_external_address(): string;
  /** Removes the device at `index` from the list of discovered devices. */
  remove_device(index: int): void;
  /** Sets the device at `index` from the list of discovered devices to `device`. */
  set_device(index: int, device: UPNPDevice): void;

  // enum UPNPResult
  /** UPNP command or discovery was successful. */
  static readonly UPNP_RESULT_SUCCESS: int;
  /**
   * Not authorized to use the command on the {@link UPNPDevice}. May be returned when the user disabled UPNP on their router.
   */
  static readonly UPNP_RESULT_NOT_AUTHORIZED: int;
  /** No port mapping was found for the given port, protocol combination on the given {@link UPNPDevice}. */
  static readonly UPNP_RESULT_PORT_MAPPING_NOT_FOUND: int;
  /** Inconsistent parameters. */
  static readonly UPNP_RESULT_INCONSISTENT_PARAMETERS: int;
  /**
   * No such entry in array. May be returned if a given port, protocol combination is not found on a {@link UPNPDevice}.
   */
  static readonly UPNP_RESULT_NO_SUCH_ENTRY_IN_ARRAY: int;
  /** The action failed. */
  static readonly UPNP_RESULT_ACTION_FAILED: int;
  /** The {@link UPNPDevice} does not allow wildcard values for the source IP address. */
  static readonly UPNP_RESULT_SRC_IP_WILDCARD_NOT_PERMITTED: int;
  /** The {@link UPNPDevice} does not allow wildcard values for the external port. */
  static readonly UPNP_RESULT_EXT_PORT_WILDCARD_NOT_PERMITTED: int;
  /** The {@link UPNPDevice} does not allow wildcard values for the internal port. */
  static readonly UPNP_RESULT_INT_PORT_WILDCARD_NOT_PERMITTED: int;
  /** The remote host value must be a wildcard. */
  static readonly UPNP_RESULT_REMOTE_HOST_MUST_BE_WILDCARD: int;
  /** The external port value must be a wildcard. */
  static readonly UPNP_RESULT_EXT_PORT_MUST_BE_WILDCARD: int;
  /** No port maps are available. May also be returned if port mapping functionality is not available. */
  static readonly UPNP_RESULT_NO_PORT_MAPS_AVAILABLE: int;
  /**
   * Conflict with other mechanism. May be returned instead of {@link UPNP_RESULT_CONFLICT_WITH_OTHER_MAPPING} if a port mapping conflicts with an existing one.
   */
  static readonly UPNP_RESULT_CONFLICT_WITH_OTHER_MECHANISM: int;
  /** Conflict with an existing port mapping. */
  static readonly UPNP_RESULT_CONFLICT_WITH_OTHER_MAPPING: int;
  /** External and internal port values must be the same. */
  static readonly UPNP_RESULT_SAME_PORT_VALUES_REQUIRED: int;
  /** Only permanent leases are supported. Do not use the `duration` parameter when adding port mappings. */
  static readonly UPNP_RESULT_ONLY_PERMANENT_LEASE_SUPPORTED: int;
  /** Invalid gateway. */
  static readonly UPNP_RESULT_INVALID_GATEWAY: int;
  /** Invalid port. */
  static readonly UPNP_RESULT_INVALID_PORT: int;
  /** Invalid protocol. */
  static readonly UPNP_RESULT_INVALID_PROTOCOL: int;
  /** Invalid duration. */
  static readonly UPNP_RESULT_INVALID_DURATION: int;
  /** Invalid arguments. */
  static readonly UPNP_RESULT_INVALID_ARGS: int;
  /** Invalid response. */
  static readonly UPNP_RESULT_INVALID_RESPONSE: int;
  /** Invalid parameter. */
  static readonly UPNP_RESULT_INVALID_PARAM: int;
  /** HTTP error. */
  static readonly UPNP_RESULT_HTTP_ERROR: int;
  /** Socket error. */
  static readonly UPNP_RESULT_SOCKET_ERROR: int;
  /** Error allocating memory. */
  static readonly UPNP_RESULT_MEM_ALLOC_ERROR: int;
  /**
   * No gateway available. You may need to call {@link discover} first, or discovery didn't detect any valid IGDs (InternetGatewayDevices).
   */
  static readonly UPNP_RESULT_NO_GATEWAY: int;
  /**
   * No devices available. You may need to call {@link discover} first, or discovery didn't detect any valid {@link UPNPDevice}s.
   */
  static readonly UPNP_RESULT_NO_DEVICES: int;
  /** Unknown error. */
  static readonly UPNP_RESULT_UNKNOWN_ERROR: int;
}
