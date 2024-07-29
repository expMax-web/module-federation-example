import { gql } from 'urql';

export const GET_CHARACTERS = gql`
  query getCharacters1 {
    characters(page: 1, filter: { name: "rick" }) {
      results {
        name
      }
    }
  }
`;

export const GET_CHARACTERS_OP_NAME = 'getCharacters1';
