import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { fork } from './fork'

const cache = new InMemoryCache()

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
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

export const client = new ApolloClient({ link, cache })

export const ApolloProvider = fork(Provider, { client })
