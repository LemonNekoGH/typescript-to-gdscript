import { SourceMapper } from "../../sourcemap/index.js";
/**
 * GDScript code emitter with source map support.
 * Tracks line/column positions as code is emitted.
 */
export class GDScriptEmitter {
    output = [];
    currentLine = 1;
    currentColumn = 0;
    indentLevel = 0;
    indentStr = '\t';
    sourceMapper = null;
    sourceFile;
    constructor(sourceFile, generatedFile, enableSourceMap = false) {
        this.sourceFile = sourceFile;
        if (enableSourceMap && generatedFile) {
            this.sourceMapper = new SourceMapper(sourceFile, generatedFile);
        }
    }
    indent() {
        this.indentLevel++;
    }
    dedent() {
        this.indentLevel = Math.max(0, this.indentLevel - 1);
    }
    /**
     * Write text to output, tracking position for source maps.
     * @param text The text to write
     * @param originalLine Original source line (1-based), for source map
     * @param originalColumn Original source column (0-based), for source map
     */
    write(text, originalLine, originalColumn) {
        if (originalLine !== undefined &&
            originalColumn !== undefined &&
            this.sourceMapper) {
            this.sourceMapper.addMapping({
                source: this.sourceFile,
                originalLine,
                originalColumn,
                generatedLine: this.currentLine,
                generatedColumn: this.currentColumn,
            });
        }
        const lines = text.split('\n');
        this.output.push(text);
        this.currentLine += lines.length - 1;
        this.currentColumn =
            lines.length > 1
                ? lines.at(-1).length
                : this.currentColumn + lines.at(0).length;
    }
    /** Write text followed by a newline, with mapping at column 0 (line start). */
    writeLine(text, originalLine, originalColumn) {
        const indent = this.indentStr.repeat(this.indentLevel);
        this.write(indent + text, originalLine, originalColumn);
        this.write('\n');
    }
    /** Write an empty line */
    writeEmptyLine() {
        this.write('\n');
    }
    /** Get current indentation level */
    getIndentLevel() {
        return this.indentLevel;
    }
    /** Get indentation string for a given level */
    getIndentStr(level) {
        return this.indentStr.repeat(level ?? this.indentLevel);
    }
    /** Write current indentation */
    writeIndent() {
        const indent = this.indentStr.repeat(this.indentLevel);
        this.write(indent);
    }
    /** Get the generated code */
    getOutput() {
        return this.output.join('');
    }
    /** Get the source map JSON string, or undefined if source maps are disabled */
    getSourceMap() {
        return this.sourceMapper?.toString();
    }
    /** Set source content for source maps */
    setSourceContent(content) {
        this.sourceMapper?.addSourceContent(this.sourceFile, content);
    }
}
//# sourceMappingURL=emitter.js.map