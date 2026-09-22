#!/usr/bin/env node
import { Command } from 'commander';
import { getPackageVersion } from "../utils/package-version.js";
import { setDebugEnabled } from "./helpers.js";
import { registerConvertCommand } from "./convert.js";
import { registerInitialConvertGdToTsCommand } from "./initial-convert-gd-to-ts.js";
import { registerValidateGdCommand } from "./validate-gd.js";
import { registerWatchCommand } from "./watch.js";
import { registerGenerateGdscriptGlobalTypingsCommand } from "./generate-gdscript-global-typings.js";
import { registerGenerateTypingsCommand } from "./generate-typings.js";
import { registerInitCommand } from "./init.js";
import { registerGenerateAddonTypingsCommand } from "./generate-addon-typings.js";
import { registerOpenEditorCommand } from "./open-editor.js";
import { registerClearCacheCommand } from "./clear-cache.js";
const program = new Command();
program
    .name('tstogd')
    .description('Convert TypeScript to GDScript and back')
    .version(getPackageVersion())
    .option('--debug', 'Show debug/info messages', false)
    .hook('preAction', () => {
    setDebugEnabled(program.opts().debug);
});
// Register all commands
registerConvertCommand(program);
registerInitialConvertGdToTsCommand(program);
registerValidateGdCommand(program);
registerWatchCommand(program);
registerGenerateTypingsCommand(program);
registerGenerateAddonTypingsCommand(program);
registerGenerateGdscriptGlobalTypingsCommand(program);
registerInitCommand(program);
registerOpenEditorCommand(program);
registerClearCacheCommand(program);
program.parse();
//# sourceMappingURL=index.js.map