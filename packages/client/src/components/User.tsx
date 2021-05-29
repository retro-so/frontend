import { FC } from 'react'
import styled from '@emotion/styled'
import { Text } from '@yandex/ui/Text/bundle'

import { useSessionUser } from '../features/session'

export const User: FC = () => {
  const { avatarUrl, displayName } = useSessionUser()

  return (
    <Container>
      <Text typography="control-m">{displayName}</Text>
      <Avatar src={avatarUrl} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`
const Avatar = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-left: 8px;
`
