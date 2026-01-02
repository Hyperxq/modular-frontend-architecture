import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export const getMFConfig = (remoteUrl: string) => {
	console.log("Generating MF config with remote URL:", remoteUrl);
	return createModuleFederationConfig({
		name: "host",
		remotes: {
			ui_components: `ui_components@${remoteUrl}/mf-manifest.json`,
		},
		dts: {
			consumeTypes: {
				typesFolder: "@mf-types",
				remoteTypeUrls: {
					ui_components: {
						api: `${remoteUrl}/@mf-types/index.d.ts`,
						zip: `${remoteUrl}/mf-types.zip`,
					},
				},
			},
		},
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
