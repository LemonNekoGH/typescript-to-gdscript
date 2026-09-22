/**
 * `gd.getset()` property emitter for TS→GD conversion.
 *
 * `X = gd.getset<T>({ value?, get, set })` is the TS-side escape
 * hatch for GDScript setget patterns that don't fit the native
 * `get X() {} / set X(v) {}` accessor pair — specifically:
 *   - Properties with a default value + custom get/set
 *   - The `get = fn, set = fn` function-reference form in GDScript
 *
 * Two emission modes:
 *   - **Inline**: `get` / `set` are arrow functions — emitted as
 *     native GD `var X: get: ... set(v): ...`.
 *   - **Function-reference**: `get` / `set` are identifiers /
 *     `this.fn` accesses — emitted as GD `var X: get = fn, set = fn`.
 *
 * `null` on one side means "use GDScript's default" (backing-field
 * read/write) — the corresponding side is omitted from the GD
 * output. Both-null is an error. Mixing inline bodies with function
 * references in one call is also an error.
 *
 * Type resolution order (see `resolveGetsetType`):
 *   1. Explicit `gd.getset<T>({...})` type argument
 *   2. Property declaration's own annotation (`name: T = ...`)
 *   3. `set` callback parameter type (via call signature)
 *   4. `value` expression's type (numeric literal → `int` / `float`
 *      from source text; else `typeToString` + widening)
 */
import ts from 'typescript';
import { tsTypeNodeToGdType } from "../common/index.js";
import { isGdTypeName, isUserDeclared } from "../common/gd-names.js";
export function visitGdGetsetProperty(name, node, call, t) {
    const pos = t.getLineAndCol(node);
    if (call.arguments.length !== 1 ||
        !ts.isObjectLiteralExpression(call.arguments[0])) {
        t.addDiagnostic(call, 'error', '`gd.getset()` requires a single object literal argument with `get` and `set` properties.');
        return;
    }
    const objArg = call.arguments[0];
    let valueExpr;
    let getExpr;
    let setExpr;
    let hasGetKey = false;
    let hasSetKey = false;
    for (const prop of objArg.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name))
            continue;
        const key = prop.name.text;
        if (key === 'value')
            valueExpr = prop.initializer;
        else if (key === 'get') {
            hasGetKey = true;
            getExpr = prop.initializer;
        }
        else if (key === 'set') {
            hasSetKey = true;
            setExpr = prop.initializer;
        }
    }
    if (!hasGetKey || !hasSetKey) {
        t.addDiagnostic(call, 'error', '`gd.getset()` requires both `get` and `set` properties (use `null` for the default).');
        return;
    }
    const getIsNull = getExpr !== undefined && getExpr.kind === ts.SyntaxKind.NullKeyword;
    const setIsNull = setExpr !== undefined && setExpr.kind === ts.SyntaxKind.NullKeyword;
    if (getIsNull && setIsNull) {
        t.addDiagnostic(call, 'error', '`gd.getset()`: at least one of `get` or `set` must be non-null.');
        return;
    }
    const getIsInline = !getIsNull &&
        getExpr !== undefined &&
        (ts.isArrowFunction(getExpr) || ts.isFunctionExpression(getExpr));
    const setIsInline = !setIsNull &&
        setExpr !== undefined &&
        (ts.isArrowFunction(setExpr) || ts.isFunctionExpression(setExpr));
    const getIsRef = !getIsNull && !getIsInline;
    const setIsRef = !setIsNull && !setIsInline;
    if ((getIsInline && setIsRef) || (getIsRef && setIsInline)) {
        t.addDiagnostic(call, 'error', '`gd.getset()`: cannot mix inline `get`/`set` bodies with function-reference form.');
        return;
    }
    const usingRefForm = getIsRef || setIsRef;
    if (usingRefForm && valueExpr) {
        t.addDiagnostic(call, 'error', '`gd.getset()`: `value` default cannot be used with function-reference `get`/`set`.');
        return;
    }
    // Resolve type annotation
    const gdType = resolveGetsetType(call, node, setExpr, setIsNull, valueExpr, t);
    const typePart = gdType ? `: ${gdType}` : '';
    const valuePart = valueExpr ? ` = ${t.emitExpression(valueExpr)}` : '';
    if (usingRefForm) {
        const parts = [];
        if (getIsRef) {
            const fn = extractFunctionRefName(getExpr);
            if (!fn) {
                t.addDiagnostic(call, 'error', '`gd.getset()`: function-reference form requires `this.fn_name` expressions.');
                return;
            }
            parts.push(`get = ${fn}`);
        }
        if (setIsRef) {
            const fn = extractFunctionRefName(setExpr);
            if (!fn) {
                t.addDiagnostic(call, 'error', '`gd.getset()`: function-reference form requires `this.fn_name` expressions.');
                return;
            }
            parts.push(`set = ${fn}`);
        }
        t.emitter.writeLine(`var ${name}${typePart}${valuePart}:`, pos.line, pos.col);
        t.emitter.indent();
        t.emitter.writeLine(parts.join(', '), pos.line, pos.col);
        t.emitter.dedent();
        return;
    }
    // Inline form
    t.emitter.writeLine(`var ${name}${typePart}${valuePart}:`, pos.line, pos.col);
    t.emitter.indent();
    const savedAccessorName = t.currentAccessorName;
    t.setCurrentAccessorName(name);
    if (getIsInline) {
        const getFn = getExpr;
        const getPos = t.getLineAndCol(getFn);
        t.emitter.writeLine('get:', getPos.line, getPos.col);
        t.emitter.indent();
        if (ts.isBlock(getFn.body)) {
            t.visitBlock(getFn.body);
        }
        else {
            t.emitter.writeLine(`return ${t.emitExpression(getFn.body)}`, getPos.line, getPos.col);
        }
        t.emitter.dedent();
    }
    if (setIsInline) {
        const setFn = setExpr;
        const setPos = t.getLineAndCol(setFn);
        const paramName = setFn.parameters[0] && ts.isIdentifier(setFn.parameters[0].name)
            ? setFn.parameters[0].name.text
            : 'value';
        t.emitter.writeLine(`set(${paramName}):`, setPos.line, setPos.col);
        t.emitter.indent();
        if (ts.isBlock(setFn.body)) {
            t.visitBlock(setFn.body);
        }
        else {
            t.emitter.writeLine(t.emitExpression(setFn.body), setPos.line, setPos.col);
        }
        t.emitter.dedent();
    }
    t.setCurrentAccessorName(savedAccessorName);
    t.emitter.dedent();
}
/** Resolve type for gd.getset: generic arg > property annotation > set param > value inference */
function resolveGetsetType(call, node, setExpr, setIsNull, valueExpr, t) {
    let gdType = null;
    if (call.typeArguments && call.typeArguments.length > 0) {
        gdType = tsTypeNodeToGdType(call.typeArguments[0], t.ctx.checker, t.ctx.sourceFile, t.currentClassName, t.ctx.registry);
    }
    if (!gdType && node.type) {
        gdType = tsTypeNodeToGdType(node.type, t.ctx.checker, t.ctx.sourceFile, t.currentClassName, t.ctx.registry);
    }
    if (!gdType && setExpr && !setIsNull) {
        const setType = t.ctx.checker.getTypeAtLocation(setExpr);
        const sigs = setType.getCallSignatures();
        if (sigs.length > 0 && sigs[0].parameters.length > 0) {
            const param = sigs[0].parameters[0];
            const paramDecl = param.valueDeclaration;
            if (paramDecl) {
                gdType = provableGdType(t.ctx.checker.getTypeOfSymbolAtLocation(param, paramDecl), node, t);
            }
        }
    }
    if (!gdType && valueExpr) {
        if (ts.isNumericLiteral(valueExpr)) {
            const raw = valueExpr.getText(t.ctx.sourceFile);
            gdType = raw.includes('.') ? 'float' : 'int';
        }
        else {
            const inferred = t.ctx.checker.getTypeAtLocation(valueExpr);
            gdType = provableGdType(t.ctx.checker.getBaseTypeOfLiteralType(inferred), node, t);
        }
    }
    return gdType;
}
/**
 * The GDScript type a resolved `ts.Type` PROVES, or null.
 *
 * The earlier steps read a type NODE and hand it to
 * `tsTypeNodeToGdType`, which classifies what was WRITTEN. These last
 * two have only a resolved type, so all they can read is its
 * TypeScript spelling — which has to be translated, not trusted: it
 * used to be emitted almost verbatim, which is how `number[]` reached
 * the `.gd`. A spelling proves a GD type only when it is a primitive,
 * or an engine name the user has not redeclared. Anything else is
 * dropped, which is always safe — a GD type hint is optional.
 *
 * Two things deliberately do not survive the trip:
 *
 * - `int`. The dialect's `int` and `float` are both `type … = number`,
 *   which the checker erases to a type carrying no symbol and no
 *   `aliasSymbol`, so both arrive spelled `number`. Answering `float`
 *   is still safe: Godot converts an int to a float on assignment.
 * - Arrays. That same widening stops being safe inside one, because
 *   `Array[T]` is INVARIANT in Godot — `Array[float]` refuses an
 *   `Array[int]` value, and `Array[String]` refuses `Array[StringName]`
 *   (`type StringName = String` erases the same way). A resolved type
 *   cannot tell those apart, so no array is answered here at all. A
 *   WRITTEN `int[]` still becomes `Array[int]` through the node path.
 */
function provableGdType(type, node, t) {
    const name = t.ctx.checker
        .typeToString(type, node, ts.TypeFormatFlags.NoTruncation)
        .replace(/\s*\|\s*(null|undefined)$/, '')
        .trim();
    if (name === 'number')
        return 'float';
    if (name === 'boolean')
        return 'bool';
    if (name === 'string')
        return 'String';
    // A name the user declared is theirs, whatever Godot calls it — the
    // same gate `classifyTypeReferenceName` applies to written types.
    const symbol = type.aliasSymbol ?? type.getSymbol();
    if (isUserDeclared(symbol?.getDeclarations() ?? []))
        return null;
    return isGdTypeName(name, t.ctx.registry) ? name : null;
}
function extractFunctionRefName(expr) {
    if (ts.isPropertyAccessExpression(expr) &&
        expr.expression.kind === ts.SyntaxKind.ThisKeyword &&
        ts.isIdentifier(expr.name))
        return expr.name.text;
    if (ts.isIdentifier(expr))
        return expr.text;
    return null;
}
//# sourceMappingURL=gd-getset.js.map