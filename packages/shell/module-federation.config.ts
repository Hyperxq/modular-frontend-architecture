import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "host",
  remotes: {
    ui_components: "ui_components@http://localhost:3001/mf/mf-manifest.json",
  },
  dts: {
    consumeTypes: {
      typesFolder: "@mf-types",
      remoteTypeUrls: {
        ui_components: {
          api: "http://localhost:3001/mf/@mf-types/types.d.ts",
          zip: "http://localhost:3001/mf/types.d.ts.zip"
        }
      }
    }
  },
  shared: {
    preact: {
      singleton: true,
      eager: true,
      requiredVersion: false
    }
  }
});