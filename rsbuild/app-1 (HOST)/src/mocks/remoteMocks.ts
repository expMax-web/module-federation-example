import { setupWorker } from 'msw/browser';

import handlers from './handlers';

export const remoteMocks = (async () => {
  try {
    // Пока руками, нужно подумать как тянуть из конфига rsbuild, либо уже из envitonment.json
    const result = await Promise.allSettled([
      import('app2/handlers'),
      import('app3/handlers'),
    ]);

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

    console.log(remoteHandlers);

    return setupWorker(...handlers, ...remoteHandlers);
  } catch {
    console.error('Не удалось подключить моки из удаленного МФ');

    return setupWorker(...handlers);
  }
})();
