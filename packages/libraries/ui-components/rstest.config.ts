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
});
