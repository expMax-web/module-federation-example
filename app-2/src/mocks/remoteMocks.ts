import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { GraphQLHandler } from 'msw';

export const remoteMocks = (async () => {
  console.log(1);

  // const result = await import('remote/handlers');

  console.log(2);

  const remoteHandlers: GraphQLHandler[] = [];

  return setupWorker(...handlers, ...remoteHandlers);
})();
