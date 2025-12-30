import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig } from "@rstest/core";
import { resolve } from "path";

export default defineConfig({
	globals: true,
	testEnvironment: "jsdom",
	setupFiles: ["./rstest.setup.ts", "../mocks/setup.ts"],
	plugins: [pluginPreact(), pluginSass()],
	exclude: ["node_modules", "automation_test/**"],
	tools: {
		rspack: (config) => {
			config.resolve ||= {};
			config.resolve.alias ||= {};

			config.resolve.alias["../../../../shadcnUI/Dropdown/Dropdown"] = resolve(
				__dirname,
				"tests/mocks/shadcn-dropdown.tsx",
			);

			return config;
		},
	},
});
