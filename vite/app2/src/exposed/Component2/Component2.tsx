import { FC, useState } from "react";
// import { GET_CHARACTERS } from "./query";
// import { useQuery } from "urql";
// import { Title } from "./styled";

interface Component2Props {
  title: string;
  testId?: string;
}

const Component2: FC<Component2Props> = () => {
  //   const [{ data, fetching, error }] = useQuery({
  //     query: GET_CHARACTERS,
  //   });

  //   if (fetching) {
  //     return <p>Loading...</p>;
  //   }

  //   if (error) {
  //     return <p>Oh no... {error.message}</p>;
  //   }

  //   return (
  //     <Title>
  //       (App-2)
  //       {data.characters.results.map((item: any, index: number) => {
  //         return <div key={`${item}_${index}`}>{item.name}</div>;
  //       })}
  //     </Title>
  //   );

  const [count, setCount] = useState(0);

  return (
    <div style={{ backgroundColor: "#e0a449" }}>
      <h1>App-2</h1>
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
  );
};

export default Component2;
