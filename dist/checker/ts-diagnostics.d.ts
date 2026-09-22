import ts from 'typescript';
import type { TransformDiagnostic } from '../converter/common/index.ts';
/**
 * TS diagnostic codes that are correct-but-noisy for the namespace+class
 * merge pattern the typings generator emits.
 *
 * Only codes the generated typings themselves provoke belong here.
 * Diagnostics a user opted into stay visible even when they fire on
 * every file — `noFallthroughCasesInSwitch` (TS7029) is incompatible
 * with this dialect, but silently overriding an explicit compiler
 * setting is worse than letting it say so.
 */
export declare const NOISE_CODES: Set<number>;
/**
 * Collect TypeScript semantic + syntactic diagnostics from `program`,
 * limited to source files under `tsDir`. Filters out:
 * - `.d.ts` declaration files
 * - files outside `tsDir`
 * - noise codes 2434, 2435, 2449 (namespace+class merge pattern)
 */
export declare function collectTsDiagnostics(program: ts.Program, tsDir: string): TransformDiagnostic[];
//# sourceMappingURL=ts-diagnostics.d.ts.map