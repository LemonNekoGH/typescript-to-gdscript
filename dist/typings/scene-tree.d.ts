import type { ParseSceneResult } from './scene-parser.ts';
export interface TreeNodeInfo {
    name: string;
    /** Full path relative to scene root, e.g. "Sprite2D/AnimationPlayer" */
    fullPath: string;
    /** Godot class type name */
    type: string;
    /** Full path of parent node, or null for root */
    parentPath: string | null;
    /** Direct children */
    children: TreeNodeInfo[];
    /** Whether this node instances another scene */
    isInstanced: boolean;
    /** res:// path of instanced scene */
    instanceSceneResPath?: string;
    /** Whether this node has unique_name_in_owner */
    uniqueInOwner?: boolean;
    /** res:// path of GDScript attached to this node, if any */
    scriptResPath?: string;
}
/**
 * Build a tree structure from the flat node list returned by parseScene().
 */
export declare function buildNodeTree(sceneData: ParseSceneResult): TreeNodeInfo;
/**
 * Collect all descendant paths relative to a given node (non-instanced subtrees only).
 * Returns flat path -> type name pairs for the node's type properties.
 */
export declare function collectDescendantPaths(node: TreeNodeInfo, sceneAlias: string, instancedSceneTreeNames: Map<string, string>, extendedInstancedNodes: Set<string>): Array<{
    relativePath: string;
    typeName: string;
}>;
//# sourceMappingURL=scene-tree.d.ts.map