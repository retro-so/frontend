import { MeDocument, MeQuery, useMeQuery } from '../../api/graphql'
import { client } from '../../libs/apollo'

export async function loadSession() {
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
