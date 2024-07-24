import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';

const withMF = JSON.stringify(process.env.WITH_MF);

export default defineConfig(() => ({
  plugins: [pluginReact(), pluginStyledComponents()],
  source: {
    define: {
      'process.env.MOCKS': JSON.stringify(process.env.MOCKS),
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
                exposes: {
                  './Component1': './src/Component1/Component1.tsx',
                  './handlers': './src/mocks/handlers.ts',
                },
                shared: ['react', 'react-dom', 'urql', 'graphql'],
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
    webpack: {},
    styleLoader: {},
  },
}));
