import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

// Плагин для обработки ошибки подкючения к remote MF

const offlineRemotePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'offline-remote-plugin',

    errorLoadRemote(args) {
      if (args.lifecycle === 'onLoad') {
        return () => {
          console.error(`Ошибка загрузки модуля ${args.id}`);
        };
      } else {
        return args;
      }
    },
  };
};

export default offlineRemotePlugin;
