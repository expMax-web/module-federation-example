import { FC } from 'react';
import { GET_CHARACTERS } from './query';
import { useQuery } from 'urql';
import { Title } from './styled';

interface Component3Props {
  title: string;
  testId?: string;
}

const Component3: FC<Component3Props> = ({ title }) => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_CHARACTERS,
  });

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <Title>
      (App-3)
      {data.characters.results.map((item: any, index: number) => {
        return <div key={`${item}_${index}`}>{item.name}</div>;
      })}
    </Title>
  );
};

export default Component3;
