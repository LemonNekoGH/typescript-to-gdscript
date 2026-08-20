import TreeSitter from 'tree-sitter';
import type { SyntaxNode } from './types.ts';
export declare class GDScriptParser {
    private parser;
    constructor();
    parse(source: string): SyntaxNode;
    parseFile(source: string, previousTree?: TreeSitter.Tree): TreeSitter.Tree;
}
//# sourceMappingURL=index.d.ts.map