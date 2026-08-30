import { resolve } from 'path';
import ts from 'typescript';
import { createTsProgram } from "../../parser/typescript/index.js";
import { convertTsToGd } from "./index.js";
import { collectRuntimeModules, gdOutputPath } from "./modules.js";
/**
 * Convert every source reachable from value imports of the entry files.
 *
 * Entry files retain the normal `tsDir` → `gdDir` mirror. Imported package
 * sources receive destinations below `projectRoot/.tstogd_modules`, matching
 * the `res://` paths emitted by the converter. The caller owns filesystem
 * writes, which keeps this API usable by CLIs, editors, and test runners.
 */
export function convertRuntimeModules(options) {
    const entryFiles = options.entryFiles.map((file) => resolve(file));
    const tsDir = options.tsDir ?? options.rootDir;
    const gdDir = options.gdDir ?? options.rootDir;
    const projectRoot = options.projectRoot ?? options.rootDir;
    const program = options.program ??
        createTsProgram({
            rootDir: options.rootDir,
            files: entryFiles,
            tsConfigPath: options.tsConfigPath,
        });
    const outputOptions = { tsDir, gdDir, projectRoot };
    return collectRuntimeModules(entryFiles, program).map((sourcePath) => {
        const outputPath = gdOutputPath(sourcePath, outputOptions);
        if (!outputPath) {
            throw new Error(`Cannot determine a GDScript destination for runtime module: ${sourcePath}`);
        }
        return {
            sourcePath,
            outputPath,
            result: convertTsToGd({
                filePath: sourcePath,
                rootDir: options.rootDir,
                tsDir,
                gdDir,
                projectRoot,
                tsConfigPath: options.tsConfigPath,
                sourceMap: options.sourceMap,
                program,
            }),
        };
    });
}
//# sourceMappingURL=runtime-modules.js.map