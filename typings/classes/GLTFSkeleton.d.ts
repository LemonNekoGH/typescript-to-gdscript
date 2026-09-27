// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

declare class GLTFSkeleton extends Resource {
  joints: PackedInt32Array;
  roots: PackedInt32Array;
  set_joints(value: PackedInt32Array | Array<unknown>): void;
  get_joints(): PackedInt32Array;
  set_roots(value: PackedInt32Array | Array<unknown>): void;
  get_roots(): PackedInt32Array;

  get_bone_attachment(idx: int): BoneAttachment3D | null;
  get_bone_attachment_count(): int;
  /**
   * Returns a {@link Dictionary} that maps skeleton bone indices to the indices of glTF nodes. This property is unused during import, and only set during export. In a glTF file, a bone is a node, so Godot converts skeleton bones to glTF nodes.
   */
  get_godot_bone_node(): Dictionary;
  get_godot_skeleton(): Skeleton3D | null;
  get_unique_names(): Array<string>;
  /**
   * Sets a {@link Dictionary} that maps skeleton bone indices to the indices of glTF nodes. This property is unused during import, and only set during export. In a glTF file, a bone is a node, so Godot converts skeleton bones to glTF nodes.
   */
  set_godot_bone_node(godot_bone_node: Dictionary): void;
  set_unique_names(unique_names: Array<string>): void;
}
