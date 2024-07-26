import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';

import { dependencies } from './package.json';

// Для локальной разработки без Module Federation (Ускоряет работу)
const withoutMF = JSON.stringify(process.env.WITHOUT_MF);

export default defineConfig(() => ({
  plugins: [pluginReact(), pluginStyledComponents()],
  source: {
    define: {
      'process.env.MOCKS': JSON.stringify(process.env.MOCKS),
      'process.env.REMOTE_MOCKS': JSON.stringify(process.env.REMOTE_MOCKS),
    },
  },
  server: { port: 3001 },
  output: {
    copy: [{ from: './static' }],
    cleanDistPath: true,
  },
  dev: {
    assetPrefix: 'http://localhost:3001',
    hmr: true,
    liveReload: false,
    progressBar: true,
  },
  tools: {
    rspack: (config, { appendPlugins, addRules }) => {
      config.output!.uniqueName = 'app1';
      appendPlugins(
        withoutMF
          ? []
          : [
              new ModuleFederationPlugin({
                name: 'app1',
                filename: 'app1.js',
                remotes: {
                  app2: 'app2@http://localhost:3002/app2-manifest.json',
                  app3: 'app3@http://localhost:3003/app3-manifest.json',
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
