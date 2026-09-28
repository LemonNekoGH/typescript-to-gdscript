// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Exporter for Android. */
declare class EditorExportPlatformAndroid extends EditorExportPlatform {
  /** If `true`, `arm64` binaries are included into exported project. */
  'architectures/arm64-v8a': boolean;
  /** If `true`, `arm32` binaries are included into exported project. */
  'architectures/armeabi-v7a': boolean;
  /** If `true`, `x86_32` binaries are included into exported project. */
  'architectures/x86': boolean;
  /** If `true`, `x86_64` binaries are included into exported project. */
  'architectures/x86_64': boolean;
  /**
   * A list of additional command line arguments, separated by space, which the exported project will receive when started.
   */
  'command_line/extra_args': string;
  /**
   * Path to an APK file to use as a custom export template for debug exports. If left empty, default template is used.
   * **Note:** This is only used if {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} is disabled.
   */
  'custom_template/debug': string;
  /**
   * Path to an APK file to use as a custom export template for release exports. If left empty, default template is used.
   * **Note:** This is only used if {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} is disabled.
   */
  'custom_template/release': string;
  /**
   * If `true`, Swipe to dismiss (https://developer.android.com/design/ui/wear/guides/components/swipe-to-dismiss) will be enabled.
   * This functionality is intended for smartwatches and is generally ignored on standard Android devices. However, some devices may not ignore it. Therefore, it is recommended to keep this feature disabled for standard Android apps to avoid unexpected behavior.
   * **Note:** This is `false` by default. To enable this behavior, {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} is required.
   */
  'gesture/swipe_to_dismiss': boolean;
  /**
   * Path to a ZIP file holding the source for the export template used in a Gradle build. If left empty, the default template is used.
   */
  'gradle_build/android_source_template': string;
  /**
   * If `true`, native libraries are compressed when performing a Gradle build.
   * **Note:** While enabling compression can reduce the size of the binary, it may result in slower application startup because the native libraries must be extracted before use, rather than being loaded directly.
   * If you're distributing your app via the Play Store, it's generally recommended to keep this option `false`, see official documentation (https://developer.android.com/build/releases/past-releases/agp-3-6-0-release-notes#extractNativeLibs).
   */
  'gradle_build/compress_native_libraries': boolean;
  /**
   * A dictionary of custom theme attributes to include in the exported Android project. Each entry defines a theme attribute name and its value, and will be added to the **GodotAppMainTheme**.
   * For example, the key `android:windowSwipeToDismiss` with the value `false` is resolved to `<item name="android:windowSwipeToDismiss">false</item>`.
   * **Note:** To add a custom attribute to the **GodotAppSplashTheme**, prefix the attribute name with `[splash]`.
   * **Note:** Reserved attributes configured via other export options or project settings cannot be overridden by `custom_theme_attributes` and are skipped during export.
   */
  'gradle_build/custom_theme_attributes': Dictionary;
  /** Application export format (*.apk or *.aab). */
  'gradle_build/export_format': int;
  /** Path to the Gradle build directory. If left empty, then `res://android` will be used. */
  'gradle_build/gradle_build_directory': string;
  /**
   * Minimum Android API level required for the application to run (used during Gradle build). See android:minSdkVersion (https://developer.android.com/guide/topics/manifest/uses-sdk-element#uses).
   */
  'gradle_build/min_sdk': string;
  /**
   * The Android API level on which the application is designed to run (used during Gradle build). See android:targetSdkVersion (https://developer.android.com/guide/topics/manifest/uses-sdk-element#uses).
   */
  'gradle_build/target_sdk': string;
  /** If `true`, Gradle build is used instead of pre-built APK. */
  'gradle_build/use_gradle_build': boolean;
  /**
   * If `true`, OpenGL ES debug context will be created (additional runtime checking, validation, and logging).
   */
  'graphics/opengl_debug': boolean;
  /**
   * Path of the debug keystore file.
   * Can be overridden with the environment variable `GODOT_ANDROID_KEYSTORE_DEBUG_PATH`.
   * Fallbacks to `EditorSettings.export/android/debug_keystore` if empty.
   */
  'keystore/debug': string;
  /**
   * Password for the debug keystore file.
   * Can be overridden with the environment variable `GODOT_ANDROID_KEYSTORE_DEBUG_PASSWORD`.
   * Fallbacks to `EditorSettings.export/android/debug_keystore_pass` if both it and {@link keystore/debug} are empty.
   */
  'keystore/debug_password': string;
  /**
   * User name for the debug keystore file.
   * Can be overridden with the environment variable `GODOT_ANDROID_KEYSTORE_DEBUG_USER`.
   * Fallbacks to `EditorSettings.export/android/debug_keystore_user` if both it and {@link keystore/debug} are empty.
   */
  'keystore/debug_user': string;
  /**
   * Path of the release keystore file.
   * Can be overridden with the environment variable `GODOT_ANDROID_KEYSTORE_RELEASE_PATH`.
   */
  'keystore/release': string;
  /**
   * Password for the release keystore file.
   * Can be overridden with the environment variable `GODOT_ANDROID_KEYSTORE_RELEASE_PASSWORD`.
   */
  'keystore/release_password': string;
  /**
   * User name for the release keystore file.
   * Can be overridden with the environment variable `GODOT_ANDROID_KEYSTORE_RELEASE_USER`.
   */
  'keystore/release_user': string;
  /**
   * Background layer of the application adaptive icon file. See Design adaptive icons (https://developer.android.com/develop/ui/views/launch/icon_design_adaptive#design-adaptive-icons).
   */
  'launcher_icons/adaptive_background_432x432': string;
  /**
   * Foreground layer of the application adaptive icon file. See Design adaptive icons (https://developer.android.com/develop/ui/views/launch/icon_design_adaptive#design-adaptive-icons).
   */
  'launcher_icons/adaptive_foreground_432x432': string;
  /**
   * Monochrome layer of the application adaptive icon file. See Design adaptive icons (https://developer.android.com/develop/ui/views/launch/icon_design_adaptive#design-adaptive-icons).
   */
  'launcher_icons/adaptive_monochrome_432x432': string;
  /**
   * Application icon file. If left empty, it will fallback to {@link ProjectSettings.application/config/icon}.
   */
  'launcher_icons/main_192x192': string;
  /**
   * Application category for the Google Play Store. Only define this if your application fits one of the categories well. See android:appCategory (https://developer.android.com/guide/topics/manifest/application-element#appCategory).
   */
  'package/app_category': int;
  /**
   * If `true`, task initiated by main activity will be excluded from the list of recently used applications. See android:excludeFromRecents (https://developer.android.com/guide/topics/manifest/activity-element#exclude).
   */
  'package/exclude_from_recents': boolean;
  /** Name of the application. */
  'package/name': string;
  /**
   * If `true`, when the user uninstalls an app, a prompt to keep the app's data will be shown. See android:hasFragileUserData (https://developer.android.com/guide/topics/manifest/application-element#fragileuserdata).
   */
  'package/retain_data_on_uninstall': boolean;
  /** If `true`, the user will be able to set this app as the system launcher in Android preferences. */
  'package/show_as_launcher_app': boolean;
  /** If `true`, this app will show in Android TV launcher UI. */
  'package/show_in_android_tv': boolean;
  /**
   * If `true`, this app will show in the device's app library.
   * **Note:** This is `true` by default.
   */
  'package/show_in_app_library': boolean;
  /** If `true`, package signing is enabled. */
  'package/signed': boolean;
  /**
   * Unique application identifier in a reverse-DNS format. The reverse DNS format should preferably match a domain name you control, but this is not strictly required. For instance, if you own `example.com`, your package unique name should preferably be of the form `com.example.mygame`. This identifier can only contain lowercase alphanumeric characters (`a-z`, and `0-9`), underscores (`_`), and periods (`.`). Each component of the reverse DNS format must start with a letter: for instance, `com.example.8game` is not valid.
   * If `$genname` is present in the value, it will be replaced by the project name converted to lowercase. If there are invalid characters in the project name, they will be stripped. If all characters in the project name are stripped, `$genname` is replaced by `noname`.
   * **Note:** Changing the package name will cause the package to be considered as a new package, with its own installation and data paths. The new package won't be usable to update existing installations.
   * **Note:** When publishing to Google Play, the package name must be *globally* unique. This means no other apps published on Google Play must be using the same package name as yours. Otherwise, you'll be prevented from publishing your app on Google Play.
   */
  'package/unique_name': string;
  /**
   * Allows read/write access to the "properties" table in the checkin database. See ACCESS_CHECKIN_PROPERTIES (https://developer.android.com/reference/android/Manifest.permission#ACCESS_CHECKIN_PROPERTIES).
   */
  'permissions/access_checkin_properties': boolean;
  /**
   * Allows access to the approximate location information. See ACCESS_COARSE_LOCATION (https://developer.android.com/reference/android/Manifest.permission#ACCESS_COARSE_LOCATION).
   */
  'permissions/access_coarse_location': boolean;
  /**
   * Allows access to the precise location information. See ACCESS_FINE_LOCATION (https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION).
   */
  'permissions/access_fine_location': boolean;
  /**
   * Allows access to the extra location provider commands. See ACCESS_LOCATION_EXTRA_COMMANDS (https://developer.android.com/reference/android/Manifest.permission#ACCESS_LOCATION_EXTRA_COMMANDS).
   */
  'permissions/access_location_extra_commands': boolean;
  /**
   * Allows an application to access any geographic locations persisted in the user's shared collection. See ACCESS_MEDIA_LOCATION (https://developer.android.com/reference/android/Manifest.permission#ACCESS_MEDIA_LOCATION).
   */
  'permissions/access_media_location': boolean;
  /** Allows an application to create mock location providers for testing. */
  'permissions/access_mock_location': boolean;
  /**
   * Allows access to the information about networks. See ACCESS_NETWORK_STATE (https://developer.android.com/reference/android/Manifest.permission#ACCESS_NETWORK_STATE).
   */
  'permissions/access_network_state': boolean;
  /** Allows an application to use SurfaceFlinger's low level features. */
  'permissions/access_surface_flinger': boolean;
  /**
   * Allows access to the information about Wi-Fi networks. See ACCESS_WIFI_STATE (https://developer.android.com/reference/android/Manifest.permission#ACCESS_WIFI_STATE).
   */
  'permissions/access_wifi_state': boolean;
  /**
   * Allows applications to call into AccountAuthenticators. See ACCOUNT_MANAGER (https://developer.android.com/reference/android/Manifest.permission#ACCOUNT_MANAGER).
   */
  'permissions/account_manager': boolean;
  /**
   * Allows an application to add voicemails into the system. See ADD_VOICEMAIL (https://developer.android.com/reference/android/Manifest.permission#ADD_VOICEMAIL).
   */
  'permissions/add_voicemail': boolean;
  /** Allows an application to act as an AccountAuthenticator for the AccountManager. */
  'permissions/authenticate_accounts': boolean;
  /**
   * Allows an application to collect battery statistics. See BATTERY_STATS (https://developer.android.com/reference/android/Manifest.permission#BATTERY_STATS).
   */
  'permissions/battery_stats': boolean;
  /**
   * Must be required by an AccessibilityService, to ensure that only the system can bind to it. See BIND_ACCESSIBILITY_SERVICE (https://developer.android.com/reference/android/Manifest.permission#BIND_ACCESSIBILITY_SERVICE).
   */
  'permissions/bind_accessibility_service': boolean;
  /**
   * Allows an application to tell the AppWidget service which application can access AppWidget's data. See BIND_APPWIDGET (https://developer.android.com/reference/android/Manifest.permission#BIND_APPWIDGET).
   */
  'permissions/bind_appwidget': boolean;
  /**
   * Must be required by device administration receiver, to ensure that only the system can interact with it. See BIND_DEVICE_ADMIN (https://developer.android.com/reference/android/Manifest.permission#BIND_DEVICE_ADMIN).
   */
  'permissions/bind_device_admin': boolean;
  /**
   * Must be required by an InputMethodService, to ensure that only the system can bind to it. See BIND_INPUT_METHOD (https://developer.android.com/reference/android/Manifest.permission#BIND_INPUT_METHOD).
   */
  'permissions/bind_input_method': boolean;
  /**
   * Must be required by a HostApduService or OffHostApduService to ensure that only the system can bind to it. See BIND_NFC_SERVICE (https://developer.android.com/reference/android/Manifest.permission#BIND_NFC_SERVICE).
   */
  'permissions/bind_nfc_service': boolean;
  /**
   * Must be required by a NotificationListenerService, to ensure that only the system can bind to it. See BIND_NOTIFICATION_LISTENER_SERVICE (https://developer.android.com/reference/android/Manifest.permission#BIND_NOTIFICATION_LISTENER_SERVICE).
   */
  'permissions/bind_notification_listener_service': boolean;
  /**
   * Must be required by a PrintService, to ensure that only the system can bind to it. See BIND_PRINT_SERVICE (https://developer.android.com/reference/android/Manifest.permission#BIND_PRINT_SERVICE).
   */
  'permissions/bind_print_service': boolean;
  /**
   * Must be required by a RemoteViewsService, to ensure that only the system can bind to it. See BIND_REMOTEVIEWS (https://developer.android.com/reference/android/Manifest.permission#BIND_REMOTEVIEWS).
   */
  'permissions/bind_remoteviews': boolean;
  /**
   * Must be required by a TextService (e.g. SpellCheckerService) to ensure that only the system can bind to it. See BIND_TEXT_SERVICE (https://developer.android.com/reference/android/Manifest.permission#BIND_TEXT_SERVICE).
   */
  'permissions/bind_text_service': boolean;
  /**
   * Must be required by a VpnService, to ensure that only the system can bind to it. See BIND_VPN_SERVICE (https://developer.android.com/reference/android/Manifest.permission#BIND_VPN_SERVICE).
   */
  'permissions/bind_vpn_service': boolean;
  /**
   * Must be required by a WallpaperService, to ensure that only the system can bind to it. See BIND_WALLPAPER (https://developer.android.com/reference/android/Manifest.permission#BIND_WALLPAPER).
   */
  'permissions/bind_wallpaper': boolean;
  /**
   * Allows applications to connect to paired bluetooth devices. See BLUETOOTH (https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH).
   */
  'permissions/bluetooth': boolean;
  /**
   * Allows applications to discover and pair bluetooth devices. See BLUETOOTH_ADMIN (https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH_ADMIN).
   */
  'permissions/bluetooth_admin': boolean;
  /**
   * Allows applications to pair bluetooth devices without user interaction, and to allow or disallow phonebook access or message access. See BLUETOOTH_PRIVILEGED (https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH_PRIVILEGED).
   */
  'permissions/bluetooth_privileged': boolean;
  /** Required to be able to disable the device (very dangerous!). */
  'permissions/brick': boolean;
  /**
   * Allows an application to broadcast a notification that an application package has been removed. See BROADCAST_PACKAGE_REMOVED (https://developer.android.com/reference/android/Manifest.permission#BROADCAST_PACKAGE_REMOVED).
   */
  'permissions/broadcast_package_removed': boolean;
  /**
   * Allows an application to broadcast an SMS receipt notification. See BROADCAST_SMS (https://developer.android.com/reference/android/Manifest.permission#BROADCAST_SMS).
   */
  'permissions/broadcast_sms': boolean;
  /**
   * Allows an application to broadcast sticky intents. See BROADCAST_STICKY (https://developer.android.com/reference/android/Manifest.permission#BROADCAST_STICKY).
   */
  'permissions/broadcast_sticky': boolean;
  /**
   * Allows an application to broadcast a WAP PUSH receipt notification. See BROADCAST_WAP_PUSH (https://developer.android.com/reference/android/Manifest.permission#BROADCAST_WAP_PUSH).
   */
  'permissions/broadcast_wap_push': boolean;
  /**
   * Allows an application to initiate a phone call without going through the Dialer user interface. See CALL_PHONE (https://developer.android.com/reference/android/Manifest.permission#CALL_PHONE).
   */
  'permissions/call_phone': boolean;
  /**
   * Allows an application to call any phone number, including emergency numbers, without going through the Dialer user interface. See CALL_PRIVILEGED (https://developer.android.com/reference/android/Manifest.permission#CALL_PRIVILEGED).
   */
  'permissions/call_privileged': boolean;
  /**
   * Required to be able to access the camera device. See CAMERA (https://developer.android.com/reference/android/Manifest.permission#CAMERA).
   */
  'permissions/camera': boolean;
  /**
   * Allows an application to capture audio output. See CAPTURE_AUDIO_OUTPUT (https://developer.android.com/reference/android/Manifest.permission#CAPTURE_AUDIO_OUTPUT).
   */
  'permissions/capture_audio_output': boolean;
  /** Allows an application to capture secure video output. */
  'permissions/capture_secure_video_output': boolean;
  /** Allows an application to capture video output. */
  'permissions/capture_video_output': boolean;
  /**
   * Allows an application to change whether an application component (other than its own) is enabled or not. See CHANGE_COMPONENT_ENABLED_STATE (https://developer.android.com/reference/android/Manifest.permission#CHANGE_COMPONENT_ENABLED_STATE).
   */
  'permissions/change_component_enabled_state': boolean;
  /**
   * Allows an application to modify the current configuration, such as locale. See CHANGE_CONFIGURATION (https://developer.android.com/reference/android/Manifest.permission#CHANGE_CONFIGURATION).
   */
  'permissions/change_configuration': boolean;
  /**
   * Allows applications to change network connectivity state. See CHANGE_NETWORK_STATE (https://developer.android.com/reference/android/Manifest.permission#CHANGE_NETWORK_STATE).
   */
  'permissions/change_network_state': boolean;
  /**
   * Allows applications to enter Wi-Fi Multicast mode. See CHANGE_WIFI_MULTICAST_STATE (https://developer.android.com/reference/android/Manifest.permission#CHANGE_WIFI_MULTICAST_STATE).
   */
  'permissions/change_wifi_multicast_state': boolean;
  /**
   * Allows applications to change Wi-Fi connectivity state. See CHANGE_WIFI_STATE (https://developer.android.com/reference/android/Manifest.permission#CHANGE_WIFI_STATE).
   */
  'permissions/change_wifi_state': boolean;
  /**
   * Allows an application to clear the caches of all installed applications on the device. See CLEAR_APP_CACHE (https://developer.android.com/reference/android/Manifest.permission#CLEAR_APP_CACHE).
   */
  'permissions/clear_app_cache': boolean;
  /** Allows an application to clear user data. */
  'permissions/clear_app_user_data': boolean;
  /**
   * Allows enabling/disabling location update notifications from the radio. See CONTROL_LOCATION_UPDATES (https://developer.android.com/reference/android/Manifest.permission#CONTROL_LOCATION_UPDATES).
   */
  'permissions/control_location_updates': boolean;
  /** Array of custom permission strings. */
  'permissions/custom_permissions': PackedStringArray;
  'permissions/delete_cache_files': boolean;
  /**
   * Allows an application to delete packages. See DELETE_PACKAGES (https://developer.android.com/reference/android/Manifest.permission#DELETE_PACKAGES).
   */
  'permissions/delete_packages': boolean;
  /** Allows low-level access to power management. */
  'permissions/device_power': boolean;
  /**
   * Allows applications to RW to diagnostic resources. See DIAGNOSTIC (https://developer.android.com/reference/android/Manifest.permission#DIAGNOSTIC).
   */
  'permissions/diagnostic': boolean;
  /**
   * Allows applications to disable the keyguard if it is not secure. See DISABLE_KEYGUARD (https://developer.android.com/reference/android/Manifest.permission#DISABLE_KEYGUARD).
   */
  'permissions/disable_keyguard': boolean;
  /**
   * Allows an application to retrieve state dump information from system services. See DUMP (https://developer.android.com/reference/android/Manifest.permission#DUMP).
   */
  'permissions/dump': boolean;
  /**
   * Allows an application to expand or collapse the status bar. See EXPAND_STATUS_BAR (https://developer.android.com/reference/android/Manifest.permission#EXPAND_STATUS_BAR).
   */
  'permissions/expand_status_bar': boolean;
  /**
   * Run as a manufacturer test application, running as the root user. See FACTORY_TEST (https://developer.android.com/reference/android/Manifest.permission#FACTORY_TEST).
   */
  'permissions/factory_test': boolean;
  /** Allows access to the flashlight. */
  'permissions/flashlight': boolean;
  /** Allows an application to force a BACK operation on whatever is the top activity. */
  'permissions/force_back': boolean;
  /**
   * Allows access to the list of accounts in the Accounts Service. See GET_ACCOUNTS (https://developer.android.com/reference/android/Manifest.permission#GET_ACCOUNTS).
   */
  'permissions/get_accounts': boolean;
  /**
   * Allows an application to find out the space used by any package. See GET_PACKAGE_SIZE (https://developer.android.com/reference/android/Manifest.permission#GET_PACKAGE_SIZE).
   */
  'permissions/get_package_size': boolean;
  'permissions/get_tasks': boolean;
  /** Allows an application to retrieve private information about the current top activity. */
  'permissions/get_top_activity_info': boolean;
  /**
   * Used on content providers to allow the global search system to access their data. See GLOBAL_SEARCH (https://developer.android.com/reference/android/Manifest.permission#GLOBAL_SEARCH).
   */
  'permissions/global_search': boolean;
  /** Allows access to hardware peripherals. */
  'permissions/hardware_test': boolean;
  /**
   * Allows an application to inject user events (keys, touch, trackball) into the event stream and deliver them to ANY window.
   */
  'permissions/inject_events': boolean;
  /**
   * Allows an application to install a location provider into the Location Manager. See INSTALL_LOCATION_PROVIDER (https://developer.android.com/reference/android/Manifest.permission#INSTALL_LOCATION_PROVIDER).
   */
  'permissions/install_location_provider': boolean;
  /**
   * Allows an application to install packages. See INSTALL_PACKAGES (https://developer.android.com/reference/android/Manifest.permission#INSTALL_PACKAGES).
   */
  'permissions/install_packages': boolean;
  /**
   * Allows an application to install a shortcut in Launcher. See INSTALL_SHORTCUT (https://developer.android.com/reference/android/Manifest.permission#INSTALL_SHORTCUT).
   */
  'permissions/install_shortcut': boolean;
  /** Allows an application to open windows that are for use by parts of the system user interface. */
  'permissions/internal_system_window': boolean;
  /**
   * Allows applications to open network sockets. See INTERNET (https://developer.android.com/reference/android/Manifest.permission#INTERNET).
   */
  'permissions/internet': boolean;
  /**
   * Allows an application to call ActivityManager.killBackgroundProcesses(String). See KILL_BACKGROUND_PROCESSES (https://developer.android.com/reference/android/Manifest.permission#KILL_BACKGROUND_PROCESSES).
   */
  'permissions/kill_background_processes': boolean;
  /**
   * Allows an application to use location features in hardware, such as the geofencing api. See LOCATION_HARDWARE (https://developer.android.com/reference/android/Manifest.permission#LOCATION_HARDWARE).
   */
  'permissions/location_hardware': boolean;
  /** Allows an application to manage the list of accounts in the AccountManager. */
  'permissions/manage_accounts': boolean;
  /**
   * Allows an application to manage (create, destroy, Z-order) application tokens in the window manager.
   */
  'permissions/manage_app_tokens': boolean;
  /**
   * Allows an application to manage access to documents, usually as part of a document picker. See MANAGE_DOCUMENTS (https://developer.android.com/reference/android/Manifest.permission#MANAGE_DOCUMENTS).
   */
  'permissions/manage_documents': boolean;
  /**
   * Allows an application a broad access to external storage in scoped storage. See MANAGE_EXTERNAL_STORAGE (https://developer.android.com/reference/android/Manifest.permission#MANAGE_EXTERNAL_STORAGE).
   */
  'permissions/manage_external_storage': boolean;
  /**
   * Allows an application to modify and delete media files on this device or any connected storage device without user confirmation. Applications must already be granted the `READ_EXTERNAL_STORAGE` or `MANAGE_EXTERNAL_STORAGE` permissions for this permission to take effect. See MANAGE_MEDIA (https://developer.android.com/reference/android/Manifest.permission#MANAGE_MEDIA).
   */
  'permissions/manage_media': boolean;
  /**
   * See MASTER_CLEAR (https://developer.android.com/reference/android/Manifest.permission#MASTER_CLEAR).
   */
  'permissions/master_clear': boolean;
  /**
   * Allows an application to know what content is playing and control its playback. See MEDIA_CONTENT_CONTROL (https://developer.android.com/reference/android/Manifest.permission#MEDIA_CONTENT_CONTROL).
   */
  'permissions/media_content_control': boolean;
  /**
   * Allows an application to modify global audio settings. See MODIFY_AUDIO_SETTINGS (https://developer.android.com/reference/android/Manifest.permission#MODIFY_AUDIO_SETTINGS).
   */
  'permissions/modify_audio_settings': boolean;
  /**
   * Allows modification of the telephony state - power on, mmi, etc. Does not include placing calls. See MODIFY_PHONE_STATE (https://developer.android.com/reference/android/Manifest.permission#MODIFY_PHONE_STATE).
   */
  'permissions/modify_phone_state': boolean;
  /**
   * Allows formatting file systems for removable storage. See MOUNT_FORMAT_FILESYSTEMS (https://developer.android.com/reference/android/Manifest.permission#MOUNT_FORMAT_FILESYSTEMS).
   */
  'permissions/mount_format_filesystems': boolean;
  /**
   * Allows mounting and unmounting file systems for removable storage. See MOUNT_UNMOUNT_FILESYSTEMS (https://developer.android.com/reference/android/Manifest.permission#MOUNT_UNMOUNT_FILESYSTEMS).
   */
  'permissions/mount_unmount_filesystems': boolean;
  /**
   * Allows applications to perform I/O operations over NFC. See NFC (https://developer.android.com/reference/android/Manifest.permission#NFC).
   */
  'permissions/nfc': boolean;
  /** Allows an application to make its activities persistent. */
  'permissions/persistent_activity': boolean;
  /**
   * Allows an application to post notifications. Added in API level 33. See Notification runtime permission (https://developer.android.com/develop/ui/views/notifications/notification-permission).
   */
  'permissions/post_notifications': boolean;
  /**
   * Allows an application to see the number being dialed during an outgoing call with the option to redirect the call to a different number or abort the call altogether. See PROCESS_OUTGOING_CALLS (https://developer.android.com/reference/android/Manifest.permission#PROCESS_OUTGOING_CALLS).
   */
  'permissions/process_outgoing_calls': boolean;
  /**
   * Allows an application to read the user's calendar data. See READ_CALENDAR (https://developer.android.com/reference/android/Manifest.permission#READ_CALENDAR).
   */
  'permissions/read_calendar': boolean;
  /**
   * Allows an application to read the user's call log. See READ_CALL_LOG (https://developer.android.com/reference/android/Manifest.permission#READ_CALL_LOG).
   */
  'permissions/read_call_log': boolean;
  /**
   * Allows an application to read the user's contacts data. See READ_CONTACTS (https://developer.android.com/reference/android/Manifest.permission#READ_CONTACTS).
   */
  'permissions/read_contacts': boolean;
  /**
   * Allows an application to read from external storage. See READ_EXTERNAL_STORAGE (https://developer.android.com/reference/android/Manifest.permission#READ_EXTERNAL_STORAGE).
   */
  'permissions/read_external_storage': boolean;
  /** Allows an application to take screen shots and more generally get access to the frame buffer data. */
  'permissions/read_frame_buffer': boolean;
  /** Allows an application to read (but not write) the user's browsing history and bookmarks. */
  'permissions/read_history_bookmarks': boolean;
  'permissions/read_input_state': boolean;
  /**
   * Allows an application to read the low-level system log files. See READ_LOGS (https://developer.android.com/reference/android/Manifest.permission#READ_LOGS).
   */
  'permissions/read_logs': boolean;
  /**
   * Allows an application to read audio files from external storage. See READ_MEDIA_AUDIO (https://developer.android.com/reference/android/Manifest.permission#READ_MEDIA_AUDIO).
   */
  'permissions/read_media_audio': boolean;
  /**
   * Allows an application to read image files from external storage. See READ_MEDIA_IMAGES (https://developer.android.com/reference/android/Manifest.permission#READ_MEDIA_IMAGES).
   */
  'permissions/read_media_images': boolean;
  /**
   * Allows an application to read video files from external storage. See READ_MEDIA_VIDEO (https://developer.android.com/reference/android/Manifest.permission#READ_MEDIA_VIDEO).
   */
  'permissions/read_media_video': boolean;
  /**
   * Allows an application to read image or video files from external storage that a user has selected via the permission prompt photo picker. See READ_MEDIA_VISUAL_USER_SELECTED (https://developer.android.com/reference/android/Manifest.permission#READ_MEDIA_VISUAL_USER_SELECTED).
   */
  'permissions/read_media_visual_user_selected': boolean;
  /**
   * Allows read only access to phone state. See READ_PHONE_STATE (https://developer.android.com/reference/android/Manifest.permission#READ_PHONE_STATE).
   */
  'permissions/read_phone_state': boolean;
  /** Allows an application to read the user's personal profile data. */
  'permissions/read_profile': boolean;
  /**
   * Allows an application to read SMS messages. See READ_SMS (https://developer.android.com/reference/android/Manifest.permission#READ_SMS).
   */
  'permissions/read_sms': boolean;
  /** Allows an application to read from the user's social stream. */
  'permissions/read_social_stream': boolean;
  /**
   * Allows applications to read the sync settings. See READ_SYNC_SETTINGS (https://developer.android.com/reference/android/Manifest.permission#READ_SYNC_SETTINGS).
   */
  'permissions/read_sync_settings': boolean;
  /**
   * Allows applications to read the sync stats. See READ_SYNC_STATS (https://developer.android.com/reference/android/Manifest.permission#READ_SYNC_STATS).
   */
  'permissions/read_sync_stats': boolean;
  /** Allows an application to read the user dictionary. */
  'permissions/read_user_dictionary': boolean;
  /**
   * Required to be able to reboot the device. See REBOOT (https://developer.android.com/reference/android/Manifest.permission#REBOOT).
   */
  'permissions/reboot': boolean;
  /**
   * Allows an application to receive the Intent.ACTION_BOOT_COMPLETED that is broadcast after the system finishes booting. See RECEIVE_BOOT_COMPLETED (https://developer.android.com/reference/android/Manifest.permission#RECEIVE_BOOT_COMPLETED).
   */
  'permissions/receive_boot_completed': boolean;
  /**
   * Allows an application to monitor incoming MMS messages. See RECEIVE_MMS (https://developer.android.com/reference/android/Manifest.permission#RECEIVE_MMS).
   */
  'permissions/receive_mms': boolean;
  /**
   * Allows an application to receive SMS messages. See RECEIVE_SMS (https://developer.android.com/reference/android/Manifest.permission#RECEIVE_SMS).
   */
  'permissions/receive_sms': boolean;
  /**
   * Allows an application to receive WAP push messages. See RECEIVE_WAP_PUSH (https://developer.android.com/reference/android/Manifest.permission#RECEIVE_WAP_PUSH).
   */
  'permissions/receive_wap_push': boolean;
  /**
   * Allows an application to record audio. See RECORD_AUDIO (https://developer.android.com/reference/android/Manifest.permission#RECORD_AUDIO).
   */
  'permissions/record_audio': boolean;
  /**
   * Allows an application to change the Z-order of tasks. See REORDER_TASKS (https://developer.android.com/reference/android/Manifest.permission#REORDER_TASKS).
   */
  'permissions/reorder_tasks': boolean;
  'permissions/restart_packages': boolean;
  /**
   * Allows an application (Phone) to send a request to other applications to handle the respond-via-message action during incoming calls. See SEND_RESPOND_VIA_MESSAGE (https://developer.android.com/reference/android/Manifest.permission#SEND_RESPOND_VIA_MESSAGE).
   */
  'permissions/send_respond_via_message': boolean;
  /**
   * Allows an application to send SMS messages. See SEND_SMS (https://developer.android.com/reference/android/Manifest.permission#SEND_SMS).
   */
  'permissions/send_sms': boolean;
  /** Allows an application to watch and control how activities are started globally in the system. */
  'permissions/set_activity_watcher': boolean;
  /**
   * Allows an application to broadcast an Intent to set an alarm for the user. See SET_ALARM (https://developer.android.com/reference/android/Manifest.permission#SET_ALARM).
   */
  'permissions/set_alarm': boolean;
  /**
   * Allows an application to control whether activities are immediately finished when put in the background. See SET_ALWAYS_FINISH (https://developer.android.com/reference/android/Manifest.permission#SET_ALWAYS_FINISH).
   */
  'permissions/set_always_finish': boolean;
  /**
   * Allows to modify the global animation scaling factor. See SET_ANIMATION_SCALE (https://developer.android.com/reference/android/Manifest.permission#SET_ANIMATION_SCALE).
   */
  'permissions/set_animation_scale': boolean;
  /**
   * Configure an application for debugging. See SET_DEBUG_APP (https://developer.android.com/reference/android/Manifest.permission#SET_DEBUG_APP).
   */
  'permissions/set_debug_app': boolean;
  /** Allows low-level access to setting the orientation (actually rotation) of the screen. */
  'permissions/set_orientation': boolean;
  /** Allows low-level access to setting the pointer speed. */
  'permissions/set_pointer_speed': boolean;
  'permissions/set_preferred_applications': boolean;
  /**
   * Allows an application to set the maximum number of (not needed) application processes that can be running. See SET_PROCESS_LIMIT (https://developer.android.com/reference/android/Manifest.permission#SET_PROCESS_LIMIT).
   */
  'permissions/set_process_limit': boolean;
  /**
   * Allows applications to set the system time directly. See SET_TIME (https://developer.android.com/reference/android/Manifest.permission#SET_TIME).
   */
  'permissions/set_time': boolean;
  /**
   * Allows applications to set the system time zone directly. See SET_TIME_ZONE (https://developer.android.com/reference/android/Manifest.permission#SET_TIME_ZONE).
   */
  'permissions/set_time_zone': boolean;
  /**
   * Allows applications to set the wallpaper. See SET_WALLPAPER (https://developer.android.com/reference/android/Manifest.permission#SET_WALLPAPER).
   */
  'permissions/set_wallpaper': boolean;
  /**
   * Allows applications to set the wallpaper hints. See SET_WALLPAPER_HINTS (https://developer.android.com/reference/android/Manifest.permission#SET_WALLPAPER_HINTS).
   */
  'permissions/set_wallpaper_hints': boolean;
  /**
   * Allow an application to request that a signal be sent to all persistent processes. See SIGNAL_PERSISTENT_PROCESSES (https://developer.android.com/reference/android/Manifest.permission#SIGNAL_PERSISTENT_PROCESSES).
   */
  'permissions/signal_persistent_processes': boolean;
  /**
   * Allows an application to open, close, or disable the status bar and its icons. See STATUS_BAR (https://developer.android.com/reference/android/Manifest.permission#STATUS_BAR).
   */
  'permissions/status_bar': boolean;
  /** Allows an application to allow access the subscribed feeds ContentProvider. */
  'permissions/subscribed_feeds_read': boolean;
  'permissions/subscribed_feeds_write': boolean;
  /**
   * Allows an app to create windows using the type WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY, shown on top of all other apps. See SYSTEM_ALERT_WINDOW (https://developer.android.com/reference/android/Manifest.permission#SYSTEM_ALERT_WINDOW).
   */
  'permissions/system_alert_window': boolean;
  /**
   * Allows using the device's IR transmitter, if available. See TRANSMIT_IR (https://developer.android.com/reference/android/Manifest.permission#TRANSMIT_IR).
   */
  'permissions/transmit_ir': boolean;
  'permissions/uninstall_shortcut': boolean;
  /**
   * Allows an application to update device statistics. See UPDATE_DEVICE_STATS (https://developer.android.com/reference/android/Manifest.permission#UPDATE_DEVICE_STATS).
   */
  'permissions/update_device_stats': boolean;
  /** Allows an application to request authtokens from the AccountManager. */
  'permissions/use_credentials': boolean;
  /**
   * Allows an application to use SIP service. See USE_SIP (https://developer.android.com/reference/android/Manifest.permission#USE_SIP).
   */
  'permissions/use_sip': boolean;
  /**
   * Allows access to the vibrator. See VIBRATE (https://developer.android.com/reference/android/Manifest.permission#VIBRATE).
   */
  'permissions/vibrate': boolean;
  /**
   * Allows using PowerManager WakeLocks to keep processor from sleeping or screen from dimming. See WAKE_LOCK (https://developer.android.com/reference/android/Manifest.permission#WAKE_LOCK).
   */
  'permissions/wake_lock': boolean;
  /**
   * Allows applications to write the apn settings and read sensitive fields of an existing apn settings like user and password. See WRITE_APN_SETTINGS (https://developer.android.com/reference/android/Manifest.permission#WRITE_APN_SETTINGS).
   */
  'permissions/write_apn_settings': boolean;
  /**
   * Allows an application to write the user's calendar data. See WRITE_CALENDAR (https://developer.android.com/reference/android/Manifest.permission#WRITE_CALENDAR).
   */
  'permissions/write_calendar': boolean;
  /**
   * Allows an application to write (but not read) the user's call log data. See WRITE_CALL_LOG (https://developer.android.com/reference/android/Manifest.permission#WRITE_CALL_LOG).
   */
  'permissions/write_call_log': boolean;
  /**
   * Allows an application to write the user's contacts data. See WRITE_CONTACTS (https://developer.android.com/reference/android/Manifest.permission#WRITE_CONTACTS).
   */
  'permissions/write_contacts': boolean;
  /**
   * Allows an application to write to external storage. See WRITE_EXTERNAL_STORAGE (https://developer.android.com/reference/android/Manifest.permission#WRITE_EXTERNAL_STORAGE).
   */
  'permissions/write_external_storage': boolean;
  /**
   * Allows an application to modify the Google service map. See WRITE_GSERVICES (https://developer.android.com/reference/android/Manifest.permission#WRITE_GSERVICES).
   */
  'permissions/write_gservices': boolean;
  /** Allows an application to write (but not read) the user's browsing history and bookmarks. */
  'permissions/write_history_bookmarks': boolean;
  /** Allows an application to write (but not read) the user's personal profile data. */
  'permissions/write_profile': boolean;
  /**
   * Allows an application to read or write the secure system settings. See WRITE_SECURE_SETTINGS (https://developer.android.com/reference/android/Manifest.permission#WRITE_SECURE_SETTINGS).
   */
  'permissions/write_secure_settings': boolean;
  /**
   * Allows an application to read or write the system settings. See WRITE_SETTINGS (https://developer.android.com/reference/android/Manifest.permission#WRITE_SETTINGS).
   */
  'permissions/write_settings': boolean;
  /** Allows an application to write SMS messages. */
  'permissions/write_sms': boolean;
  /** Allows an application to write (but not read) the user's social stream data. */
  'permissions/write_social_stream': boolean;
  /**
   * Allows applications to write the sync settings. See WRITE_SYNC_SETTINGS (https://developer.android.com/reference/android/Manifest.permission#WRITE_SYNC_SETTINGS).
   */
  'permissions/write_sync_settings': boolean;
  /** Allows an application to write to the user dictionary. */
  'permissions/write_user_dictionary': boolean;
  /** The background color used for the root window. By default it's {@link Color.BLACK}. */
  'screen/background_color': Color;
  /**
   * If `true`, this makes the navigation and status bars translucent and allows the application content to extend edge to edge.
   * **Note:** You should ensure that none of the application content is occluded by system elements by using the {@link DisplayServer.get_display_safe_area} and {@link DisplayServer.get_display_cutouts} methods.
   */
  'screen/edge_to_edge': boolean;
  /**
   * If `true`, hides the navigation and status bar. Set {@link DisplayServer.window_set_mode} to change this at runtime.
   */
  'screen/immersive_mode': boolean;
  /** Indicates whether the application supports larger screen form-factors. */
  'screen/support_large': boolean;
  /** Indicates whether an application supports the "normal" screen form-factors. */
  'screen/support_normal': boolean;
  /** Indicates whether the application supports smaller screen form-factors. */
  'screen/support_small': boolean;
  /** Indicates whether the application supports extra large screen form-factors. */
  'screen/support_xlarge': boolean;
  /**
   * If `true`, shaders will be compiled and embedded in the application. This option is only supported when using the Forward+ or Mobile renderers.
   * **Note:** When exporting as a dedicated server, the shader baker is always disabled since no rendering is performed.
   */
  'shader_baker/enabled': boolean;
  /**
   * The background color used for the system splash screen window.
   * If not set, it will fallback to {@link EditorExportPlatformAndroid.launcher_icons/adaptive_background_432x432}.
   * **Note:** This is only applied if {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} is enabled.
   */
  'splash_screen/background_color': Color;
  /**
   * System splash screen branding image file. If left empty, no branding image will be used. See splash-screen dimensions (https://developer.android.com/develop/ui/views/launch/splash-screen#dimensions).
   * **Note:** Can be used to set an image to be shown at the bottom of the splash screen.
   */
  'splash_screen/branding_image': string;
  /**
   * If `true`, Godot's boot splash will not be shown, and the system boot splash will remain visible for a longer time, until the mainloop starts.
   */
  'splash_screen/disable_godot_boot_splash': boolean;
  /**
   * System splash screen icon file. If left empty, it will fall back to {@link EditorExportPlatformAndroid.launcher_icons/adaptive_foreground_432x432}. See splash-screen dimensions (https://developer.android.com/develop/ui/views/launch/splash-screen#dimensions).
   * **Note:** You can provide an AnimatedVectorDrawable (AVD) (https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable) XML. However, the XML file will only be used if {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} is enabled. If not, it will fall back to {@link EditorExportPlatformAndroid.launcher_icons/adaptive_background_432x432}.
   */
  'splash_screen/icon': string;
  /** If `true`, allows the application to participate in the backup and restore infrastructure. */
  'user_data_backup/allow': boolean;
  /**
   * Machine-readable application version. This must be incremented for every new release pushed to the Play Store.
   */
  'version/code': int;
  /**
   * Application version visible to the user. Falls back to {@link ProjectSettings.application/config/version} if left empty.
   */
  'version/name': string;
  /** The extended reality (XR) mode for this application. */
  'xr_features/xr_mode': int;
}
