// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Result object tracking the asynchronous result of an OpenXR Future object. */
declare class OpenXRFutureResult extends RefCounted {
  /** Cancel this future, this will interrupt and stop the asynchronous function. */
  cancel_future(): void;
  /** Return the `XrFutureEXT` value this result relates to. */
  get_future(): int;
  /**
   * Returns the result value of our asynchronous function (if set by the extension). The type of this result value depends on the function being called. Consult the documentation of the relevant function.
   */
  get_result_value(): unknown;
  /** Returns the status of this result. */
  get_status(): int;
  /**
   * Stores the result value we expose to the user.
   * **Note:** This method should only be called by an OpenXR extension that implements an asynchronous function.
   */
  set_result_value(result_value: unknown): void;

  /** Emitted when the asynchronous function is finished or has been cancelled. */
  completed: Signal<[OpenXRFutureResult]>;

  // enum ResultStatus
  /** The asynchronous function is running. */
  static readonly RESULT_RUNNING: int;
  /** The asynchronous function has finished. */
  static readonly RESULT_FINISHED: int;
  /** The asynchronous function has been cancelled. */
  static readonly RESULT_CANCELLED: int;
}
