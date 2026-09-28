// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Exporter for Linux/BSD. */
declare class EditorExportPlatformLinuxBSD extends EditorExportPlatformPC {
  /**
   * Application executable architecture.
   * Supported architectures: `x86_32`, `x86_64`, `arm64`, `arm32`, `rv64`, `ppc64`, and `loongarch64`.
   * Official export templates include `x86_32`, `x86_64`, `arm32`, and `arm64` binaries only.
   */
  'binary_format/architecture': string;
  /** If `true`, project resources are embedded into the executable. */
  'binary_format/embed_pck': boolean;
  /** Path to the custom export template. If left empty, default template is used. */
  'custom_template/debug': string;
  /** Path to the custom export template. If left empty, default template is used. */
  'custom_template/release': string;
  /**
   * If `true`, a console wrapper is exported alongside the main executable, which allows running the project with enabled console output.
   */
  'debug/export_console_wrapper': int;
  /**
   * If `true`, shaders will be compiled and embedded in the application. This option is only supported when using the Forward+ or Mobile renderers.
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
