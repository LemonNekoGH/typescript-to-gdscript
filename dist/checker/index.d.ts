import type ts from 'typescript';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import type { ProjectCache } from '../cache/index.ts';
export interface CheckOptions {
    tsDir: string;
    gdDir: string;
    projectRoot: string;
    tsFiles: string[];
    /** Source files passed to the converter, rather than reached through imports. */
    entryFiles?: string[];
    tsConfigPath?: string;
    cache: ProjectCache | null;
    godotPath?: string;
    cacheDir?: string;
    /** When true: compare in-memory converter output to disk .gd; don't write. */
    noEmit?: boolean;
    signal?: AbortSignal;
    /**
     * Existing `ts.Program` to reuse (e.g. from a recent conversion batch).
     * Avoids re-parsing all `.ts` files. When omitted, a fresh program is built.
     */
    program?: ts.Program;
    /** Optional debug callback for phase-by-phase logging. */
    onDebug?: (message: string) => void;
}
export interface CheckResult {
    tsDiagnostics: TransformDiagnostic[];
    converterDiagnostics: TransformDiagnostic[];
    godotDiagnostics: TransformDiagnostic[];
    /** Resolved .gd paths whose on-disk content differs from what converter would emit. */
    staleFiles: string[];
}
export declare function collectProjectDiagnostics(opts: CheckOptions): Promise<CheckResult>;
export type DiagnosticSource = 'TS' | 'CONV' | 'GD';
export interface DiagnosticCounts {
    errors: number;
    typeErrors: number;
    warnings: number;
}
/**
 * Multi-line summary grouped by diagnostic source. Returns `null` when
 * everything is clean (caller decides what to print in that case).
 *
 * Example output:
 *   TS:   2 error(s), 1 warning(s)
 *   CONV: 1 error(s), 2 type-error(s)
 *   GD:   2 error(s)
 */
export declare function summarizeDiagnostics(result: CheckResult): string | null;
/**
 * True when the result contains any reportable error (hard or type-error).
 * Used by callers to decide exit codes.
 */
export declare function hasReportableErrors(result: CheckResult): boolean;
/**
 * Print diagnostics for a single source. Format:
 *   ━━━━━━━━━━ <SOURCE> ━━━━━━━━━━     ← group separator (only when non-empty)
 *   [SOURCE:severity] file:line:col      ← header line
 *       message                          ← indented message
 *                                        ← empty line between errors
 */
export declare function printDiagnostics(diagnostics: TransformDiagnostic[], source: DiagnosticSource): void;
//# sourceMappingURL=index.d.ts.map