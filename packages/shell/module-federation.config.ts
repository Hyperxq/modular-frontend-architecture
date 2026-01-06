import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

const dts = (remoteUrl: string, isLocalEnv: boolean) =>
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

export const getMFConfig = (remoteUrl: string, isLocalEnv: boolean) => {
	return createModuleFederationConfig({
		name: "host",
		remotes: {
			ui_components: `ui_components@${remoteUrl}/mf-manifest.json`,
		},
		dts: dts(remoteUrl, isLocalEnv),
		shared: {
			preact: {
				singleton: true,
				eager: true,
				requiredVersion: false,
			},
		},
	});
};

export default getMFConfig;
