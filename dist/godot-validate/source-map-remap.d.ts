/**
 * Source map remapping for Godot validation errors.
 * Maps GDScript error positions back to TypeScript source positions.
 */
import type { TransformDiagnostic } from '../converter/common/index.ts';
import type { GodotRawError } from './error-parser.ts';
/**
 * Remaps a Godot error from GDScript positions to TypeScript positions.
 *
 * Source-map input priority:
 *   1. `sourceMapJson` parameter (inline — preferred: caller already has
 *      the JSON in memory, e.g. straight from a converter run or a
 *      `ProjectCache` entry — no disk read needed).
 *   2. `<error.file>.map` sidecar on disk (fallback for callers that
 *      only point at the `.gd`).
 *
 * When `tsFilePath` is provided, it overrides the resolved source path
 * from the source map — useful when the map's `sources` entry is
 * relative to a throwaway location (e.g. a cache/scratch dir) but we
 * already know the real `.ts` we're validating.
 *
 * Falls back to GD positions if no source map is available.
 */
export declare function remapError(error: GodotRawError, sourceMapJson?: string, tsFilePath?: string): Promise<TransformDiagnostic>;
export declare const VLQ_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
export declare function decodeVlq(encoded: string): number[];
interface LineMapping {
    generatedLine: number;
    generatedColumn: number;
    originalLine: number;
    originalColumn: number;
    sourceIndex: number;
}
/**
 * Parses source map JSON mappings into a flat array of line mappings.
 * Lightweight sync alternative to SourceMapConsumer.
 */
export declare function parseSourceMapMappings(rawMap: string): {
    mappings: LineMapping[];
    sources: string[];
};
/**
 * Synchronously remaps a Godot error using a pre-loaded source map JSON string.
 * Falls back to GD position if remapping fails.
 */
export declare function remapErrorSync(error: GodotRawError, sourceMapJson?: string, tsFilePath?: string): TransformDiagnostic;
export {};
//# sourceMappingURL=source-map-remap.d.ts.map