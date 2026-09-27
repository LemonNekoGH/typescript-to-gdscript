/**
 * GD → TS output must type-check.
 *
 * The fixture runner in `gd-to-ts.test.ts` pins the EMITTER's text, and
 * never type-checks it. What a user gets is more than that: the whole
 * `initial-convert-gd-to-ts` pipeline — convert, add the missing
 * imports, generate the script and scene typings, then the TS helper
 * post-pass that fixes operator and variant errors. So this runs the
 * real CLI over every fixture as one Godot project and type-checks what
 * comes out.
 *
 * Non-strict on purpose. This is migration output a human finishes: a
 * GD parameter with no type legitimately comes out untyped, and a field
 * without an initializer legitimately has none. What must not happen is
 * a conversion TypeScript cannot make sense of at all — the
 * `constructor(...)` without `super()` that TS rejected on every
 * converted class, or a base class left without its import.
 * `strictBindCallApply` stays on, as docs/configuration.md asks of a
 * non-strict project: without it the typings' Godot `call` / `bind` on
 * a lambda turn untyped, and `lam.call(x)` returns `unknown`.
 *
 * The fixture sources are real GDScript for the same reason: output can
 * only be judged against valid input. Scripts whose node paths type only
 * through a scene (`$Label` is a `Node` until a scene says `Label`) have
 * a minimal `.tscn` next to them, which the pipeline turns into scene
 * typings exactly as it would in a project.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { execFile } from 'child_process';
import {
  copyFileSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { basename, join, resolve } from 'path';
import { tmpdir } from 'os';
import { collectTsDiagnostics } from '../../src/checker/ts-diagnostics.js';
import { createTsProgram } from '../../src/parser/typescript/index.js';

const REPO = resolve(__dirname, '../..');
const FIXTURES_DIR = join(REPO, 'tests', 'fixtures', 'gd-to-ts');
const TSX = join(REPO, 'node_modules', '.bin', 'tsx');
const CLI = join(REPO, 'src', 'cli', 'index.ts');

/**
 * Diagnostics a fixture exists to produce, matched exhaustively in both
 * directions: each entry must match a distinct diagnostic (by substring),
 * and nothing else may be left over.
 */
const EXPECTED: Record<string, string[]> = {
  // Pins that a name nothing resolves stays bare rather than gaining a
  // `this.` it has no right to — so the output names something that
  // does not exist, exactly as the GDScript did.
  'self2.ts': ["TS2304: Cannot find name 'get_joint_bone'"],
};

const PROJECT = mkdtempSync(join(tmpdir(), 'tstogd-gdtots-project-'));

afterAll(() => {
  rmSync(PROJECT, { recursive: true, force: true });
});

function runCli(args: string[]): Promise<{ code: number; output: string }> {
  return new Promise((res) => {
    execFile(
      TSX,
      [CLI, ...args],
      { cwd: REPO, timeout: 150_000, shell: process.platform === 'win32' },
      (err, stdout, stderr) =>
        res({
          code: err ? ((err as { code?: number }).code ?? 1) : 0,
          output: `${stdout ?? ''}${stderr ?? ''}`,
        }),
    );
  });
}

describe('GD → TS: the converted fixture project type-checks', () => {
  it('has no TypeScript diagnostics beyond the expected ones', async () => {
    const sources: string[] = [];
    for (const file of readdirSync(FIXTURES_DIR)) {
      if (!file.endsWith('.gd') && !file.endsWith('.tscn')) continue;
      copyFileSync(join(FIXTURES_DIR, file), join(PROJECT, file));
      if (file.endsWith('.gd')) sources.push(join(PROJECT, file));
    }
    writeFileSync(
      join(PROJECT, 'project.godot'),
      'config_version=5\n\n[application]\nconfig/name="fixtures"\n',
    );
    // The pipeline picks this up from the root, as it would a project's
    // own — its TS helpers type-check with it too.
    writeFileSync(
      join(PROJECT, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'esnext',
          module: 'esnext',
          moduleResolution: 'classic',
          allowImportingTsExtensions: true,
          noLib: true,
          strict: false,
          strictBindCallApply: true,
          noEmit: true,
          skipLibCheck: true,
          types: [],
        },
        include: [join(REPO, 'typings'), './**/*.ts'],
      }),
    );

    const run = await runCli([
      'initial-convert-gd-to-ts',
      ...sources,
      '--gd-dir',
      PROJECT,
      '--ts-dir',
      join(PROJECT, 'ts'),
      '--root-dir',
      PROJECT,
    ]);
    expect(run.code, run.output).toBe(0);

    const program = createTsProgram({
      rootDir: PROJECT,
      files: [],
      tsConfigPath: join(PROJECT, 'tsconfig.json'),
    });
    const unmatched = collectTsDiagnostics(program, join(PROJECT, 'ts')).map(
      (d) => ({
        file: basename(d.file),
        text: `${d.line}:${d.column} ${d.message}`,
      }),
    );

    for (const [file, messages] of Object.entries(EXPECTED)) {
      for (const message of messages) {
        const i = unmatched.findIndex(
          (d) => d.file === file && d.text.includes(message),
        );
        expect(i, `expected in ${file}: ${message}`).toBeGreaterThan(-1);
        unmatched.splice(i, 1);
      }
    }
    expect(
      unmatched.map((d) => `  ${d.file} ${d.text}`).join('\n'),
      'TypeScript diagnostics in the converted project',
    ).toBe('');
  }, 180_000);
});
