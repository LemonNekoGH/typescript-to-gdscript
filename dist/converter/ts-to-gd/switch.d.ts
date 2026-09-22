import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
/**
 * Reported by `visitStatement` on the `break` itself rather than from
 * here over the whole `switch`: `addDiagnostic` writes its `# ERROR:`
 * marker at the emitter's CURRENT position, and from this visitor that
 * position is still above the `match` line — every marker would stack
 * there, detached from the branch it belongs to. Visiting reaches each
 * one exactly once anyway, since the only clauses whose statements go
 * unvisited are the empty ones stacked onto a following body.
 */
export declare const SWITCH_BREAK_ERROR: string;
export declare function visitSwitchStatement(t: TransformerDelegate, node: ts.SwitchStatement): void;
//# sourceMappingURL=switch.d.ts.map