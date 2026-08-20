import { resolve } from 'path';
import { resolveGodotPath } from "../config/index.js";
import { validateGdFiles } from "../godot-validate/index.js";
export function registerValidateGdCommand(program) {
    program
        .command('validate-gd')
        .description('Validate GDScript files using Godot CLI and remap errors to TypeScript via source maps')
        .argument('<files...>', 'GDScript or TypeScript files to validate (.ts auto-resolves to .gd)')
        .option('--godot-path <path>', 'Path to Godot executable')
        .option('--project-root <dir>', 'Godot project root (must contain project.godot)', '.')
        .action(async (files, opts) => {
        const godotPath = resolveGodotPath({ godotPath: opts.godotPath });
        const projectRoot = resolve(opts.projectRoot);
        const gdFiles = files.map((f) => {
            const resolved = resolve(f);
            return resolved.endsWith('.ts')
                ? resolved.replace(/\.ts$/, '.gd')
                : resolved;
        });
        const result = await validateGdFiles({
            gdFiles,
            projectRoot,
            godotPath,
        });
        for (const diag of result.diagnostics) {
            const prefix = diag.severity === 'error'
                ? 'ERROR'
                : diag.severity === 'warning'
                    ? 'WARN'
                    : 'INFO';
            console.error(`[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`);
        }
        if (result.diagnostics.some((d) => d.severity === 'error'))
            process.exit(1);
    });
}
//# sourceMappingURL=validate-gd.js.map