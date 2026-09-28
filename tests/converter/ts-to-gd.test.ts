import { describe, it, expect } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { createTsProgram } from '../../src/parser/typescript/index.js';
import ts from 'typescript';
import {
  NOISE_CODES,
  collectTsDiagnostics,
} from '../../src/checker/ts-diagnostics.js';
import { readFileSync, readdirSync } from 'fs';
import { join, basename, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'ts-to-gd');

/**
 * One program over every fixture AND the real Godot typings — the same
 * shape the CLI builds for a project, and built once because parsing
 * the typings per fixture would dominate the run.
 *
 * It has to be the typings-aware program. A fixture converted in
 * isolation resolves no engine name at all, so every checker-driven
 * branch takes its "unresolved, leave it alone" side and the branch a
 * real project runs goes untested — that is how `Vector2(x, y)` could
 * ship as `Vector2.call(x, y)` with the whole suite green.
 */
const program = createTsProgram({
  rootDir: FIXTURES_DIR,
  files: [], // ignored when tsConfigPath is set; the config's `include` wins
  tsConfigPath: join(FIXTURES_DIR, 'tsconfig.json'),
});

// `include` matching nothing is not an error, so a moved `typings/` or a
// broken relative path would silently put the suite back in the
// half-tested state this harness exists to end — with every fixture
// still green. Fail loudly instead.
if (
  !program.getSourceFiles().some((f) => f.fileName.endsWith('/Vector2.d.ts'))
) {
  throw new Error(
    'Godot typings did not load into the fixture program — check the ' +
      '`include` path in tests/fixtures/ts-to-gd/tsconfig.json. Without ' +
      'them every engine name resolves to nothing and the fixtures only ' +
      'test half of each checker-driven branch.',
  );
}

/**
 * Normalize generated GDScript for comparison:
 * - Trim trailing whitespace per line
 * - Remove trailing empty lines
 * - Normalize line endings
 */
function normalize(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n+$/, '')
    .trim();
}

// Discover all fixture pairs: *.ts files that have a matching *.gd file
const fixtureFiles = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith('.ts'))
  .filter((f) => {
    const gdFile = f.replace(/\.ts$/, '.gd');
    return readdirSync(FIXTURES_DIR).includes(gdFile);
  })
  .map((f) => f.replace(/\.ts$/, ''));

/**
 * Fixtures whose whole point is a construct the converter rejects —
 * they pin what the `--emit-on-error` output looks like. Every other
 * fixture must convert without an error or a warning.
 */
const FIXTURES_EXPECTING_DIAGNOSTICS = new Set(['unsupported-body']);

/**
 * The TypeScript diagnostics of each fixture's INPUT, keyed by file.
 *
 * Converting and comparing the output never type-checks the input, so a
 * fixture could pin the conversion of TS no user could write — an
 * undeclared field, a `null` in a non-nullable slot — and stay green.
 * One fixture did exactly that and hid invalid GDScript: `self.v1` was
 * never declared, so Godot could not see that `v1 - 2` subtracts an
 * `int` from a `Vector2`. Same program, same `strict` config and the
 * same dialect filter (`NOISE_CODES`) as a real project's checker.
 *
 * Shapes a real project gets from its GENERATED script typings, which
 * this program does not load, are mirrored by hand in `*.gd.d.ts` files
 * next to the fixtures that need them (`preload` targets, the statics
 * merge, global script names).
 */
const tsDiagnosticsByFile = new Map<string, string[]>();
for (const d of collectTsDiagnostics(program, FIXTURES_DIR)) {
  const key = resolve(d.file);
  const list = tsDiagnosticsByFile.get(key) ?? [];
  list.push(`  ${d.line}:${d.column} ${d.message}`);
  tsDiagnosticsByFile.set(key, list);
}

describe('TS to GD: the fixture program type-checks', () => {
  // Each fixture looks its diagnostics up by its own path. One filed
  // under any other spelling of it — or under a file that is no fixture
  // — would pass every per-fixture check unseen.
  it('reports each input diagnostic under a fixture', () => {
    const fixtureKeys = new Set(
      fixtureFiles.map((name) => resolve(FIXTURES_DIR, `${name}.ts`)),
    );
    const stray = [...tsDiagnosticsByFile.entries()]
      .filter(([file]) => !fixtureKeys.has(file))
      .map(([file, messages]) => `${file}\n${messages.join('\n')}`);
    expect(stray.join('\n'), 'diagnostics outside any fixture').toBe('');
  });

  // The hand-written mirrors of generated script typings are declaration
  // files, which the project checker skips — so they are checked here.
  it('type-checks the *.gd.d.ts mirrors', () => {
    const mirrors = program
      .getSourceFiles()
      .filter(
        (sf) =>
          sf.fileName.endsWith('.gd.d.ts') &&
          resolve(sf.fileName).startsWith(resolve(FIXTURES_DIR)),
      );
    expect(mirrors.length).toBeGreaterThan(0);
    const errors = mirrors.flatMap((sf) =>
      [
        ...program.getSyntacticDiagnostics(sf),
        ...program.getSemanticDiagnostics(sf),
      ]
        .filter((d) => !NOISE_CODES.has(d.code))
        .map(
          (d) =>
            `${basename(sf.fileName)}: TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`,
        ),
    );
    expect(errors.join('\n'), 'errors in the mirrors').toBe('');
  });
});

describe('TS to GD: Fixture-based tests', () => {
  for (const fixtureName of fixtureFiles) {
    it(`type-checks as written: ${fixtureName}`, () => {
      const key = resolve(FIXTURES_DIR, `${fixtureName}.ts`);
      const found = tsDiagnosticsByFile.get(key) ?? [];
      expect(found.join('\n'), `${fixtureName}.ts has TS diagnostics`).toBe('');
    });

    it(`should correctly convert: ${fixtureName}`, () => {
      const tsFilePath = join(FIXTURES_DIR, `${fixtureName}.ts`);
      const expectedGd = readFileSync(
        join(FIXTURES_DIR, `${fixtureName}.gd`),
        'utf-8',
      );

      const result = convertTsToGd({
        filePath: tsFilePath,
        rootDir: FIXTURES_DIR,
        program,
      });

      // A fixture converts cleanly unless it exists precisely to show
      // what a rejected construct emits. Logging an error and carrying
      // on let a fixture start reporting one without anything noticing
      // — `converter-diag` fixtures are where diagnostics get asserted
      // in detail, so here it is only the clean/not-clean split.
      const errors = result.diagnostics.filter(
        (d) => d.severity === 'error' || d.severity === 'warning',
      );
      const rendered = errors
        .map((d) => `  [${d.severity}] ${d.message} (${d.line}:${d.column})`)
        .join('\n');
      if (FIXTURES_EXPECTING_DIAGNOSTICS.has(fixtureName)) {
        expect(rendered, `${fixtureName} should report a diagnostic`).not.toBe(
          '',
        );
      } else {
        expect(rendered, `${fixtureName} converted with diagnostics`).toBe('');
      }

      const normalizedActual = normalize(result.code);
      const normalizedExpected = normalize(expectedGd);

      // Compare line by line for better error messages
      const actualLines = normalizedActual.split('\n');
      const expectedLines = normalizedExpected.split('\n');

      for (
        let i = 0;
        i < Math.max(actualLines.length, expectedLines.length);
        i++
      ) {
        const actual = actualLines[i] ?? '<missing>';
        const expected = expectedLines[i] ?? '<missing>';
        if (actual !== expected) {
          const contextStart = Math.max(0, i - 2);
          const contextEnd = Math.min(
            Math.max(actualLines.length, expectedLines.length),
            i + 10,
          );
          const expectedContext = expectedLines
            .slice(contextStart, contextEnd)
            .map(
              (l, j) =>
                `  ${j + contextStart === i ? '>' : ' '} ${j + contextStart + 1}| ${l}`,
            )
            .join('\n');
          const actualContext = actualLines
            .slice(contextStart, contextEnd)
            .map(
              (l, j) =>
                `  ${j + contextStart === i ? '>' : ' '} ${j + contextStart + 1}| ${l}`,
            )
            .join('\n');
          expect.fail(
            `Line ${i + 1} mismatch in ${fixtureName}:\n` +
              `  Expected: ${JSON.stringify(expected)}\n` +
              `  Actual:   ${JSON.stringify(actual)}\n\n` +
              `  Expected context:\n${expectedContext}\n\n` +
              `  Actual context:\n${actualContext}`,
          );
        }
      }

      expect(actualLines.length).toBe(expectedLines.length);
    });
  }
});
