import { FC } from 'react'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Text } from '@yandex/ui/Text/bundle'

import { Flex } from '../../components/Flex'
import { useAnonymousGuard } from '../../features/session'

export const LoginPage: FC = () => {
  useAnonymousGuard()

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" gap="32px" height="100vh">
      <Text typography="headline-l" weight="medium">
        Welcome to retroboard
      </Text>
      <Text typography="subheader-l" weight="medium">
        Login via
      </Text>
      <Flex gap="16px">
        <Button view="action" size="m" type="link" url="http://localhost:3100/api/v1/auth/yandex">
          Yandex
        </Button>
        <Button disabled view="pseudo" size="m" onClick={() => null}>
          Anonymous
        </Button>
      </Flex>
    </Flex>
  )
}
