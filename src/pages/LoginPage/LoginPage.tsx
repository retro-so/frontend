import { FC } from 'react'
import { useGate } from 'effector-react'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Text } from '@yandex/ui/Text/bundle'

import { Flex } from '../../components/Flex'
import { LoginGate, login } from './model'

export const LoginPage: FC = () => {
  useGate(LoginGate)

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" gap="32px" height="100vh">
      <Text typography="headline-l" weight="medium">
        Welcome to retroboard
      </Text>
      <Text typography="subheader-l" weight="medium">
        Login via
      </Text>
      <Flex gap="16px">
        <Button view="default" size="m" onClick={() => login('google')}>
          Google
        </Button>
        <Button view="pseudo" size="m" onClick={() => login('anonymous')}>
          Anonymous
        </Button>
      </Flex>
    </Flex>
  )
}
