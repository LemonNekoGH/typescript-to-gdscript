import { SourceMapper, type Mapping } from '../../sourcemap/index.ts';

/**
 * GDScript code emitter with source map support.
 * Tracks line/column positions as code is emitted.
 */
/**
 * An annotation alone on its line — no statement after it to attach to.
 * `@onready`, `@warning_ignore("unused_variable")`, `@export_range(0, 1)`.
 *
 * The argument list runs to the LAST `)` on the line, not the first:
 * an argument is free-form text (it can reach the emitter through
 * `gd.eval`) and may contain `)` inside a string. Matching too eagerly
 * only costs a redundant `pass`; matching too little suppresses one
 * and emits a block GDScript refuses to parse. An annotation with a
 * statement after it (`@export var x = 1`) still fails to match, since
 * the line then has text left over after the closing `)`.
 */
const BARE_ANNOTATION = /^@[A-Za-z_]\w*\s*(\(.*\))?$/;

export class GDScriptEmitter {
  private output: string[] = [];
  private currentLine = 1;
  private currentColumn = 0;
  private indentLevel = 0;
  private indentStr = '\t';
  private sourceMapper: SourceMapper | null = null;
  private sourceFile: string;

  constructor(
    sourceFile: string,
    generatedFile?: string,
    enableSourceMap = false,
  ) {
    this.sourceFile = sourceFile;
    if (enableSourceMap && generatedFile) {
      this.sourceMapper = new SourceMapper(sourceFile, generatedFile);
    }
  }

  indent(): void {
    this.indentLevel++;
  }

  dedent(): void {
    this.indentLevel = Math.max(0, this.indentLevel - 1);
  }

  /**
   * Write text to output, tracking position for source maps.
   * @param text The text to write
   * @param originalLine Original source line (1-based), for source map
   * @param originalColumn Original source column (0-based), for source map
   */
  write(text: string, originalLine?: number, originalColumn?: number): void {
    if (
      originalLine !== undefined &&
      originalColumn !== undefined &&
      this.sourceMapper
    ) {
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
        ? lines.at(-1)!.length
        : this.currentColumn + lines.at(0)!.length;
  }

  /** Write text followed by a newline, with mapping at column 0 (line start). */
  writeLine(text: string, originalLine: number, originalColumn: number): void {
    const indent = this.indentStr.repeat(this.indentLevel);
    this.write(indent + text, originalLine, originalColumn);
    this.write('\n');
  }

  /** Write an empty line */
  writeEmptyLine(): void {
    this.write('\n');
  }

  /** Get current indentation level */
  getIndentLevel(): number {
    return this.indentLevel;
  }

  /** Get indentation string for a given level */
  getIndentStr(level?: number): string {
    return this.indentStr.repeat(level ?? this.indentLevel);
  }

  /** Write current indentation */
  writeIndent(): void {
    const indent = this.indentStr.repeat(this.indentLevel);
    this.write(indent);
  }

  /**
   * Opaque marker for the current end of output, for
   * {@link hasCodeSince}.
   */
  mark(): number {
    return this.output.length;
  }

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
  hasCodeSince(mark: number): boolean {
    return this.output
      .slice(mark)
      .join('')
      .split('\n')
      .some((line) => {
        const text = line.trim();
        if (text === '' || text.startsWith('#')) return false;
        return !BARE_ANNOTATION.test(text);
      });
  }

  /** Get the generated code */
  getOutput(): string {
    return this.output.join('');
  }

  /** Get the source map JSON string, or undefined if source maps are disabled */
  getSourceMap(): string | undefined {
    return this.sourceMapper?.toString();
  }

  /** Set source content for source maps */
  setSourceContent(content: string): void {
    this.sourceMapper?.addSourceContent(this.sourceFile, content);
  }
}
