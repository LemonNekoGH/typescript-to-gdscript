/**
 * Lint overlay for the typescript-to-gdscript language-service plugin.
 *
 * Surfaces converter + Godot diagnostics as regular `ts.Diagnostic`s so
 * the IDE shows TS→GD problems inline, exactly like TypeScript's own
 * errors. Two tiers, in preference order:
 *
 *   1. **Live convert** (`liveDiagnosticsFor`) — runs `convertTsToGd`
 *      in-process against tsserver's own `ts.Program`. Handles the
 *      dirty buffer (unsaved changes), produces converter diagnostics
 *      synchronously, and kicks off async Godot validation. Results
 *      are memoized per (file, SourceFile.version) in an LRU.
 *
 *   2. **Cached fallback** (`cachedDiagnosticsFor`) — reads diagnostics
 *      the CLI/watcher already stored in the `ProjectCache`. Used when
 *      live convert can't run (e.g. convert threw) OR produced nothing
 *      but the on-disk cache has a fresh entry.
 *
 * Godot validation runs async on every successful live convert. When
 * Godot returns we merge its diagnostics into the live memo and call
 * `info.project.refreshDiagnostics()` so tsserver re-queries the file
 * without waiting for another edit.
 */
import type tsModule from 'typescript';
import { ProjectCache } from '../cache/index.ts';
import { type ResolvedConfig } from '../config/index.ts';
type TS = typeof tsModule;
type LS = tsModule.LanguageService;
export interface LintOverlayDeps {
    ts: TS;
    info: tsModule.server.PluginCreateInfo;
    ls: LS;
    cfg: ResolvedConfig;
    cache: ProjectCache;
    log: (msg: string) => void;
    trace: (msg: string) => void;
}
export interface LintOverlay {
    /**
     * Append tier-1/tier-2 diagnostics to whatever the inner LS produced.
     * Caller is responsible for invoking `ls.getSemanticDiagnostics()`
     * first — this helper only contributes the extra entries.
     */
    getSemanticDiagnostics(fileName: string): tsModule.Diagnostic[];
}
export declare function createLintOverlay(deps: LintOverlayDeps): LintOverlay;
export {};
//# sourceMappingURL=lint.d.ts.map