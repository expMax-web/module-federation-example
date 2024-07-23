import { FC } from 'react';

import RemoteComponent from 'remote/Component1';
import { ErrorBoundary } from './ErrorBoundary';

export const Component1: FC = () => {
  console.log(RemoteComponent);

  return (
    <ErrorBoundary>
      <RemoteComponent />
    </ErrorBoundary>
  );
};
