import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import "./App.css";
import { getOpNameExchange } from "./api/getOpNameExchange";
import { Component1 } from "./Component1/Component1";

const opNameExchange = getOpNameExchange();

const client = new Client({
  url: "https://rickandmortyapi.com/graphql",
  exchanges: [cacheExchange, fetchExchange, opNameExchange],
});

const App = () => {
  // window.addEventListener('beforeunload', (event) => {
  //   debugger;
  //   event.preventDefault();
  //   event.returnValue = '';
  // });

  return (
    <Provider value={client}>
      <div style={{ display: "flex", gap: "10px" }}>
        Local:
        <Component1 />
      </div>
      {/* <div style={{ display: "flex", gap: "10px" }}>
        Remote2:
        <RemoteComponent2 />
      </div> */}
      {/* <div style={{ display: 'flex', gap: '10px' }}>
        Remote3:
        <RemoteComponent3 />
      </div> */}
    </Provider>
  );
};

export default App;
