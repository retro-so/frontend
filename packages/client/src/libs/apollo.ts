import { ApolloProvider as Provider, ApolloClient, InMemoryCache } from '@apollo/client'

import { fork } from './fork'

const cache = new InMemoryCache()
export const client = new ApolloClient({
  cache,
  uri: 'http://localhost:3100/api/v1/graphql',
  credentials: 'include',
})

export const ApolloProvider = fork(Provider, { client })
