import type { WatcherOptions } from './types.ts';
export type { WatcherOptions } from './types.ts';
export declare class Watcher {
    private options;
    private fsWatcher;
    private cache;
    private tsFiles;
    private tsDir;
    private gdDir;
    private initialTypingsGenerated;
    private initialScanDone;
    private cachedProgram;
    private pendingTsFiles;
    private pendingNonTsFiles;
    private debounceTimer;
    private checkDebounceTimer;
    private checkRunner;
    private initialConverted;
    private initialSkipped;
    private initialErrors;
    private cacheDir;
    constructor(options: WatcherOptions);
    start(): void;
    stop(): Promise<void>;
    private handleFile;
    private handleRemove;
    private scheduleFlush;
    private flushPending;
    private convertBatch;
    private scheduleCheck;
    private runCheck;
    private convertSingleFile;
    private debugLog;
    private regenerateTypingsFor;
    private log;
}
//# sourceMappingURL=index.d.ts.map