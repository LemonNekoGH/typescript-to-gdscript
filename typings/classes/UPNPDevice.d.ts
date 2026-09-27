// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Universal Plug and Play (UPnP) device. */
declare class UPNPDevice extends RefCounted {
  /** URL to the device description. */
  description_url: string;
  /** IDG control URL. */
  igd_control_url: string;
  /** Address of the local machine in the network connecting it to this {@link UPNPDevice}. */
  igd_our_addr: string;
  /** IGD service type. */
  igd_service_type: string;
  /** IGD status. */
  igd_status: int;
  /** Service type. */
  service_type: string;
  set_description_url(value: string | NodePath): void;
  get_description_url(): string;
  set_igd_control_url(value: string | NodePath): void;
  get_igd_control_url(): string;
  set_igd_our_addr(value: string | NodePath): void;
  get_igd_our_addr(): string;
  set_igd_service_type(value: string | NodePath): void;
  get_igd_service_type(): string;
  set_igd_status(value: int): void;
  get_igd_status(): int;
  set_service_type(value: string | NodePath): void;
  get_service_type(): string;

  /**
   * Adds a port mapping to forward the given external port on this {@link UPNPDevice} for the given protocol to the local machine. See {@link UPNP.add_port_mapping}.
   */
  add_port_mapping(port: int, port_internal?: int, desc?: string | NodePath, proto?: string | NodePath, duration?: int): int;
  /**
   * Deletes the port mapping identified by the given port and protocol combination on this device. See {@link UPNP.delete_port_mapping}.
   */
  delete_port_mapping(port: int, proto?: string | NodePath): int;
  /**
   * Returns `true` if this is a valid IGD (InternetGatewayDevice) which potentially supports port forwarding.
   */
  is_valid_gateway(): boolean;
  /** Returns the external IP address of this {@link UPNPDevice} or an empty string. */
  query_external_address(): string;

  // enum IGDStatus
  /** OK. */
  static readonly IGD_STATUS_OK: int;
  /** HTTP error. */
  static readonly IGD_STATUS_HTTP_ERROR: int;
  /** Empty HTTP response. */
  static readonly IGD_STATUS_HTTP_EMPTY: int;
  /** Returned response contained no URLs. */
  static readonly IGD_STATUS_NO_URLS: int;
  /** Not a valid IGD. */
  static readonly IGD_STATUS_NO_IGD: int;
  /** Disconnected. */
  static readonly IGD_STATUS_DISCONNECTED: int;
  /** Unknown device. */
  static readonly IGD_STATUS_UNKNOWN_DEVICE: int;
  /** Invalid control. */
  static readonly IGD_STATUS_INVALID_CONTROL: int;
  /** Memory allocation error. */
  static readonly IGD_STATUS_MALLOC_ERROR: int;
  /** Unknown error. */
  static readonly IGD_STATUS_UNKNOWN_ERROR: int;
}
