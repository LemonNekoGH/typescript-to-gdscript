import { GodotClassRegistry } from './godot-registry.ts';
export { godotTypeToTs } from './type-mapping.ts';
export interface GodotDocsTypingsOptions {
    /**
     * Path(s) to Godot docs XML class reference directories. Accepts a
     * single dir (legacy) or an array — Godot ships docs across several
     * locations (`doc/classes/`, `modules/gdscript/doc_classes/`,
     * `modules/<module>/doc_classes/`, …). Later dirs override earlier
     * ones for same-named classes.
     */
    classDocsDir: string | string[];
    /** Output directory for generated .d.ts files */
    outputDir: string;
    /** Override directories (.d.ts files + non-nullable.json) in priority order — later dirs override earlier. */
    overrideDirs?: string[];
    /** Also generate the class registry JSON at this path */
    registryOutputPath?: string;
    /** Godot version label */
    version?: string;
}
/**
 * Generates TypeScript typings from Godot XML class documentation.
 * Also generates the class registry JSON if registryOutputPath is specified.
 * Returns the GodotClassRegistry if generated.
 */
export declare function generateGodotDocsTypings(options: GodotDocsTypingsOptions): GodotClassRegistry | null;
//# sourceMappingURL=godot-docs.d.ts.map