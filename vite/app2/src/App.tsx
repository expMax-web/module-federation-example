import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import "./App.css";
import Component2 from "./exposed/Component2/Component2";
import { getOpNameExchange } from "./api/getOpNameExchange";

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
        <Component2 title={""} />
      </div>
    </Provider>
  );
};

export default App;
