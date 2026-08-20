/**
 * Project-level cache for TS→GD conversion, addon GD→TS, and typings generation.
 * All data lives in a single cache.json manifest — entries are atomic (written
 * together, deleted together). Source maps and diagnostics are stored inline.
 *
 * TS→GD entries additionally keep a physical copy of the generated `.gd`
 * file under `<cacheDir>/gd-output/`. The CLI/watcher can then promote the
 * cached `.gd` to the real output path via a single `rename()` when the
 * plugin (or an earlier run) already produced the right bytes — saving a
 * full re-conversion.
 */
import type { DiagnosticSeverity } from '../converter/common/index.ts';
export interface ProjectCacheOptions {
    /**
     * Watch `cache.json` for external writes and reload the in-memory
     * manifest when another process mutates it. Intended for long-lived
     * holders (the `watch` CLI, the ts-plugin inside tsserver) that run
     * alongside other writers. Self-writes via `save()` don't trigger a
     * reload — the current instance's own mtime is tracked and filtered.
     *
     * Default `false`. Leave off for short-lived callers (single
     * `convert` run) to avoid the small polling cost.
     */
    watch?: boolean;
    /**
     * Polling interval (ms) for the `watch` mode. Shorter = faster
     * cross-process propagation, higher CPU/IO. Defaults to 500ms —
     * imperceptible in interactive use and well under any human-scale
     * save-to-promote cycle.
     */
    watchInterval?: number;
}
export interface CachedDiagnostic {
    message: string;
    severity: DiagnosticSeverity;
    file: string;
    line: number;
    column: number;
}
export declare class ProjectCache {
    private cacheDir;
    private cacheFile;
    private gdOutputDir;
    private data;
    /**
     * mtime in ms of the last `save()` we issued. The chokidar handler
     * compares incoming mtimes against this to decide whether a change
     * notification corresponds to our own write (ignored) or an external
     * one (reload).
     */
    private lastSelfWriteMtime;
    /** The chokidar watcher, kept so `close()` can tear it down. */
    private fileWatcher;
    /**
     * Serialization chain for async saves. Each `saveAsync()` call
     * captures a snapshot of `this.data` synchronously, then queues its
     * I/O behind whatever async save is currently in flight. Ensures:
     *   - no two saves race on the rename step;
     *   - newest in-memory state always ends up on disk (FIFO ordering).
     */
    private saveChain;
    /**
     * Monotonic counter that disambiguates tmp file names when saves
     * land within the same millisecond (Date.now() granularity).
     */
    private saveCounter;
    constructor(cacheDir: string, options?: ProjectCacheOptions);
    /**
     * Start watching `cache.json` for external writes via chokidar.
     * Event-driven: no idle polling, instant cross-process propagation.
     *
     * Our writers use atomic tmp-and-rename, which on Windows can surface
     * as unlink+add rather than change. We subscribe to both events to
     * cover all platforms' atomic-rename quirks. Chokidar emits the
     * stats object alongside `change`/`add` when watching a single file,
     * so we can filter our own writes by comparing `mtimeMs` against
     * the one we recorded from our last `save()`.
     *
     * `interval` is the polling fallback cadence for filesystems without
     * native events (some network/docker mounts); ignored when native
     * watching is available.
     */
    private startWatching;
    /**
     * Stop watching `cache.json`. Idempotent. Safe to call even when
     * `watch` mode was never enabled. Long-lived holders should call
     * this on graceful shutdown so chokidar's handles are released.
     * Returns a promise that resolves once the watcher has closed —
     * callers that care about determinism (tests, tear-down paths)
     * should await it; fire-and-forget is fine for process exit.
     */
    close(): Promise<void>;
    private captureCurrentMtime;
    private load;
    private empty;
    /** Check if a TS→GD conversion is still fresh (ts hash and gd hash match). */
    isTsToGdFresh(tsPath: string, gdPath: string): boolean;
    /**
     * Update a TS→GD cache entry (atomic at the entry level). When `gdContent`
     * is provided, the generated `.gd` is also written into the cache-folder
     * mirror so a later `convert`/`watch` run can promote it to the real
     * output path without re-conversion. `tsContent` lets the caller supply
     * the exact bytes that were converted — crucial when the source is an
     * in-memory IDE buffer whose disk file hasn't been saved yet.
     */
    updateTsToGd(tsPath: string, gdPath: string, sourceMap: string, diagnostics: CachedDiagnostic[], options?: {
        /** In-memory content that was converted. Defaults to reading `tsPath`. */
        tsContent?: string | Buffer;
        /** Generated `.gd` output. When set, also writes to cache-folder. */
        gdContent?: string | Buffer;
    }): void;
    /**
     * True when a cache-folder `.gd` exists for `tsPath`, its content hash
     * still matches the entry's recorded `gdHash`, AND the on-disk `.ts`
     * source still matches the entry's recorded `tsHash`. Used as the
     * precondition for `promoteCachedGd()`.
     *
     * Three checks are necessary — skipping any one produces stale output:
     *   - `cachedGdRel` exists and file present on disk — otherwise nothing
     *     to promote.
     *   - mirror bytes match `gdHash` — guards against tampering or a
     *     partial/interrupted write.
     *   - `hashFile(tsPath) === tsHash` — guards against the user editing
     *     the `.ts` after the entry was written (e.g. plugin converted a
     *     buffer, user saved, then edited again before the watcher ran).
     *     Without this, promoting would silently overwrite the real `.gd`
     *     with bytes that don't correspond to the current `.ts` source.
     */
    hasFreshCachedGd(tsPath: string): boolean;
    /** Absolute path to the cache-folder `.gd` mirror, or undefined if no entry. */
    getCachedGdPath(tsPath: string): string | undefined;
    /**
     * Atomically promote the cache-folder `.gd` for `tsPath` into `targetGdPath`.
     * Returns true if the promotion happened. Safe to call even when no cache
     * copy exists — returns false in that case.
     *
     * Promotion uses `rename()` on same-FS (fast + atomic), falling back to
     * copy+delete when `rename` crosses devices. Either way, the cached copy
     * is consumed (moved out), so the entry's `cachedGdRel` is cleared — but
     * `tsHash`/`gdHash` stay valid, so `isTsToGdFresh` remains true.
     */
    promoteCachedGd(tsPath: string, targetGdPath: string): boolean;
    /** Read the cached source map for a TS file. */
    getSourceMap(tsPath: string): string | undefined;
    /** Read cached diagnostics for a TS file. */
    getDiagnostics(tsPath: string): CachedDiagnostic[] | undefined;
    /** Check if an addon file conversion is fresh (gd, ts, d.ts hashes match). */
    isAddonFresh(gdPath: string, tsPath: string, dtsPath: string): boolean;
    /** Update addon cache entry after full pipeline (convert + ts-helpers). */
    updateAddon(gdPath: string, tsPath: string, dtsPath: string): void;
    /** Check if typings for a source file are fresh. */
    isTypingsFresh(sourcePath: string, dtsPath: string): boolean;
    /** Update typings cache entry. */
    updateTypings(sourcePath: string, dtsPath: string): void;
    /** Invalidate typings entry when source changes (removes dtsHash). */
    invalidateTypings(sourcePath: string): void;
    /**
     * Remove cache entries for files that no longer exist in the project.
     * Pass undefined to skip a section (e.g. convert only knows about TS files).
     */
    cleanStale(currentTsFiles?: Set<string>, currentAddonFiles?: Set<string>, currentTypingSources?: Set<string>): void;
    private removeCachedGdFile;
    /**
     * Write cache manifest to disk atomically (`.tmp` + `rename`) so concurrent
     * readers (e.g. IDE plugin) never observe a partially-written file, and
     * concurrent writers (watcher + plugin child) can't corrupt each other.
     * Last-writer-wins for entry contents — that's safe because the cache is
     * idempotent (both writers compute the same result from the same input).
     */
    save(): void;
    /**
     * Asynchronous counterpart to `save()`. Same atomic-rename semantics,
     * same self-mtime tracking for the chokidar watch filter — but every
     * disk touch goes through `fs/promises`, so long-lived hosts like
     * the ts-plugin (running inside tsserver's event loop) don't stall
     * the main thread while cache.json is being serialized + written.
     *
     * Concurrent calls are serialized via an internal promise chain:
     * each call grabs a synchronous JSON snapshot of the current state
     * up-front, then queues its I/O behind any in-flight save. Last-
     * queued write wins on disk; no renames race.
     */
    saveAsync(): Promise<void>;
    private nextTmpFile;
    private doSaveAsync;
    /** Clear all cache data and files. */
    clear(): void;
    private clearFiles;
    private normKey;
    /**
     * Build the relative cache-folder path for a TS source. Format:
     *   `gd-output/<16-char-hash-of-tsPath>-<tsBasename>.gd`
     *
     * The hash prefix disambiguates files with the same basename in
     * different directories without having to mirror the full tree.
     */
    private computeCachedGdRel;
}
/** MD5 hash of file content, hex-encoded, truncated to 16 chars. */
export declare function hashFile(filePath: string): string;
/** MD5 hash of a string/Buffer, hex-encoded, truncated to 16 chars. */
export declare function hashContent(content: string | Buffer): string;
//# sourceMappingURL=index.d.ts.map