import { ComponentType, FC, lazy, Suspense } from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import { loadRemote } from '@module-federation/enhanced/runtime';

// Подумать еще, нужно для динамической подсказки пропсов
type LoadRemoteResult = ReturnType<() => typeof import('app3/Component3')>;

// При запуске runtime register MF нужно использовать loadRemote, будет ошибка загрузки
const RemoteComponent = lazy(
  () => loadRemote('app3/Component3') as Promise<LoadRemoteResult>,
);

export const RemoteComponent3: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent title={''} />
      </Suspense>
    </ErrorBoundary>
  );
};
