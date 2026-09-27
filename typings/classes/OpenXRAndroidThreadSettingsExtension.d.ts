// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Wraps the XR_KHR_android_thread_settings (https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#XR_KHR_android_thread_settings) extension.
 */
declare class OpenXRAndroidThreadSettingsExtension extends OpenXRExtensionWrapper {
  /**
   * Sets the thread type of the given thread, so that the XR runtime can adjust its scheduling priority accordingly.
   * `thread_id` refers to the OS thread id (ie from `gettid()`). When `thread_id` is `0`, it will set the thread type of the current thread.
   * **NOTE:** The id returned by {@link Thread.get_id} is incompatible with `thread_id`.
   */
  set_application_thread_type(thread_type: int, thread_id?: int): boolean;

  // enum ThreadType
  /** Hints to the XR runtime that the thread is doing time critical CPU tasks. */
  static readonly THREAD_TYPE_APPLICATION_MAIN: int;
  /** Hints to the XR runtime that the thread is doing background CPU tasks. */
  static readonly THREAD_TYPE_APPLICATION_WORKER: int;
  /** Hints to the XR runtime that the thread is doing time critical graphics device tasks. */
  static readonly THREAD_TYPE_RENDERER_MAIN: int;
  /** Hints to the XR runtime that the thread is doing background graphics device tasks. */
  static readonly THREAD_TYPE_RENDERER_WORKER: int;
}
