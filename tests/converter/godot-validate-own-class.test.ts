import { describe, it, expect, afterAll } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { validateGdFiles } from '../../src/godot-validate/index.ts';
import { resolveGodotPath } from '../../src/config/index.ts';

const GODOT_PATH = resolveGodotPath();
const TMP_DIR = join(
  tmpdir(),
  `tstogd-own-class-validate-${randomBytes(4).toString('hex')}`,
);

/**
 * Validation of a script that reaches its own class-level members
 * through its `class_name` — the only spelling valid inside a
 * `static func`, where GDScript has no `self`.
 *
 * Godot resolves a global class name through the project-wide class
 * cache, which only an `--import` pass populates. `validateGdFiles`
 * runs `--check-only` WITHOUT importing, so a script that was just
 * generated (or whose class was just renamed) would report
 * `Identifier not found: <ClassName>` against perfectly good code.
 * These tests pin the filter that suppresses it — and pin that it
 * stays narrow.
 */

afterAll(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

/** A project deliberately left un-imported, as fresh output is. */
function setupUnimportedProject(name: string, gdSource: string): string {
  const projectDir = join(TMP_DIR, name);
  mkdirSync(projectDir, { recursive: true });
  writeFileSync(
    join(projectDir, 'project.godot'),
    [
      '; Engine configuration file.',
      'config_version=5',
      '',
      '[application]',
      'config/name="OwnClass"',
    ].join('\n'),
  );
  writeFileSync(join(projectDir, `${name}.gd`), gdSource);
  return projectDir;
}

async function validate(name: string, gdSource: string) {
  const projectDir = setupUnimportedProject(name, gdSource);
  return validateGdFiles({
    gdFiles: [join(projectDir, `${name}.gd`)],
    projectRoot: projectDir,
    godotPath: GODOT_PATH,
  });
}

describe('godot-validate: own class_name in an un-imported project', () => {
  it('does not report a script referencing its own class_name', async () => {
    const result = await validate(
      'own_ref',
      [
        'extends Node',
        'class_name OwnRef',
        '',
        'static var LIMIT: int = 10',
        '',
        'static func get_limit() -> int:',
        '\treturn OwnRef.LIMIT',
        '',
      ].join('\n'),
    );

    expect(result.godotAvailable).toBe(true);
    expect(result.diagnostics.map((d) => `${d.line}: ${d.message}`)).toEqual(
      [],
    );
  }, 90000);

  it('still reports a genuinely unknown class', async () => {
    // The filter only covers class_names the validated files declare,
    // so a real typo must survive it.
    const result = await validate(
      'bad_ref',
      [
        'extends Node',
        'class_name BadRef',
        '',
        'static func get_limit() -> int:',
        '\treturn NoSuchClass.LIMIT',
        '',
      ].join('\n'),
    );

    expect(result.godotAvailable).toBe(true);
    expect(result.diagnostics.length).toBeGreaterThan(0);
    expect(result.diagnostics.map((d) => d.message).join('\n')).toContain(
      'NoSuchClass',
    );
  }, 90000);
});
