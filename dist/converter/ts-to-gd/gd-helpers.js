import ts from 'typescript';
import { sanitizeFunctionName } from "../../typings/class-generator.js";
// ---- gd.as / gd.is ----
/**
 * Handle `gd.as(value, Type)` -> `value as Type`.
 * Returns null if this is not a gd.as call.
 */
export function tryEmitGdAs(t, node, obj, method) {
    if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'as')
        return null;
    if (node.arguments.length >= 2) {
        const value = t.emitExpression(node.arguments[0]);
        const type = t.emitExpression(node.arguments[1]);
        return `${value} as ${type}`;
    }
    return null;
}
/**
 * Handle `gd.is(value, Type)` -> `value is Type`.
 * Returns null if this is not a gd.is call.
 */
export function tryEmitGdIs(t, node, obj, method) {
    if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'is')
        return null;
    if (node.arguments.length >= 2) {
        const value = t.emitExpression(node.arguments[0]);
        const type = t.emitExpression(node.arguments[1]);
        return `${value} is ${type}`;
    }
    return null;
}
/**
 * Handle a global whose GDScript name TypeScript cannot spell:
 * `gd.typeof(value)` -> `typeof(value)`.
 *
 * Keyed on the same predicate the typings generator uses to decide a
 * global gets no declaration of its own (`sanitizeFunctionName` changes
 * it), so the two cannot drift: every global `gd` has to carry is one
 * this rewrites back, under any Godot version. `typeof` is the only
 * one today. Returns null if this is not such a call.
 */
export function tryEmitGdUnspellableGlobal(t, node, obj, method) {
    if (!ts.isIdentifier(obj) || obj.text !== 'gd')
        return null;
    if (!t.ctx.registry?.isGlobalFunction(method) ||
        sanitizeFunctionName(method) === method) {
        return null;
    }
    const args = node.arguments.map((a) => t.emitExpression(a)).join(', ');
    return `${method}(${args})`;
}
// ---- gd.dict() ----
/**
 * Handle `gd.dict([[key, value], ...])` -> `{key: value, ...}`.
 * Returns null if this is not a gd.dict call.
 */
export function tryEmitGdDict(t, node, obj, method) {
    if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'dict')
        return null;
    return emitGdDict(t, node);
}
function emitGdDict(t, node) {
    if (node.arguments.length !== 1) {
        t.addDiagnostic(node, 'error', 'gd.dict() requires exactly one argument (array of [key, value] pairs)');
        return '{}';
    }
    const arg = node.arguments[0];
    if (!ts.isArrayLiteralExpression(arg)) {
        t.addDiagnostic(node, 'error', 'gd.dict() argument must be an array literal of [key, value] pairs');
        return '{}';
    }
    const entries = [];
    for (const element of arg.elements) {
        if (!ts.isArrayLiteralExpression(element) ||
            element.elements.length !== 2) {
            t.addDiagnostic(element, 'error', 'gd.dict() entries must be [key, value] tuples');
            continue;
        }
        const keyNode = element.elements[0];
        const valueNode = element.elements[1];
        let key;
        if (ts.isStringLiteral(keyNode)) {
            key = t.emitStringLiteral(keyNode);
        }
        else if (ts.isNumericLiteral(keyNode)) {
            key = keyNode.getText(t.ctx.sourceFile);
        }
        else if (ts.isIdentifier(keyNode)) {
            key = keyNode.text;
        }
        else if (ts.isPropertyAccessExpression(keyNode)) {
            key = t.emitExpression(keyNode);
        }
        else {
            t.addDiagnostic(keyNode, 'error', 'gd.dict() keys must be identifiers, property accesses, or string/number literals, not expressions');
            key = keyNode.getText(t.ctx.sourceFile);
        }
        const value = t.emitExpression(valueNode);
        entries.push(`${key}: ${value}`);
    }
    if (entries.length === 0) {
        return '{}';
    }
    return t.emitMultiLineDict(entries);
}
// ---- gd.ops.* ----
/**
 * Handle `gd.ops.add(a, b)` etc. -> `(a + b)`.
 * Returns null if this is not a gd.ops.* call.
 */
export function tryEmitGdOps(t, node, outerObj, method) {
    if (!ts.isPropertyAccessExpression(outerObj))
        return null;
    const gdObj = outerObj.expression;
    const opsNs = outerObj.name.text;
    if (!ts.isIdentifier(gdObj) || gdObj.text !== 'gd' || opsNs !== 'ops')
        return null;
    return emitOpsHelper(t, method, node.arguments);
}
function emitOpsHelper(t, method, args) {
    const operands = args.map((a) => t.emitExpression(a));
    // Unary operators (1 arg)
    if (method === 'plus' && operands.length === 1)
        return `+${operands[0]}`;
    if (method === 'minus' && operands.length === 1)
        return `-${operands[0]}`;
    // Binary operators (2 args)
    const binaryOpMap = {
        add: ' + ',
        sub: ' - ',
        mul: ' * ',
        div: ' / ',
        rem: ' % ',
        eq: ' == ',
        ne: ' != ',
        gt: ' > ',
        gte: ' >= ',
        lt: ' < ',
        lte: ' <= ',
    };
    const op = binaryOpMap[method];
    if (op && operands.length === 2) {
        return `(${operands[0]}${op}${operands[1]})`;
    }
    return `${operands.join(', ')}`;
}
// ---- gd.eval() ----
export function isGdEvalCall(node) {
    if (!ts.isCallExpression(node))
        return false;
    if (!ts.isPropertyAccessExpression(node.expression))
        return false;
    const obj = node.expression.expression;
    return (ts.isIdentifier(obj) &&
        obj.text === 'gd' &&
        node.expression.name.text === 'eval');
}
/**
 * Process a gd.eval() call and return the GDScript lines (with relative indentation).
 * Each line is prefixed with tabs for its depth relative to the first non-empty line.
 * Returns null if the content cannot be extracted or is empty.
 */
export function processGdEval(t, node) {
    if (node.arguments.length < 1)
        return null;
    const arg = node.arguments[0];
    // Extract the string content
    let content;
    if (ts.isStringLiteral(arg)) {
        content = arg.text;
    }
    else if (ts.isNoSubstitutionTemplateLiteral(arg)) {
        content = arg.text;
    }
    else if (ts.isTemplateExpression(arg)) {
        t.addDiagnostic(node, 'warning', 'gd.eval with template expressions is not supported');
        return null;
    }
    else {
        t.addDiagnostic(node, 'warning', 'gd.eval argument must be a string literal');
        return null;
    }
    // Strip leading newline if present
    const body = content.startsWith('\n') ? content.slice(1) : content;
    const rawLines = body.split('\n');
    // Strip trailing empty lines
    while (rawLines.length > 0 && rawLines[rawLines.length - 1].trim() === '') {
        rawLines.pop();
    }
    const nonEmpty = rawLines.filter((l) => l.trim() !== '');
    if (nonEmpty.length === 0)
        return null;
    // Single non-empty line: return trimmed
    if (nonEmpty.length === 1) {
        return [nonEmpty[0].trim()];
    }
    // Detect indentation style: tabs vs spaces
    const hasTabs = nonEmpty.some((l) => l.startsWith('\t'));
    const hasSpaces = nonEmpty.some((l) => /^ /.test(l));
    if (hasTabs && hasSpaces) {
        t.addDiagnostic(node, 'error', 'gd.eval: mixed tabs and spaces indentation is not supported');
        return null;
    }
    const out = [];
    if (hasTabs) {
        // Tab indentation: strip common tab prefix, emit as-is
        const minTabs = nonEmpty.reduce((min, l) => {
            const leading = l.match(/^(\t*)/)?.[1]?.length ?? 0;
            return Math.min(min, leading);
        }, Infinity);
        for (const line of rawLines) {
            if (line.trim() === '')
                continue;
            out.push(line.slice(minTabs));
        }
    }
    else {
        // Space indentation: convert indent levels to tabs
        const spaceToDepth = new Map();
        let prevSpaces = nonEmpty[0].match(/^( *)/)?.[1]?.length ?? 0;
        let depth = 0;
        spaceToDepth.set(prevSpaces, 0);
        for (const line of rawLines) {
            if (line.trim() === '')
                continue;
            const spaces = line.match(/^( *)/)?.[1]?.length ?? 0;
            const lineContent = line.trimStart();
            if (spaces > prevSpaces) {
                depth++;
            }
            else if (spaces < prevSpaces) {
                const mapped = spaceToDepth.get(spaces);
                if (mapped !== undefined) {
                    depth = mapped;
                }
                else {
                    depth = Math.max(0, depth - 1);
                }
            }
            spaceToDepth.set(spaces, depth);
            prevSpaces = spaces;
            out.push('\t'.repeat(depth) + lineContent);
        }
    }
    return out;
}
/**
 * Emit gd.eval('gdscript code') as a standalone statement (raw GDScript lines).
 */
export function emitGdEval(t, node, pos) {
    const lines = processGdEval(t, node);
    if (!lines)
        return;
    for (const line of lines) {
        t.emitter.writeLine(line, pos.line, pos.col);
    }
}
//# sourceMappingURL=gd-helpers.js.map