/**
 * typescript-to-gdscript language-service plugin — entry point.
 *
 * Two responsibilities:
 *
 *   1. **Diagnostic surfacing** (`./lint.ts`) — converter + Godot
 *      errors shown inline as `ts.Diagnostic`s, exactly like
 *      TypeScript's own errors. Tier 1 reads the persistent
 *      `ProjectCache`; tier 2 live-converts in tsserver's own
 *      `Program` and kicks off async Godot validation.
 *
 *   2. **Diagnostic suppression** — TypeScript reports a few codes
 *      as part of the namespace+class merge pattern the typings
 *      generator emits in `<name>.gd.d.ts` files (TS2434 / TS2435
 *      "namespace must precede the class", TS2449 "class used before
 *      its declaration"). These are noise for the user — the
 *      generated typings are correct — so we filter them
 *      unconditionally for in-scope `.ts` files.
 *
 * The plugin does NOT modify the user's source view (no snapshot
 * wrapping). All type augmentation comes from the per-script
 * `<name>.gd.d.ts` files emitted by `tstogd generate-typings` /
 * `tstogd watch`. Users who want `Foo.X` access for class-level
 * consts / enums / inner classes write an explicit
 * `export namespace Foo { ... }` block alongside their
 * `export class Foo` — TypeScript's native namespace+class merging
 * gives them `Foo.X` cross-file and `this.X` on instance.
 *
 * NOTE: Navigation overlays (go-to-def / find-refs across the
 * shadow ↔ source boundary) were removed after testing showed
 * WebStorm handles symbol navigation entirely through its own
 * native indexer — tsserver never receives `definition` /
 * `references` from WebStorm — so the overrides had no effect
 * there. Users relying on shadow-class navigation should rely on
 * the typings generator's `@see` JSDoc + TS type aliases instead.
 */
import type tsModule from 'typescript';
type TS = typeof tsModule;
type LS = tsModule.LanguageService;
interface PluginInit {
    typescript: TS;
}
declare function init({ typescript: ts }: PluginInit): {
    create: (info: tsModule.server.PluginCreateInfo) => LS;
};
export default init;
//# sourceMappingURL=index.d.ts.map