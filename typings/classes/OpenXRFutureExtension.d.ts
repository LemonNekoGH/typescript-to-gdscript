// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The OpenXR Future extension allows for asynchronous APIs to be used. */
declare class OpenXRFutureExtension extends OpenXRExtensionWrapper {
  /**
   * Cancels an in-progress future. `future` must be an `XrFutureEXT` value previously returned by an API that started an asynchronous function.
   */
  cancel_future(future: int): void;
  /**
   * Returns `true` if futures are available in the OpenXR runtime used. This function will only return a usable result after OpenXR has been initialized.
   */
  is_active(): boolean;
  /**
   * Register an OpenXR Future object so we monitor for completion. `future` must be an `XrFutureEXT` value previously returned by an API that started an asynchronous function.
   * You can optionally specify `on_success`, it will be invoked on successful completion of the future.
   * Or you can use the returned {@link OpenXRFutureResult} object to `await` its {@link OpenXRFutureResult.completed} signal.
   */
  register_future(future: int, on_success?: Callable): OpenXRFutureResult | null;
}
