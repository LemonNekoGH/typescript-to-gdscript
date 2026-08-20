/**
 * Classification helpers for the member-access → `.get()` rewrite.
 *
 * Plain TS object types (interfaces, type literals, inferred object
 * literals) are Dictionaries at GDScript runtime, so standalone member
 * READS on them are emitted as `obj.get("prop")`. `.get()` exists on
 * both `Dictionary` and `Object`, which makes the emitted form valid
 * even when the classification is computed from stale types — the
 * property that lets the watch/check pipeline treat staleness as a
 * visible-diagnostics problem instead of a silent-runtime one.
 *
 * Writes are NOT rewritten (`obj.get("p") = v` is invalid GDScript;
 * plain `obj.prop = v` works on both Dictionary and Object), and
 * chained links / callee positions keep dot access (no safety
 * difference, less output churn).
 */
import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
/**
 * True when every non-nullish union constituent of `type` is a plain
 * TS object type — i.e. a value that exists as a `Dictionary` in the
 * generated GDScript.
 *
 * Deliberately conservative: anything unprovable (any/unknown/error
 * types, type parameters, mixed unions, intersections) returns false
 * so the caller falls back to the legacy optionality-based behavior.
 */
export declare function isPlainObjectType(type: ts.Type, checker: ts.TypeChecker, registry?: GodotClassRegistry): boolean;
/**
 * True when `node` is the target of an assignment: LHS of `=` or any
 * compound assignment (`+=`, `||=`, …), or the operand of `++`/`--`.
 * Walks through parentheses and non-null assertions wrapping the node
 * (`(obj.prop) = v`, `obj.prop! += 1`).
 *
 * Assignment targets must keep plain dot/index form — `obj.get("p") = v`
 * is invalid GDScript, while `obj.prop = v` is valid on both Dictionary
 * and Object.
 */
export declare function isAssignmentTarget(node: ts.Expression): boolean;
//# sourceMappingURL=access-rewrite.d.ts.map