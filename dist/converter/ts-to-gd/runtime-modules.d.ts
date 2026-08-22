import type { TransformResult } from '../common/index.ts';
import { type ConvertOptions } from './index.ts';
/** Options for converting entry files and every runtime module they import. */
export interface ConvertRuntimeModulesOptions extends Omit<ConvertOptions, 'filePath'> {
    /** Source files that belong to the caller's project. */
    entryFiles: readonly string[];
}
/** One converted source file and the Godot resource destination it should use. */
export interface ConvertedRuntimeModule {
    /** Absolute TypeScript source path. */
    sourcePath: string;
    /** Absolute GDScript destination path. */
    outputPath: string;
    /** GDScript conversion result for {@link sourcePath}. */
    result: TransformResult;
}
/**
 * Convert every source reachable from value imports of the entry files.
 *
 * Entry files retain the normal `tsDir` → `gdDir` mirror. Imported package
 * sources receive destinations below `projectRoot/.tstogd_modules`, matching
 * the `res://` paths emitted by the converter. The caller owns filesystem
 * writes, which keeps this API usable by CLIs, editors, and test runners.
 */
export declare function convertRuntimeModules(options: ConvertRuntimeModulesOptions): ConvertedRuntimeModule[];
//# sourceMappingURL=runtime-modules.d.ts.map