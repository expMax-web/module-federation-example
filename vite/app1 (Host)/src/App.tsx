import { useState } from "react";
import "./App.css";
import { RemoteComponent2 } from "./RemoteComponent2";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ backgroundColor: "#eb926f" }}>
        <h1>App-1 (Host)</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>

      <div>
        <RemoteComponent2 />
      </div>
    </>
  );
}

export default App;
