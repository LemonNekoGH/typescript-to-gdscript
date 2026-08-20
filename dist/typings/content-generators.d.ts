import type { ParseSceneResult } from './scene-parser.ts';
import type { AutoloadEntry } from './scene-utils.ts';
/**
 * Compute a relative `/// <reference path>` from outputDir to godotTypingsDir/index.d.ts.
 * Returns undefined if the index.d.ts doesn't exist.
 */
export declare function resolveGodotTypingsRef(outputDir: string, godotTypingsDir: string): string | undefined;
/**
 * Generate .tscn.d.ts file content for a single scene.
 */
export declare function generateSceneTypingContent(sceneResPath: string, sceneData: ParseSceneResult, uniqueNameNodes: Set<string>, connections?: ResolvedConnection[], uid?: string): string;
/**
 * Generate .gd.d.ts file content for a single script.
 */
export declare function generateScriptTypingContent(scriptResPath: string, className: string, isAnonymous: boolean, tsImportPath: string, tsModulePath: string, enums: Array<{
    name: string;
    members: Array<{
        name: string;
        value: number;
    }>;
}>, innerClasses: Array<{
    name: string;
    extendsName?: string;
}>, extendsNode?: boolean, 
/**
 * When true (default — preserves the legacy behavior used by addons
 * and by projects that opt into `generateGlobalClassTypes: true`), a
 * non-anonymous class is emitted into `declare global` so consumers
 * can use it without an explicit `import`. When false, the class
 * follows the same module-scoped layout as anonymous classes —
 * consumers must import it from the original `.ts` source.
 *
 * Anonymous classes ignore this flag (they're always module-scoped).
 */
generateGlobal?: boolean, uid?: string): string;
/**
 * Generate .d.ts file content for a resource or asset file.
 */
export declare function generateResourceTypingContent(resPath: string, godotType: string): string;
/**
 * Generate _index.d.ts file content with empty global interfaces and autoload declarations.
 */
export declare function generateIndexTypingContent(autoloads: AutoloadEntry[], outputDir?: string, godotTypingsDir?: string): string;
export interface ResolvedConnection {
    sceneResPath: string;
    /** Signal name (e.g. "pressed") */
    signal: string;
    /** Full emitter node path (e.g. "LevelDisplay/VBoxContainer2/MarginContainer/NextLevelButton") */
    fromNode: string;
    /** Godot type of the emitter node (e.g. "Button", "Timer") */
    fromType: string;
    /** Script res:// path of the receiver node */
    receiverScript: string;
    /** Handler method name (e.g. "_on_next_level_button_pressed") */
    method: string;
}
/**
 * Resolve raw scene connections into typed connection info.
 * Matches each connection's receiver node to its attached script.
 */
export declare function resolveConnections(sceneResPath: string, sceneData: ParseSceneResult): ResolvedConnection[];
//# sourceMappingURL=content-generators.d.ts.map