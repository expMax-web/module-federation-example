import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Для локальной разработки без Module Federation (Ускоряет работу)
const withMF = JSON.stringify(process.env.WITH_MF);

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
  },
  dev: {
    assetPrefix: 'http://localhost:3001',
  },
  tools: {
    rspack: (config, { appendPlugins, addRules }) => {
      config.output!.uniqueName = 'app2';
      appendPlugins(
        withMF
          ? [
              new ModuleFederationPlugin({
                name: 'app2',
                filename: 'app2.js',
                exposes: {
                  './Component2': './src/Component1/Component2.tsx',
                  './handlers': './src/mocks/handlers.ts',
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
