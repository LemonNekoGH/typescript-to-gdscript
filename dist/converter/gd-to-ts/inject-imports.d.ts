/**
 * Batch-level import injection for GD→TS conversion.
 *
 * Runs AFTER every `.gd` source has been converted and written to
 * disk. Builds a real TS program over the generated `.ts` files,
 * pulls semantic diagnostics, and prepends `import { Foo } from "./foo.js"`
 * lines for every unresolved identifier that maps to a known user
 * class. Much more precise than the previous per-file regex — names
 * appearing only inside comments or string literals don't trigger
 * a TS 2304/2503 diagnostic, so they don't produce phantom imports.
 *
 * No-op when `generateGlobalClassTypes` is `true` (the addon /
 * legacy-global layout, where every user class is in `declare global`
 * and no imports are required).
 */
import type { UserClassInfo } from './context.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
export interface ConvertedFile {
    /** Absolute on-disk path of the generated `.ts` file. */
    tsPath: string;
    /** Absolute on-disk path of the source `.gd` file (used to skip self-imports). */
    gdPath: string;
}
export interface InjectMissingImportsOptions {
    /**
     * When `true`, every user class is assumed to live in `declare global`
     * and no imports are needed. The function returns immediately.
     */
    generateGlobalClassTypes: boolean;
    /**
     * Optional `tsconfig.json` to drive the diagnostic program. When
     * unset a minimal default config (ES2022 / NodeNext-ish) is used —
     * sufficient for identifier-resolution diagnostics, which don't
     * depend on strictness or target.
     */
    tsConfigPath?: string;
}
/**
 * For every `.ts` file in `files`, prepend `import { X } from "..."`
 * lines for any TS 2304/2503 diagnostic whose name resolves to a
 * known entry in `userClasses`. Files are rewritten in place. Files
 * with nothing missing are left untouched.
 */
export declare function injectMissingImports(files: ConvertedFile[], userClasses: Map<string, UserClassInfo>, options: InjectMissingImportsOptions): void;
/**
 * Convenience wrapper: build the user-class index from a list of GD
 * sources (the same shape `convertGdToTs` consumes via
 * `projectSources`), then call {@link injectMissingImports}. Mirrors
 * what the `initial-convert-gd-to-ts` CLI command needs to do for a full project run.
 */
export declare function injectMissingImportsForProject(files: ConvertedFile[], projectSources: Array<{
    source: string;
    filePath: string;
}>, registry: GodotClassRegistry, options: InjectMissingImportsOptions): void;
//# sourceMappingURL=inject-imports.d.ts.map