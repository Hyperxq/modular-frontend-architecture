import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";
import { pluginExposes } from "./lib/plugins/pluginExposes";

export const createMfConfig = (componentsPath: string[]) =>
	createModuleFederationConfig({
		name: "ui_components",
		exposes: pluginExposes(componentsPath),
		shared: {
			preact: {
				singleton: true,
				requiredVersion: false,
			},
		},
	});
