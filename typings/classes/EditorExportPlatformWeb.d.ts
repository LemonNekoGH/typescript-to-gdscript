// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Exporter for the Web. */
declare class EditorExportPlatformWeb extends EditorExportPlatform {
  /**
   * File path to the custom export template used for debug builds. If left empty, the default template is used.
   */
  'custom_template/debug': string;
  /**
   * File path to the custom export template used for release builds. If left empty, the default template is used.
   */
  'custom_template/release': string;
  /**
   * Determines how the canvas should be resized by Godot.
   * - **None:** The canvas is not automatically resized.
   * - **Project:** The size of the canvas is dependent on the {@link ProjectSettings}.
   * - **Adaptive:** The canvas is automatically resized to fit as much of the web page as possible.
   */
  'html/canvas_resize_policy': int;
  /**
   * The custom HTML page that wraps the exported web build. If left empty, the default HTML shell is used.
   * For more information, see the Customizing HTML5 Shell ($DOCS_URL/tutorials/platform/web/customizing_html5_shell.html) tutorial.
   */
  'html/custom_html_shell': string;
  /**
   * If `true`, embeds support for a virtual keyboard into the web page, which is shown when necessary on touchscreen devices.
   */
  'html/experimental_virtual_keyboard': boolean;
  /** If `true`, the project icon will be used as the favicon for this application's web page. */
  'html/export_icon': boolean;
  /**
   * If `true`, the canvas will be focused as soon as the application is loaded, if the browser window is already in focus.
   */
  'html/focus_canvas_on_start': boolean;
  /**
   * Additional HTML tags to include inside the `<head>`, such as `<meta>` tags.
   * **Note:** You do not need to add a `<title>` tag, as it is automatically included based on the project's name.
   */
  'html/head_include': string;
  /** The background color used behind the web application. */
  'progressive_web_app/background_color': Color;
  /**
   * The display mode (https://developer.mozilla.org/en-US/docs/Web/Manifest/display/) to use for this progressive web application. Different browsers and platforms may not behave the same.
   * - **Fullscreen:** Displays the app in fullscreen and hides all of the browser's UI elements.
   * - **Standalone:** Displays the app in a separate window and hides all of the browser's UI elements.
   * - **Minimal UI:** Displays the app in a separate window and only shows the browser's UI elements for navigation.
   * - **Browser:** Displays the app as a normal web page.
   */
  'progressive_web_app/display': int;
  /**
   * If `true`, turns this web build into a progressive web application (https://en.wikipedia.org/wiki/Progressive_web_app) (PWA).
   */
  'progressive_web_app/enabled': boolean;
  /**
   * When enabled, the progressive web app will make sure that each request has cross-origin isolation headers (COEP/COOP).
   * This can simplify the setup to serve the exported game.
   */
  'progressive_web_app/ensure_cross_origin_isolation_headers': boolean;
  /**
   * File path to the smallest icon for this web application. If not defined, defaults to the project icon.
   * **Note:** If the icon is not 144×144, it will be automatically resized for the final build.
   */
  'progressive_web_app/icon_144x144': string;
  /**
   * File path to the small icon for this web application. If not defined, defaults to the project icon.
   * **Note:** If the icon is not 180×180, it will be automatically resized for the final build.
   */
  'progressive_web_app/icon_180x180': string;
  /**
   * File path to the largest icon for this web application. If not defined, defaults to the project icon.
   * **Note:** If the icon is not 512×512, it will be automatically resized for the final build.
   */
  'progressive_web_app/icon_512x512': string;
  /**
   * The page to display, should the server hosting the page not be available. This page is saved in the client's machine.
   */
  'progressive_web_app/offline_page': string;
  /**
   * The orientation to use when the web application is run through a mobile device.
   * - **Any:** No orientation is forced.
   * - **Landscape:** Forces a horizontal layout (wider than it is taller).
   * - **Portrait:** Forces a vertical layout (taller than it is wider).
   */
  'progressive_web_app/orientation': int;
  /**
   * The number of threads that emscripten will allocate at startup. A smaller value will allocate fewer threads and consume fewer system resources, but you may run the risk of running out of threads in the pool and needing to allocate more threads at run time which may cause a deadlock.
   * **Note:** Some browsers have a hard cap on the number of threads that can be allocated, so it is best to be cautious and keep this number low.
   */
  'threads/emscripten_pool_size': int;
  /**
   * Override for the default size of the {@link WorkerThreadPool}. This setting is used when {@link ProjectSettings.threading/worker_pool/max_threads} size is set to `-1` (which it is by default). This size must be smaller than {@link threads/emscripten_pool_size} otherwise deadlocks may occur.
   * When using threads, this size needs to be large enough to accommodate features that rely on having a dedicated thread like {@link ProjectSettings.physics/2d/run_on_separate_thread} or {@link ProjectSettings.rendering/driver/threads/thread_model}. In general, it is best to ensure that this is at least `4` and is at least `2` or `3` less than {@link threads/emscripten_pool_size}.
   */
  'threads/godot_pool_size': int;
  /** If `true` enables {@link GDExtension} support for this web build. */
  'variant/extensions_support': boolean;
  /**
   * If `true`, the exported game will support threads. It requires a "cross-origin isolated" website (https://web.dev/articles/coop-coep), which may be difficult to set up and is limited for security reasons (such as not being able to communicate with third-party websites).
   * If `false`, the exported game will not support threads. As a result, it is more prone to performance and audio issues, but will only require to be run on an HTTPS website.
   */
  'variant/thread_support': boolean;
  /** If `true`, allows textures to be optimized for desktop through the S3TC/BPTC algorithm. */
  'vram_texture_compression/for_desktop': boolean;
  /** If `true` allows textures to be optimized for mobile through the ETC2/ASTC algorithm. */
  'vram_texture_compression/for_mobile': boolean;
}
