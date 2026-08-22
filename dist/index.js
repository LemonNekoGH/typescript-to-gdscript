export { convertTsToGd, } from "./converter/ts-to-gd/index.js";
export { convertRuntimeModules, } from "./converter/ts-to-gd/runtime-modules.js";
export { convertGdToTs, } from "./converter/gd-to-ts/index.js";
export { GDScriptParser } from "./parser/gdscript/index.js";
export { createTsProgram } from "./parser/typescript/index.js";
export { SourceMapper } from "./sourcemap/index.js";
export { generateTypings } from "./typings/scenes.js";
export { generateGodotDocsTypings } from "./typings/godot-docs.js";
export { GodotClassRegistry, generateGodotRegistry, parseGodotVersion, } from "./typings/godot-registry.js";
export { ProjectCache } from "./cache/index.js";
export { Watcher } from "./watcher/index.js";
export { resolveRegistry, resolveConfig, loadConfig, } from "./config/index.js";
//# sourceMappingURL=index.js.map