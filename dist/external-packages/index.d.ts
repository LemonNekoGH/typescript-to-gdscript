import type { ExternalPackageConfig } from '../config/index.ts';
export declare const TSTOGD_MODULES_DIR = "tstogd_modules";
export interface ResolvedExternalPackage {
    /** Absolute package root. This directory is linked into the Godot project. */
    rootDir: string;
    /** Absolute TypeScript source directory from the package's tstogd.json. */
    tsDir: string;
    /** Absolute GDScript output directory from the package's tstogd.json. */
    gdDir: string;
    /** Forward-slashed path below tstogd_modules. */
    mountName: string;
}
export interface ResolveExternalPackagesOptions {
    rootDir: string;
    projectRoot: string;
    externalPackages: ExternalPackageConfig[];
}
/** Find configured shared packages without changing the filesystem. */
export declare function resolveExternalPackages(options: ResolveExternalPackagesOptions): ResolvedExternalPackage[];
/** Resolve shared packages and synchronize their links in tstogd_modules. */
export declare function linkExternalPackages(options: ResolveExternalPackagesOptions): ResolvedExternalPackage[];
//# sourceMappingURL=index.d.ts.map