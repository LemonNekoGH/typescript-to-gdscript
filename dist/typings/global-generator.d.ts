import type { GodotClassXml } from './godot-registry.ts';
import { type TypeContext } from './type-mapping.ts';
/** Classes to skip entirely (handled by gd-helpers.d.ts or TS builtins) */
export declare const SKIP_CLASSES: Set<string>;
/**
 * Generates global scope declarations (top-level functions, constants, enums).
 */
export declare function generateGlobalScopeDeclaration(cls: GodotClassXml, ctx: TypeContext): string;
/**
 * Generates TypeScript declarations from @GDScript.xml:
 * constants, methods, and annotation decorators.
 */
export declare function generateGDScriptDeclaration(cls: GodotClassXml, ctx: TypeContext): string;
/**
 * Generates a Number interface extension with operator overloads from int and float XML docs.
 * Since int/float are `type number`, their operators need to be on the Number interface.
 * We merge both int and float operators, deduplicating where they overlap.
 */
export declare function generateNumberOperatorOverloads(classes: Map<string, GodotClassXml>, ctx: TypeContext): string | null;
/**
 * Computes Dictionary member names that no class in the Object hierarchy defines.
 * These are safe to override with `never` on GodotObject to block Dictionary API leaking
 * through the Object interface to all Godot classes.
 */
export declare function computeDictOnlyOverrides(classes: Map<string, GodotClassXml>): Set<string>;
/**
 * Collects all Dictionary interface member names (methods + properties).
 * Used to override them with `never` on value type interfaces, preventing
 * Dictionary methods from leaking through the TS Object interface.
 */
export declare function collectAllDictMembers(classes: Map<string, GodotClassXml>): Set<string>;
//# sourceMappingURL=global-generator.d.ts.map