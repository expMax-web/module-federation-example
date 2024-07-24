import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

// Плагин для обработки ошибки подкючения к remote MF

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
