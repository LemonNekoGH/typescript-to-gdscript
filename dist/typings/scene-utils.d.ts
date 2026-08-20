import ts from 'typescript';
import type { GodotClassRegistry } from './godot-registry.ts';
export interface EnumMemberInfo {
    name: string;
    value: number;
}
export interface EnumInfo {
    name: string;
    members: EnumMemberInfo[];
}
export interface InnerClassInfo {
    name: string;
    extendsName?: string;
}
export interface ScriptInfo {
    className: string;
    isAnonymous: boolean;
    tsAbsPath: string;
    enums: EnumInfo[];
    innerClasses: InnerClassInfo[];
    /** Whether this class extends Node (directly or transitively). */
    extendsNode: boolean;
}
export interface ScriptClassInfo {
    className: string;
    tsModulePath: string;
    /** Absolute path to the .ts source file */
    tsAbsPath: string;
    extendsClassName?: string;
}
export interface ScriptlessSceneInfo {
    alias: string;
    rootType: string;
    sceneMap?: Map<string, string>;
}
export interface AutoloadEntry {
    /** Global singleton name (e.g. "Globals", "LevelTransition") */
    name: string;
    /** Resource path (e.g. "res://Scripts/Globals.gd" or "res://level_transition.tscn") */
    resPath: string;
}
/**
 * Resolved signal handler info: method name -> typed parameters.
 */
export interface SignalHandlerInfo {
    /** Signal handler method name (e.g. "_on_area_entered") */
    method: string;
    /** Typed parameters from the connected signal */
    params: Array<{
        name: string;
        gdType: string;
    }>;
}
/** Derive a synthetic alias from a scene res:// path, e.g. "res://Level2.tscn" -> "_Level2Tscn" */
export declare function sceneResPathToAlias(resPath: string): string;
/** Derive output file name from scene res:// path, e.g. "res://Player.tscn" -> "Player.tscn.d.ts" */
export declare function sceneResPathToOutputFile(resPath: string): string;
/** Derive output file name from script res:// path, e.g. "res://Player.gd" -> "Player.gd.d.ts" */
export declare function scriptResPathToOutputFile(resPath: string): string;
/** Derive scene tree interface name from scene res:// path, e.g. "res://Player.tscn" -> "_PlayerTscn_Tree" */
export declare function sceneResPathToTreeName(resPath: string): string;
/** Derive __Trees interface name from script res:// path, e.g. "res://Player.gd" -> "__PlayerGd__Trees" */
export declare function scriptResPathToTreesInterfaceName(resPath: string): string;
/** Derive __Parents interface name from scene res:// path, e.g. "res://Player.tscn" -> "__PlayerTscn__Parents" */
export declare function sceneResPathToParentsInterfaceName(resPath: string): string;
/** Derive a type name for a node in a scene, e.g. ("_PlayerTscn", "Sprite2D/AnimationPlayer") -> "_PlayerTscn_Sprite2D_AnimationPlayer" */
export declare function nodePathToTypeName(sceneAlias: string, nodePath: string): string;
/** Derive output file name from a resource res:// path, e.g. "res://material.tres" -> "material.tres.d.ts" */
export declare function resourceResPathToOutputFile(resPath: string): string;
/**
 * Compute a relative import path from an output file to a TS source
 * file. The project default is `moduleResolution: "classic"` (set by
 * the `tstogd init` template), which resolves bare-name specifiers
 * via the `.ts` extension search order — so we strip the trailing
 * `.ts` and emit no extension at all. Callers that need the original
 * `.ts` form (for `declare module "<path>"`) can re-append it; see
 * `tsModulePath` in `src/typings/scenes.ts`.
 */
export declare function computeTsImport(outputDir: string, fromOutputFile: string, tsAbsPath: string): string;
/** Convert an absolute file path to a res:// path relative to rootDir */
export declare function absPathToResPath(absPath: string, rootDir: string): string;
/**
 * Resolves signal handler types for a GDScript file by scanning .tscn scenes for connections.
 *
 * Given a script's res:// path, finds all scenes that reference it, parses their connections,
 * and looks up signal parameter types from the Godot class registry.
 *
 * @param scriptResPath - The res:// path of the GD script (e.g. "res://Player.gd")
 * @param sceneFiles - Array of absolute paths to .tscn files to scan
 * @param registry - GodotClassRegistry for signal parameter lookup
 * @returns Map of method name -> typed parameter info
 */
export declare function resolveSignalHandlers(scriptResPath: string, sceneFiles: string[], registry: GodotClassRegistry): Map<string, SignalHandlerInfo>;
/**
 * Pre-collects signal handler types for ALL scripts by parsing all scenes ONCE.
 * Returns Map<scriptResPath, Map<methodName, SignalHandlerInfo>>.
 * This is much faster than calling resolveSignalHandlers() per script file,
 * which would re-parse all scenes for every .gd file.
 */
export declare function collectAllSignalHandlers(sceneFiles: string[], registry: GodotClassRegistry): Map<string, Map<string, SignalHandlerInfo>>;
/**
 * Parses the [autoload] section from a project.godot file.
 * Autoload entries look like: `Name="*res://path.gd"`, `Name="*res://path.tscn"`,
 * or `Name="*uid://..."` (Godot 4.4+).
 * The `*` prefix means the autoload is enabled.
 */
export declare function parseAutoloads(projectFilePath: string): AutoloadEntry[];
export declare function scanTsFilesForClasses(program: ts.Program, files: string[], baseDir: string, scriptClassMap: Map<string, ScriptInfo>, registry?: GodotClassRegistry, 
/**
 * When `true`, the addon-specific anonymity rule applies: only the
 * sentinel `_$CLASS$_` counts as anonymous. Other `_`-prefixed names
 * (e.g. `class_name _Foo` in a third-party addon) are treated as
 * NAMED classes and emitted into `declare global`. Outside addon
 * mode the legacy rule still applies — any `_`-prefixed name is
 * anonymous (filename-derived).
 */
isAddon?: boolean): void;
/**
 * Parses the `[gd_resource type="..."]` header from a .tres/.res file
 * to determine the actual Godot resource class (e.g. "ShaderMaterial", "AudioStreamOggVorbis").
 * Returns undefined if the header cannot be parsed (binary .res files, corrupt files, etc.).
 */
export declare function parseGdResourceType(filePath: string): string | undefined;
/**
 * Resolves the Godot UID (`uid://…`) for a resource file, however it is
 * stored: `.uid` sidecar (scripts/shaders, Godot 4.4+), `.import` sidecar
 * (imported assets), or the `.tscn`/`.tres` header. Returns undefined when no
 * uid is present (e.g. the project has not been imported by Godot yet) — the
 * caller then emits only the `res://` key.
 */
export declare function resolveResourceUid(absPath: string): string | undefined;
/** Known Godot asset extensions -> Godot resource type name */
export declare const ASSET_EXTENSION_MAP: Record<string, string>;
/** Extensions recognized as Godot asset files (for GodotResources scanning) */
export declare const ASSET_EXTENSIONS: Set<string>;
export declare function findProjectFiles(dir: string, rootDir: string, ignore: string[], extensions: Set<string>): string[];
export declare function findSceneFiles(dir: string, rootDir: string, ignore: string[]): string[];
export declare function findAssetFiles(dir: string, rootDir: string, ignore: string[]): string[];
//# sourceMappingURL=scene-utils.d.ts.map