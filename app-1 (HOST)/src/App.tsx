import { cacheExchange, Client, fetchExchange, Provider } from 'urql';
import './App.css';
import { getOpNameExchange } from './api/getOpNameExchange';
import { Component1 } from './Component1/Component2';

const opNameExchange = getOpNameExchange();

const client = new Client({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange, opNameExchange],
});

const App = () => {
  return (
    <Provider value={client}>
      <div style={{ display: 'flex', gap: '10px' }}>
        Local:
        <Component1 />
      </div>
    </Provider>
  );
};

export default App;
