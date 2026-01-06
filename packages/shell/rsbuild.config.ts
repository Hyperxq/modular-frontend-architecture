import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginSass } from "@rsbuild/plugin-sass";
import CompressionPlugin from "compression-webpack-plugin";
import path, { resolve } from "path";
import loadEnvFile from "../.././helpers/envLoaderHelper";
import { isLocalEnv } from "../libraries/shared/src";
import mfConfig from "./module-federation.config";

const root = path.resolve(process.cwd(), "../../");
const DIST_PATH = resolve(__dirname, "./dist");

export default defineConfig(({ envMode }) => {
	const envFile = envMode ? `.env.${envMode}` : ".env";
	const env = loadEnvFile(root, envFile) || {};
	const PUBLIC_BUCKET_URL = env.PUBLIC_BUCKET_URL;
	const isLocalEnvMode = isLocalEnv(envMode);
	console.log("isLocalEnvMode", isLocalEnvMode);
	const remoteUrl = isLocalEnvMode ? PUBLIC_BUCKET_URL : `${PUBLIC_BUCKET_URL}/ui-components/mf`;

	return {
		server: {
			port: 3002,
			compress: {
				level: 6,
			},
			headers: {
				// Set a long cache lifetime for static assets (e.g., 1 year)
				"Cache-Control": "public, max-age=31536000, immutable",
			},
			cors: {
				origin: [/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/],
			},
		},
		html: {
			title: "Monorepo Shell - Rsbuild with Preact",
		},
		tools: {
			rspack: {
				plugins: [new CompressionPlugin()],
			},
		},
		plugins: [
			pluginPreact(),
			pluginModuleFederation(mfConfig(remoteUrl, isLocalEnvMode)),
			pluginSass(),
		],
		source: {
			define: Object.fromEntries(
				Object.entries(env).map(([key, val]) => [`import.meta.env.${key}`, JSON.stringify(val)]),
			),
		},
		dev: {
			writeToDisk: true,
		},
		output: {
			injectStyles: !isLocalEnvMode,
			cleanDistPath: true,
			assetPrefix: isLocalEnvMode ? "http://localhost:3002" : PUBLIC_BUCKET_URL,
			distPath: {
				root: `${DIST_PATH}`,
			},
		},
		//TODO we are on packages/shell check if that node_modules is from the root or this.
		performance: {
			chunkSplit: {
				strategy: "split-by-experience",
				forceSplitting: {
					"react-router": /node_modules[\\/]react-router/,
					preact: /node_modules[\\/]preact/,
					axios: /node_modules[\\/]axios/,
					"auth0-js": /node_modules[\\/]auth0-js/,
				},
			},
		},
	};
});
