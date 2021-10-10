import { ComponentType, FC, useEffect } from 'react'
import { useStore } from 'effector-react'

import { history } from '../../libs/history'
import { paths } from '../../pages/paths'
import { $session, $isLoading } from './model'

type GuardType = 'auth' | 'anon'

export function withGuard<T>(type: GuardType) {
  return (WrappedComponent: ComponentType<T>) => {
    const WithAnon: FC<T> = (props) => {
      const session = useStore($session)
      const isLoading = useStore($isLoading)

      useEffect(() => {
        if (type === 'auth' && !session) {
          history.push(paths.login())
        } else if (type === 'anon' && session) {
          history.push(paths.boards())
        }
      }, [session])

      if (isLoading || (type === 'auth' && !session)) {
        return null
      }

      return <WrappedComponent {...props} />
    }

    return WithAnon
  }
}

export const withAuth = withGuard('auth')
export const withAnon = withGuard('anon')
