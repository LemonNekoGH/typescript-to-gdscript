/**
 * CLI command: open-editor
 *
 * Maps a GDScript file to its TypeScript source and opens it in an external editor.
 * Designed to be used as Godot's external text editor command.
 *
 * Godot Editor Settings → Text Editor → External:
 *   Exec Path:  tstogd (or npx tstogd, or full path)
 *   Exec Flags: open-editor -f {file} -p {project} -e "code --goto {tsFile}:{line}:{col}"
 *
 * Godot replaces {file}, {line}, {col}, {project} before calling the script.
 * The script only replaces {tsFile} with the mapped TypeScript file path.
 *
 * Examples:
 *   VS Code:   -e "code --goto {tsFile}:{line}:{col}"
 *   WebStorm:  -e "webstorm --line {line} --column {col} {tsFile}"
 *   Vim:       -e "vim +{line} {tsFile}"
 */
import type { Command } from 'commander';
export declare function registerOpenEditorCommand(program: Command): void;
//# sourceMappingURL=open-editor.d.ts.map