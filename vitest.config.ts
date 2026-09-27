import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['tests/**/*.test.ts'],
    testTimeout: 30000,
    // Many test files spawn heavy processes of their own — `tsc` over the
    // whole source tree, Godot, the CLI through `tsx`. With a worker per
    // core on top of those, the main process starved and the run exited 1
    // on `[vitest-worker]: Timeout calling "onTaskUpdate"` although every
    // test passed. Half the cores keeps it stable, and is faster too.
    maxWorkers: '50%',
  },
});
