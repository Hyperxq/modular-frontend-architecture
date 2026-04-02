import {
	createModuleFederationConfig,
	pluginModuleFederation,
} from "@module-federation/rsbuild-plugin";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginExposes } from "../lib/plugins/pluginExposes";
import { COMPONENTS_PATH } from "./env";

// ---------------------------------------------------------------------------
// Module Federation config
// Remote name: ui_components (underscore — JS identifier requirement)
// Preact must be singleton — duplicate runtime breaks hooks across MF boundary
// ---------------------------------------------------------------------------

const createMfConfig = (isLocal: boolean) =>
	createModuleFederationConfig({
		name: "ui_components",
		exposes: pluginExposes(COMPONENTS_PATH),
		dts: isLocal,
		shared: {
			preact: { singleton: true, requiredVersion: false },
			"preact/hooks": { singleton: true, requiredVersion: false },
			"preact/compat": { singleton: true, requiredVersion: false },
			"preact/jsx-runtime": { singleton: true, requiredVersion: false },
		},
	});

// ---------------------------------------------------------------------------
// Plugin list — order matters: Preact first, then MF
// ---------------------------------------------------------------------------

export const createPlugins = (isLocal: boolean) => [
	pluginPreact(),
	pluginSass(),
	pluginNodePolyfill(),
	pluginModuleFederation(createMfConfig(isLocal)),
];
