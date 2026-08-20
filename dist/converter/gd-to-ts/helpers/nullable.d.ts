/**
 * Nullable helper for GD-to-TS post-processing.
 *
 * Handles `T | null` widening and narrowing at OUT and IN positions. Emit-time
 * IN widening is done separately in the converter (`widenInType` in
 * `../functions.ts`). Four phases run in order every pass:
 *
 *   A  AST-only, both modes. Class fields with a reference-type annotation
 *      that are never assigned (no initializer, no constructor assignment,
 *      no `_ready` assignment) are rewritten to `field: T | null = null`.
 *
 *   B  AST-only, addon mode only. Reference-typed OUT positions that don't
 *      benefit from type-checker feedback — assigned field annotations and
 *      local-variable annotations — get widened up-front via text-based
 *      classification. Function / method / arrow / getter return types are
 *      NOT widened here; they fall through to Phase C like user mode so
 *      narrowing done by Phase D can influence whether they actually need
 *      `| null`.
 *
 *   C  Type-checker driven, both modes, iterative. TS2322 "Type '...null...'
 *      is not assignable to type 'X'" where X is a reference class → widen
 *      the declared type at the assignment target (return annotation, field
 *      annotation, or local variable annotation).
 *
 *   D  Type-checker driven, both modes, iterative. Inverse of Phase C for
 *      parameters: TS2531 / TS18047 "possibly null" on an identifier that
 *      resolves to a parameter declaration → strip `| null` from the
 *      parameter's annotation. Runs AFTER Phase C each pass so return-type
 *      flow (which can depend on params) settles first.
 *
 * Replaces the former `nullable-return.ts` helper — its return-null case is
 * subsumed by Phase C.
 */
import ts from 'typescript';
import type { GodotClassRegistry } from '../../../typings/godot-registry.ts';
import type { SourceFix } from '../ts-helpers.ts';
export interface NullableHelperOptions {
    addonMode: boolean;
}
export declare function collectNullableFixes(program: ts.Program, filePaths: Set<string>, registry: GodotClassRegistry, options: NullableHelperOptions): Map<string, SourceFix[]>;
//# sourceMappingURL=nullable.d.ts.map