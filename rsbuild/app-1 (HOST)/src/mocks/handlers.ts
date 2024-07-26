import { graphql, HttpResponse } from 'msw';
import { GET_CHARACTERS_OP_NAME } from '../Component1/query';

export default [
  graphql.query(GET_CHARACTERS_OP_NAME, () => {
    return HttpResponse.json({
      data: {
        characters: {
          results: [
            {
              name: 'Персонаж 1',
              __typename: 'Character',
            },
            {
              name: 'Персонаж 23',
              __typename: 'Character',
            },
            {
              name: 'Персонаж 33333',
              __typename: 'Character',
            },
          ],
          __typename: 'Characters',
        },
      },
    });
  }),
];
