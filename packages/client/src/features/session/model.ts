import { MeDocument, MeQuery } from '../../api/graphql'
import { client } from '../../libs/apollo'

export async function loadSession() {
  try {
    const result = await client.query<MeQuery>({ query: MeDocument })

    if (result.data.me) {
      return Promise.resolve()
    }
  } catch (_error) {}
}
