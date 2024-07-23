import { cacheExchange, Client, fetchExchange, Provider } from 'urql';
import './App.css';
import { Component2 } from './Component2/Component2';
import { getOpNameExchange } from './api/getOpNameExchange';
import { Component1 } from './Component1';
import { ErrorBoundary } from './ErrorBoundary';

const opNameExchange = getOpNameExchange();

const client = new Client({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange, opNameExchange],
});

const App = () => {
  return (
    <ErrorBoundary>
      <Provider value={client}>
        <div style={{ display: 'flex', gap: '10px' }}>
          Local :
          <Component2 />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          Remote :
          <Component1 />
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
