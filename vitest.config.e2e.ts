import { defineConfig } from "vitest/config"

import swc from "unplugin-swc"

export default defineConfig({
  test: {
    globals: true,
    root: ".",
    watch: false,
    include: ["**/*.e2e-spec.ts"],
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
})
