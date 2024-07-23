import { FC, lazy, Suspense } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

const RemoteComponent = lazy(() => import('app1/Component1'));

export const Component1: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent title="Test" />
      </Suspense>
    </ErrorBoundary>
  );
};
