import { FC } from 'react';
import { GET_CHARACTERS } from './query';
import { useQuery } from 'urql';
import { Title } from './styled';

export const Component1: FC = () => {
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
    <Title>
      (App-1)
      {data.characters.results.map((item: any, index: number) => {
        return <div key={`${item}_${index}`}>{item.name}</div>;
      })}
    </Title>
  );
};
