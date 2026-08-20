import { resolve } from 'path';
import { validateGdProject } from "../godot-validate/index.js";
export async function runGodotProjectCheck(opts) {
    const result = await validateGdProject({
        projectRoot: opts.projectRoot,
        godotPath: opts.godotPath,
        gdDir: resolve(opts.gdDir),
        sourceMapTable: opts.sourceMapTable,
        cacheDir: opts.cacheDir,
        signal: opts.signal,
    });
    return result.diagnostics;
}
//# sourceMappingURL=godot-project.js.map