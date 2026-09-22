import ts from 'typescript';
import { createTsProgram } from "../../parser/typescript/index.js";
import { resolveRegistry } from "../../config/index.js";
import { TsToGdTransformer } from "./transformer.js";
import { buildDiagnosticsTypeInfo } from "./diagnostics.js";
export function convertTsToGd(options) {
    const program = options.program ??
        createTsProgram({
            rootDir: options.rootDir,
            files: [options.filePath],
            tsConfigPath: options.tsConfigPath,
        });
    const sourceFile = program.getSourceFile(options.filePath);
    if (!sourceFile) {
        return {
            code: '',
            diagnostics: [
                {
                    message: `File not found: ${options.filePath}`,
                    severity: 'error',
                    file: options.filePath,
                    line: 0,
                    column: 0,
                },
            ],
        };
    }
    // Registry is optional — if unavailable, diagnostics fall back to primitive checks only.
    let registry;
    try {
        registry = resolveRegistry();
    }
    catch {
        /* registry unavailable */
    }
    const diagInfo = buildDiagnosticsTypeInfo(registry);
    const transformer = new TsToGdTransformer({
        program,
        checker: program.getTypeChecker(),
        sourceFile,
        filePath: options.filePath,
        diagnostics: [],
        diagInfo,
        registry,
        tsDir: options.tsDir ?? options.rootDir,
        gdDir: options.gdDir ?? options.rootDir,
        projectRoot: options.projectRoot ?? options.rootDir,
        lib: options.lib ?? false,
        externalPackages: options.externalPackages ?? [],
    }, {
        sourceMap: options.sourceMap ?? false,
    });
    return transformer.transform();
}
//# sourceMappingURL=index.js.map