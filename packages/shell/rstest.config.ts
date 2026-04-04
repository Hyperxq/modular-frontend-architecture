import { pluginPreact } from "@rsbuild/plugin-preact";
import { defineConfig } from "@rstest/core";

export default defineConfig({
	globals: true,
	testEnvironment: "happy-dom",
	setupFiles: ["./src/__tests__/rstest.setup.ts", "../../mocks/setup-test-mocking.ts"],
	plugins: [pluginPreact()],
	exclude: ["node_modules", "dist"],
});
