import { defineConfig } from "@rslib/core";
import { pluginEntries } from "./lib/plugins/pluginEntries";
import { COMPONENTS_PATH, resolveEnvConfig } from "./rslib/env";
import { mfOutput } from "./rslib/outputs/mf";
import { createPlugins } from "./rslib/plugins";
import { devServer } from "./rslib/server";

// ---------------------------------------------------------------------------
// ui-components rslib config
//
// Outputs (add new ones in rslib/outputs/):
//   - mf   → Module Federation remote consumed by shell at runtime (:3001)
//   - esm  → (future) Import Maps for native browser consumption
//   - wc   → (future) Web Components via @r2wc/react-to-web-component
// ---------------------------------------------------------------------------

export default defineConfig(({ envMode = "development.local" }) => {
	const env = resolveEnvConfig(envMode);

	return {
		server: devServer,

		dev: {
			writeToDisk: true,
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

		resolve: {
			alias: {
				"@modular-frontend/shared": "../shared/src",
			},
		},

		source: {
			entry: {
				...pluginEntries(COMPONENTS_PATH),
				"styles/tailwind": "./lib/styles/entry.css",
			},
			exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
			tsconfigPath: "./tsconfig.build.json",
		},

		// Add new outputs here by importing from rslib/outputs/
		lib: [mfOutput(env.isLocal, env.sourceMap)],

		plugins: createPlugins(env.isLocal),
	};
});
