import type { SourceMap } from "@rsbuild/core";
import type { LibConfig } from "@rslib/core";
import { pluginEntries } from "../../lib/plugins/pluginEntries";
import { COMPONENTS_PATH, DIST_ROOT } from "../env";

// ---------------------------------------------------------------------------
// Module Federation output
// Consumed by shell at runtime via MF remote URL (:3001)
// Exposes each component independently — no shared barrel
// ---------------------------------------------------------------------------

export const mfOutput = (isLocal: boolean, sourceMap: boolean | SourceMap): LibConfig => ({
	format: "mf",
	// DTS disabled until MF connection is verified — re-enable once dev server is stable
	dts: false,
	source: {
		entry: {
			...pluginEntries(COMPONENTS_PATH),
			"styles/tailwind": "./lib/styles/entry.css",
		},
		exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
		tsconfigPath: "./tsconfig.build.json",
	},
	output: {
		distPath: { root: `${DIST_ROOT}/mf` },
		cleanDistPath: true,
		filenameHash: !isLocal,
		sourceMap,
	},
});
