import TreeSitter from 'tree-sitter';
import GodotResource from 'tree-sitter-godot-resource';
export class GodotResourceParser {
    parser;
    constructor() {
        this.parser = new TreeSitter();
        this.parser.setLanguage(GodotResource);
    }
    parse(source) {
        const tree = this.parser.parse(source);
        return tree.rootNode;
    }
}
//# sourceMappingURL=index.js.map