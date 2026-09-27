// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

declare class WebRTCPeerConnectionExtension extends WebRTCPeerConnection {
  _add_ice_candidate(sdp_mid_name: string | NodePath, sdp_mline_index: int, sdp_name: string | NodePath): int;
  _close(): void;
  _create_data_channel(label: string | NodePath, config: Dictionary): WebRTCDataChannel | null;
  _create_offer(): int;
  _get_connection_state(): int;
  _get_gathering_state(): int;
  _get_signaling_state(): int;
  _initialize(config: Dictionary): int;
  _poll(): int;
  _set_local_description(type_: string | NodePath, sdp: string | NodePath): int;
  _set_remote_description(type_: string | NodePath, sdp: string | NodePath): int;
}
