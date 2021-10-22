import type { NextPage } from 'next'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Text } from '@yandex/ui/Text/bundle'
import styled from '@emotion/styled'

import { Flex } from '../../components/Flex'
import { withAnon } from '../../features/session'
import background from './background.svg'

const LoginPage: NextPage = withAnon(() => {
  return (
    <Container>
      <Side>
        <Text typography="headline-l" weight="medium">
          Welcome to retroboard
        </Text>
        <Text typography="subheader-l" weight="medium">
          Login via
        </Text>
        <Flex gap="16px">
          <Button view="pseudo" size="l" type="link" url="http://localhost:3100/api/v1/auth/yandex">
            Yandex
          </Button>
          <Button view="pseudo" size="l" onClick={() => null}>
            Anonymous
          </Button>
        </Flex>
      </Side>
      <Side>
        <Placeholder />
      </Side>
    </Container>
  )
})

export default LoginPage

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Side = styled.div`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${background.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
