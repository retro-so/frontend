import { FC } from 'react'
import styled from '@emotion/styled'
import { Text } from '@yandex/ui/Text/bundle'

import { useUser } from '../features/session'

export const User: FC = () => {
  const { avatarUrl, displayName } = useUser()

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
  height: 32px;
  width: 32px;
  margin-left: 8px;
`
