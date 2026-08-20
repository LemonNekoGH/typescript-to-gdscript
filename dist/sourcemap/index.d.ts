import { type RawSourceMap, type MappingItem } from 'source-map';
export interface Mapping {
    /** Original source file */
    source: string;
    /** Original line (1-based) */
    originalLine: number;
    /** Original column (0-based) */
    originalColumn: number;
    /** Generated line (1-based) */
    generatedLine: number;
    /** Generated column (0-based) */
    generatedColumn: number;
    /** Optional name */
    name?: string;
}
export declare class SourceMapper {
    private generator;
    private sourceFile;
    constructor(sourceFile: string, generatedFile: string);
    addMapping(mapping: Mapping): void;
    addSourceContent(source: string, content: string): void;
    toJSON(): RawSourceMap;
    toString(): string;
}
/**
 * Position in a source file — line is 1-based, column is 0-based.
 */
export interface SourcePosition {
    line: number;
    column: number;
    source?: string | null;
    name?: string | null;
}
/**
 * Reads a source map and provides lookup methods.
 * Used for verification and for mapping GDScript LSP errors back to TS.
 */
export declare class SourceMapReader {
    private consumer;
    private constructor();
    static fromJSON(rawMap: RawSourceMap | string): Promise<SourceMapReader>;
    /**
     * Given a position in the generated (GDScript) file, find the original (TS) position.
     */
    originalPositionFor(generatedLine: number, generatedColumn: number): SourcePosition;
    /**
     * Given a position in the original (TS) file, find the generated (GDScript) position.
     */
    generatedPositionFor(source: string, originalLine: number, originalColumn: number): {
        line: number | null;
        column: number | null;
    };
    /**
     * Get all mappings as a flat array.
     */
    allMappings(): MappingItem[];
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map