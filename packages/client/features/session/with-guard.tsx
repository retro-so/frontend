import { ComponentType, FC, useEffect } from 'react'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'

import { paths } from '../../libs/paths'
import { $session, $isLoading } from './model'

type GuardType = 'auth' | 'anon'

export function withGuard<T>(type: GuardType) {
  return (WrappedComponent: ComponentType<T>) => {
    const WithAnon: FC<T> = (props) => {
      const router = useRouter()
      const session = useStore($session)
      const isLoading = useStore($isLoading)

      useEffect(() => {
        if (type === 'auth' && !session) {
          router.push(paths.login())
        } else if (type === 'anon' && session) {
          router.push(paths.boards())
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
