// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Playback component of {@link AudioStreamInteractive}. */
declare class AudioStreamPlaybackInteractive extends AudioStreamPlayback {
  /**
   * Return the index of the currently playing clip. You can use this to get the name of the currently playing clip with {@link AudioStreamInteractive.get_clip_name}.
   * **Example:** Get the currently playing clip name from inside an {@link AudioStreamPlayer} node.
   */
  get_current_clip_index(): int;
  /** Switch to a clip (by index). */
  switch_to_clip(clip_index: int): void;
  /** Switch to a clip (by name). */
  switch_to_clip_by_name(clip_name: string): void;
}
