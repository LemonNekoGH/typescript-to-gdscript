import { existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, readdirSync, realpathSync, symlinkSync, unlinkSync, writeFileSync, } from 'fs';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'path';
export const TSTOGD_MODULES_DIR = 'tstogd_modules';
/** Find configured shared packages without changing the filesystem. */
export function resolveExternalPackages(options) {
    const candidates = new Map();
    const explicitRoots = new Set();
    const pending = [];
    for (const entry of options.externalPackages) {
        const rootDir = resolvePackageReference(entry.from, options.rootDir);
        if (!rootDir) {
            throw new Error(`External package not found: ${entry.from}`);
        }
        const manifest = readManifest(rootDir);
        const defaultName = typeof manifest?.name === 'string' ? manifest.name : basename(rootDir);
        const mountName = validateMountName(entry.to ?? defaultName);
        addCandidate(candidates, { rootDir, mountName, explicit: true });
        explicitRoots.add(realpathSync(rootDir));
        for (const name of declaredDependencies(manifest, false)) {
            pending.push({ name, fromDir: rootDir });
        }
    }
    const rootManifest = readManifest(options.rootDir);
    for (const name of declaredDependencies(rootManifest, true)) {
        pending.push({ name, fromDir: options.rootDir });
    }
    const visited = new Set();
    while (pending.length > 0) {
        const dependency = pending.pop();
        const rootDir = findInstalledPackage(dependency.name, dependency.fromDir);
        if (!rootDir)
            continue;
        const realRoot = realpathSync(rootDir);
        if (visited.has(realRoot))
            continue;
        visited.add(realRoot);
        if (explicitRoots.has(realRoot))
            continue;
        const config = readPackageConfig(rootDir);
        if (!config?.lib)
            continue;
        addCandidate(candidates, {
            rootDir,
            mountName: validateMountName(dependency.name),
            explicit: false,
        });
        const manifest = readManifest(rootDir);
        for (const name of declaredDependencies(manifest, false)) {
            pending.push({ name, fromDir: rootDir });
        }
    }
    return [...candidates.values()].map(resolveCandidate);
}
/** Resolve shared packages and synchronize their links in tstogd_modules. */
export function linkExternalPackages(options) {
    const packages = resolveExternalPackages(options);
    validateMountLayout(packages);
    if (packages.length > 0)
        ignoreNodeModulesInGodot(options.projectRoot);
    const modulesDir = resolve(options.projectRoot, TSTOGD_MODULES_DIR);
    if (packages.length === 0 && !existsSync(modulesDir))
        return packages;
    mkdirSync(modulesDir, { recursive: true });
    const expected = new Set();
    for (const pkg of packages) {
        const linkPath = resolveMountPath(modulesDir, pkg.mountName);
        expected.add(relative(modulesDir, linkPath).replace(/\\/g, '/'));
        createPackageLink(pkg.rootDir, modulesDir, linkPath);
    }
    removeStaleLinks(modulesDir, modulesDir, expected);
    return packages;
}
function ignoreNodeModulesInGodot(projectRoot) {
    const nodeModulesDir = resolve(projectRoot, 'node_modules');
    if (!existsSync(nodeModulesDir) || !lstatSync(nodeModulesDir).isDirectory()) {
        return;
    }
    const marker = join(nodeModulesDir, '.gdignore');
    if (!existsSync(marker) && !isSymbolicLink(marker))
        writeFileSync(marker, '');
}
function validateMountLayout(packages) {
    const mounts = new Set(packages.map((pkg) => pkg.mountName));
    for (const mount of mounts) {
        const segments = mount.split('/');
        for (let index = 1; index < segments.length; index++) {
            const parent = segments.slice(0, index).join('/');
            if (mounts.has(parent)) {
                throw new Error(`Shared package mounts cannot contain each other: "${parent}" and "${mount}".`);
            }
        }
    }
}
function resolveCandidate(candidate) {
    const config = readPackageConfig(candidate.rootDir);
    if (!config) {
        throw new Error(`Shared package has no tstogd.json: ${candidate.rootDir}`);
    }
    if (!config.lib) {
        throw new Error(`Shared package must set "lib": true: ${candidate.rootDir}`);
    }
    const packageRoot = realpathSync(candidate.rootDir);
    const rootDir = resolve(packageRoot, config.rootDir ?? '.');
    const tsDir = resolve(rootDir, config.tsDir ?? 'src');
    const gdDir = resolve(rootDir, config.gdDir ?? 'scripts');
    if (isOutside(packageRoot, tsDir) || isOutside(packageRoot, gdDir)) {
        throw new Error(`Shared package tsDir and gdDir must stay inside its package root: ${candidate.rootDir}`);
    }
    return {
        rootDir: packageRoot,
        tsDir,
        gdDir,
        mountName: candidate.mountName,
    };
}
function addCandidate(candidates, candidate) {
    const existing = candidates.get(candidate.mountName);
    if (!existing) {
        candidates.set(candidate.mountName, candidate);
        return;
    }
    if (realpathSync(existing.rootDir) !== realpathSync(candidate.rootDir)) {
        throw new Error(`Multiple shared packages use mount name "${candidate.mountName}".`);
    }
    if (candidate.explicit && !existing.explicit) {
        candidates.set(candidate.mountName, candidate);
    }
}
function readPackageConfig(rootDir) {
    const path = join(rootDir, 'tstogd.json');
    if (!existsSync(path))
        return undefined;
    return readJsonFile(path, 'shared package config');
}
function readManifest(rootDir) {
    const path = join(rootDir, 'package.json');
    if (!existsSync(path))
        return undefined;
    return readJsonFile(path, 'package manifest');
}
function readJsonFile(path, description) {
    try {
        return JSON.parse(readFileSync(path, 'utf-8'));
    }
    catch (cause) {
        throw new Error(`Failed to read ${description}: ${path}`, { cause });
    }
}
function declaredDependencies(manifest, includeDev) {
    if (!manifest)
        return [];
    const sections = [
        manifest.dependencies,
        manifest.optionalDependencies,
        manifest.peerDependencies,
        ...(includeDev ? [manifest.devDependencies] : []),
    ];
    return [
        ...new Set(sections.flatMap((section) => Object.keys(section ?? {}))),
    ];
}
function resolvePackageReference(reference, fromDir) {
    if (isAbsolute(reference) || reference.startsWith('.')) {
        const path = resolve(fromDir, reference);
        return existsSync(path) ? path : undefined;
    }
    return findInstalledPackage(reference, fromDir);
}
function findInstalledPackage(packageName, fromDir) {
    let dir = resolve(fromDir);
    for (;;) {
        const candidate = join(dir, 'node_modules', ...packageName.split('/'));
        if (existsSync(join(candidate, 'package.json')))
            return candidate;
        const parent = dirname(dir);
        if (parent === dir)
            return undefined;
        dir = parent;
    }
}
function validateMountName(name) {
    const normalized = name.replace(/\\/g, '/').replace(/^\.\//, '');
    const segments = normalized.split('/');
    if (normalized.length === 0 ||
        isAbsolute(normalized) ||
        segments.some((segment) => segment.length === 0 || segment === '.' || segment === '..')) {
        throw new Error(`Invalid external package mount name: ${name}`);
    }
    return normalized;
}
function resolveMountPath(modulesDir, mountName) {
    const path = resolve(modulesDir, mountName);
    if (isOutside(modulesDir, path)) {
        throw new Error(`External package mount escapes tstogd_modules: ${mountName}`);
    }
    return path;
}
function createPackageLink(source, modulesDir, linkPath) {
    createMountParents(modulesDir, dirname(linkPath));
    if (existsSync(linkPath) || isSymbolicLink(linkPath)) {
        if (!isSymbolicLink(linkPath)) {
            throw new Error(`Package mount exists and is not a symlink: ${linkPath}`);
        }
        const currentTarget = resolve(dirname(linkPath), readlinkSync(linkPath));
        if (existsSync(currentTarget) &&
            realpathSync(currentTarget) === realpathSync(source))
            return;
        unlinkSync(linkPath);
    }
    symlinkSync(realpathSync(source), linkPath, process.platform === 'win32' ? 'junction' : 'dir');
}
function createMountParents(modulesDir, parentDir) {
    const segments = relative(modulesDir, parentDir)
        .split(/[\\/]/)
        .filter(Boolean);
    let current = modulesDir;
    for (const segment of segments) {
        current = join(current, segment);
        if (!existsSync(current) && !isSymbolicLink(current)) {
            mkdirSync(current);
            continue;
        }
        const stat = lstatSync(current);
        if (!stat.isDirectory() || stat.isSymbolicLink()) {
            throw new Error(`Package mount parent is not a directory: ${current}`);
        }
    }
}
function removeStaleLinks(modulesDir, currentDir, expected) {
    for (const entry of readdirSync(currentDir)) {
        const path = join(currentDir, entry);
        const relativePath = relative(modulesDir, path).replace(/\\/g, '/');
        const stat = lstatSync(path);
        if (stat.isSymbolicLink()) {
            if (!expected.has(relativePath))
                unlinkSync(path);
            continue;
        }
        if (!stat.isDirectory())
            continue;
        removeStaleLinks(modulesDir, path, expected);
    }
}
function isSymbolicLink(path) {
    try {
        return lstatSync(path).isSymbolicLink();
    }
    catch {
        return false;
    }
}
function isOutside(root, path) {
    const pathFromRoot = relative(resolve(root), resolve(path));
    return (isAbsolute(pathFromRoot) ||
        pathFromRoot === '..' ||
        pathFromRoot.startsWith('../') ||
        pathFromRoot.startsWith('..\\'));
}
//# sourceMappingURL=index.js.map