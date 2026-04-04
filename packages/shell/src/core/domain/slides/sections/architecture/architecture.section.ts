import type { Section } from "../../types";
import { hostRemote } from "./host-remote.slide";
import { moduleFederation } from "./module-federation.slide";
import { sharedDependencies } from "./shared-dependencies.slide";

export const architectureSection: Section = {
	id: "architecture",
	title: "Architecture",
	description: "Deep dive into MFE patterns",
	slides: [moduleFederation, hostRemote, sharedDependencies],
};
