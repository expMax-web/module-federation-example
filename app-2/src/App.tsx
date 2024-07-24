import { cacheExchange, Client, fetchExchange, Provider } from 'urql';
import './App.css';
import { getOpNameExchange } from './api/getOpNameExchange';
import { ErrorBoundary } from './ErrorBoundary';
import Component2 from './Component2/Component2';

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
          <Component2 title={''} />
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
