import ts from 'typescript';
import { readFileSync } from 'fs';
import { dirname } from 'path';
export function createTsProgram(options) {
    if (options.tsConfigPath) {
        const configFile = ts.readConfigFile(options.tsConfigPath, (path) => readFileSync(path, 'utf-8'));
        // Use tsconfig directory for resolving include/exclude patterns (not rootDir/tsDir)
        const tsConfigDir = dirname(options.tsConfigPath);
        const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, tsConfigDir);
        return ts.createProgram(parsedConfig.fileNames, parsedConfig.options, 
        /* host */ undefined, options.oldProgram);
    }
    const compilerOptions = {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ES2022,
        strict: true,
        rootDir: options.rootDir,
        declaration: false,
        noEmit: true,
    };
    return ts.createProgram(options.files, compilerOptions, 
    /* host */ undefined, options.oldProgram);
}
export function getTypeChecker(program) {
    return program.getTypeChecker();
}
export function getSourceFile(program, filePath) {
    return program.getSourceFile(filePath);
}
//# sourceMappingURL=index.js.map