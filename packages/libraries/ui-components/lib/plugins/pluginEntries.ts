import { sync } from "fast-glob";
import { dirname, relative } from "path";
import type { ComponentEntry } from "./interfaces/ComponentEntry";

export const createComponentEntry = (filePath: string): ComponentEntry | null => {
	const base = "./lib";
	const relativeDir = relative(base, dirname(filePath)).replace(/\\/g, "/");
	const componentFile = filePath.replace(/\\/g, "/");

	return {
		[`./${relativeDir}`]: componentFile,
	};
};

export const pluginEntries = (patterns: string[]): ComponentEntry => {
	const files = sync(patterns, { onlyFiles: true });
	const componentEntries = files
		.map((filePath) => createComponentEntry(filePath))
		.filter((entry): entry is ComponentEntry => entry !== null)
		.reduce((acc, entry) => Object.assign(acc, entry), {});

	return componentEntries;
};
