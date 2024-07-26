import { gql } from 'urql';

export const GET_CHARACTERS = gql`
  query getCharacters3 {
    characters(page: 3, filter: { name: "rick" }) {
      results {
        name
      }
    }
  }
`;

export const GET_CHARACTERS_OP_NAME = 'getCharacters3';
