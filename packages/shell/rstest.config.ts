import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig } from "@rstest/core";

export default defineConfig({
	globals: true,
	testEnvironment: "jsdom",
	setupFiles: ["./src/__tests__/rstest.setup.ts", "../../mocks/setup-test-mocking.ts"],
	plugins: [pluginPreact(), pluginSass()],
	exclude: ["node_modules", "dist"],
});
