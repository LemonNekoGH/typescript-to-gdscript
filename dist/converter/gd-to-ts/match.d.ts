/**
 * GDScript `match` → TypeScript. Two shapes come out of here: a plain
 * `switch` when every pattern is a literal or expression, and a
 * `gd.match()` call when a pattern binds, destructures, or carries a
 * guard — things `switch` cannot express.
 */
import { type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
export declare function emitMatchStatement(node: SyntaxNode, ctx: GdToTsContext, depth: number): string;
//# sourceMappingURL=match.d.ts.map