import { graphql, HttpResponse } from 'msw';
import { GET_CHARACTERS_OP_NAME } from '../Component3/query';

export const handlers = [
  graphql.query(GET_CHARACTERS_OP_NAME, () => {
    return HttpResponse.json({
      data: {
        characters: {
          results: [
            {
              name: 'Персонаж 7',
              __typename: 'Character',
            },
            {
              name: 'Персонаж 8',
              __typename: 'Character',
            },
            {
              name: 'Персонаж 9',
              __typename: 'Character',
            },
          ],
          __typename: 'Characters',
        },
      },
    });
  }),
];
