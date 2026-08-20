import { resolve } from 'path';
import { generateAddonTypings } from "../typings/scenes.js";
import { resolveConfig } from "../config/index.js";
import { ProjectCache } from "../cache/index.js";
import { debugLog } from "./helpers.js";
export function registerGenerateAddonTypingsCommand(program) {
    program
        .command('generate-addon-typings')
        .description('Generate TypeScript typings for GDScript addon files in addons/')
        .option('-o, --output <path>', 'Output directory for generated typings')
        .option('--root-dir <dir>', 'Root directory', '.')
        .action((opts) => {
        const cfg = resolveConfig({
            overrides: {
                rootDir: opts.rootDir,
            },
        });
        const outputDir = opts.output ? resolve(opts.output) : cfg.typingsDir;
        const cache = new ProjectCache(cfg.cacheDir);
        const writtenFiles = generateAddonTypings({
            rootDir: cfg.rootDir,
            outputDir,
            ignore: cfg.ignore,
            cache,
            onDebug: debugLog,
            tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
        });
        debugLog(`Generated ${writtenFiles.length} addon typings files in ${outputDir}`);
    });
}
//# sourceMappingURL=generate-addon-typings.js.map