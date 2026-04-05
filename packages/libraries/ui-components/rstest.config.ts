import path from "node:path";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { defineConfig } from "@rstest/core";

export default defineConfig({
	testEnvironment: "happy-dom",
	setupFiles: ["./rstest.setup.ts"],
	include: ["lib/**/*.spec.tsx", "lib/**/*.test.tsx"],
	plugins: [pluginPreact()],
	resolve: {
		alias: {
			"@modular-frontend/shared": path.resolve(__dirname, "../shared/src"),
		},
	},
	coverage: {
		enabled: true,
		provider: "istanbul",
		reporters: ["text", "html", "lcov"],
		reportsDirectory: "./coverage",
		exclude: ["**/node_modules/**", "**/*.spec.tsx", "**/*.test.tsx", "**/__tests__/**"],
		thresholds: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
});
