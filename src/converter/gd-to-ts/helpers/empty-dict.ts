/**
 * Empty-dictionary helper for GD-to-TS post-processing.
 *
 * GDScript's `{}` fills any typed dictionary. The TypeScript `{}` the
 * emitter writes for it does so only for string and number keys, which
 * the typings model as an index signature. A class key makes
 * `Dictionary<Node, int>` a method surface (`DictionaryKeyMethods`), and
 * no object literal has its typed `find_key` — TS2322 on every
 * `var d: Dictionary[Node, int] = {}`. `gd.dict([])` is the same empty
 * dictionary (it converts back to `{}`), and its typed overload takes
 * the key and value types from where it goes.
 */

import ts from 'typescript';
import type { SourceFix } from '../ts-helpers.ts';
import {
  TS_ASSIGNMENT_ERROR_CODES,
  assignedValueNode,
  findNodeAt,
} from './explicit-convert.ts';

/**
 * True when the value has to be a typed-key dictionary. Read from the
 * checker, not the diagnostic's wording, which changes across TypeScript
 * versions and locales. A bare `Dictionary` is the same interface, but
 * `{}` fits that one and draws no diagnostic to get here.
 */
function expectsKeyMethodsDictionary(
  checker: ts.TypeChecker,
  node: ts.Expression,
): boolean {
  const type = checker.getContextualType(node);
  if (!type) return false;
  const parts = type.isUnion() ? type.types : [type];
  return parts.some(
    (part) => part.getSymbol()?.getName() === 'DictionaryKeyMethods',
  );
}

/** Rewrite each `{}` TypeScript refuses as a typed dictionary to `gd.dict([])`. */
export function collectEmptyDictFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    if (!filePaths.has(sourceFile.fileName)) continue;
    const fixes: SourceFix[] = [];

    for (const diag of program.getSemanticDiagnostics(sourceFile)) {
      if (!TS_ASSIGNMENT_ERROR_CODES.has(diag.code)) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      const found = findNodeAt(sourceFile, diag.start, diag.length);
      if (!found) continue;
      const node = assignedValueNode(found);
      if (!ts.isObjectLiteralExpression(node) || node.properties.length > 0) {
        continue;
      }
      if (!expectsKeyMethodsDictionary(checker, node)) continue;
      fixes.push({
        start: node.getStart(sourceFile),
        end: node.getEnd(),
        replacement: 'gd.dict([])',
      });
    }

    if (fixes.length > 0) fixesByFile.set(sourceFile.fileName, fixes);
  }

  return fixesByFile;
}
