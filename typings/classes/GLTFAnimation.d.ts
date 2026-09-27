// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

declare class GLTFAnimation extends Resource {
  loop: boolean;
  /** The original name of the animation. */
  original_name: string;
  set_loop(value: boolean): void;
  get_loop(): boolean;
  set_original_name(value: string | NodePath): void;
  get_original_name(): string;

  /**
   * Gets additional arbitrary data in this {@link GLTFAnimation} instance. This can be used to keep per-node state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the return value can be anything you set. If nothing was set, the return value is `null`.
   */
  get_additional_data(extension_name: string): unknown;
  /**
   * Sets additional arbitrary data in this {@link GLTFAnimation} instance. This can be used to keep per-node state data in {@link GLTFDocumentExtension} classes, which is important because they are stateless.
   * The first argument should be the {@link GLTFDocumentExtension} name (does not have to match the extension name in the glTF file), and the second argument can be anything you want.
   */
  set_additional_data(extension_name: string, additional_data: unknown): void;
}
