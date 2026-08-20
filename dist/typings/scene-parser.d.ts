import { GodotResourceParser } from '../parser/godot-resource/index.ts';
import { type SyntaxNode } from '../parser/godot-resource/types.ts';
export interface SceneNode {
    name: string;
    type: string;
    /** Empty string for root, "." for direct children, "Parent/Child" for nested */
    parent: string;
    /** ext_resource id referenced by `script = ExtResource("id")`, if any */
    scriptExtId?: string;
    /** ext_resource id referenced by `instance=ExtResource("id")`, if any */
    instanceExtId?: string;
    /** Whether this node has `unique_name_in_owner = true` */
    uniqueInOwner?: boolean;
    /** Group names from `groups = ["name1", "name2"]` property */
    groups?: string[];
    /** AST section node (for post-processing sub_resource chains) */
    section?: SyntaxNode;
}
export interface ScriptNodeInfo {
    /** res:// path to the .gd script */
    scriptResPath: string;
    /** Full node path within the scene (e.g. "Ball", "." for root) */
    nodePath: string;
    /** Child nodes with paths relative to this script node */
    children: Array<{
        path: string;
        type: string;
        instanceSceneResPath?: string;
    }>;
}
export interface SceneConnection {
    /** Signal name (e.g. "area_entered") */
    signal: string;
    /** Emitter node path (e.g. "Area2D", "tileset_objects/LevelExit") */
    fromPath: string;
    /** Receiver node path (e.g. ".", "tileset_objects/LevelExit") */
    toPath: string;
    /** Handler method name (e.g. "_on_area_entered") */
    method: string;
}
export interface ParseSceneResult {
    filePath: string;
    scripts: ScriptNodeInfo[];
    rootScript?: {
        scriptResPath: string;
    };
    /** Name of the root node (e.g. "Level", "Player") */
    rootNodeName: string;
    /** When root node instances another scene (inherited scene), this is the instanced scene's res:// path. */
    inheritedSceneResPath?: string;
    connections: SceneConnection[];
    /** Map of full node paths to their Godot type (e.g. "Area2D" → "Area2D") */
    nodeTypes: Map<string, string>;
    /** Map of full node paths to instanced scene res:// paths */
    instancedNodes: Map<string, string>;
    /** Scenes embedded via sub_resource chains (TileMap tiles, etc.) — parentNodePath → { parentType, sceneResPaths } */
    embeddedScenes: Map<string, {
        parentType: string;
        sceneResPaths: string[];
    }>;
    /** Map of group name → array of { nodePath, nodeType, scriptResPath?, instanceSceneResPath? } */
    nodeGroups: Map<string, Array<{
        nodePath: string;
        nodeType: string;
        scriptResPath?: string;
        instanceSceneResPath?: string;
    }>>;
}
/** Shared parser instance for all godot-resource parsing */
export declare const resourceParser: GodotResourceParser;
/**
 * Extract a named attribute value from a section's attribute children.
 * Strips surrounding quotes from string values.
 */
export declare function getSectionAttr(section: SyntaxNode, name: string): string | undefined;
/**
 * Extract a named property value from a section's property children.
 * Returns the raw text of the value node.
 */
export declare function getSectionProp(section: SyntaxNode, name: string): string | undefined;
/**
 * Extract a string array from a section attribute or property.
 * Checks attributes first (e.g. `[node groups=["a", "b"]]`),
 * then properties (e.g. `groups = ["a", "b"]`).
 */
export declare function getSectionStringArray(section: SyntaxNode, name: string): string[];
/**
 * Extract the first argument string from a Constructor node like ExtResource("id").
 * Returns the unquoted string, or undefined.
 */
export declare function getConstructorFirstArg(node: SyntaxNode): string | undefined;
/**
 * Extract ExtResource("id") from a property value in a section.
 * Looks for: `propertyName = ExtResource("id")`
 */
export declare function getSectionExtResource(section: SyntaxNode, propName: string): string | undefined;
/**
 * Follow the TileMap sub_resource chain to find all referenced PackedScene ext_resource IDs.
 *
 * Chain: TileMap node -> tile_set = SubResource("TileSet_xxx")
 *   -> TileSet sub_resource -> sources/N = SubResource("TileSetScenesCollectionSource_xxx")
 *     -> TileSetScenesCollectionSource -> scenes/N/scene = ExtResource("id")
 */
export declare function collectTileMapScenes(nodeSection: SyntaxNode, subResources: Map<string, {
    type: string;
    section: SyntaxNode;
}>): string[];
/**
 * Parses a .tscn file and extracts script attachments with their child nodes.
 * Each node with a script gets its own entry with relative child paths.
 */
export declare function parseScene(filePath: string): ParseSceneResult | null;
//# sourceMappingURL=scene-parser.d.ts.map