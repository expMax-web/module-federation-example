import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';

// Для локальной разработки без Module Federation (Ускоряет работу)
const withMF = JSON.stringify(process.env.WITH_MF);

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
  },
  dev: {
    assetPrefix: 'http://localhost:3001',
  },
  tools: {
    rspack: (config, { appendPlugins, addRules }) => {
      config.output!.uniqueName = 'app1';
      appendPlugins(
        withMF
          ? [
              new ModuleFederationPlugin({
                name: 'app1',
                filename: 'app1.js',
                remotes: {
                  app2: 'app2@http://localhost:3002/mf-manifest.json',
                },
                shared: ['react', 'react-dom', 'urql', 'graphql'],
                runtimePlugins: [
                  require.resolve('./offlineRemotePlugin.ts'),
                  require.resolve('./shared-strategy.ts'),
                ],
              }),
            ]
          : [],
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
