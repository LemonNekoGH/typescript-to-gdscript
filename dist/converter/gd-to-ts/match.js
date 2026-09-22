/**
 * GDScript `match` → TypeScript. Two shapes come out of here: a plain
 * `switch` when every pattern is a literal or expression, and a
 * `gd.match()` call when a pattern binds, destructures, or carries a
 * guard — things `switch` cannot express.
 */
import { SyntaxType } from "../../parser/gdscript/types.js";
import { emitExpr } from "./expressions.js";
import { emitBody } from "./statements.js";
/**
 * Check whether a match statement can be expressed as a plain TS `switch`:
 *  - Every PatternSection uses only "simple" patterns (literals/expressions/
 *    wildcard), never Arrays, Dictionaries, pattern bindings, or guards.
 *  - Multi-pattern sections (`1, 2, 3:`) are allowed — they become
 *    fall-through `case` labels.
 */
function isSimpleMatchStatement(bodyNode) {
    for (const section of bodyNode.namedChildren) {
        if (section.type !== SyntaxType.PatternSection)
            continue;
        const patterns = section.namedChildren.filter((c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard);
        const hasGuard = section.namedChildren.some((c) => c.type === SyntaxType.PatternGuard);
        if (hasGuard)
            return false;
        for (const p of patterns) {
            if (p.type === SyntaxType.Array ||
                p.type === SyntaxType.Dictionary ||
                p.type === SyntaxType.PatternBinding) {
                return false;
            }
            // Any nested pattern bindings also disqualify
            const bindings = [];
            collectBindings(p, bindings);
            if (bindings.length > 0)
                return false;
        }
    }
    return true;
}
/**
 * True when emitted TypeScript holds a statement: any line that is
 * neither blank nor a comment.
 *
 * Asking the emitted text rather than the GDScript AST is what keeps
 * this correct for every branch body. Several things produce text
 * without producing a statement — a `pass`, a comment, an annotation,
 * and a rejected construct that leaves only an `ERROR` marker — and
 * enumerating them against the AST is a list that silently goes stale
 * the moment another one appears. That is the same rule
 * `GDScriptEmitter.hasCodeSince` applies in the other direction.
 */
function hasTsStatement(emitted) {
    // A `/* … */` spans lines and only its first one starts with `/*`,
    // so the per-line check alone reads every line after that as a
    // statement — and a branch holding nothing but a multi-line comment
    // then loses the `{}` that keeps it off the case below it. Removing
    // the whole span first leaves the line scan with only `//` to know.
    //
    // The strip can reach too far: a `/*` inside a string literal opens
    // a span that ends at the next `*/`. That direction is the safe one
    // — removing text can only turn a statement into none, which costs
    // a redundant `{}` block, where missing one merges two branches.
    const withoutBlockComments = emitted.replace(/\/\*[\s\S]*?\*\//g, '');
    return withoutBlockComments.split('\n').some((line) => {
        const text = line.trim();
        return text !== '' && !text.startsWith('//');
    });
}
function emitSimpleMatchAsSwitch(node, ctx, depth) {
    const indent = '  '.repeat(depth);
    const iCase = indent + '  ';
    const iBody = indent + '    ';
    const value = node.childForFieldName('value');
    const bodyNode = node.childForFieldName('body');
    const valueStr = value ? emitExpr(value, ctx) : '';
    let result = `${indent}switch (${valueStr}) {\n`;
    if (bodyNode) {
        // A straight transcription: every branch is carried over in the
        // order it was written, `_` included, even though `_` matching
        // first makes the branches below it dead in the GDScript. This
        // output is migration output — meant to be read and edited — so
        // dropping code silently is worse than carrying a branch that
        // never ran, and rewriting the order would hide what the source
        // actually said. Putting `default` last is the TS→GD direction's
        // job, and `visitSwitchStatement` does it there.
        const sections = bodyNode.namedChildren.filter((s) => s.type === SyntaxType.PatternSection);
        for (const section of sections) {
            const body = section.childForFieldName('body');
            const patterns = section.namedChildren.filter((c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard);
            // Emit case/default labels (one per pattern for fall-through)
            for (const p of patterns) {
                if (p.type === SyntaxType.Identifier && p.text === '_') {
                    result += `${iCase}default:\n`;
                }
                else {
                    result += `${iCase}case ${emitExpr(p, ctx)}:\n`;
                }
            }
            // No `break`: a `match` branch never falls through, so the TS
            // dialect writes cases without one. That makes a `case` with no
            // statement under it stack onto the next one — which would both
            // move the comment and give the branch a body it never had — so
            // a branch whose body emits no statement gets an empty block to
            // stand on.
            const bodyStr = body ? emitBody(body, ctx, depth + 2) : '';
            if (hasTsStatement(bodyStr)) {
                result += `${bodyStr}\n`;
            }
            else {
                const inner = bodyStr ? `${bodyStr}\n` : '';
                result += `${iBody}{\n${inner}${iBody}}\n`;
            }
        }
    }
    result += `${indent}}`;
    return result;
}
export function emitMatchStatement(node, ctx, depth) {
    const indent = '  '.repeat(depth);
    const i1 = indent + '  '; // cases array indent
    const i2 = indent + '    '; // case object indent
    const value = node.childForFieldName('value');
    const bodyNode = node.childForFieldName('body');
    // If all sections use only simple patterns, emit a plain TS `switch`.
    // The TS→GD converter already handles `switch` → `match` in reverse.
    if (bodyNode && isSimpleMatchStatement(bodyNode)) {
        return emitSimpleMatchAsSwitch(node, ctx, depth);
    }
    const valueStr = value ? emitExpr(value, ctx) : '';
    let result = `${indent}gd.match(${valueStr}, [\n`;
    if (bodyNode) {
        for (const section of bodyNode.namedChildren) {
            if (section.type !== SyntaxType.PatternSection)
                continue;
            const body = section.childForFieldName('body');
            // Patterns are all named children except body and pattern_guard
            const patterns = section.namedChildren.filter((c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard);
            const guard = section.namedChildren.find((c) => c.type === SyntaxType.PatternGuard);
            // Collect all pattern_binding names from all patterns
            const bindings = [];
            for (const p of patterns) {
                collectBindings(p, bindings);
            }
            const hasBindings = bindings.length > 0;
            const hasGuard = !!guard;
            const isMultiPattern = patterns.length > 1 && !hasBindings && !hasGuard;
            // Add pattern bindings to local scope so they don't get this. prefix
            const savedLocals = new Set(ctx.localVars);
            for (const b of bindings)
                ctx.localVars.add(b);
            // Emit do: () => {} body (arrow function preserves outer `this`)
            const bodyStr = body ? emitBody(body, ctx, depth + 3) : '';
            const doBlock = `do: () => {\n${bodyStr}\n${i2}}`;
            if (isMultiPattern) {
                // Multiple patterns: { matchMany: [...], do() { ... } }
                const patternStrs = patterns.map((p) => emitMatchPattern(p, ctx));
                result += `${i1}{\n`;
                result += `${i2}matchMany: [${patternStrs.join(', ')}],\n`;
                result += `${i2}${doBlock},\n`;
                result += `${i1}},\n`;
            }
            else if (hasBindings || hasGuard) {
                // Arrow function: (bindings...) => ({ match: ..., when?: ..., do() { ... } })
                const patternStr = emitMatchPattern(patterns[0], ctx);
                result += `${i1}(${bindings.join(', ')}) => ({\n`;
                result += `${i2}match: ${patternStr},\n`;
                if (hasGuard) {
                    const guardExpr = guard.namedChildren[0];
                    const guardStr = guardExpr ? emitExpr(guardExpr, ctx) : 'true';
                    result += `${i2}when: ${guardStr},\n`;
                }
                result += `${i2}${doBlock},\n`;
                result += `${i1}}),\n`;
            }
            else {
                // Simple object: { match: ..., do() { ... } }
                const pattern = patterns[0];
                const patternStr = pattern
                    ? emitMatchPattern(pattern, ctx)
                    : 'undefined';
                result += `${i1}{\n`;
                result += `${i2}match: ${patternStr},\n`;
                result += `${i2}${doBlock},\n`;
                result += `${i1}},\n`;
            }
            // Restore local scope
            ctx.localVars = savedLocals;
        }
    }
    result += `${indent}]);`;
    return result;
}
/** Collect all pattern_binding identifier names from a pattern tree */
function collectBindings(node, bindings) {
    if (node.type === SyntaxType.PatternBinding) {
        const ident = node.namedChildren[0];
        if (ident)
            bindings.push(ident.text);
        return;
    }
    for (const child of node.namedChildren) {
        collectBindings(child, bindings);
    }
}
/** Emit a match pattern as a TypeScript expression for use inside gd.match() */
function emitMatchPattern(node, ctx) {
    // Wildcard: _ → undefined
    if (node.type === SyntaxType.Identifier && node.text === '_') {
        return 'undefined';
    }
    // Binding: var name → just the name (it becomes an arrow param)
    if (node.type === SyntaxType.PatternBinding) {
        const ident = node.namedChildren[0];
        return ident ? ident.text : 'undefined';
    }
    // Array pattern: [elem1, elem2, ..]
    if (node.type === SyntaxType.Array) {
        const elements = [];
        let hasOpenEnding = false;
        for (const child of node.namedChildren) {
            if (child.type === SyntaxType.PatternOpenEnding) {
                hasOpenEnding = true;
                continue;
            }
            elements.push(emitMatchPattern(child, ctx));
        }
        if (hasOpenEnding) {
            return `[${elements.join(', ')}, ...[]]`;
        }
        return `[${elements.join(', ')}]`;
    }
    // Dictionary pattern: {key: value, ..} or {key1, key2}
    if (node.type === SyntaxType.Dictionary) {
        const entries = [];
        let hasOpenEnding = false;
        for (const child of node.namedChildren) {
            if (child.type === SyntaxType.PatternOpenEnding) {
                hasOpenEnding = true;
                continue;
            }
            if (child.type === SyntaxType.Pair) {
                const left = child.childForFieldName('left');
                const value = child.childForFieldName('value');
                // Key: strip quotes for object key
                let key;
                if (left && left.type === SyntaxType.String) {
                    key = left.text.slice(1, -1); // remove quotes
                }
                else {
                    key = left ? emitExpr(left, ctx) : '';
                }
                // Value: may be a pattern_binding or regular value
                const valStr = value ? emitMatchPattern(value, ctx) : 'undefined';
                entries.push(`${key}: ${valStr}`);
            }
            else if (child.type === SyntaxType.String) {
                // Bare string in dict like {"name", "age"} → name: undefined
                const key = child.text.slice(1, -1);
                entries.push(`${key}: undefined`);
            }
        }
        const inner = entries.join(', ');
        if (hasOpenEnding) {
            return `{ ${inner}, ...{} }`;
        }
        return `{ ${inner} }`;
    }
    // Everything else: use regular expression emitter
    return emitExpr(node, ctx);
}
//# sourceMappingURL=match.js.map