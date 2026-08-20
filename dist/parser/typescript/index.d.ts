import ts from 'typescript';
export interface TsProgramOptions {
    rootDir: string;
    files: string[];
    tsConfigPath?: string;
    /** Previous program for incremental reuse — TypeScript skips re-parsing unchanged files. */
    oldProgram?: ts.Program;
}
export declare function createTsProgram(options: TsProgramOptions): ts.Program;
export declare function getTypeChecker(program: ts.Program): ts.TypeChecker;
export declare function getSourceFile(program: ts.Program, filePath: string): ts.SourceFile | undefined;
//# sourceMappingURL=index.d.ts.map