import { FC, lazy, Suspense } from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import { loadRemote } from '@module-federation/enhanced/runtime';

const RemoteComponent = lazy(() => loadRemote('app3/Component3') as any);

export const RemoteComponent3: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent title={''} />
      </Suspense>
    </ErrorBoundary>
  );
};
