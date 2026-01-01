import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig, type RslibConfig } from "@rslib/core";
import { resolve } from "path";
import { pluginEntries } from "./lib/plugins/pluginEntries";
import { pluginImportMap } from "./lib/plugins/pluginImportMaps";
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
export const ENVIRONMENT_URL = process.env.BUCKET!;
export const DIST_PATH = resolve(__dirname, "../../../dist/ui-components");
export const UI_COMPONENTS_BASE_URL = `${ENVIRONMENT_URL}/ui-components`;
export const MF_UI_COMPONENTS_BASE_URL = `${UI_COMPONENTS_BASE_URL}/mf`;
export const ESM_UI_COMPONENTS_BASE_URL = `${UI_COMPONENTS_BASE_URL}/esm`;
export const CLS_UI_COMPONENTS_BASE_URL = `${UI_COMPONENTS_BASE_URL}/cls`;

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
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
		},
		publicDir: false,
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
	dev: {
		writeToDisk: true,
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
					root: `${DIST_PATH}/esm`,
				},
				assetPrefix: ESM_UI_COMPONENTS_BASE_URL,
				filenameHash: true,
			},
			plugins: [
				pluginImportMap({
					baseUrl: ENVIRONMENT_URL,
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
					root: `${DIST_PATH}/cjs`,
				},
				assetPrefix: CLS_UI_COMPONENTS_BASE_URL,
				filenameHash: true,
			},
			plugins: [
				pluginImportMap({
					baseUrl: ENVIRONMENT_URL,
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
				distPath: `${DIST_PATH}/mf/types`,
			},
			output: {
				distPath: {
					root: `${DIST_PATH}/mf`,
				},
				filenameHash: true,
				// for production, add online assetPrefix here
				assetPrefix: MF_UI_COMPONENTS_BASE_URL,
			},
			dev: {
				assetPrefix: MF_UI_COMPONENTS_BASE_URL,
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
