/**
 * Godot error output parser and false-positive filtering.
 */
import { existsSync, readFileSync, readdirSync } from 'fs';
import { resolve, join, relative, isAbsolute } from 'path';
import { parseAutoloads } from "../typings/scenes.js";
// ─── Autoload Error Filtering ────────────────────────────────
/**
 * Collects autoload singleton names from project.godot.
 * Used to filter false-positive "Identifier not found" errors caused by
 * Godot bug https://github.com/godotengine/godot/issues/80319
 * (--check-only --script doesn't load autoloads).
 */
export function getAutoloadNames(projectRoot) {
    const projectFile = join(projectRoot, 'project.godot');
    if (!existsSync(projectFile))
        return new Set();
    const autoloads = parseAutoloads(projectFile);
    return new Set(autoloads.map((a) => a.name));
}
/**
 * Returns true if the error is a false positive caused by Godot not loading
 * autoloads in --check-only mode.
 */
export function isAutoloadFalsePositive(error, autoloadNames) {
    if (autoloadNames.size === 0)
        return false;
    // Format 1: "Identifier not found: GameManager"
    // Format 2: "Identifier "Globals" not declared in the current scope."
    const match1 = error.message.match(/^Identifier not found: (\w+)/);
    if (match1 && autoloadNames.has(match1[1]))
        return true;
    const match2 = error.message.match(/^Identifier "(\w+)" not declared/);
    if (match2 && autoloadNames.has(match2[1]))
        return true;
    return false;
}
/**
 * `class_name` declarations found in the given `.gd` files.
 *
 * Unreadable files are skipped — a missing file is the caller's
 * problem to report, not this helper's.
 */
export function collectDeclaredClassNames(gdFilePaths) {
    const names = new Set();
    for (const filePath of gdFilePaths) {
        let source;
        try {
            source = readFileSync(filePath, 'utf-8');
        }
        catch {
            continue;
        }
        for (const m of source.matchAll(/^class_name[ 	]+(\w+)/gm)) {
            names.add(m[1]);
        }
    }
    return names;
}
/**
 * `class_name` declarations under a directory tree, recursively.
 *
 * A missing or unreadable directory yields an empty set rather than
 * throwing: "no output tree yet" is the honest answer for a check that
 * runs before anything has been converted, and it is the same answer
 * the per-file read gives for a file it cannot open.
 */
export function collectDeclaredClassNamesUnder(gdDir) {
    let entries;
    try {
        entries = readdirSync(gdDir, { recursive: true, encoding: 'utf-8' });
    }
    catch {
        return new Set();
    }
    return collectDeclaredClassNames(entries.filter((f) => f.endsWith('.gd')).map((f) => resolve(gdDir, f)));
}
/**
 * True when the error is an "identifier not found" naming a class that
 * one of the files under validation declares with `class_name`.
 *
 * A script reaches its own class-level members through its class name
 * (`MyClass.CONST`) — the only spelling valid inside a `static func`,
 * where `self` doesn't exist. Godot resolves that name through the
 * project-wide global class cache, which only an import pass
 * populates, and `--check-only` does not import. So a freshly
 * generated or just-renamed script reports
 * `Identifier not found: MyClass` against perfectly good code.
 *
 * The class is right there in the source being checked, so this is
 * Godot's index lagging rather than a real error. Narrow by
 * construction: a not-found for a name nothing declares still
 * surfaces.
 */
export function isUnindexedOwnClassFalsePositive(error, declaredClassNames) {
    if (declaredClassNames.size === 0)
        return false;
    return [
        /Identifier not found: (\w+)/,
        /Identifier "(\w+)" not declared/,
    ].some((re) => {
        const name = error.message.match(re)?.[1];
        return name !== undefined && declaredClassNames.has(name);
    });
}
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
export function isDuplicateClassFalsePositive(error, projectRoot, cacheDir) {
    if (!/^Class ".*" hides a global script class/.test(error.message))
        return false;
    return isUnderScratchDir(error.file, projectRoot, cacheDir);
}
/**
 * True when `filePath` lives outside `projectRoot` (a temp dir) OR
 * inside `cacheDir` (the ProjectCache's gd-output mirror). Shared by
 * the parsed-error filter and the unparsed-output fallback so both
 * paths agree on what counts as a throwaway mirror.
 */
export function isUnderScratchDir(filePath, projectRoot, cacheDir) {
    // Outside-project check. On Windows, `relative()` returns an
    // absolute path when the two paths are on different drives.
    const relProj = relative(projectRoot, filePath);
    if (relProj.startsWith('..') || isAbsolute(relProj))
        return true;
    // Inside the configured cache dir (if any).
    if (cacheDir) {
        const relCache = relative(cacheDir, filePath);
        if (relCache === '')
            return true;
        if (!relCache.startsWith('..') && !isAbsolute(relCache))
            return true;
    }
    return false;
}
// ─── Error Parsing ───────────────────────────────────────────
/**
 * Resolves a `res://` path to an absolute path relative to the project root.
 */
export function resolveResPath(resPath, projectRoot) {
    // res://scripts/player.gd -> scripts/player.gd
    const rel = resPath.replace(/^res:\/\//, '');
    return resolve(projectRoot, rel);
}
/**
 * Parses Godot CLI stderr output into structured error objects.
 * Handles multiple known Godot error output formats.
 */
export function parseGodotErrors(stderr, projectRoot) {
    const errors = [];
    const lines = stderr.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Format 1: "res://path.gd:15 - Parse Error: message"
        // Format 1b: "res://path.gd:15:3 - Parse Error: message"
        const resMatch = line.match(/^\s*res:\/\/(.+?):(\d+)(?::(\d+))?\s*-\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/);
        if (resMatch) {
            errors.push({
                file: resolveResPath('res://' + resMatch[1], projectRoot),
                line: parseInt(resMatch[2], 10),
                column: resMatch[3] ? parseInt(resMatch[3], 10) : 0,
                errorType: resMatch[4],
                message: resMatch[5].trim(),
            });
            continue;
        }
        // Format 2: "SCRIPT ERROR: Parse Error: message"
        // followed by "   at: res://path.gd:15" or "   at: GDScript::reload (res://path.gd:15)"
        const scriptErrorMatch = line.match(/^\s*SCRIPT ERROR:\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/);
        if (scriptErrorMatch) {
            const nextLine = lines[i + 1];
            if (nextLine) {
                // Match "at: res://file.gd:15" and "at: GDScript::reload (res://file.gd:15)"
                const atMatch = nextLine.match(/^\s*at:\s*(?:\S+\s+\()?res:\/\/(.+?):(\d+)(?::(\d+))?\)?/);
                if (atMatch) {
                    errors.push({
                        file: resolveResPath('res://' + atMatch[1], projectRoot),
                        line: parseInt(atMatch[2], 10),
                        column: atMatch[3] ? parseInt(atMatch[3], 10) : 0,
                        errorType: scriptErrorMatch[1],
                        message: scriptErrorMatch[2].trim(),
                    });
                    i++; // Skip the "at:" line
                    continue;
                }
                // Match absolute path: "at: GDScript::reload (C:\path\file.gd:15)" or "at: C:\path\file.gd:15"
                const atAbsMatch = nextLine.match(/^\s*at:\s*(?:\S+\s+\()?(.+\.gd):(\d+)(?::(\d+))?\)?/);
                if (atAbsMatch) {
                    errors.push({
                        file: resolve(atAbsMatch[1]),
                        line: parseInt(atAbsMatch[2], 10),
                        column: atAbsMatch[3] ? parseInt(atAbsMatch[3], 10) : 0,
                        errorType: scriptErrorMatch[1],
                        message: scriptErrorMatch[2].trim(),
                    });
                    i++; // Skip the "at:" line
                    continue;
                }
            }
        }
        // Skip generic "ERROR: Failed to load script" lines (not actionable, follows SCRIPT ERROR)
        if (/^\s*ERROR:\s*Failed to load script/.test(line)) {
            // Also skip the following "at:" line
            if (lines[i + 1] && /^\s*at:/.test(lines[i + 1]))
                i++;
            continue;
        }
        // Format 3: Absolute/relative path "path/file.gd:15 - Parse Error: message"
        const absMatch = line.match(/^\s*(.+\.gd):(\d+)(?::(\d+))?\s*-\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/);
        if (absMatch) {
            errors.push({
                file: resolve(projectRoot, absMatch[1]),
                line: parseInt(absMatch[2], 10),
                column: absMatch[3] ? parseInt(absMatch[3], 10) : 0,
                errorType: absMatch[4],
                message: absMatch[5].trim(),
            });
        }
    }
    return errors;
}
//# sourceMappingURL=error-parser.js.map