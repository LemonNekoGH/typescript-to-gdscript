// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Exporter for Windows. */
declare class EditorExportPlatformWindows extends EditorExportPlatformPC {
  /**
   * Company that produced the application. Required. See StringFileInfo (https://learn.microsoft.com/en-us/windows/win32/menurc/stringfileinfo-block).
   */
  'application/company_name': string;
  /**
   * Console wrapper icon file. If left empty, it will fallback to {@link application/icon}, then to {@link ProjectSettings.application/config/windows_native_icon}, and lastly, {@link ProjectSettings.application/config/icon}.
   */
  'application/console_wrapper_icon': string;
  /**
   * Copyright notice for the bundle visible to the user. Optional. See StringFileInfo (https://learn.microsoft.com/en-us/windows/win32/menurc/stringfileinfo-block).
   */
  'application/copyright': string;
  /**
   * If `true`, and {@link application/export_d3d12} is set, the Agility SDK DLLs will be stored in arch-specific subdirectories.
   */
  'application/d3d12_agility_sdk_multiarch': boolean;
  /**
   * If set to `1`, ANGLE libraries are exported with the exported application. If set to `0`, ANGLE libraries are exported only if {@link ProjectSettings.rendering/gl_compatibility/driver} is set to `"opengl3_angle"`.
   */
  'application/export_angle': int;
  /**
   * If set to `1`, the Direct3D 12 runtime libraries (Agility SDK, PIX) are exported with the exported application. If set to `0`, Direct3D 12 libraries are exported only if {@link ProjectSettings.rendering/rendering_device/driver} is set to `"d3d12"`.
   */
  'application/export_d3d12': int;
  /**
   * File description to be presented to users. Required. See StringFileInfo (https://learn.microsoft.com/en-us/windows/win32/menurc/stringfileinfo-block).
   */
  'application/file_description': string;
  /**
   * Version number of the file. Falls back to {@link ProjectSettings.application/config/version} if left empty. See StringFileInfo (https://learn.microsoft.com/en-us/windows/win32/menurc/stringfileinfo-block).
   */
  'application/file_version': string;
  /**
   * Application icon file. If left empty, it will fallback to {@link ProjectSettings.application/config/windows_native_icon}, and then to {@link ProjectSettings.application/config/icon}.
   */
  'application/icon': string;
  /** Interpolation method used to resize application icon. */
  'application/icon_interpolation': int;
  /**
   * If enabled, icon and metadata of the exported executable is set according to the other `application/*` values.
   */
  'application/modify_resources': boolean;
  /**
   * Name of the application. Required. See StringFileInfo (https://learn.microsoft.com/en-us/windows/win32/menurc/stringfileinfo-block).
   */
  'application/product_name': string;
  /**
   * Application version visible to the user. Falls back to {@link ProjectSettings.application/config/version} if left empty. See StringFileInfo (https://learn.microsoft.com/en-us/windows/win32/menurc/stringfileinfo-block).
   */
  'application/product_version': string;
  /**
   * Trademarks and registered trademarks that apply to the file. Optional. See StringFileInfo (https://learn.microsoft.com/en-us/windows/win32/menurc/stringfileinfo-block).
   */
  'application/trademarks': string;
  /**
   * Application executable architecture.
   * Supported architectures: `x86_32`, `x86_64`, and `arm64`.
   */
  'binary_format/architecture': string;
  /** If `true`, project resources are embedded into the executable. */
  'binary_format/embed_pck': boolean;
  /**
   * Array of the additional command line arguments passed to the code signing tool. See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   */
  'codesign/custom_options': PackedStringArray;
  /**
   * Description of the signed content. See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   */
  'codesign/description': string;
  /**
   * Digest algorithm to use for creating signature. See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   */
  'codesign/digest_algorithm': int;
  /** If `true`, executable signing is enabled. */
  'codesign/enable': boolean;
  /**
   * PKCS #12 certificate file used to sign executable or certificate SHA-1 hash (if {@link codesign/identity_type} is set to "Use certificate store"). See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   * Can be overridden with the environment variable `GODOT_WINDOWS_CODESIGN_IDENTITY`.
   */
  'codesign/identity': string;
  /**
   * Type of identity to use. See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   * Can be overridden with the environment variable `GODOT_WINDOWS_CODESIGN_IDENTITY_TYPE`.
   */
  'codesign/identity_type': int;
  /**
   * Password for the certificate file used to sign executable. See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   * Can be overridden with the environment variable `GODOT_WINDOWS_CODESIGN_PASSWORD`.
   */
  'codesign/password': string;
  /**
   * If `true`, time-stamp is added to the signature. See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   */
  'codesign/timestamp': boolean;
  /**
   * URL of the time stamp server. If left empty, the default server is used. See Sign Tool (https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe).
   */
  'codesign/timestamp_server_url': string;
  /** Path to the custom export template. If left empty, default template is used. */
  'custom_template/debug': string;
  /** Path to the custom export template. If left empty, default template is used. */
  'custom_template/release': string;
  /**
   * If `true`, a console wrapper executable is exported alongside the main executable, which allows running the project with enabled console output.
   */
  'debug/export_console_wrapper': int;
  /**
   * If `true`, shaders will be compiled and embedded in the application. This option is only supported when using the Forward+ and Mobile renderers.
   * **Note:** When exporting as a dedicated server, the shader baker is always disabled since no rendering is performed.
   */
  'shader_baker/enabled': boolean;
  /**
   * Script code to execute on the remote host when app is finished.
   * The following variables can be used in the script:
   * - `{temp_dir}` - Path of temporary folder on the remote, used to upload app and scripts to.
   * - `{archive_name}` - Name of the ZIP containing uploaded application.
   * - `{exe_name}` - Name of application executable.
   * - `{cmd_args}` - Array of the command line argument for the application.
   */
  'ssh_remote_deploy/cleanup_script': string;
  /** Enables remote deploy using SSH/SCP. */
  'ssh_remote_deploy/enabled': boolean;
  /** Array of the additional command line arguments passed to the SCP. */
  'ssh_remote_deploy/extra_args_scp': string;
  /** Array of the additional command line arguments passed to the SSH. */
  'ssh_remote_deploy/extra_args_ssh': string;
  /** Remote host SSH user name and address, in `user@address` format. */
  'ssh_remote_deploy/host': string;
  /** Remote host SSH port number. */
  'ssh_remote_deploy/port': string;
  /**
   * Script code to execute on the remote host when running the app.
   * The following variables can be used in the script:
   * - `{temp_dir}` - Path of temporary folder on the remote, used to upload app and scripts to.
   * - `{archive_name}` - Name of the ZIP containing uploaded application.
   * - `{exe_name}` - Name of application executable.
   * - `{cmd_args}` - Array of the command line argument for the application.
   */
  'ssh_remote_deploy/run_script': string;
  /** If `true`, project textures are exported in the ETC2/ASTC format. */
  'texture_format/etc2_astc': boolean;
  /** If `true`, project textures are exported in the S3TC/BPTC format. */
  'texture_format/s3tc_bptc': boolean;
}
