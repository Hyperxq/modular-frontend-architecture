import path, { resolve } from "node:path";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";
import CompressionPlugin from "compression-webpack-plugin";
import loadEnvFile from "../.././helpers/envLoaderHelper";
import { isLocalEnv } from "../libraries/shared/src";
import mfConfig from "./module-federation.config";

const root = path.resolve(process.cwd(), "../../");
const DIST_PATH = resolve(__dirname, "./dist");

function assertValidRemoteUrl(url: string | undefined): asserts url is string {
	if (!url) throw new Error("PUBLIC_BUCKET_URL is required but not set");
	try {
		const { protocol } = new URL(url);
		if (protocol !== "http:" && protocol !== "https:") {
			throw new Error(`PUBLIC_BUCKET_URL must use http or https, got: ${protocol}`);
		}
	} catch {
		throw new Error(`PUBLIC_BUCKET_URL is not a valid URL: ${url}`);
	}
}

export default defineConfig(({ envMode }) => {
	const envFile = envMode ? `.env.${envMode}` : ".env";
	const env = loadEnvFile(root, envFile) || {};
	const PUBLIC_BUCKET_URL = env.PUBLIC_BUCKET_URL;
	assertValidRemoteUrl(PUBLIC_BUCKET_URL);
	const isLocalEnvMode = isLocalEnv(envMode);
	const remoteUrl = isLocalEnvMode ? PUBLIC_BUCKET_URL : `${PUBLIC_BUCKET_URL}/ui-components/mf`;
	const nm = /[\\/]node_modules[\\/](?:\.pnpm[\\/][^\\/]+[\\/]node_modules[\\/])?/;

	return {
		server: {
			port: 3002,
			publicDir: {
				ignore: isLocalEnvMode ? [] : ["**/mockServiceWorker.js"],
			},
			compress: {
				level: 6,
			},
			headers: {
				"Cache-Control": isLocalEnvMode
					? "no-store, no-cache, must-revalidate"
					: "public, max-age=31536000, immutable",
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"Referrer-Policy": "strict-origin-when-cross-origin",
				"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
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
		plugins: [pluginPreact(), pluginModuleFederation(mfConfig(remoteUrl, isLocalEnvMode))],
		source: {
			define: Object.fromEntries(
				Object.entries(env)
					.filter(([key]) => key.startsWith("PUBLIC_"))
					.map(([key, val]) => [`import.meta.env.${key}`, JSON.stringify(val)]),
			),
		},
		dev: {
			writeToDisk: false,
		},
		output: {
			injectStyles: !isLocalEnvMode,
			// cleanDistPath: true,
			assetPrefix: isLocalEnvMode ? "http://localhost:3002" : PUBLIC_BUCKET_URL,
			filenameHash: !isLocalEnvMode,
			distPath: {
				root: `${DIST_PATH}`,
			},
		},
		performance: {
			chunkSplit: {
				strategy: "split-by-experience",
				forceSplitting: {
					"react-router": new RegExp(`${nm.source}react-router[\\/]`),
					preact: new RegExp(`${nm.source}preact[\\/]`),
					zustand: new RegExp(`${nm.source}zustand[\\/]`),
				},
			},
		},
	};
});
