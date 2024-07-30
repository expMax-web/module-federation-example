import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { init } from '@module-federation/enhanced/runtime';
import sharedStrategyPlugin from '../shared-strategy';
import offlineRemotePlugin from '../offlineRemotePlugin';
import { Config } from './types';

const withMocks = !!(process.env.MOCKS === 'true');

const isRemoteMocks = !!(process.env.REMOTE_MOCKS === 'true');

const isRuntimeRegisterEnabled = !!(process.env.RUNTIME_REGISTER === 'true');

const initRemotes = async () => {
  if (isRuntimeRegisterEnabled) {
    try {
      const response = await fetch('/environment.json');

      const config: Config = await response.json();

      const remotes = Object.entries(config.microservices).map(
        ([name, url]) => {
          return {
            name,
            entry: url,
            alias: name,
          };
        },
      );

      init({
        name: 'app1',
        remotes,
        plugins: [sharedStrategyPlugin() as any, offlineRemotePlugin()],
        shared: {
          react: {
            shareConfig: {
              singleton: true,
              requiredVersion: '^18.3.1',
            },
          },
          'react-dom': {
            shareConfig: {
              singleton: true,
              requiredVersion: '^18.3.1',
            },
          },
          urql: {
            shareConfig: {
              singleton: true,
              requiredVersion: '^4.1.0',
            },
          },
          graphql: {
            shareConfig: {
              singleton: true,
              requiredVersion: '^16.9.0',
            },
          },
        },
      });

      return config;
    } catch {
      console.error('Не удалось получить конфигурацию приложения');

      return null;
    }
  }

  return null;
};

async function enableMocking() {
  if (!withMocks) {
    return;
  }

  if (isRemoteMocks) {
    const config = await initRemotes();

    const { remoteMocks } = await import('./mocks/remoteMocks');

    const worker = await remoteMocks(config);

    return worker.start({ onUnhandledRequest: 'bypass' });
  }

  const { localMocks } = await import('./mocks/localMocks');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return localMocks.start({ onUnhandledRequest: 'bypass' });
}

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  enableMocking().then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
}
