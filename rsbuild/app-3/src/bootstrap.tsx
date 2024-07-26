import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const withMocks = !!(process.env.MOCKS === 'true');

const isRemoteMocks = !!(process.env.REMOTE_MOCKS === 'true');

async function enableMocking() {
  if (!withMocks) {
    return;
  }

  if (isRemoteMocks) {
    const { remoteMocks } = await import('./mocks/remoteMocks');

    const worker = await remoteMocks;

    return worker.start({ onUnhandledRequest: 'bypass' });
  }

  const { localMocks } = await import('./mocks/localMocks');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return localMocks.start({ onUnhandledRequest: 'bypass' });
}

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  enableMocking().then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
}
