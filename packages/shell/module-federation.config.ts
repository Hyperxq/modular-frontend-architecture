import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

const _dts = (remoteUrl: string, isLocalEnv: boolean) =>
	isLocalEnv
		? {
				consumeTypes: {
					typesFolder: "@mf-types",
					remoteTypeUrls: {
						ui_components: {
							api: `${remoteUrl}/@mf-types/index.d.ts`,
							zip: `${remoteUrl}/mf-types.zip`,
						},
					},
				},
			}
		: false;

export const getMFConfig = (remoteUrl: string, _isLocalEnv: boolean) => {
	return createModuleFederationConfig({
		name: "host",
		manifest: false,
		remotes: {
			ui_components: `ui_components@${remoteUrl}/mf-manifest.json`,
		},
		// DTS disabled until MF connection is verified — re-enable once dev server is stable
		dts: false,
		shared: {
			preact: { singleton: true, eager: true, requiredVersion: false },
			"preact/hooks": { singleton: true, eager: true, requiredVersion: false },
			"preact/compat": { singleton: true, eager: true, requiredVersion: false },
			"preact/jsx-runtime": { singleton: true, eager: true, requiredVersion: false },
		},
	});
};

export default getMFConfig;
