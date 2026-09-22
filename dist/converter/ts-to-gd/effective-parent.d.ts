import ts from 'typescript';
/**
 * The outermost node that stands in `node`'s place once the erased
 * wrappers are gone — what the surrounding syntax actually sees.
 *
 * Callers that need to know WHICH child of the parent they are (an
 * argument vs the callee, say) must compare against this, not against
 * `node`: in `f((g()))` the parent's argument list holds the
 * parentheses, not the call.
 */
export declare function effectiveNode(node: ts.Node): ts.Node;
/** Parent with the type-only and grouping wrappers stepped over. */
export declare function effectiveParent(node: ts.Node): ts.Node | undefined;
//# sourceMappingURL=effective-parent.d.ts.map