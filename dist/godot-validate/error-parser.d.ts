/**
 * Godot error output parser and false-positive filtering.
 */
export interface GodotRawError {
    /** Absolute file path */
    file: string;
    /** 1-based line number */
    line: number;
    /** 0-based column number (often 0 when Godot doesn't report it) */
    column: number;
    /** Error type: "Parse Error", "Compile Error", etc. */
    errorType: string;
    /** Error message */
    message: string;
}
/**
 * Collects autoload singleton names from project.godot.
 * Used to filter false-positive "Identifier not found" errors caused by
 * Godot bug https://github.com/godotengine/godot/issues/80319
 * (--check-only --script doesn't load autoloads).
 */
export declare function getAutoloadNames(projectRoot: string): Set<string>;
/**
 * Returns true if the error is a false positive caused by Godot not loading
 * autoloads in --check-only mode.
 */
export declare function isAutoloadFalsePositive(error: GodotRawError, autoloadNames: Set<string>): boolean;
/**
 * Returns true if the error is a false positive caused by validating a
 * tmp copy of a GD file while the original still exists in the project.
 * Godot reports: 'Class "Foo" hides a global script class.'
 *
 * Suppresses when the file is EITHER:
 *   - outside `projectRoot` (a temp copy on a different path, e.g. a
 *     CLI scratch dir under `os.tmpdir()`), OR
 *   - inside `cacheDir` (the `<cacheDir>/gd-output/…` mirror). The
 *     cache dir may live under the project tree when the user
 *     configures it there, so the outside-project check alone doesn't
 *     catch it.
 *
 * `cacheDir` is resolved upfront by the caller from the project's
 * `tstogd.json` — we don't walk the filesystem per-error.
 *
 * Any remaining match is a real conflict between two first-class files
 * inside the project and must surface to the user.
 */
export declare function isDuplicateClassFalsePositive(error: GodotRawError, projectRoot: string, cacheDir?: string): boolean;
/**
 * True when `filePath` lives outside `projectRoot` (a temp dir) OR
 * inside `cacheDir` (the ProjectCache's gd-output mirror). Shared by
 * the parsed-error filter and the unparsed-output fallback so both
 * paths agree on what counts as a throwaway mirror.
 */
export declare function isUnderScratchDir(filePath: string, projectRoot: string, cacheDir?: string): boolean;
/**
 * Resolves a `res://` path to an absolute path relative to the project root.
 */
export declare function resolveResPath(resPath: string, projectRoot: string): string;
/**
 * Parses Godot CLI stderr output into structured error objects.
 * Handles multiple known Godot error output formats.
 */
export declare function parseGodotErrors(stderr: string, projectRoot: string): GodotRawError[];
//# sourceMappingURL=error-parser.d.ts.map