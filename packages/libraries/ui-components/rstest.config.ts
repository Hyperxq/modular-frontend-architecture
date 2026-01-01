import { pluginPreact } from "@rsbuild/plugin-preact";
import { defineConfig } from "@rstest/core";

export default defineConfig({
	testEnvironment: "jsdom",
	setupFiles: ["./rstest.setup.ts"],
	plugins: [pluginPreact()],
});
