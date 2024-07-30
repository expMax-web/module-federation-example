import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';

import { dependencies } from './package.json';

import { microservices } from './static/environment.json';

const getRemotes = () => {
  return Object.entries(microservices).reduce((acc, [name, url]) => {
    acc[name] = `${name}@${url}`;

    return acc;
  }, {});
};

// Для локальной разработки без Module Federation (Ускоряет работу)
const withoutMF = JSON.stringify(process.env.WITHOUT_MF);

const isRuntimeRegisterEnabled = JSON.stringify(process.env.RUNTIME_REGISTER);

export default defineConfig(() => ({
  plugins: [pluginReact(), pluginStyledComponents()],
  source: {
    define: {
      'process.env.MOCKS': JSON.stringify(process.env.MOCKS),
      'process.env.REMOTE_MOCKS': JSON.stringify(process.env.REMOTE_MOCKS),
      'process.env.RUNTIME_REGISTER': JSON.stringify(
        process.env.RUNTIME_REGISTER,
      ),
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
                remotes: isRuntimeRegisterEnabled ? {} : getRemotes(),
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
