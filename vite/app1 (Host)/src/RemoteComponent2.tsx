import { FC, lazy, Suspense } from "react";
import { loadRemote } from "@module-federation/runtime";
import { ErrorBoundary } from "./ErrorBoundary";

const RemoteComponent = lazy(() => loadRemote("app2/Component2") as any);

export const RemoteComponent2: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загружаю</div>}>
        <RemoteComponent />
      </Suspense>
    </ErrorBoundary>
  );
};
