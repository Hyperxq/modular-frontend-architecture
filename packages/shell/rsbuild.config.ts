import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginSass } from "@rsbuild/plugin-sass";
import path, { resolve } from "path";
import loadEnvFile from "../.././helpers/envLoaderHelper";
import mfConfig from "./module-federation.config";

const root = path.resolve(process.cwd(), "../../");
const DIST_PATH = resolve(__dirname, "../../dist");

export default defineConfig(({ envMode }) => {
	const envFile = envMode ? `.env.${envMode}` : ".env";
	const env = loadEnvFile(root, envFile) || {};
	const BUCKET_URL = env.BUCKET_URL;
	const remoteUrl = `${BUCKET_URL}/ui-components/mf`;

	return {
		server: {
			port: 3002,
			headers: {
				// Set a long cache lifetime for static assets (e.g., 1 year)
				"Cache-Control": "public, max-age=31536000, immutable",
			},
			cors: {
				origin: [/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/],
			},
		},
		plugins: [pluginPreact(), pluginModuleFederation(mfConfig(remoteUrl)), pluginSass()],
		source: {
			define: Object.fromEntries(
				Object.entries(env).map(([key, val]) => [`import.meta.env.${key}`, JSON.stringify(val)]),
			),
		},
		dev: {
			writeToDisk: true,
		},
		output: {
			injectStyles: true,
			cleanDistPath: false,
			assetPrefix: envMode === "development" ? "http://localhost:3002" : BUCKET_URL,
			distPath: {
				root: `${DIST_PATH}`,
			},
		},
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
