import { FC, lazy, Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { loadRemote } from '@module-federation/enhanced/runtime';

// Подумать еще, нужно для динамической подсказки пропсов
type LoadRemoteResult = ReturnType<() => typeof import('app2/Component2')>;

// При запуске runtime register MF нужно использовать loadRemote, будет ошибка загрузки
const RemoteComponent = lazy(
  () => loadRemote('app2/Component2') as Promise<LoadRemoteResult>,
);

export const RemoteComponent2: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent title={''} />
      </Suspense>
    </ErrorBoundary>
  );
};
