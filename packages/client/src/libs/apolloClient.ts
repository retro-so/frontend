import { ApolloClient, InMemoryCache, split, from } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { HttpLink } from '@apollo/client/link/http'
import { WebSocketLink } from '@apollo/client/link/ws'

export function createApolloClient() {
  // TODO: Generate types for cache.
  const cache = new InMemoryCache({
    typePolicies: {
      List: {
        fields: {
          cards: {
            merge: false,
          },
        },
      },
      Board: {
        fields: {
          lists: {
            merge: false,
          },
        },
      },
    },
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const httpLink = new HttpLink({
    uri: 'http://localhost:3100/api/v1/graphql',
    credentials: 'include',
  })

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3100/api/v1/subscriptions',
    options: {
      reconnect: true,
    },
  })

  // Use ws link only for updates from server.
  const requestLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink,
  )

  const client = new ApolloClient({ link: from([errorLink, requestLink]), cache })

  return client
}
