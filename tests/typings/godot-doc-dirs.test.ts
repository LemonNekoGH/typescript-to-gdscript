import { describe, it, expect, afterEach } from 'vitest';
import { join } from 'path';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { parseAllClassXmls } from '../../src/typings/godot-registry.js';
import { godotSourceDocDirs } from '../../src/typings/xml-parser.js';

// Which class-reference directories are read, and how several merge —
// split out of godot-registry.test.ts for the 500-line cap.

const GODOT_DOCS_DIR = join(__dirname, '../../vendor/godot/doc/classes');
const GODOT_GDSCRIPT_DOCS_DIR = join(
  __dirname,
  '../../vendor/godot/modules/gdscript/doc_classes',
);

describe('Godot Registry: godotSourceDocDirs', () => {
  const GODOT_SOURCE = join(__dirname, '../../vendor/godot');

  it('reads doc/classes, then every module, then every platform, each in name order', () => {
    const dirs = godotSourceDocDirs(GODOT_SOURCE).map((d) =>
      d.replace(/\\/g, '/'),
    );
    expect(dirs[0]).toMatch(/\/doc\/classes$/);
    const under = (root: string) =>
      dirs
        .filter((d) => d.includes(`/${root}/`))
        .map((d) => d.split('/').at(-2)!);
    const modules = under('modules');
    const platforms = under('platform');
    expect(dirs).toHaveLength(1 + modules.length + platforms.length);
    expect(dirs.slice(1, 1 + modules.length).every((d) => d.includes('/modules/'))).toBe(true);
    expect(modules).toEqual([...modules].sort());
    expect(platforms).toEqual([...platforms].sort());
    // Godot's own doc/Makefile reads platform/ too: the export platforms.
    expect(platforms).toContain('android');
    // The modules hold much of the API — the reason they are read at all.
    for (const mod of ['gdscript', 'regex', 'csg', 'multiplayer', 'noise']) {
      expect(modules).toContain(mod);
    }
  });

  it('rejects a directory that is not a Godot source tree', () => {
    expect(() => godotSourceDocDirs(tmpdir())).toThrow(/no doc\/classes/);
  });
});

describe('Godot Registry: parseAllClassXmls multi-directory', () => {
  // Each test owns its tmp tree under `os.tmpdir()` so parallel runs
  // and crashed-mid-test runs don't leak state between cases.
  const tmpDirs: string[] = [];
  afterEach(() => {
    for (const d of tmpDirs.splice(0)) {
      rmSync(d, { recursive: true, force: true });
    }
  });

  function makeTmpDir(): string {
    const d = mkdtempSync(join(tmpdir(), 'tstogd-multi-xml-'));
    tmpDirs.push(d);
    return d;
  }

  function writeClassXml(dir: string, className: string, fields: {
    inherits?: string;
    description?: string;
    members?: string;
  } = {}): void {
    const inheritsAttr = fields.inherits ? ` inherits="${fields.inherits}"` : '';
    const description = fields.description ?? '';
    const members = fields.members ?? '';
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<class name="${className}"${inheritsAttr}>
  <brief_description>${description}</brief_description>
  <description>${description}</description>
  <methods></methods>
  <members>${members}</members>
  <signals></signals>
  <constants></constants>
</class>`;
    writeFileSync(join(dir, `${className}.xml`), xml);
  }

  it('produces the same map for a single string vs. a single-element array', () => {
    const dir = makeTmpDir();
    writeClassXml(dir, 'Foo', { inherits: 'Object' });
    writeClassXml(dir, 'Bar');

    const fromString = parseAllClassXmls(dir);
    const fromArray = parseAllClassXmls([dir]);

    expect([...fromArray.keys()].sort()).toEqual([...fromString.keys()].sort());
    expect(fromArray.get('Foo')?.inherits).toBe(
      fromString.get('Foo')?.inherits,
    );
  });

  it('merges classes from multiple directories', () => {
    const dirA = makeTmpDir();
    const dirB = makeTmpDir();
    writeClassXml(dirA, 'A_only');
    writeClassXml(dirB, 'B_only');
    writeClassXml(dirA, 'Shared', { description: 'from A' });

    const merged = parseAllClassXmls([dirA, dirB]);

    expect(merged.has('A_only')).toBe(true);
    expect(merged.has('B_only')).toBe(true);
    // No conflict on Shared (only in A)
    expect(merged.get('Shared')?.description).toBe('from A');
  });

  it('applies "later wins" merge order on same-named classes', () => {
    const earlyDir = makeTmpDir();
    const lateDir = makeTmpDir();
    writeClassXml(earlyDir, 'Conflict', { description: 'EARLY' });
    writeClassXml(lateDir, 'Conflict', { description: 'LATE' });

    // Order matters: late dir is passed AFTER early dir
    const merged = parseAllClassXmls([earlyDir, lateDir]);
    expect(merged.get('Conflict')?.description).toBe('LATE');

    // Reversing the order flips the winner — confirms it's not
    // alphabetic / lexicographic / file-mtime order
    const reversed = parseAllClassXmls([lateDir, earlyDir]);
    expect(reversed.get('Conflict')?.description).toBe('EARLY');
  });

  it('finds @GDScript via the merged map when modules/gdscript/doc_classes/ is included', () => {
    const merged = parseAllClassXmls([
      GODOT_DOCS_DIR,
      GODOT_GDSCRIPT_DOCS_DIR,
    ]);
    // Sanity: still has the core classes
    expect(merged.has('Node')).toBe(true);
    expect(merged.has('@GlobalScope')).toBe(true);
    // Multi-dir picks up @GDScript that single-dir would miss
    expect(merged.has('@GDScript')).toBe(true);
    const gdscript = merged.get('@GDScript')!;
    // @GDScript is the docs container for built-in functions like print/abs
    expect(gdscript.methods.length).toBeGreaterThan(0);
  });

  it('does NOT find @GDScript when only doc/classes/ is passed', () => {
    // Confirms the fallback in `generateGodotDocsTypings` is what
    // pulls @GDScript in for legacy single-dir callers — without it,
    // single-dir users would lose the global built-ins.
    const single = parseAllClassXmls([GODOT_DOCS_DIR]);
    expect(single.has('@GDScript')).toBe(false);
  });
});
