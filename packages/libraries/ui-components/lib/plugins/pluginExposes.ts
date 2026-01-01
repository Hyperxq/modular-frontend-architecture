import { basename } from "node:path";
import { sync } from "fast-glob";
import type { ComponentEntry } from "./interfaces/ComponentEntry";

const createExposeEntry = (file: string): ComponentEntry | null => {
	const componentFile = file.replace(/\\/g, "/");
	const fileName = basename(file, ".tsx");

	return {
		[`./${fileName}`]: componentFile,
	};
};

export const pluginExposes = (patterns: string[]): ComponentEntry => {
	const files = sync(patterns, {
		onlyFiles: true,
		ignore: [
			"**/*.spec.tsx",
			"**/*.spec.ts",
			"**/*.story.ts",
			"**/*.story.tsx",
			"**/*.stories.ts",
			"**/*.stories.tsx",
		],
	});

	const exposes: ComponentEntry = files
		.map((filePath) => createExposeEntry(filePath))
		.filter((entry): entry is ComponentEntry => entry !== null)
		.reduce((acc, entry) => Object.assign(acc, entry), {});

	return exposes;
};
