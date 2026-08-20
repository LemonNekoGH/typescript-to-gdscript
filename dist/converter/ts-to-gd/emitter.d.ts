/**
 * GDScript code emitter with source map support.
 * Tracks line/column positions as code is emitted.
 */
export declare class GDScriptEmitter {
    private output;
    private currentLine;
    private currentColumn;
    private indentLevel;
    private indentStr;
    private sourceMapper;
    private sourceFile;
    constructor(sourceFile: string, generatedFile?: string, enableSourceMap?: boolean);
    indent(): void;
    dedent(): void;
    /**
     * Write text to output, tracking position for source maps.
     * @param text The text to write
     * @param originalLine Original source line (1-based), for source map
     * @param originalColumn Original source column (0-based), for source map
     */
    write(text: string, originalLine?: number, originalColumn?: number): void;
    /** Write text followed by a newline, with mapping at column 0 (line start). */
    writeLine(text: string, originalLine: number, originalColumn: number): void;
    /** Write an empty line */
    writeEmptyLine(): void;
    /** Get current indentation level */
    getIndentLevel(): number;
    /** Get indentation string for a given level */
    getIndentStr(level?: number): string;
    /** Write current indentation */
    writeIndent(): void;
    /** Get the generated code */
    getOutput(): string;
    /** Get the source map JSON string, or undefined if source maps are disabled */
    getSourceMap(): string | undefined;
    /** Set source content for source maps */
    setSourceContent(content: string): void;
}
//# sourceMappingURL=emitter.d.ts.map