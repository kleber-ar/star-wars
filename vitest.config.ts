import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // permite usar describe, it, expect sem importar
    environment: "jsdom", // necessário p/ testes React
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8", // pode ser 'istanbul' também
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: ["src/app/layout.tsx", "src/context/PlanetsContext"],
    },
  },
});
