/**
 * Parsed override: a class/interface declaration with individual members.
 */
export interface ParsedOverride {
    /** The full declaration header, e.g. "interface Array<T>" or "declare class Node extends GodotObject" */
    header: string | undefined;
    /** Member name → full source text (one or more lines). Order preserved. */
    members: Map<string, string>;
    /** Extra lines (index signatures, comments) that don't have a named member */
    extras: string[];
}
/**
 * Loads all override .d.ts files from multiple directories and merges them.
 * Later directories override earlier ones (user overrides win over defaults).
 * Returns a map: TS declaration name → ParsedOverride.
 */
export declare function loadOverrides(overrideDirs: string[]): Map<string, ParsedOverride>;
/**
 * Loads global function overrides from `_globals.d.ts` across multiple directories.
 * Later directories override earlier ones.
 * Returns a map: function name → full declaration text (JSDoc + all overloads).
 */
export declare function loadGlobalOverrides(overrideDirs: string[]): Map<string, string>;
/**
 * Applies global function overrides to generated `_globals.d.ts` content.
 * For each overridden function, replaces the generated declaration (and its JSDoc)
 * with the override text.
 */
export declare function applyGlobalOverrides(content: string, globalOverrides: Map<string, string>): string;
/**
 * Applies override to a generated declaration string.
 * Replaces the header and merges members: overridden members replace generated ones,
 * new members from the override are appended.
 */
export declare function applyOverride(generated: string, override: ParsedOverride): string;
//# sourceMappingURL=override-system.d.ts.map