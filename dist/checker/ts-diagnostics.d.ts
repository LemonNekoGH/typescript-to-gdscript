import ts from 'typescript';
import type { TransformDiagnostic } from '../converter/common/index.ts';
/**
 * Collect TypeScript semantic + syntactic diagnostics from `program`,
 * limited to source files under `tsDir`. Filters out:
 * - `.d.ts` declaration files
 * - files outside `tsDir`
 * - noise codes 2434, 2435, 2449 (namespace+class merge pattern)
 */
export declare function collectTsDiagnostics(program: ts.Program, tsDir: string): TransformDiagnostic[];
//# sourceMappingURL=ts-diagnostics.d.ts.map