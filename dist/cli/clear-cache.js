import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { resolveConfig } from "../config/index.js";
import { ProjectCache, isEmptyManifest } from "../cache/index.js";
/**
 * `save()` swallows its own write failures, so reading the manifest back is
 * the only honest confirmation that the clear landed. Returns null when it
 * did, otherwise a description of what was found instead — the three cases
 * point at different causes, so don't collapse them into one message.
 */
function whyNotCleared(cacheFile) {
    if (!existsSync(cacheFile)) {
        return 'the manifest file is missing, so the write never landed';
    }
    let data;
    try {
        data = JSON.parse(readFileSync(cacheFile, 'utf-8'));
    }
    catch {
        return 'the manifest is unreadable or not valid JSON';
    }
    if (!isEmptyManifest(data))
        return 'the manifest still holds cache entries';
    return null;
}
function cacheDirEntries(cacheDir) {
    try {
        return readdirSync(cacheDir);
    }
    catch {
        return [];
    }
}
/**
 * Cache-dir entries a successful clear leaves behind, for the error text.
 * `cache.json.tmp-*` never counts — present or not, it proves nothing: a
 * concurrent holder's in-flight save can land in the window between the
 * clear and this listing, and running with an IDE open is the headline
 * case for this command. Even with `--force` a fresh one can appear after
 * the sweep, so the verdict ignores them either way; they are reported
 * separately instead.
 */
function leftovers(cacheDir) {
    return cacheDirEntries(cacheDir).filter((name) => name !== '.gdignore' &&
        name !== 'cache.json' &&
        !name.startsWith('cache.json.tmp-'));
}
/** Temp files a plain clear spares, so the user learns they exist at all. */
function sparedTmpFiles(cacheDir) {
    return cacheDirEntries(cacheDir).filter((name) => name.startsWith('cache.json.tmp-'));
}
export function registerClearCacheCommand(program) {
    program
        .command('clear-cache')
        .description('Clear the conversion cache')
        .option('--force', 'also remove .gdignore and any cache.json.tmp-* files. A tmp file is ' +
        'usually another process mid-save: deleting one sends that save down ' +
        'its non-atomic path, which can write the old cache back. Use it to ' +
        'collect temp files left by a crash, with no tstogd running.')
        .action((opts) => {
        const cfg = resolveConfig();
        const { cacheDir } = cfg;
        const force = opts.force === true;
        if (!existsSync(cacheDir)) {
            console.log(`Cache directory does not exist: ${cacheDir}`);
            return;
        }
        try {
            new ProjectCache(cacheDir).clear({ force });
        }
        catch (err) {
            console.error(`Failed to clear cache: ${cacheDir}\n` +
                `${err instanceof Error ? err.message : String(err)}\n` +
                `If an IDE is running, close it first or restart its TypeScript service after clearing.`);
            process.exit(1);
        }
        const cacheFile = join(cacheDir, 'cache.json');
        const problem = whyNotCleared(cacheFile);
        const remaining = leftovers(cacheDir);
        if (problem || remaining.length > 0) {
            console.error(`Cache was not fully cleared: ${cacheDir}` +
                (problem ? `\n${cacheFile}: ${problem}.` : '') +
                (remaining.length > 0
                    ? `\nCould not remove: ${remaining.join(', ')}`
                    : '') +
                `\nUsually a process is holding these files open (IDE, watcher);` +
                ` less often one rewrote the cache right after the clear.` +
                `\nRestart your IDE's TypeScript service and try again.`);
            process.exit(1);
        }
        console.log(`Cache cleared: ${cacheDir}`);
        // Without --force these were spared deliberately. Say so: otherwise
        // a file orphaned by a crash sits there forever and nothing ever
        // mentions it.
        const spared = force ? [] : sparedTmpFiles(cacheDir);
        if (spared.length > 0) {
            console.log(`Left in place: ${spared.join(', ')}` +
                `\nThese are saves in progress, or temp files a crashed process never cleaned up.` +
                `\nWith no tstogd running, 'clear-cache --force' removes them.`);
        }
    });
}
//# sourceMappingURL=clear-cache.js.map