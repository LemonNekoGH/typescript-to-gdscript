/**
 * Debounced full-project diagnostic check + error-driven self-heal for
 * watch mode. Extracted from the Watcher class (file-size rule); the
 * watcher delegates here via a small deps interface.
 *
 * Concurrency: checks now WRITE files (the heal pass), so overlapping
 * runs are forbidden — `run()` is guarded by an in-flight flag, and a
 * run requested while one is active is re-scheduled (debounced) after
 * the active one finishes.
 */
import ts from 'typescript';
import type { ProjectCache } from '../cache/index.ts';
export interface CheckRunnerDeps {
    tsDir: string;
    gdDir: string;
    projectRoot: string;
    cacheDir?: string;
    tsConfigPath?: string;
    godotPath?: string;
    emitOnError?: boolean;
    debug?: boolean;
    cache: ProjectCache;
    /** Current set of watched .ts files (absolute paths). */
    getTsFiles(): ReadonlySet<string>;
    /** Program reuse: read the watcher's cached program (may be null). */
    getProgram(): ts.Program | null;
    /** Store a program built here so later batches reuse it. */
    setProgram(program: ts.Program): void;
    /** Ask the watcher to schedule another debounced check. */
    requestRecheck(): void;
    log(file: string, message: string, severity: string): void;
    debugLog(message: string): void;
}
export declare class CheckRunner {
    private deps;
    /**
     * Per-file diagnostic signature from the previous completed check.
     * `null` = no baseline yet (first check after startup) — then every
     * file with diagnostics counts as changed, intentionally healing
     * stale-error files left over from previous sessions.
     */
    private prevDiagSignatures;
    /**
     * Normalized paths of files converted since the last check. Their
     * diagnostic signature legitimately changed (they were edited), so
     * they're excluded from heal suspects.
     */
    private batchConverted;
    /**
     * Files whose diagnostics moved in the post-heal recheck without
     * having been healed themselves (e.g. a heal-write changed what Godot
     * reports about a third file). They couldn't be acted on in that
     * cycle (single heal iteration per check), so they're carried over as
     * pre-seeded suspects for the next one.
     */
    private pendingHealSuspects;
    private running;
    private rerunRequested;
    private disposed;
    private current;
    constructor(deps: CheckRunnerDeps);
    /** Record a file converted by the watcher's batch path. */
    noteConverted(filePath: string): void;
    /**
     * Run one check cycle. Never overlaps: a call while a cycle is active
     * requests a re-schedule instead (the heal pass writes files — two
     * interleaved chains could tear writes and stomp baselines).
     */
    run(): void;
    /** Block new runs and wait for the in-flight one (if any) to settle. */
    dispose(): Promise<void>;
    private runOnce;
    /** One full-project diagnostics pass (reuses the watcher's program). */
    private collect;
    /**
     * Error-driven self-heal. Files whose diagnostic signature changed
     * without having been converted in the current batch are presumed
     * stale (a type they depend on changed in another file): reconvert
     * them in memory and rewrite the ones whose bytes differ. When bytes
     * changed, rerun the diagnostic check ONCE; suspects that surface
     * only in that second pass are carried over to the next cycle (a
     * recheck is requested), keeping the one-heal-per-cycle bound while
     * still converging.
     */
    private healAndRecheck;
}
//# sourceMappingURL=check.d.ts.map