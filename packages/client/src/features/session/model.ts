import { ApolloClient } from '@apollo/client'

import { MeDocument, MeQuery, useMeQuery } from '../../api/graphql'

export async function loadSession(client: ApolloClient<{}>) {
  try {
    const result = await client.query<MeQuery>({ query: MeDocument })

    if (result.data.me) {
      return Promise.resolve()
    }
  } catch (_error) {}
}

export function useSessionUser() {
  const { data } = useMeQuery()

  return data!.me
}
