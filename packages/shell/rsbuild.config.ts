import { defineConfig } from '@rsbuild/core';
import { pluginPreact } from '@rsbuild/plugin-preact';
import { resolve } from 'path';
import loadEnvFile from '../../helpers/envLoaderHelper';

import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { pluginSass } from '@rsbuild/plugin-sass';

import mfConfig from './module-federation.config';

const root = resolve(process.cwd(), "../../");

export default defineConfig(({envMode}) => {
  const envFile = envMode ? `.env.${envMode}` : '.env';
  const env = loadEnvFile(root, envFile) || {};

  return {
    server: {
      port: 3002,
      cors: {
          origin: [/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1)(?::\d+)?$/],
      }
    },
    plugins: [pluginPreact(), pluginModuleFederation(mfConfig), pluginSass()],
    source: {
      define: Object.fromEntries(
        Object.entries(env).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)])
      )
    }
  }
});
