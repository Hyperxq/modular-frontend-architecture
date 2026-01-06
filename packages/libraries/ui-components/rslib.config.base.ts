import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { SourceMap } from "@rsbuild/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig, type RslibConfig } from "@rslib/core";
import { resolve } from "path";
import { isLocalEnv } from "../shared/src/utils/isLocalEnv";
import { pluginEntries } from "./lib/plugins/pluginEntries";
import { createMfConfig } from "./module-federation.config";

type Shared = {
	dts:
		| boolean
		| {
				bundle: boolean;
		  };
};

type Format = "esm" | "cjs" | "mf";

type BaseConfig = (
	isLocalEnvMode: boolean,
	shared: Shared,
	sourceMapConfig: boolean | SourceMap,
) => RslibConfig;
type StorybookConfig = (isLocalEnvMode: boolean) => RslibConfig;

const levels: { [key: string]: string } = {
	1: "atoms",
	2: "atoms|molecules",
	3: "atoms|molecules|organisms",
	4: "atoms|molecules|organisms|templates",
};

const getComponentsPath = () => {
	const baseDirectory = process.env.PUBLIC_BASE_UI_COMPONENTS_DIRECTORY || "./lib";
	const baseComponentPath = process.env.PUBLIC_BASE_UI_COMPONENTS_COMPONENTS_PATHS || "/components";
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
export const DIST_PATH = resolve(__dirname, "./dist/ui-components");

const storybookConfig: StorybookConfig = (isLocalEnv) => ({
	source: {
		entry: pluginEntries(COMPONENTS_PATH),
	},
	lib: [
		{
			bundle: false,
			dts: isLocalEnv,
			format: "esm" as Format, // Use the restricted type here
		},
	],
	output: {
		target: "web",
	},
	plugins: [pluginReact()],
});

export const baseConfig: BaseConfig = (isLocalEnv, shared, sourceMapConfig) => ({
	server: {
		port: 3001,
		compress: {
			level: 6,
		},
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
		},
		publicDir: false,
		cors: {
			origin: [/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/],
		},
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
		// {
		// 	...shared,
		// 	format: "esm",
		// 	source: {
		// 		entry: pluginEntries(COMPONENTS_PATH),
		// 		exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
		// 		tsconfigPath: "./tsconfig.build.json",
		// 	},
		// 	output: {
		// 		distPath: {
		// 			root: `${DIST_PATH}/esm`,
		// 		},
		// 		cleanDistPath: true,
		// 		assetPrefix: ESM_UI_COMPONENTS_BASE_URL,
		// 		filenameHash: true,
		// 	},
		// 	plugins: [
		// 		pluginImportMap({
		// 			baseUrl: ENVIRONMENT_URL,
		// 			specPrefix: "@ssc/ui-components/",
		// 			includeCss: true,
		// 			outFile: "importmap.json",
		// 			componentPath: COMPONENTS_PATH,
		// 		}),
		// 	],
		// },
		// {
		// 	...shared,
		// 	format: "cjs",
		// 	source: {
		// 		entry: pluginEntries(COMPONENTS_PATH),
		// 		exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
		// 		tsconfigPath: "./tsconfig.build.json",
		// 	},
		// 	output: {
		// 		distPath: {
		// 			root: `${DIST_PATH}/cjs`,
		// 		},
		// 		cleanDistPath: true,
		// 		assetPrefix: CLS_UI_COMPONENTS_BASE_URL,
		// 		filenameHash: true,
		// 	},
		// 	plugins: [
		// 		pluginImportMap({
		// 			baseUrl: ENVIRONMENT_URL,
		// 			specPrefix: "@ssc/ui-components/",
		// 			includeCss: true,
		// 			outFile: "importmap.json",
		// 			componentPath: COMPONENTS_PATH,
		// 		}),
		// 	],
		// },
		{
			...shared,
			format: "mf",
			source: {
				entry: pluginEntries(COMPONENTS_PATH),
				exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
				tsconfigPath: "./tsconfig.build.json",
			},
			dts: isLocalEnv
				? {
						distPath: `${DIST_PATH}/mf/@mf-types`,
					}
				: false,
			output: {
				distPath: {
					root: `${DIST_PATH}/mf`,
				},
				cleanDistPath: true,
				filenameHash: true,
				sourceMap: sourceMapConfig,
				assetPrefix: "ui-components/mf",
			},
		},
	],
	plugins: [
		pluginPreact(),
		pluginSass(),
		pluginNodePolyfill(),
		pluginModuleFederation(createMfConfig(COMPONENTS_PATH, isLocalEnv)),
	],
});

const config = ({ envMode = "development.local" }) => {
	const isLocalEnvMode = isLocalEnv(envMode);
	const shared = {
		dts: {
			bundle: false,
		},
	};
	const sourceMapConfig: boolean | SourceMap = isLocalEnvMode
		? {
				js: "cheap-module-source-map",
			}
		: false;

	return (process.env.STORYBOOK_MODE?.trim() ?? "").trim()
		? storybookConfig(isLocalEnvMode)
		: baseConfig(isLocalEnvMode, shared, sourceMapConfig);
};

export default defineConfig(config);
