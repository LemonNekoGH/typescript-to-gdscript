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
export class LRU {
    max;
    onEvict;
    map = new Map();
    constructor(max, onEvict) {
        if (max <= 0)
            throw new Error(`LRU max must be > 0, got ${max}`);
        this.max = max;
        this.onEvict = onEvict;
    }
    get size() {
        return this.map.size;
    }
    has(key) {
        return this.map.has(key);
    }
    /** Get a value and bump it to most-recently-used. Returns `undefined` if absent. */
    get(key) {
        if (!this.map.has(key))
            return undefined;
        // `has` guarded the access — value is whatever was stored,
        // including legitimately-undefined or null. Safe to assert.
        const v = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, v);
        return v;
    }
    /**
     * Store a value and mark it most-recently-used. Evicts the oldest
     * key when adding a new one would exceed `max` — the eviction hook
     * (if any) is called with the evicted entry.
     */
    set(key, value) {
        this.map.delete(key); // no-op if absent
        this.map.set(key, value);
        if (this.map.size > this.max) {
            const iter = this.map.keys().next();
            if (!iter.done) {
                const oldestKey = iter.value;
                const oldestValue = this.map.get(oldestKey);
                this.map.delete(oldestKey);
                this.onEvict?.(oldestKey, oldestValue);
            }
        }
    }
    /** Remove an entry. Does NOT fire `onEvict` — explicit deletes are caller-managed. */
    delete(key) {
        return this.map.delete(key);
    }
    /** Empty the cache. Fires `onEvict` for every remaining entry. */
    clear() {
        if (this.onEvict) {
            for (const [k, v] of this.map)
                this.onEvict(k, v);
        }
        this.map.clear();
    }
    keys() {
        return this.map.keys();
    }
    values() {
        return this.map.values();
    }
}
//# sourceMappingURL=lru.js.map