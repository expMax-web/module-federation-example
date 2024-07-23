import { FC } from 'react';
import { GET_CHARACTERS } from './query';
import { useQuery } from 'urql';

export const Component2: FC = () => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_CHARACTERS,
  });

  if (fetching) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <div>
      (App-2)
      {data.characters.results.map((item: any, index: number) => {
        return <div key={`${item}_${index}`}>{item.name}</div>;
      })}
    </div>
  );
};
