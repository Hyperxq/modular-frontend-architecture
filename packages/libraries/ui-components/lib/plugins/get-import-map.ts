import { writeFile } from "node:fs/promises";
import { join } from "path";
import { DIST_PATH } from "../../rslib.config.base";
import type { GenerateImportMapParams, ImportsMap } from "./interfaces/GenerateImportMapParams";
import { pluginExposes } from "./pluginExposes";

export async function getImportMap(
		distDir: string = DIST_PATH,
		{
			baseUrl = process.env.PUBLIC_BUCKET_URL + "/vendor/ui/",
			outFile = "importmap.json",
			componentPath = [],
		}: GenerateImportMapParams,
	) {
		const generateImportMaps: ImportsMap = pluginExposes(componentPath);

		try {
			const libPath = "./lib/components";
			const imports: ImportsMap = Object.fromEntries(
				Object.entries(generateImportMaps).map(([key, value]) => {
					if (value.startsWith(libPath)) {
						const newPath = value.replace(libPath, baseUrl);
						return [key, newPath];
					}
					return [key, value];
				}),
			);

			const outPath = join(distDir, outFile);
			await writeFile(outPath, JSON.stringify({ imports }, null, 2), "utf-8");
		} catch (error) {
			console.error("Error generating import map:", error);
		}
	}
