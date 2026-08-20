/**
 * Minimal LRU (least-recently-used) cache keyed by string.
 *
 * Backed by a plain `Map` — JS Maps iterate in insertion order, so:
 *   - `get()` bumps the key to "newest" (delete + re-set).
 *   - `set()` on an existing key does the same; on a new key past
 *     `max`, the iterator's first key (= oldest) is evicted.
 *
 * The optional `onEvict(key, value)` hook fires exactly once per
 * displaced entry — intended for releasing resources held by the
 * evicted value (file watchers, subprocesses, …). Not called on
 * explicit `delete()` or re-`set()` of the same key.
 *
 * Deliberately tiny and dependency-free. Used by the ts-plugin to
 * bound per-session Maps that would otherwise grow for the life of
 * the tsserver process.
 */
export declare class LRU<V> {
    readonly max: number;
    private readonly onEvict?;
    private readonly map;
    constructor(max: number, onEvict?: (key: string, value: V) => void);
    get size(): number;
    has(key: string): boolean;
    /** Get a value and bump it to most-recently-used. Returns `undefined` if absent. */
    get(key: string): V | undefined;
    /**
     * Store a value and mark it most-recently-used. Evicts the oldest
     * key when adding a new one would exceed `max` — the eviction hook
     * (if any) is called with the evicted entry.
     */
    set(key: string, value: V): void;
    /** Remove an entry. Does NOT fire `onEvict` — explicit deletes are caller-managed. */
    delete(key: string): boolean;
    /** Empty the cache. Fires `onEvict` for every remaining entry. */
    clear(): void;
    keys(): IterableIterator<string>;
    values(): IterableIterator<V>;
}
//# sourceMappingURL=lru.d.ts.map