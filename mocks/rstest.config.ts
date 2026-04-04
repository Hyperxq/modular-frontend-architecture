import { defineConfig } from "@rstest/core";

export default defineConfig({
	globals: true,
	testEnvironment: "node",
	exclude: ["node_modules"],
});
