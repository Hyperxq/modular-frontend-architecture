import { defineConfig, type RslibConfig } from "@rslib/core";

const wcConfig: RslibConfig = defineConfig({
  tools: {
    rspack: (config, {rspack}) => {
      config.module ||= {};
      config.module.rules ||= [];
      config.plugins ||= [];

      config.module.rules.push(
        {
          test: /\.css$/i,
          resourceQuery: /raw/,
          type: "asset/source"
        },
        {
          test: /\.(woff2?|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext]"
          }
        }
      )

      config.plugins.push(
        new rspack.ProvidePlugin({
          banner: `
            (function() {
              var g = 
                typeof globalThis !== 'undefined' ? globalThis :
                typeof window !== 'undefined' ? window :
                typeof self !== 'undefined' ? self :
                Function('return this')();
              if (!g.global) g.global = g;
              if (!g.global) g.global = g;
            })
          `
      })
    );

      return config;
    }
  },
  lib: []
})