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

const EMPTY_LITERAL_INTO_TYPED_DICT =
  /type '\{\}' is not assignable to (?:parameter of )?type 'DictionaryKeyMethods</i;

/** Rewrite each `{}` TypeScript refuses as a typed dictionary to `gd.dict([])`. */
export function collectEmptyDictFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();

  for (const sourceFile of program.getSourceFiles()) {
    if (!filePaths.has(sourceFile.fileName)) continue;
    const fixes: SourceFix[] = [];

    for (const diag of program.getSemanticDiagnostics(sourceFile)) {
      if (!TS_ASSIGNMENT_ERROR_CODES.has(diag.code)) continue;
      if (diag.start === undefined || diag.length === undefined) continue;
      const text = ts.flattenDiagnosticMessageText(diag.messageText, '\n');
      if (!EMPTY_LITERAL_INTO_TYPED_DICT.test(text)) continue;

      const found = findNodeAt(sourceFile, diag.start, diag.length);
      if (!found) continue;
      const node = assignedValueNode(found);
      if (!ts.isObjectLiteralExpression(node) || node.properties.length > 0) {
        continue;
      }
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
