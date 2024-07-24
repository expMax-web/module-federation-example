import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { GraphQLHandler } from 'msw';

export const remoteMocks = (async () => {
  try {
    const result = await import('app1/handlers');

    const remoteHandlers = result.default as unknown as GraphQLHandler[];

    return setupWorker(...handlers, ...remoteHandlers);
  } catch {
    console.error('Не удалось подключить моки из удаленного МФ');

    return setupWorker(...handlers);
  }
})();
