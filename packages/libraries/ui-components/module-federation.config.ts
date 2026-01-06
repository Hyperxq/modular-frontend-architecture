import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";
import { pluginExposes } from "./lib/plugins/pluginExposes";

export const createMfConfig = (componentsPath: string[], isLocalEnv: boolean) =>
	createModuleFederationConfig({
		name: "ui_components",
		exposes: pluginExposes(componentsPath),
		dts: isLocalEnv,
		shared: {
			preact: {
				singleton: true,
				requiredVersion: false,
			},
		},
	});
