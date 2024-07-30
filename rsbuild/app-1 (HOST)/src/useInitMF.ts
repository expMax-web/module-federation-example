import { init } from '@module-federation/enhanced/runtime';
import { useEffect, useState } from 'react';
import sharedStrategyPlugin from '../shared-strategy';
import offlineRemotePlugin from '../offlineRemotePlugin';
import { Config, InitState } from './types';

const isRemoteMocks = !!(process.env.REMOTE_MOCKS === 'true');

const isRuntimeRegisterEnabled = !!(process.env.RUNTIME_REGISTER === 'true');

const INITIAL_CONFIG: Config = {
  microservices: {},
};

export const useInitMF = () => {
  const [initState, setInitState] = useState<InitState>({
    error: null,
    loading: !isRemoteMocks,
    config: INITIAL_CONFIG,
  });

  useEffect(() => {
    // Если isRemoteMocks = true, то конфиг нужно получить до подключения MSW
    // Если isRuntimeRegisterEnabled = false, то значения должны браться не в рантайме, а в момент сборки из конфига rsbuild
    if (isRemoteMocks || !isRuntimeRegisterEnabled) {
      return;
    }

    fetch('/environment.json')
      .then((response) => {
        return response.json();
      })
      .then((config: Config) => {
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

        setInitState({ error: null, loading: false, config });
      })
      .catch(() => {
        console.error('Не удалось получить конфигурацию приложения');

        setInitState({
          error: 'Не удалось получить конфигурацию приложения',
          loading: false,
          config: INITIAL_CONFIG,
        });
      });
  }, []);

  return initState;
};
