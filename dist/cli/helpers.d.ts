/**
 * Shared CLI helpers used by multiple commands.
 */
export declare function setDebugEnabled(enabled: boolean): void;
export declare function isDebugEnabled(): boolean;
/** Print a message only when --debug is enabled. CLI-scoped (see {@link _debugEnabled}). */
export declare function debugLog(message: string): void;
/** Recursively find all .ts files (excluding .d.ts, node_modules, hidden dirs, and ignored patterns) */
export declare function findTsFiles(dir: string, rootDir: string, ignore: string[]): string[];
/** Recursively find all .gd files (excluding node_modules, hidden dirs, and ignored patterns) */
export declare function findGdFiles(dir: string, rootDir: string, ignore: string[]): string[];
/** Recursively find all .gd files inside the addons/ directory */
export declare function findAddonGdFiles(rootDir: string, ignore: string[]): string[];
/**
 * Resolve file arguments: if patterns are provided, expand them via glob;
 * otherwise return all files of the given extension in the source directory.
 */
export declare function resolveFiles(patterns: string[] | undefined, ext: '.ts' | '.gd', sourceDir: string, rootDir: string, ignore: string[]): string[];
/** Generate class typings (globals.d.ts) and scene typings (scene-typings.d.ts) */
export declare function generateAllTypings(cfg: {
    rootDir: string;
    tsDir: string;
    gdDir: string;
    typingsDir: string;
    scenesDir: string;
    ignore: string[];
    projectFile: string;
    tsconfig?: string;
    tsFiles?: string[];
    cacheDir?: string;
    godotTypingsDir?: string;
    /** See `ConverterOptions.generateGlobalClassTypes`. */
    converterOptions?: {
        generateGlobalClassTypes?: boolean;
    };
}): void;
/** Helper functions for generate-gdscript-global-typings command */
/**
 * Write the entry-point `index.d.ts` referencing the static `globals/`
 * folder and the generated `classes/` folder. Used as a fallback when
 * the static files cannot be located (e.g. running outside an
 * installed package layout); the normal path is to copy the canonical
 * `index.d.ts` from the package's bundled `typings/` so the file
 * stays in sync with the bundled `globals/` folder.
 */
export declare function writeTypingsIndexDts(typingsDir: string): void;
//# sourceMappingURL=helpers.d.ts.map