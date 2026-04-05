import { pluginPreact } from "@rsbuild/plugin-preact";
import { defineConfig } from "@rstest/core";

export default defineConfig({
	globals: true,
	testEnvironment: "happy-dom",
	setupFiles: ["./src/__tests__/rstest.setup.ts", "../../mocks/setup-test-mocking.ts"],
	plugins: [pluginPreact()],
	exclude: ["node_modules", "dist"],
	coverage: {
		enabled: true,
		provider: "istanbul",
		reporters: ["text", "html", "lcov"],
		reportsDirectory: "./coverage",
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/*.spec.tsx",
			"**/*.test.tsx",
			"**/__tests__/**",
		],
		thresholds: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
});
