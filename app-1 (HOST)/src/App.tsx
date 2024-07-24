import { cacheExchange, Client, fetchExchange, Provider } from 'urql';
import './App.css';
import Component1 from './Component1/Component1';
import { getOpNameExchange } from './api/getOpNameExchange';

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
        <Component1 title={''} />
      </div>
    </Provider>
  );
};

export default App;
