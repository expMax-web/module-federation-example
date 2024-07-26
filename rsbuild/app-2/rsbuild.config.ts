import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

import { dependencies } from './package.json';

// Для локальной разработки без Module Federation (Ускоряет работу)
const withoutMF = JSON.stringify(process.env.WITHOUT_MF);

export default defineConfig(() => ({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env.MOCKS': JSON.stringify(process.env.MOCKS),
      'process.env.REMOTE_MOCKS': JSON.stringify(process.env.REMOTE_MOCKS),
    },
  },
  server: { port: 3002 },
  output: {
    copy: [{ from: './static' }],
    cleanDistPath: true,
  },
  dev: {
    assetPrefix: 'http://localhost:3002',
    hmr: true,
    liveReload: false,
    progressBar: true,
  },
  tools: {
    rspack: (config, { appendPlugins, addRules }) => {
      config.output!.uniqueName = 'app2';
      appendPlugins(
        withoutMF
          ? []
          : [
              new ModuleFederationPlugin({
                name: 'app2',
                filename: 'app2.js',
                exposes: {
                  './Component2': './src/Component2/Component2.tsx',
                  './handlers': './src/mocks/handlers.ts',
                },
                shared: {
                  react: {
                    singleton: true,
                    requiredVersion: dependencies.react,
                  },
                  'react-dom': {
                    singleton: true,
                    requiredVersion: dependencies['react-dom'],
                  },
                  urql: {
                    singleton: true,
                    requiredVersion: dependencies.urql,
                  },
                  graphql: {
                    singleton: true,
                    requiredVersion: dependencies.graphql,
                  },
                },
                runtimePlugins: [
                  require.resolve('./offlineRemotePlugin.ts'),
                  require.resolve('./shared-strategy.ts'),
                ],
                manifest: {
                  fileName: 'app2-manifest.json',
                },
              }),
            ],
      );

      addRules([
        {
          test: /styled\.ts$/,
          use: [
            {
              loader: '@wyw-in-js/webpack-loader',
              options: {
                sourceMap: process.env.NODE_ENV !== 'production',
              },
            },
          ],
        },
      ]);
    },
  },
}));
