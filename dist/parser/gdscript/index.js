import TreeSitter from 'tree-sitter';
import GDScript from 'tree-sitter-gdscript';
export class GDScriptParser {
    parser;
    constructor() {
        this.parser = new TreeSitter();
        this.parser.setLanguage(GDScript);
    }
    parse(source) {
        const tree = this.parser.parse(source);
        return tree.rootNode;
    }
    parseFile(source, previousTree) {
        return this.parser.parse(source, previousTree);
    }
}
//# sourceMappingURL=index.js.map