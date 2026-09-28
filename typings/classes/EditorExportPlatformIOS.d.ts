// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Exporter for iOS. */
declare class EditorExportPlatformIOS extends EditorExportPlatformAppleEmbedded {
  /**
   * Additional data added to the root `<dict>` section of the Info.plist (https://developer.apple.com/documentation/bundleresources/information_property_list) file. The value should be an XML section with pairs of key-value elements, e.g.:
   * [codeblock lang=text]
   * <key>key_name</key>
   * <string>value</string>
   * [/codeblock]
   */
  'application/additional_plist_content': string;
  /**
   * Apple Team ID, unique 10-character string. To locate your Team ID check "Membership details" section in your Apple developer account dashboard, or "Organizational Unit" of your code signing certificate. See Locate your Team ID (https://developer.apple.com/help/account/manage-your-team/locate-your-team-id).
   */
  'application/app_store_team_id': string;
  /**
   * Unique application identifier in a reverse-DNS format, can only contain alphanumeric characters (`A-Z`, `a-z`, and `0-9`), hyphens (`-`), and periods (`.`).
   */
  'application/bundle_identifier': string;
  /** The "Full Name", "Common Name", or SHA-1 hash of the signing identity used for debug export. */
  'application/code_sign_identity_debug': string;
  /** The "Full Name", "Common Name", or SHA-1 hash of the signing identity used for release export. */
  'application/code_sign_identity_release': string;
  /**
   * If `true`, existing "project name" and "project name.xcodeproj" in the export destination directory will be unconditionally deleted during export.
   */
  'application/delete_old_export_files_unconditionally': boolean;
  /** Application distribution target (debug export). */
  'application/export_method_debug': int;
  /** Application distribution target (release export). */
  'application/export_method_release': int;
  /**
   * If `true`, exports iOS project files without building an XCArchive or `.ipa` file. If `false`, exports iOS project files and builds an XCArchive and `.ipa` file at the same time. When combining Godot with Fastlane or other build pipelines, you may want to set this to `true`.
   */
  'application/export_project_only': boolean;
  /** Interpolation method used to resize application icon. */
  'application/icon_interpolation': int;
  /**
   * Minimum version of iOS required for this application to run in the `major.minor.patch` or `major.minor` format, can only contain numeric characters (`0-9`) and periods (`.`).
   */
  'application/min_ios_version': string;
  /**
   * Name of the provisioning profile. Sets Xcode PROVISIONING_PROFILE_SPECIFIER for debug. Used for manual provisioning (https://developer.apple.com/documentation/xcode/build-settings-reference#Provisioning-Profile).
   * Can be overridden with the environment variable `GODOT_APPLE_PLATFORM_PROFILE_SPECIFIER_DEBUG`.
   */
  'application/provisioning_profile_specifier_debug': string;
  /**
   * Name of the provisioning profile. Sets Xcode PROVISIONING_PROFILE_SPECIFIER for release. Used for manual provisioning (https://developer.apple.com/documentation/xcode/build-settings-reference#Provisioning-Profile).
   * Can be overridden with the environment variable `GODOT_APPLE_PLATFORM_PROFILE_SPECIFIER_RELEASE`.
   */
  'application/provisioning_profile_specifier_release': string;
  /**
   * UUID of the provisioning profile. If left empty, Xcode will download or create a provisioning profile automatically. See Edit, download, or delete provisioning profiles (https://developer.apple.com/help/account/manage-profiles/edit-download-or-delete-profiles).
   * Can be overridden with the environment variable `GODOT_APPLE_PLATFORM_PROVISIONING_PROFILE_UUID_DEBUG`.
   */
  'application/provisioning_profile_uuid_debug': string;
  /**
   * UUID of the provisioning profile. If left empty, Xcode will download or create a provisioning profile automatically. See Edit, download, or delete provisioning profiles (https://developer.apple.com/help/account/manage-profiles/edit-download-or-delete-profiles).
   * Can be overridden with the environment variable `GODOT_APPLE_PLATFORM_PROVISIONING_PROFILE_UUID_RELEASE`.
   */
  'application/provisioning_profile_uuid_release': string;
  /**
   * Application version visible to the user. Can only contain numeric characters (`0-9`) and periods (`.`). Falls back to {@link ProjectSettings.application/config/version} if left empty.
   * **Note:** This value is used for the *Identity > Version* value in the generated Xcode project.
   */
  'application/short_version': string;
  /** A four-character creator code that is specific to the bundle. Optional. */
  'application/signature': string;
  /** Supported device family. */
  'application/targeted_device_family': int;
  /**
   * Machine-readable application version in the `major.minor.patch` format. Can only contain numeric characters (`0-9`) and periods (`.`). This must be incremented with every new release pushed to the App Store. Falls back to {@link ProjectSettings.application/config/version} if left empty.
   * **Note:** This value is used for the *Identity > Build* value in the generated Xcode project.
   */
  'application/version': string;
  /** If `true`, `arm64` binaries are included into exported project. */
  'architectures/arm64': boolean;
  /**
   * If `true`, networking features related to Wi-Fi access are enabled. See Required Device Capabilities (https://developer.apple.com/support/required-device-capabilities/).
   */
  'capabilities/access_wifi': boolean;
  /** Additional data added to the `UIRequiredDeviceCapabilities` array of the `Info.plist` file. */
  'capabilities/additional': PackedStringArray;
  /**
   * Requires the graphics performance and features of the A12 Bionic and later chips (devices supporting all Vulkan renderer features).
   * Enabling this option limits supported devices to: iPhone XS, iPhone XR, iPad Mini (5th gen.), iPad Air (3rd gen.), iPad (8th gen), and newer.
   */
  'capabilities/performance_a12': boolean;
  /**
   * Requires the graphics performance and features of the A17 Pro and later chips.
   * Enabling this option limits supported devices to: iPhone 15 Pro and newer.
   */
  'capabilities/performance_gaming_tier': boolean;
  /** Path to the custom export template. If left empty, default template is used. */
  'custom_template/debug': string;
  /** Path to the custom export template. If left empty, default template is used. */
  'custom_template/release': string;
  /**
   * Additional data added to the root `<dict>` section of the .entitlements (https://developer.apple.com/documentation/bundleresources/entitlements) file. The value should be an XML section with pairs of key-value elements, for example:
   * [codeblock lang=text]
   * <key>key_name</key>
   * <string>value</string>
   * [/codeblock]
   */
  'entitlements/additional': string;
  /**
   * If `true`, allows access to Game Center features. See com.apple.developer.game-center (https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_game-center).
   */
  'entitlements/game_center': boolean;
  /**
   * If `true`, hints that the app might perform better with a higher memory limit. See com.apple.developer.kernel.increased-memory-limit (https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_kernel_increased-memory-limit).
   */
  'entitlements/increased_memory_limit': boolean;
  /**
   * Environment for Apple Push Notification service. See aps-environment (https://developer.apple.com/documentation/bundleresources/entitlements/aps-environment).
   */
  'entitlements/push_notifications': string;
  /**
   * App Store application icon file. If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/app_store_1024x1024': string;
  /**
   * App Store application icon file, dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/app_store_1024x1024_dark': string;
  /**
   * App Store application icon file, tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/app_store_1024x1024_tinted': string;
  /**
   * Base application icon used to generate other icons. If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/icon_1024x1024': string;
  /**
   * Base application icon used to generate other icons, dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/icon_1024x1024_dark': string;
  /**
   * Base application icon used to generate other icons, tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/icon_1024x1024_tinted': string;
  /**
   * iOS application 64x64 icon file (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_128x128': string;
  /**
   * iOS application 64x64 icon file (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_128x128_dark': string;
  /**
   * iOS application 64x64 icon file (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_128x128_tinted': string;
  /**
   * iOS application 68x68 icon file (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_136x136': string;
  /**
   * iOS application 68x68 icon file (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_136x136_dark': string;
  /**
   * iOS application 68x68 icon file (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_136x136_tinted': string;
  /**
   * iOS application 64x64 icon file (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_192x192': string;
  /**
   * iOS application 64x64 icon file (3x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_192x192_dark': string;
  /**
   * iOS application 64x64 icon file (3x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ios_192x192_tinted': string;
  /**
   * Home screen application icon file on iPad (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ipad_152x152': string;
  /**
   * Home screen application icon file on iPad (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ipad_152x152_dark': string;
  /**
   * Home screen application icon file on iPad (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ipad_152x152_tinted': string;
  /**
   * Home screen application icon file on iPad (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ipad_167x167': string;
  /**
   * Home screen application icon file on iPad (3x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ipad_167x167_dark': string;
  /**
   * Home screen application icon file on iPad (3x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/ipad_167x167_tinted': string;
  /**
   * Home screen application icon file on iPhone (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/iphone_120x120': string;
  /**
   * Home screen application icon file on iPhone (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/iphone_120x120_dark': string;
  /**
   * Home screen application icon file on iPhone (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/iphone_120x120_tinted': string;
  /**
   * Home screen application icon file on iPhone (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/iphone_180x180': string;
  /**
   * Home screen application icon file on iPhone (3x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/iphone_180x180_dark': string;
  /**
   * Home screen application icon file on iPhone (3x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/iphone_180x180_tinted': string;
  /**
   * Notification icon file on iPad and iPhone (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_40x40': string;
  /**
   * Notification icon file on iPad and iPhone (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_40x40_dark': string;
  /**
   * Notification icon file on iPad and iPhone (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_40x40_tinted': string;
  /**
   * Notification icon file on iPhone (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_60x60': string;
  /**
   * Notification icon file on iPhone (3x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_60x60_dark': string;
  /**
   * Notification icon file on iPhone (3x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_60x60_tinted': string;
  /**
   * Notification icon file on iPad and iPhone (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_76x76': string;
  /**
   * Notification icon file on iPad and iPhone (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_76x76_dark': string;
  /**
   * Notification icon file on iPad and iPhone (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_76x76_tinted': string;
  /**
   * Notification icon file on iPad and iPhone (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_114x114': string;
  /**
   * Notification icon file on iPad and iPhone (3x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_114x114_dark': string;
  /**
   * Notification icon file on iPad and iPhone (3x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/notification_114x114_tinted': string;
  /**
   * Application settings icon file on iPad and iPhone (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/settings_58x58': string;
  /**
   * Application settings icon file on iPad and iPhone (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/settings_58x58_dark': string;
  /**
   * Application settings icon file on iPad and iPhone (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/settings_58x58_tinted': string;
  /**
   * Application settings icon file on iPhone (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/settings_87x87': string;
  /**
   * Application settings icon file on iPhone (3x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/settings_87x87_dark': string;
  /**
   * Application settings icon file on iPhone (3x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/settings_87x87_tinted': string;
  /**
   * Spotlight icon file on iPad and iPhone (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/spotlight_80x80': string;
  /**
   * Spotlight icon file on iPad and iPhone (2x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/spotlight_80x80_dark': string;
  /**
   * Spotlight icon file on iPad and iPhone (2x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/spotlight_80x80_tinted': string;
  /**
   * Spotlight icon file on iPad and iPhone (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/config/icon}. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/spotlight_120x120': string;
  /**
   * Spotlight icon file on iPad and iPhone (3x DPI), dark version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/spotlight_120x120_dark': string;
  /**
   * Spotlight icon file on iPad and iPhone (3x DPI), tinted version. See App icons (https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons).
   */
  'icons/spotlight_120x120_tinted': string;
  /** If `true`, {@link CameraServer} module is added to the exported project. */
  'modules/camera': boolean;
  /**
   * The reasons your app use active keyboard API. See Describing use of required reason API (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).
   */
  'privacy/active_keyboard_access_reasons': int;
  /** A message displayed when requesting access to the device's camera (in English). */
  'privacy/camera_usage_description': string;
  /** A message displayed when requesting access to the device's camera (localized). */
  'privacy/camera_usage_description_localized': Dictionary;
  /** Indicates whether your app collects advertising data. */
  'privacy/collected_data/advertising_data/collected': boolean;
  /**
   * The reasons your app collects advertising data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/advertising_data/collection_purposes': int;
  /** Indicates whether your app links advertising data to the user's identity. */
  'privacy/collected_data/advertising_data/linked_to_user': boolean;
  /** Indicates whether your app uses advertising data for tracking. */
  'privacy/collected_data/advertising_data/used_for_tracking': boolean;
  /** Indicates whether your app collects audio data. */
  'privacy/collected_data/audio_data/collected': boolean;
  /**
   * The reasons your app collects audio data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/audio_data/collection_purposes': int;
  /** Indicates whether your app links audio data to the user's identity. */
  'privacy/collected_data/audio_data/linked_to_user': boolean;
  /** Indicates whether your app uses audio data for tracking. */
  'privacy/collected_data/audio_data/used_for_tracking': boolean;
  /** Indicates whether your app collects browsing history. */
  'privacy/collected_data/browsing_history/collected': boolean;
  /**
   * The reasons your app collects browsing history. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/browsing_history/collection_purposes': int;
  /** Indicates whether your app links browsing history to the user's identity. */
  'privacy/collected_data/browsing_history/linked_to_user': boolean;
  /** Indicates whether your app uses browsing history for tracking. */
  'privacy/collected_data/browsing_history/used_for_tracking': boolean;
  /** Indicates whether your app collects coarse location data. */
  'privacy/collected_data/coarse_location/collected': boolean;
  /**
   * The reasons your app collects coarse location data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/coarse_location/collection_purposes': int;
  /** Indicates whether your app links coarse location data to the user's identity. */
  'privacy/collected_data/coarse_location/linked_to_user': boolean;
  /** Indicates whether your app uses coarse location data for tracking. */
  'privacy/collected_data/coarse_location/used_for_tracking': boolean;
  /** Indicates whether your app collects contacts. */
  'privacy/collected_data/contacts/collected': boolean;
  /**
   * The reasons your app collects contacts. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/contacts/collection_purposes': int;
  /** Indicates whether your app links contacts to the user's identity. */
  'privacy/collected_data/contacts/linked_to_user': boolean;
  /** Indicates whether your app uses contacts for tracking. */
  'privacy/collected_data/contacts/used_for_tracking': boolean;
  /** Indicates whether your app collects crash data. */
  'privacy/collected_data/crash_data/collected': boolean;
  /**
   * The reasons your app collects crash data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/crash_data/collection_purposes': int;
  /** Indicates whether your app links crash data to the user's identity. */
  'privacy/collected_data/crash_data/linked_to_user': boolean;
  /** Indicates whether your app uses crash data for tracking. */
  'privacy/collected_data/crash_data/used_for_tracking': boolean;
  /** Indicates whether your app collects credit information. */
  'privacy/collected_data/credit_info/collected': boolean;
  /**
   * The reasons your app collects credit information. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/credit_info/collection_purposes': int;
  /** Indicates whether your app links credit information to the user's identity. */
  'privacy/collected_data/credit_info/linked_to_user': boolean;
  /** Indicates whether your app uses credit information for tracking. */
  'privacy/collected_data/credit_info/used_for_tracking': boolean;
  /** Indicates whether your app collects customer support data. */
  'privacy/collected_data/customer_support/collected': boolean;
  /**
   * The reasons your app collects customer support data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/customer_support/collection_purposes': int;
  /** Indicates whether your app links customer support data to the user's identity. */
  'privacy/collected_data/customer_support/linked_to_user': boolean;
  /** Indicates whether your app uses customer support data for tracking. */
  'privacy/collected_data/customer_support/used_for_tracking': boolean;
  /** Indicates whether your app collects device IDs. */
  'privacy/collected_data/device_id/collected': boolean;
  /**
   * The reasons your app collects device IDs. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/device_id/collection_purposes': int;
  /** Indicates whether your app links device IDs to the user's identity. */
  'privacy/collected_data/device_id/linked_to_user': boolean;
  /** Indicates whether your app uses device IDs for tracking. */
  'privacy/collected_data/device_id/used_for_tracking': boolean;
  /** Indicates whether your app collects email address. */
  'privacy/collected_data/email_address/collected': boolean;
  /**
   * The reasons your app collects email address. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/email_address/collection_purposes': int;
  /** Indicates whether your app links email address to the user's identity. */
  'privacy/collected_data/email_address/linked_to_user': boolean;
  /** Indicates whether your app uses email address for tracking. */
  'privacy/collected_data/email_address/used_for_tracking': boolean;
  /** Indicates whether your app collects emails or text messages. */
  'privacy/collected_data/emails_or_text_messages/collected': boolean;
  /**
   * The reasons your app collects emails or text messages. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/emails_or_text_messages/collection_purposes': int;
  /** Indicates whether your app links emails or text messages to the user's identity. */
  'privacy/collected_data/emails_or_text_messages/linked_to_user': boolean;
  /** Indicates whether your app uses emails or text messages for tracking. */
  'privacy/collected_data/emails_or_text_messages/used_for_tracking': boolean;
  /** Indicates whether your app collects environment scanning data. */
  'privacy/collected_data/environment_scanning/collected': boolean;
  /**
   * The reasons your app collects environment scanning data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/environment_scanning/collection_purposes': int;
  /** Indicates whether your app links environment scanning data to the user's identity. */
  'privacy/collected_data/environment_scanning/linked_to_user': boolean;
  /** Indicates whether your app uses environment scanning data for tracking. */
  'privacy/collected_data/environment_scanning/used_for_tracking': boolean;
  /** Indicates whether your app collects fitness and exercise data. */
  'privacy/collected_data/fitness/collected': boolean;
  /**
   * The reasons your app collects fitness and exercise data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/fitness/collection_purposes': int;
  /** Indicates whether your app links fitness and exercise data to the user's identity. */
  'privacy/collected_data/fitness/linked_to_user': boolean;
  /** Indicates whether your app uses fitness and exercise data for tracking. */
  'privacy/collected_data/fitness/used_for_tracking': boolean;
  /** Indicates whether your app collects gameplay content. */
  'privacy/collected_data/gameplay_content/collected': boolean;
  /**
   * The reasons your app collects gameplay content. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/gameplay_content/collection_purposes': int;
  /** Indicates whether your app links gameplay content to the user's identity. */
  'privacy/collected_data/gameplay_content/linked_to_user': boolean;
  /** Indicates whether your app uses gameplay content for tracking. */
  'privacy/collected_data/gameplay_content/used_for_tracking': boolean;
  /** Indicates whether your app collects user's hand structure and hand movements. */
  'privacy/collected_data/hands/collected': boolean;
  /**
   * The reasons your app collects user's hand structure and hand movements. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/hands/collection_purposes': int;
  /** Indicates whether your app links user's hand structure and hand movements to the user's identity. */
  'privacy/collected_data/hands/linked_to_user': boolean;
  /** Indicates whether your app uses user's hand structure and hand movements for tracking. */
  'privacy/collected_data/hands/used_for_tracking': boolean;
  /** Indicates whether your app collects user's head movement. */
  'privacy/collected_data/head/collected': boolean;
  /**
   * The reasons your app collects user's head movement. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/head/collection_purposes': int;
  /** Indicates whether your app links user's head movement to the user's identity. */
  'privacy/collected_data/head/linked_to_user': boolean;
  /** Indicates whether your app uses user's head movement for tracking. */
  'privacy/collected_data/head/used_for_tracking': boolean;
  /** Indicates whether your app collects health and medical data. */
  'privacy/collected_data/health/collected': boolean;
  /**
   * The reasons your app collects health and medical data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/health/collection_purposes': int;
  /** Indicates whether your app links health and medical data to the user's identity. */
  'privacy/collected_data/health/linked_to_user': boolean;
  /** Indicates whether your app uses health and medical data for tracking. */
  'privacy/collected_data/health/used_for_tracking': boolean;
  /** Indicates whether your app collects user's name. */
  'privacy/collected_data/name/collected': boolean;
  /**
   * The reasons your app collects user's name. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/name/collection_purposes': int;
  /** Indicates whether your app links user's name to the user's identity. */
  'privacy/collected_data/name/linked_to_user': boolean;
  /** Indicates whether your app uses user's name for tracking. */
  'privacy/collected_data/name/used_for_tracking': boolean;
  /** Indicates whether your app collects any other contact information. */
  'privacy/collected_data/other_contact_info/collected': boolean;
  /**
   * The reasons your app collects any other contact information. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/other_contact_info/collection_purposes': int;
  /** Indicates whether your app links any other contact information to the user's identity. */
  'privacy/collected_data/other_contact_info/linked_to_user': boolean;
  /** Indicates whether your app uses any other contact information for tracking. */
  'privacy/collected_data/other_contact_info/used_for_tracking': boolean;
  /** Indicates whether your app collects any other data. */
  'privacy/collected_data/other_data_types/collected': boolean;
  /**
   * The reasons your app collects any other data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/other_data_types/collection_purposes': int;
  /** Indicates whether your app links any other data to the user's identity. */
  'privacy/collected_data/other_data_types/linked_to_user': boolean;
  /** Indicates whether your app uses any other data for tracking. */
  'privacy/collected_data/other_data_types/used_for_tracking': boolean;
  /** Indicates whether your app collects any other diagnostic data. */
  'privacy/collected_data/other_diagnostic_data/collected': boolean;
  /**
   * The reasons your app collects any other diagnostic data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/other_diagnostic_data/collection_purposes': int;
  /** Indicates whether your app links any other diagnostic data to the user's identity. */
  'privacy/collected_data/other_diagnostic_data/linked_to_user': boolean;
  /** Indicates whether your app uses any other diagnostic data for tracking. */
  'privacy/collected_data/other_diagnostic_data/used_for_tracking': boolean;
  /** Indicates whether your app collects any other financial information. */
  'privacy/collected_data/other_financial_info/collected': boolean;
  /**
   * The reasons your app collects any other financial information. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/other_financial_info/collection_purposes': int;
  /** Indicates whether your app links any other financial information to the user's identity. */
  'privacy/collected_data/other_financial_info/linked_to_user': boolean;
  /** Indicates whether your app uses any other financial information for tracking. */
  'privacy/collected_data/other_financial_info/used_for_tracking': boolean;
  /** Indicates whether your app collects any other usage data. */
  'privacy/collected_data/other_usage_data/collected': boolean;
  /**
   * The reasons your app collects any other usage data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/other_usage_data/collection_purposes': int;
  /** Indicates whether your app links any other usage data to the user's identity. */
  'privacy/collected_data/other_usage_data/linked_to_user': boolean;
  /** Indicates whether your app uses any other usage data for tracking. */
  'privacy/collected_data/other_usage_data/used_for_tracking': boolean;
  /** Indicates whether your app collects any other user generated content. */
  'privacy/collected_data/other_user_content/collected': boolean;
  /**
   * The reasons your app collects any other user generated content. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/other_user_content/collection_purposes': int;
  /** Indicates whether your app links any other user generated content to the user's identity. */
  'privacy/collected_data/other_user_content/linked_to_user': boolean;
  /** Indicates whether your app uses any other user generated content for tracking. */
  'privacy/collected_data/other_user_content/used_for_tracking': boolean;
  /** Indicates whether your app collects payment information. */
  'privacy/collected_data/payment_info/collected': boolean;
  /**
   * The reasons your app collects payment information. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/payment_info/collection_purposes': int;
  /** Indicates whether your app links payment information to the user's identity. */
  'privacy/collected_data/payment_info/linked_to_user': boolean;
  /** Indicates whether your app uses payment information for tracking. */
  'privacy/collected_data/payment_info/used_for_tracking': boolean;
  /** Indicates whether your app collects performance data. */
  'privacy/collected_data/performance_data/collected': boolean;
  /**
   * The reasons your app collects performance data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/performance_data/collection_purposes': int;
  /** Indicates whether your app links performance data to the user's identity. */
  'privacy/collected_data/performance_data/linked_to_user': boolean;
  /** Indicates whether your app uses performance data for tracking. */
  'privacy/collected_data/performance_data/used_for_tracking': boolean;
  /** Indicates whether your app collects phone number. */
  'privacy/collected_data/phone_number/collected': boolean;
  /**
   * The reasons your app collects phone number. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/phone_number/collection_purposes': int;
  /** Indicates whether your app links phone number to the user's identity. */
  'privacy/collected_data/phone_number/linked_to_user': boolean;
  /** Indicates whether your app uses phone number for tracking. */
  'privacy/collected_data/phone_number/used_for_tracking': boolean;
  /** Indicates whether your app collects photos or videos. */
  'privacy/collected_data/photos_or_videos/collected': boolean;
  /**
   * The reasons your app collects photos or videos. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/photos_or_videos/collection_purposes': int;
  /** Indicates whether your app links photos or videos to the user's identity. */
  'privacy/collected_data/photos_or_videos/linked_to_user': boolean;
  /** Indicates whether your app uses photos or videos for tracking. */
  'privacy/collected_data/photos_or_videos/used_for_tracking': boolean;
  /** Indicates whether your app collects physical address. */
  'privacy/collected_data/physical_address/collected': boolean;
  /**
   * The reasons your app collects physical address. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/physical_address/collection_purposes': int;
  /** Indicates whether your app links physical address to the user's identity. */
  'privacy/collected_data/physical_address/linked_to_user': boolean;
  /** Indicates whether your app uses physical address for tracking. */
  'privacy/collected_data/physical_address/used_for_tracking': boolean;
  /** Indicates whether your app collects precise location data. */
  'privacy/collected_data/precise_location/collected': boolean;
  /**
   * The reasons your app collects precise location data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/precise_location/collection_purposes': int;
  /** Indicates whether your app links precise location data to the user's identity. */
  'privacy/collected_data/precise_location/linked_to_user': boolean;
  /** Indicates whether your app uses precise location data for tracking. */
  'privacy/collected_data/precise_location/used_for_tracking': boolean;
  /** Indicates whether your app collects product interaction data. */
  'privacy/collected_data/product_interaction/collected': boolean;
  /**
   * The reasons your app collects product interaction data. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/product_interaction/collection_purposes': int;
  /** Indicates whether your app links product interaction data to the user's identity. */
  'privacy/collected_data/product_interaction/linked_to_user': boolean;
  /** Indicates whether your app uses product interaction data for tracking. */
  'privacy/collected_data/product_interaction/used_for_tracking': boolean;
  /** Indicates whether your app collects purchase history. */
  'privacy/collected_data/purchase_history/collected': boolean;
  /**
   * The reasons your app collects purchase history. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/purchase_history/collection_purposes': int;
  /** Indicates whether your app links purchase history to the user's identity. */
  'privacy/collected_data/purchase_history/linked_to_user': boolean;
  /** Indicates whether your app uses purchase history for tracking. */
  'privacy/collected_data/purchase_history/used_for_tracking': boolean;
  /** Indicates whether your app collects search history. */
  'privacy/collected_data/search_history/collected': boolean;
  /**
   * The reasons your app collects search history. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/search_history/collection_purposes': int;
  /** Indicates whether your app links search history to the user's identity. */
  'privacy/collected_data/search_history/linked_to_user': boolean;
  /** Indicates whether your app uses search history for tracking. */
  'privacy/collected_data/search_history/used_for_tracking': boolean;
  /** Indicates whether your app collects sensitive user information. */
  'privacy/collected_data/sensitive_info/collected': boolean;
  /**
   * The reasons your app collects sensitive user information. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/sensitive_info/collection_purposes': int;
  /** Indicates whether your app links sensitive user information to the user's identity. */
  'privacy/collected_data/sensitive_info/linked_to_user': boolean;
  /** Indicates whether your app uses sensitive user information for tracking. */
  'privacy/collected_data/sensitive_info/used_for_tracking': boolean;
  /** Indicates whether your app collects user IDs. */
  'privacy/collected_data/user_id/collected': boolean;
  /**
   * The reasons your app collects user IDs. See Describing data use in privacy manifests (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).
   */
  'privacy/collected_data/user_id/collection_purposes': int;
  /** Indicates whether your app links user IDs to the user's identity. */
  'privacy/collected_data/user_id/linked_to_user': boolean;
  /** Indicates whether your app uses user IDs for tracking. */
  'privacy/collected_data/user_id/used_for_tracking': boolean;
  /**
   * The reasons your app use free disk space API. See Describing use of required reason API (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).
   */
  'privacy/disk_space_access_reasons': int;
  /**
   * The reasons your app use file timestamp/metadata API. See Describing use of required reason API (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).
   */
  'privacy/file_timestamp_access_reasons': int;
  /** A message displayed when requesting access to the device's microphone (in English). */
  'privacy/microphone_usage_description': string;
  /** A message displayed when requesting access to the device's microphone (localized). */
  'privacy/microphone_usage_description_localized': Dictionary;
  /** A message displayed when requesting access to the user's photo library (in English). */
  'privacy/photolibrary_usage_description': string;
  /** A message displayed when requesting access to the user's photo library (localized). */
  'privacy/photolibrary_usage_description_localized': Dictionary;
  /**
   * The reasons your app use system boot time / absolute time API. See Describing use of required reason API (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).
   */
  'privacy/system_boot_time_access_reasons': int;
  /**
   * The list of internet domains your app connects to that engage in tracking. See Privacy manifest files (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files).
   */
  'privacy/tracking_domains': PackedStringArray;
  /**
   * Indicates whether your app uses data for tracking. See Privacy manifest files (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files).
   */
  'privacy/tracking_enabled': boolean;
  /**
   * The reasons your app use user defaults API. See Describing use of required reason API (https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).
   */
  'privacy/user_defaults_access_reasons': int;
  /**
   * If `true`, shaders will be compiled and embedded in the application. This option is only supported when using the Forward+ or Mobile renderers.
   * **Note:** When exporting as a dedicated server, the shader baker is always disabled since no rendering is performed.
   */
  'shader_baker/enabled': boolean;
  /** A custom background color of the storyboard launch screen. */
  'storyboard/custom_bg_color': Color;
  /**
   * Application launch screen image file (2x DPI). If left empty, it will fallback to {@link ProjectSettings.application/boot_splash/image}.
   */
  'storyboard/custom_image@2x': string;
  /**
   * Application launch screen image file (3x DPI). If left empty, it will fallback to {@link ProjectSettings.application/boot_splash/image}.
   */
  'storyboard/custom_image@3x': string;
  /** Launch screen image scaling mode. */
  'storyboard/image_scale_mode': int;
  /**
   * If `true`, {@link storyboard/custom_bg_color} is used as a launch screen background color, otherwise `application/boot_splash/bg_color` project setting is used.
   */
  'storyboard/use_custom_bg_color': boolean;
  /**
   * If `true`, the app "Documents" folder can be accessed via "Files" app. See LSSupportsOpeningDocumentsInPlace (https://developer.apple.com/documentation/bundleresources/information_property_list/lssupportsopeningdocumentsinplace).
   */
  'user_data/accessible_from_files_app': boolean;
  /**
   * If `true`, the app "Documents" folder can be accessed via iTunes file sharing. See UIFileSharingEnabled (https://developer.apple.com/documentation/bundleresources/information_property_list/uifilesharingenabled).
   */
  'user_data/accessible_from_itunes_sharing': boolean;
}
