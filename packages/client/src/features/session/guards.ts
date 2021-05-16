import { useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import { MeDocument } from '../../api/graphql'
import { history } from '../../libs/history'
import { paths } from '../../pages/paths'

/**
 * Checks profile data and if not exists redirect to login page.
 */
export function useAuthGuard() {
  const client = useApolloClient()
  const data = client.readQuery({ query: MeDocument })

  useEffect(() => {
    if (!data) {
      history.push(paths.login())
    }
  }, [data])
}

export function useAnonymousGuard() {
  const client = useApolloClient()
  const data = client.readQuery({ query: MeDocument })

  useEffect(() => {
    if (data) {
      history.push(paths.boards())
    }
  }, [data])
}
