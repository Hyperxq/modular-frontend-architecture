import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig, type RslibConfig } from "@rslib/core";
import { pluginImportMap } from "./lib/plugins/plugin-importmap/pluginImportMap";
import { pluginEntries } from "./lib/plugins/pluginEntries";
import { createMfConfig } from "./module-federation.config";

type Format = "esm" | "cjs" | "mf";

const levels: { [key: string]: string } = {
	1: "atoms",
	2: "atoms|molecules",
	3: "atoms|molecules|organisms",
	4: "atoms|molecules|organisms|templates",
};

const getComponentsPath = () => {
	const baseDirectory = process.env.PUBLIC_BASE_DIRECTORY || "./lib";
	const baseComponentPath = process.env.PUBLIC_BASE_COMPONENTS_PATH || "/components";
	const pathWildcard = process.env.PUBLIC_PATH_WILDCARD || "**/*";
	const fileExtension = process.env.PUBLIC_FILE_EXTENSION || ".tsx";

	if (process.env.LEVEL_MODE) {
		const levelNumber = Number(process.env.LEVEL_MODE.trim());
		const levelsGroup = levels[levelNumber];
		const wildcard = levelNumber > 1 ? `${levelsGroup}/*/*` : `${levelsGroup}/*`;
		return `${baseDirectory}${baseComponentPath}/${wildcard}${fileExtension}`;
	}

	return `${baseDirectory}${baseComponentPath}/${pathWildcard}${fileExtension}`;
};

export const COMPONENTS_PATH = [getComponentsPath()];

export const DEV_ENVIRONMENT_URL = process.env.DEV_ENVIRONMENT_URL || "http://localhost:3000/";

const shared = {
	dts: {
		bundle: false,
	},
};

const storybookConfig: RslibConfig = {
	source: {
		entry: pluginEntries(COMPONENTS_PATH),
	},
	lib: [
		{
			bundle: false,
			dts: true,
			format: "esm" as Format, // Use the restricted type here
		},
	],
	output: {
		target: "web",
	},
	plugins: [pluginReact()],
};

export const baseConfig: RslibConfig = {
	server: {
		port: 3001,
	},
	tools: {
		rspack: (config, { rspack }) => {
			config.plugins ??= [];
			config.plugins.push(
				new rspack.IgnorePlugin({
					resourceRegExp: /\.(spec|test)\.(ts|tsx|js|jsx)$/,
				}),
			);
			return config;
		},
	},
	source: {
		entry: pluginEntries(COMPONENTS_PATH),
		exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
		tsconfigPath: "./tsconfig.build.json",
	},
	lib: [
		{
			...shared,
			format: "esm",
			source: {
				entry: pluginEntries(COMPONENTS_PATH),
				exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
				tsconfigPath: "./tsconfig.build.json",
			},
			output: {
				distPath: {
					root: "./dist/esm",
				},
				filenameHash: true,
			},
			plugins: [
				pluginImportMap({
					baseUrl: DEV_ENVIRONMENT_URL,
					specPrefix: "@ssc/ui-components/",
					includeCss: true,
					outFile: "importmap.json",
					componentPath: COMPONENTS_PATH,
				}),
			],
		},
		{
			...shared,
			format: "cjs",
			source: {
				entry: pluginEntries(COMPONENTS_PATH),
				exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
				tsconfigPath: "./tsconfig.build.json",
			},
			output: {
				distPath: {
					root: "./dist/cjs",
				},
				filenameHash: true,
			},
			plugins: [
				pluginImportMap({
					baseUrl: DEV_ENVIRONMENT_URL,
					specPrefix: "@ssc/ui-components/",
					includeCss: true,
					outFile: "importmap.json",
					componentPath: COMPONENTS_PATH,
				}),
			],
		},
		{
			...shared,
			format: "mf",
			source: {
				entry: pluginEntries(COMPONENTS_PATH),
				exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
				tsconfigPath: "./tsconfig.build.json",
			},
			dts: {
				distPath: "./dist/mf/@mf-types",
			},
			output: {
				distPath: {
					root: "./dist/mf",
				},
				filenameHash: true,
				// for production, add online assetPrefix here
				assetPrefix: process.env.ASSET_PREFIX ?? "http://localhost:3001/mf",
			},
			dev: {
				assetPrefix: process.env.ASSET_PREFIX ?? "http://localhost:3001/mf",
			},
		},
	],
	plugins: [
		pluginPreact(),
		pluginSass(),
		pluginNodePolyfill(),
		pluginModuleFederation(createMfConfig(COMPONENTS_PATH)),
	],
};

const comparison: string = "true";
const configuration: RslibConfig =
	(process.env.STORYBOOK_MODE?.trim() ?? "").trim() === comparison.trim()
		? storybookConfig
		: baseConfig;

export default defineConfig(configuration);
