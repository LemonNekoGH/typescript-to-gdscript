import type { TransformDiagnostic } from '../converter/common/index.ts';
export interface GodotProjectCheckOptions {
    projectRoot: string;
    godotPath: string;
    gdDir: string;
    cacheDir?: string;
    /** Built during the conversion pass: normalizedGdPath → { sourceMapJson, tsFilePath } */
    sourceMapTable: Map<string, {
        sourceMapJson?: string;
        tsFilePath?: string;
    }>;
    signal?: AbortSignal;
}
export declare function runGodotProjectCheck(opts: GodotProjectCheckOptions): Promise<TransformDiagnostic[]>;
//# sourceMappingURL=godot-project.d.ts.map