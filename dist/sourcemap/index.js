import { SourceMapGenerator, SourceMapConsumer, } from 'source-map';
export class SourceMapper {
    generator;
    sourceFile;
    constructor(sourceFile, generatedFile) {
        this.sourceFile = sourceFile;
        this.generator = new SourceMapGenerator({
            file: generatedFile,
        });
    }
    addMapping(mapping) {
        this.generator.addMapping({
            source: mapping.source,
            original: { line: mapping.originalLine, column: mapping.originalColumn },
            generated: {
                line: mapping.generatedLine,
                column: mapping.generatedColumn,
            },
            name: mapping.name,
        });
    }
    addSourceContent(source, content) {
        this.generator.setSourceContent(source, content);
    }
    toJSON() {
        return this.generator.toJSON();
    }
    toString() {
        return this.generator.toString();
    }
}
/**
 * Reads a source map and provides lookup methods.
 * Used for verification and for mapping GDScript LSP errors back to TS.
 */
export class SourceMapReader {
    consumer;
    constructor(consumer) {
        this.consumer = consumer;
    }
    static async fromJSON(rawMap) {
        const json = typeof rawMap === 'string'
            ? JSON.parse(rawMap)
            : rawMap;
        const consumer = await new SourceMapConsumer(json);
        return new SourceMapReader(consumer);
    }
    /**
     * Given a position in the generated (GDScript) file, find the original (TS) position.
     */
    originalPositionFor(generatedLine, generatedColumn) {
        const result = this.consumer.originalPositionFor({
            line: generatedLine,
            column: generatedColumn,
        });
        return {
            line: result.line,
            column: result.column,
            source: result.source,
            name: result.name,
        };
    }
    /**
     * Given a position in the original (TS) file, find the generated (GDScript) position.
     */
    generatedPositionFor(source, originalLine, originalColumn) {
        return this.consumer.generatedPositionFor({
            source,
            line: originalLine,
            column: originalColumn,
        });
    }
    /**
     * Get all mappings as a flat array.
     */
    allMappings() {
        const mappings = [];
        this.consumer.eachMapping((m) => mappings.push(m));
        return mappings;
    }
    destroy() {
        this.consumer.destroy();
    }
}
//# sourceMappingURL=index.js.map