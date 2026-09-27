// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

declare class GLTFSkin extends Resource {
  godot_skin: Skin | null;
  joints: PackedInt32Array;
  joints_original: PackedInt32Array;
  non_joints: PackedInt32Array;
  roots: PackedInt32Array;
  skeleton: int;
  skin_root: int;
  set_godot_skin(value: Skin | null): void;
  get_godot_skin(): Skin | null;
  set_joints(value: PackedInt32Array | Array<unknown>): void;
  get_joints(): PackedInt32Array;
  set_joints_original(value: PackedInt32Array | Array<unknown>): void;
  get_joints_original(): PackedInt32Array;
  set_non_joints(value: PackedInt32Array | Array<unknown>): void;
  get_non_joints(): PackedInt32Array;
  set_roots(value: PackedInt32Array | Array<unknown>): void;
  get_roots(): PackedInt32Array;
  set_skeleton(value: int): void;
  get_skeleton(): int;
  set_skin_root(value: int): void;
  get_skin_root(): int;

  get_inverse_binds(): Array<Transform3D>;
  get_joint_i_to_bone_i(): Dictionary;
  get_joint_i_to_name(): Dictionary;
  set_inverse_binds(inverse_binds: Array<Transform3D>): void;
  set_joint_i_to_bone_i(joint_i_to_bone_i: Dictionary): void;
  set_joint_i_to_name(joint_i_to_name: Dictionary): void;
}
