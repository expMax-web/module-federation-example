import { graphql, HttpResponse } from 'msw';
import { GET_CHARACTERS_OP_NAME } from '../Component2/query';

export const handlers = [
  graphql.query(GET_CHARACTERS_OP_NAME, () => {
    return HttpResponse.json({
      data: {
        characters: {
          results: [
            {
              name: 'Персонаж 4',
              __typename: 'Character',
            },
            {
              name: 'Персонаж 5',
              __typename: 'Character',
            },
            {
              name: 'Персонаж 6',
              __typename: 'Character',
            },
          ],
          __typename: 'Characters',
        },
      },
    });
  }),
];
