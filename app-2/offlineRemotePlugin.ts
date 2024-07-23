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
    // errorLoadRemote(args) {
    //   const { id, from } = args;

    //   const pg = function () {
    //     console.error(id, 'offline', 'Ошибка загрузки модуля');
    //     return getErrorMessage(id, 'Ошибка загрузки модуля');
    //   };

    //   if (args.lifecycle === 'onLoad') {
    //     return getModule(pg, from);
    //   } else if (args.lifecycle === 'beforeRequest') {
    //     return args;
    //   }
    // },
    beforeInit(args) {
      const onlineRemotes: any[] = [];

      let remotes = args.userOptions.remotes;

      console.log({ remotes });

      const foo: any[] = remotes.map((item) => {
        return { request: handleFetch.bind({ url: item.entry }), ...item };
      });

      foo.forEach((item) => {
        item
          .request()
          .then(() => {
            console.log(`Модуль ${item.name} успешно загружен`);

            onlineRemotes.push(item);
          })
          .catch(() => {
            console.error(`Ошибка при инициализации MF ${item.name}`);
          });
      });

      console.log({ remotes: args.userOptions.remotes, onlineRemotes });

      args.userOptions.remotes = onlineRemotes;

      return args;
    },
  };
};

export default offlineRemotePlugin;
