import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig(() => ({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env.MOCKS': JSON.stringify(process.env.MOCKS),
      'process.env.REMOTE_MOCKS': JSON.stringify(process.env.REMOTE_MOCKS),
    },
  },
  output: {
    copy: [{ from: './static' }],
  },
  server: { port: 3002 },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'app2';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'app2',
          filename: 'app2.js',
          remotes: {
            app1: 'app1@http://localhost:3001/mf-manifest.json',
          },
          shared: ['react', 'react-dom', 'urql', 'graphql'],
          runtimePlugins: [
            require.resolve('./offlineRemotePlugin.ts'),
            require.resolve('./shared-strategy.ts'),
          ],
        }),
      ]);
    },
  },
}));
