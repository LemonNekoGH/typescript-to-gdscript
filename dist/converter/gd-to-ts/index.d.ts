import type { TransformResult } from '../common/index.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import { type UserClassInfo } from './context.ts';
export type { GdToTsContext } from './context.ts';
export type { UserClassInfo } from './context.ts';
export interface GdToTsOptions {
    /** GDScript source code */
    source: string;
    /** File path (for diagnostics) */
    filePath: string;
    /** Whether this is an addon file */
    isAddon?: boolean;
    /** Godot class registry for inherited member resolution (required) */
    registry: GodotClassRegistry;
    /** Additional GD source files in the project (for resolving user-defined class inheritance) */
    projectSources?: Array<{
        source: string;
        filePath: string;
    }>;
    /**
     * Signal handler type info resolved from .tscn scene connections.
     * Maps method name → array of typed parameters (Godot type names).
     * When a GDScript function matches a handler name and has untyped params,
     * the signal's parameter types are used instead.
     */
    signalHandlers?: Map<string, {
        params: Array<{
            name: string;
            gdType: string;
        }>;
    }>;
    /**
     * Use `any` instead of `unknown` as the fallback for unresolvable types
     * (e.g. `gd.getset` without a GDScript type annotation and without a
     * typeof-able value expression). Less strict but more error-prone.
     */
    unsafeUseAny?: boolean;
    /**
     * @deprecated The single-file `convertGdToTs` no longer auto-emits
     * imports — that's done by {@link import('./inject-imports.ts').injectMissingImports}
     * at the batch level (driven by the `initial-convert-gd-to-ts` CLI command). The field is kept on
     * the options shape for API back-compat but is currently ignored.
     * The `injectMissingImports` post-pass takes its own
     * `generateGlobalClassTypes` flag.
     */
    generateGlobalClassTypes?: boolean;
}
/**
 * Extracts class info (class_name, extends, own members) from a GD source without full conversion.
 *
 * `filePath` is optional but recommended — it's stored on the resulting
 * {@link UserClassInfo} and consumed by the GD→TS converter when it
 * needs to emit cross-file `import { Foo } from './foo.js'` lines (the
 * module-scoped layout used when `generateGlobalClassTypes` is `false`).
 */
export declare function parseGdClassInfo(source: string, registry?: GodotClassRegistry, filePath?: string): UserClassInfo | null;
export declare function convertGdToTs(options: GdToTsOptions): TransformResult;
export { resolveAllInheritedMembers, resolveInheritedMemberTypes, } from './context.ts';
//# sourceMappingURL=index.d.ts.map