import type { RsbuildPlugin } from "@rslib/core";
import { getImportMap } from "./get-import-map";
import type { ImportMapPluginOptions } from "./interfaces/ImportMapsPluginOptions";

export function pluginImportMap(options: ImportMapPluginOptions = {}): RsbuildPlugin {
	return {
		name: "rslib-plugin-import-maps",
		setup(api) {
			api.onAfterBuild(async ({ environments }) => {
				const env = Object.values(environments)[0];
				const distDir = options.dir ?? env.distPath;

				try {
					await getImportMap(distDir, options);
				} catch (error) {
					console.error("Error generating import map:", error);
				}
			});
		},
	};
}
