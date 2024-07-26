import { gql } from 'urql';

export const GET_CHARACTERS = gql`
  query getCharacters {
    characters(page: 2, filter: { name: "rick" }) {
      results {
        name
      }
    }
  }
`;

export const GET_CHARACTERS_OP_NAME = 'getCharacters';
