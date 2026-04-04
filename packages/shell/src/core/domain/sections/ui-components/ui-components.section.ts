import type { Section } from "../types";
import { atomicDesign } from "./atomic-design.slide";
import { autoDiscoveryZeroConfig } from "./auto-discovery-zero-config.slide";
import { theSingletonRule } from "./the-singleton-rule.slide";
import { threeOutputsOneSource } from "./three-outputs-one-source.slide";

export const uiComponentsSection: Section = {
	id: "ui-components",
	title: "UI Components",
	description: "Component library architecture",
	slides: [atomicDesign, autoDiscoveryZeroConfig, threeOutputsOneSource, theSingletonRule],
};
