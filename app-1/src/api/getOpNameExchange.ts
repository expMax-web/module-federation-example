import { contextExchange } from '@urql/exchange-context';
import { DefinitionNode } from 'graphql';
import { Exchange } from 'urql';

export const getOpNameExchange = (): Exchange =>
  contextExchange({
    getContext: (operation) => {
      const { query, context } = operation;

      const definition = query.definitions.find(
        (definitionNode: DefinitionNode) =>
          definitionNode.kind === 'OperationDefinition',
      );

      const opNameUrql = `${context.url}?op=${definition?.name?.value}`;

      return { ...operation.context, url: opNameUrql };
    },
  });
