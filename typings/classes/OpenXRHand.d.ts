// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Node supporting hand and finger tracking in OpenXR. */
declare class OpenXRHand extends Node3D {
  /** Specify the type of updates to perform on the bone. */
  bone_update: int;
  /** Specifies whether this node tracks the left or right hand of the player. */
  hand: int;
  /** Set a {@link Skeleton3D} node for which the pose positions will be updated. */
  hand_skeleton: NodePath;
  /** Set the motion range (if supported) limiting the hand motion. */
  motion_range: int;
  /** Set the type of skeleton rig the {@link hand_skeleton} is compliant with. */
  skeleton_rig: int;
  set_bone_update(value: int): void;
  get_bone_update(): int;
  set_hand(value: int): void;
  get_hand(): int;
  set_hand_skeleton(value: NodePath | string): void;
  get_hand_skeleton(): NodePath;
  set_motion_range(value: int): void;
  get_motion_range(): int;
  set_skeleton_rig(value: int): void;
  get_skeleton_rig(): int;

  // enum Hands
  /** Tracking the player's left hand. */
  static readonly HAND_LEFT: int;
  /** Tracking the player's right hand. */
  static readonly HAND_RIGHT: int;
  /** Maximum supported hands. */
  static readonly HAND_MAX: int;
  // enum MotionRange
  /** When player grips, hand skeleton will form a full fist. */
  static readonly MOTION_RANGE_UNOBSTRUCTED: int;
  /** When player grips, hand skeleton conforms to the controller the player is holding. */
  static readonly MOTION_RANGE_CONFORM_TO_CONTROLLER: int;
  /** Maximum supported motion ranges. */
  static readonly MOTION_RANGE_MAX: int;
  // enum SkeletonRig
  /** An OpenXR compliant skeleton. */
  static readonly SKELETON_RIG_OPENXR: int;
  /** A {@link SkeletonProfileHumanoid} compliant skeleton. */
  static readonly SKELETON_RIG_HUMANOID: int;
  /** Maximum supported hands. */
  static readonly SKELETON_RIG_MAX: int;
  // enum BoneUpdate
  /** The skeletons bones are fully updated (both position and rotation) to match the tracked bones. */
  static readonly BONE_UPDATE_FULL: int;
  /** The skeletons bones are only rotated to align with the tracked bones, preserving bone length. */
  static readonly BONE_UPDATE_ROTATION_ONLY: int;
  /** Maximum supported bone update mode. */
  static readonly BONE_UPDATE_MAX: int;
}
