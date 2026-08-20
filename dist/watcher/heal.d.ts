/**
 * Error-driven self-healing for watch mode.
 *
 * The watcher reconverts only files whose own content changed, so a type
 * change in `b.ts` can leave `a.gd` stale. By design every *dangerous*
 * stale output surfaces as a fresh diagnostic each check cycle (TS
 * diagnostics are recomputed from the live program; Godot validates the
 * actual on-disk `.gd`). This module turns those diagnostics into the
 * "affected set": files whose diagnostic signature changed — without
 * having been reconverted in the current batch — are reconverted in
 * memory and rewritten when their output bytes differ.
 *
 * Positions are deliberately excluded from signatures: editing `b.ts`
 * shifts line numbers in ITS diagnostics, not in other files'. A file
 * whose only delta is diagnostic positions was edited itself (and thus
 * sits in the converted batch, which is excluded anyway).
 */
import type ts from 'typescript';
import type { CheckResult } from '../checker/index.ts';
import type { ProjectCache } from '../cache/index.ts';
/** Normalize a path for map keys (forward slashes). */
export declare function normPath(p: string): string;
/**
 * Per-file signature of a check result's diagnostics. Key: normalized
 * file path. Value: hash over the SORTED set of `severity|message`
 * entries — positions excluded, duplicates collapse.
 */
export declare function diagnosticSignatures(result: CheckResult): Map<string, string>;
/**
 * Files whose diagnostic signature changed between two check runs
 * (appeared, disappeared, or differs), excluding files converted in the
 * current batch (already fresh) and anything that isn't a watched
 * project `.ts` file.
 *
 * `prev === null` means "no baseline yet" (first check after startup):
 * every file with diagnostics counts as changed — intentionally heals
 * stale-error files left over from previous sessions.
 */
export declare function computeSuspects(prev: Map<string, string> | null, curr: Map<string, string>, options: {
    /** Normalized paths converted in the current batch. */
    batchConverted: Set<string>;
    /** Normalized paths of all watched project .ts files. */
    projectTsFiles: Set<string>;
}): string[];
export interface HealOptions {
    files: string[];
    program: ts.Program;
    cache: ProjectCache;
    tsDir: string;
    gdDir: string;
    projectRoot: string;
    tsConfigPath?: string;
    emitOnError?: boolean;
    onLog?: (file: string, message: string) => void;
}
/**
 * Reconvert `files` in memory and rewrite the ones whose generated
 * bytes differ from disk (cache entries refreshed alongside). Returns
 * the list of `.gd` paths actually rewritten — non-empty means the
 * caller should rerun the diagnostic check ONCE so Godot validates the
 * healed bytes and converter diagnostics come from the fresh entries.
 */
export declare function healFiles(options: HealOptions): {
    rewrote: string[];
};
//# sourceMappingURL=heal.d.ts.map