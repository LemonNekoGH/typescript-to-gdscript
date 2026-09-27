// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Imports an MP3 audio file for playback. */
declare class ResourceImporterMP3 extends ResourceImporter {
  /**
   * The number of beats within a single bar in the audio track. This is only relevant for music that wishes to make use of interactive music functionality, not sound effects.
   * A more convenient editor for {@link bar_beats} is provided in the **Advanced Import Settings** dialog, as it lets you preview your changes without having to reimport the audio.
   */
  bar_beats: int;
  /**
   * The length of the audio track, in beats. The actual duration of the audio file might be longer than what is indicated by this property. This is only relevant for music that wishes to make use of interactive music functionality, not sound effects.
   * A more convenient editor for {@link beat_count} is provided in the **Advanced Import Settings** dialog, as it lets you preview your changes without having to reimport the audio.
   */
  beat_count: int;
  /**
   * The tempo of the audio track, measured in beats per minute. This should match the BPM measure that was used to compose the track. This is only relevant for music that wishes to make use of interactive music functionality, not sound effects.
   * A more convenient editor for {@link bpm} is provided in the **Advanced Import Settings** dialog, as it lets you preview your changes without having to reimport the audio.
   */
  bpm: float;
  /**
   * If enabled, the audio will begin playing either from the beginning or from {@link loop_offset}, after playback ends by either reaching the end of the audio or reaching the end of the last beat according to the amount specified in {@link beat_count}.
   * **Note:** In {@link AudioStreamPlayer}, the {@link AudioStreamPlayer.finished} signal won't be emitted for looping audio when it reaches the end of the audio file, as the audio will keep playing indefinitely.
   */
  loop: boolean;
  /**
   * Determines where audio will start to loop after playback reaches the end of the audio. This can be used to only loop a part of the audio file, which is useful for some ambient sounds or music. The value is determined in seconds relative to the beginning of the audio. A value of `0.0` will loop the entire audio file.
   * Only has an effect if {@link loop} is `true`.
   * A more convenient editor for {@link loop_offset} is provided in the **Advanced Import Settings** dialog, as it lets you preview your changes without having to reimport the audio.
   */
  loop_offset: float;
}
