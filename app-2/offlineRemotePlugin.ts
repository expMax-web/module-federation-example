import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

function handleFetch(this: { url: string }) {
  return fetch(this.url);
}

const getErrorMessage = (id, error) =>
  `remote ${id} is offline due to error: ${error}`;

const getModule = (pg, from) => {
  if (from === 'build') {
    return () => ({
      __esModule: true,
      default: pg,
    });
  } else {
    return {
      default: pg,
    };
  }
};

const offlineRemotePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'offline-remote-plugin',

    errorLoadRemote(args) {
      if (args.lifecycle === 'onLoad') {
        // подумать еще
        return () => import('./src/Error');
      } else {
        return args;
      }
    },
  };
};

export default offlineRemotePlugin;
