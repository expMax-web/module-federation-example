import { FC, lazy, Suspense } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

const RemoteComponent = lazy(() => import('app3/Component3'));

export const RemoteComponent3: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent title={''} />
      </Suspense>
    </ErrorBoundary>
  );
};
