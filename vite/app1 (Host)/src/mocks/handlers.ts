import { graphql, HttpResponse } from "msw";
import { GET_CHARACTERS_OP_NAME } from "../Component1/query";

export default [
  graphql.query(GET_CHARACTERS_OP_NAME, () => {
    return HttpResponse.json({
      data: {
        characters: {
          results: [
            {
              name: "Персонаж 1",
              __typename: "Character",
            },
            {
              name: "Персонаж 2",
              __typename: "Character",
            },
            {
              name: "Персонаж 3",
              __typename: "Character",
            },
          ],
          __typename: "Characters",
        },
      },
    });
  }),
];
