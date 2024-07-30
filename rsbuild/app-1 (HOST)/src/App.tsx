import { cacheExchange, Client, fetchExchange, Provider } from 'urql';
import './App.css';
import { getOpNameExchange } from './api/getOpNameExchange';
import { RemoteComponent2 } from './RemoteComponent2';
import { Component1 } from './Component1/Component2';
import { RemoteComponent3 } from './RemoteComponent3';
import { useInitMF } from './useInitMF';

const opNameExchange = getOpNameExchange();

const client = new Client({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange, opNameExchange],
});

const App = () => {
  // window.addEventListener('beforeunload', (event) => {
  //   debugger;
  //   event.preventDefault();
  //   event.returnValue = '';
  // });

  const { config, error, loading } = useInitMF();

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>Загрузка конфигурации приложения</>;
  }

  console.log(config);

  return (
    <Provider value={client}>
      <div style={{ display: 'flex', gap: '10px' }}>
        Local:
        <Component1 />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        Remote2:
        <RemoteComponent2 />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        Remote3:
        <RemoteComponent3 />
      </div>
    </Provider>
  );
};

export default App;
