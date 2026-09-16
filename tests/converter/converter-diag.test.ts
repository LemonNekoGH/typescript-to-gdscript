import { describe, it, expect, afterEach } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  rmSync,
} from 'fs';
import { join, basename } from 'path';
import ts from 'typescript';
import { tmpdir } from 'os';

const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'converter-diag');
const TMP_DIR = join(tmpdir(), '__tmp__' + Math.random().toString(36));

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

/**
 * One expected diagnostic. The list is exhaustive in BOTH directions:
 * every entry must match a distinct diagnostic, and no error/warning
 * may be left unaccounted for. That is what lets a fixture say "this
 * is reported ONCE" — a rule that fires twice leaves one unconsumed.
 * (`type-error` and `info` are not required to be listed; they do not
 * block the `.gd` write.)
 */
interface ExpectedDiagnostic {
  message: string;
  severity: 'error' | 'type-error' | 'warning' | 'info';
  /**
   * Optional 1-based line/column to assert on the matched diagnostic.
   * When present, the entry requires an EXACT location match in
   * addition to the message/severity substring match. Use sparingly —
   * most fixtures care only about message content. Primary use case
   * is regression coverage for position-preserving fixes (e.g. the
   * column off-by-one +1 convention on `TransformDiagnostic`).
   */
  line?: number;
  column?: number;
}

function convert(code: string, filename: string) {
  mkdirSync(TMP_DIR, { recursive: true });
  const filePath = join(TMP_DIR, filename);
  writeFileSync(filePath, code);
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.Node16,
    moduleResolution: ts.ModuleResolutionKind.Node16,
    strict: true,
    noEmit: true,
  });
  return convertTsToGd({ filePath, rootDir: TMP_DIR, program });
}

// Discover all fixture pairs
const fixtureFiles = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith('.ts'))
  .sort();

describe('Converter Diagnostics: Fixture-based tests', () => {
  for (const tsFile of fixtureFiles) {
    const fixtureName = basename(tsFile, '.ts');
    const jsonFile = tsFile.replace('.ts', '.json');

    it(`should produce correct diagnostics: ${fixtureName}`, () => {
      const tsSource = readFileSync(join(FIXTURES_DIR, tsFile), 'utf-8');
      const expected: ExpectedDiagnostic[] = JSON.parse(
        readFileSync(join(FIXTURES_DIR, jsonFile), 'utf-8'),
      );

      const result = convert(tsSource, tsFile);
      const diagnostics = result.diagnostics;

      // Every expectation must match a DISTINCT diagnostic, and no
      // error/warning may be left over. Matching one-for-one is what
      // makes a fixture able to say "reported once": a rule that fires
      // twice on the same spot leaves a diagnostic unconsumed, and the
      // leftover check below catches it.
      const unmatched = [...diagnostics];
      const significant = (list: typeof diagnostics) =>
        list.filter((d) => d.severity === 'error' || d.severity === 'warning');

      for (const exp of expected) {
        const i = unmatched.findIndex(
          (d) =>
            d.message.includes(exp.message) &&
            d.severity === exp.severity &&
            (exp.line === undefined || d.line === exp.line) &&
            (exp.column === undefined || d.column === exp.column),
        );
        // Location hint: when line/column were specified but nothing
        // matched, callers almost always want to know "did any
        // diagnostic match message+severity but miss on location?"
        // — a plain "not found" error hides that distinction.
        const locationPart =
          exp.line !== undefined || exp.column !== undefined
            ? ` at ${exp.line ?? '?'}:${exp.column ?? '?'}`
            : '';
        expect(
          i,
          `Expected a diagnostic with message containing "${exp.message}" ` +
            `and severity "${exp.severity}"${locationPart} in ${fixtureName}, ` +
            `not already matched by an earlier expectation.\n` +
            `Remaining diagnostics:\n` +
            unmatched
              .map(
                (d) => `  [${d.severity}] ${d.line}:${d.column} ${d.message}`,
              )
              .join('\n'),
        ).toBeGreaterThan(-1);
        unmatched.splice(i, 1);
      }

      const leftover = significant(unmatched);
      expect(
        leftover,
        `Unexpected extra diagnostics for ${fixtureName} — add them to ` +
          `${fixtureName}.json if they are intended:\n` +
          leftover
            .map((d) => `  [${d.severity}] ${d.line}:${d.column} ${d.message}`)
            .join('\n'),
      ).toHaveLength(0);

      // When all expected diagnostics are non-conversion-errors (type-error,
      // warning, info), the converter MUST still emit a non-trivial .gd code
      // — type-errors do not block output.
      const hasExpectedConversionError = expected.some(
        (e) => e.severity === 'error',
      );
      if (!hasExpectedConversionError && expected.length > 0) {
        expect(
          result.code.trim().length,
          `Expected non-empty .gd output for ${fixtureName} (only ` +
            `non-blocking diagnostics expected), but got empty/whitespace code.`,
        ).toBeGreaterThan(0);
      }
    });
  }
});
