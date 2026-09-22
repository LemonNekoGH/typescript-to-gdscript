/**
 * Version of the installed `typescript-to-gdscript` package, read from its
 * own `package.json`. Used for the CLI `--version` flag and for cache
 * invalidation, so both always report the same number.
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
let cached;
function readVersion() {
    // Resolves relative to the compiled `dist/utils/` or the source `src/utils/`.
    const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '../../package.json');
    let raw;
    try {
        raw = readFileSync(pkgPath, 'utf-8');
    }
    catch (err) {
        throw new Error(`Cannot read the package version: failed to read ${pkgPath} (${err.message})`);
    }
    let version;
    try {
        version = JSON.parse(raw).version;
    }
    catch (err) {
        throw new Error(`Cannot read the package version: ${pkgPath} is not valid JSON (${err.message})`);
    }
    if (typeof version !== 'string' || version === '') {
        throw new Error(`Cannot read the package version: ${pkgPath} has no "version" field`);
    }
    return version;
}
/** Reads `version` from the package's `package.json` (cached after the first call). */
export function getPackageVersion() {
    return (cached ??= readVersion());
}
//# sourceMappingURL=package-version.js.map