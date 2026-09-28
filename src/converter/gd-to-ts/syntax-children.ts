import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';

// The GDScript grammar declares `\` line continuations and `#` comments
// as extras (`extras` in tree-sitter-gdscript's grammar.js): they may sit
// between any two tokens, and tree-sitter hangs them on whichever node
// encloses that spot — so they turn up among the named children of
// expressions that have no place for them.

/**
 * The first named child that is part of the syntax, skipping extras.
 * The value of `return`, `await`, `not`, `(…)`, `[…]`, `when` and
 * `extends` follows a keyword or bracket, and a continuation or comment
 * may come in between: `return \` + newline + `a + b` puts the
 * continuation at `namedChildren[0]`, and reading it there loses `a + b`.
 */
export function firstSyntaxChild(node: SyntaxNode): SyntaxNode | undefined {
  return node.namedChildren.find((c) => !c.isExtra);
}

/**
 * The named children that are part of the syntax, without extras — for a
 * construct read piece by piece that has no spot for a comment, such as
 * an attribute chain (`node \` + newline + `.name`).
 */
export function syntaxChildren(node: SyntaxNode): SyntaxNode[] {
  return node.namedChildren.filter((c) => !c.isExtra);
}

/**
 * A type's source text without extras. Inside its brackets a type may run
 * over several lines — `Array[\` + newline + `int]` — and the raw `.text`
 * keeps the `\`, the line break and the indentation, which then leaked
 * into the TypeScript annotation and kept a name from matching anything.
 * A type holds no `#` and no string, so both extras can go by their text;
 * what is left is the type as it would read on one line. An `extends`
 * target can be a string, though — a script path — and is returned as
 * written: a `#` or a run of spaces there is part of the path.
 */
export function typeSourceText(node: SyntaxNode): string {
  if (node.type === SyntaxType.String) return node.text;
  return node.text
    .replace(/#[^\n]*/g, '')
    .replace(/\\\r?\n/g, '')
    .replace(/\s+/g, ' ')
    .replace(/([[(]) /g, '$1')
    .replace(/ ([\]),])/g, '$1')
    .trim();
}
