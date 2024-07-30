import { setupWorker } from 'msw/browser';

import handlers from './handlers';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { Config } from '../types';

const isRuntimeRegisterEnabled = !!(process.env.RUNTIME_REGISTER === 'true');

export const remoteMocks = async (config: Config | null) => {
  try {
    const promises = Object.keys(config?.microservices || {}).map((item) => {
      return loadRemote(`${item}/handlers`);
    });

    const result = await Promise.allSettled(
      isRuntimeRegisterEnabled
        ? promises
        : [loadRemote('app2/handlers'), loadRemote('app3/handlers')],
    );

    const remoteHandlers = result
      .map(
        (item: any) =>
          item &&
          'value' in item &&
          'handlers' in item.value &&
          item?.value?.handlers,
      )
      .flat(1)
      .filter(Boolean);

    return setupWorker(...handlers, ...remoteHandlers);
  } catch {
    console.error('Не удалось подключить моки из удаленного МФ');

    return setupWorker(...handlers);
  }
};
