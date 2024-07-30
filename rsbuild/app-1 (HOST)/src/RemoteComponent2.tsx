import { FC, lazy, Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { loadRemote } from '@module-federation/enhanced/runtime';

const RemoteComponent = lazy(() => loadRemote('app2/Component2') as any);

export const RemoteComponent2: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent title="" />
      </Suspense>
    </ErrorBoundary>
  );
};
