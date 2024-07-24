import { FC, lazy, Suspense } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

const RemoteComponent = lazy(() => import('app2/Component2'));

export const RemoteComponent2: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent title="Test" />
      </Suspense>
    </ErrorBoundary>
  );
};
