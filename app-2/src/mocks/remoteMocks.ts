import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { GraphQLHandler } from 'msw';

export const remoteMocks = (async () => {
  const result = await import('app1/handlers');

  // Сделать проверку ответа, если модуль оффлайн
  const remoteHandlers = result.default as unknown as GraphQLHandler[];

  return setupWorker(...handlers);
})();
