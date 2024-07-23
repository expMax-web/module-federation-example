import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const withMocks = !!(process.env.MOCKS === 'true');

async function enableMocking() {
  if (!withMocks) {
    return;
  }

  const { worker } = await import('./mocks/worker');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({ onUnhandledRequest: 'bypass' });
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
