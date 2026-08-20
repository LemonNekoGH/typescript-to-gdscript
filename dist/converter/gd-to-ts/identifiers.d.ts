/**
 * TS keywords that are illegal as *binding* identifiers (variable / const /
 * parameter / loop-variable names) in strict-mode module code. GD→TS escapes a
 * GDScript identifier that collides with one of these by appending `_` —
 * matching the `${name}_` convention already used by the typings generator's
 * `sanitizeParamName` / `sanitizeFunctionName`.
 *
 * Deliberately NARROWER than the typings `TS_RESERVED`: contextual keywords
 * that ARE legal as TS binding identifiers (`as`, `async`, `await`, `from`,
 * `get`, `is`, `of`, `set`, `type`, `abstract`) are omitted so common GDScript
 * variable names like `type` / `get` / `set` aren't needlessly renamed. Most
 * of the always-reserved words below (`if`, `for`, `var`, …) are also GDScript
 * keywords and can't appear as GD identifiers — they're listed only for safety.
 *
 * Member/method names are intentionally NOT escaped: reserved words are legal
 * as property names (`this.function`, `class X { delete() {} }`), so only
 * binding positions need this.
 */
export declare const TS_BINDING_RESERVED: Set<string>;
/**
 * Append `_` to a GDScript binding identifier that collides with a TS reserved
 * word so it's legal in `let` / parameter / loop-variable positions. No-op for
 * every non-reserved name. Deterministic, so applying it independently at the
 * declaration and at each reference yields the same name without tracking a map.
 */
export declare function escapeTsBindingName(name: string): string;
//# sourceMappingURL=identifiers.d.ts.map