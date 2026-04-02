import { resolve } from "node:path";
import type { SourceMap } from "@rsbuild/core";
import { isLocalEnv } from "../../shared/src/utils/isLocalEnv";

// ---------------------------------------------------------------------------
// Component discovery paths
// ---------------------------------------------------------------------------

const ATOMIC_LEVELS: Record<number, string> = {
	1: "atoms",
	2: "atoms|molecules",
	3: "atoms|molecules|organisms",
	4: "atoms|molecules|organisms|templates",
};

export const getComponentsGlob = (): string => {
	const base = process.env.PUBLIC_BASE_UI_COMPONENTS_DIRECTORY ?? "./lib";
	const componentsDir = process.env.PUBLIC_BASE_UI_COMPONENTS_COMPONENTS_PATHS ?? "/components";
	const wildcard = process.env.PUBLIC_PATH_WILDCARD ?? "**/*";
	const ext = process.env.PUBLIC_FILE_EXTENSION ?? ".tsx";

	if (process.env.LEVEL_MODE) {
		const level = Number(process.env.LEVEL_MODE.trim());
		const group = ATOMIC_LEVELS[level];
		const pattern = level > 1 ? `${group}/*/*` : `${group}/*`;
		return `${base}${componentsDir}/${pattern}${ext}`;
	}

	return `${base}${componentsDir}/${wildcard}${ext}`;
};

export const COMPONENTS_PATH: string[] = [getComponentsGlob()];

// ---------------------------------------------------------------------------
// Output paths
// ---------------------------------------------------------------------------

export const DIST_ROOT = resolve(__dirname, "../dist/ui-components");

// ---------------------------------------------------------------------------
// Environment-derived config values
// ---------------------------------------------------------------------------

export type EnvConfig = {
	isLocal: boolean;
	sourceMap: boolean | SourceMap;
};

export const resolveEnvConfig = (envMode = "development.local"): EnvConfig => {
	const isLocal = isLocalEnv(envMode);

	return {
		isLocal,
		sourceMap: isLocal ? { js: "cheap-module-source-map" } : false,
	};
};
