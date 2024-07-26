import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

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
  server: { port: 3003 },
  output: {
    copy: [{ from: './static' }],
  },
  dev: {
    assetPrefix: 'http://localhost:3003',
  },
  tools: {
    rspack: (config, { appendPlugins, addRules }) => {
      config.output!.uniqueName = 'app3';
      appendPlugins(
        withoutMF
          ? []
          : [
              new ModuleFederationPlugin({
                name: 'app3',
                filename: 'app3.js',
                exposes: {
                  './Component3': './src/Component3/Component3.tsx',
                  './handlers': './src/mocks/handlers.ts',
                },
                shared: ['react', 'react-dom', 'urql', 'graphql'],
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
