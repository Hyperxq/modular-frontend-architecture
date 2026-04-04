import type { Section } from "../types";
import { hostAndRemote } from "./host-and-remote.slide";
import { hostConfiguration } from "./host-configuration.slide";
import { remoteConfiguration } from "./remote-configuration.slide";
import { seeItInDevTools } from "./see-it-in-dev-tools.slide";

export const moduleFederationSection: Section = {
	id: "module-federation",
	title: "Module Federation",
	description: "Module Federation host and remote setup",
	slides: [hostAndRemote, hostConfiguration, remoteConfiguration, seeItInDevTools],
};
