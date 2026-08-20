import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
/** Check a type node for `undefined` keyword and emit a diagnostic. */
export declare function checkTypeForUndefined(t: TransformerDelegate, typeNode: ts.TypeNode): void;
/** Check if a resolved TS type contains `undefined` (for runtime value checks). */
export declare function typeContainsUndefined(type: ts.Type): boolean;
/**
 * Emit a parameter list as a GDScript parameter string.
 * Handles optional/null/vararg/undefined semantics.
 */
export declare function emitParameters(t: TransformerDelegate, params: ts.NodeArray<ts.ParameterDeclaration>): string;
//# sourceMappingURL=parameters.d.ts.map