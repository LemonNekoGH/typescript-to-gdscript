export declare class GDScriptEmitter {
    private output;
    private currentLine;
    private currentColumn;
    private indentLevel;
    private indentStr;
    private sourceMapper;
    private sourceFile;
    private blocks;
    private nextBlockId;
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
    /**
     * Reserve a block of lines for a spot inside an expression, and
     * return the marker to leave there. `emit` runs later, from
     * `writeLine`, with the indent level already set to the block's
     * body — so it writes whole lines exactly as a statement would,
     * keeping its own source-map positions.
     */
    reserveBlock(emit: () => void): string;
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
    /**
     * Opaque marker for the current end of output, for
     * {@link hasCodeSince}.
     */
    mark(): number;
    /**
     * True when a real GDScript statement has been written since `mark`.
     * Asking the output rather than the AST keeps the rule correct for
     * every statement kind, including ones that emit only an error
     * marker. Three things produce a line without filling an indented
     * block, and GDScript rejects a block none of whose lines is a
     * statement: a blank line, a comment, and an annotation with nothing
     * after it (an annotation attaches to the statement that follows,
     * so `@export var x = 1` counts but a lone `@warning_ignore(...)`
     * does not).
     */
    hasCodeSince(mark: number): boolean;
    /**
     * Throw when a reserved block never reached `writeLine`.
     *
     * `writeLine` already rejects the opposite mismatch — a marker whose
     * block is gone. This is the half that matters more: a block whose
     * marker was dropped is a lambda body that vanished from the output
     * with nothing to show for it, which is precisely the silent loss
     * `reserveBlock` exists to prevent. It can only happen if a caller
     * emits an expression and then throws the string away, so it is a
     * bug in the caller, and a converter that fails loudly beats one
     * that writes a `.gd` missing a function body.
     */
    assertBlocksDrained(): void;
    /** Get the generated code */
    getOutput(): string;
    /** Get the source map JSON string, or undefined if source maps are disabled */
    getSourceMap(): string | undefined;
    /** Set source content for source maps */
    setSourceContent(content: string): void;
}
//# sourceMappingURL=emitter.d.ts.map