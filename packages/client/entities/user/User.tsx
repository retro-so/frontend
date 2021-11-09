import { FC } from 'react'
import { Text } from '@yandex/ui/Text/bundle'
import { component, css } from '@steely/react'

import { useUser } from '../../features/session'
import { UserAvatar } from '../../shared/components'

export const User: FC = () => {
  const { avatarUrl, displayName } = useUser()

  return (
    <Container>
      <Text typography="control-m">{displayName}</Text>
      <UserAvatar size="m" src={avatarUrl} />
    </Container>
  )
}

const Container = component('div', {
  styles: css`
    display: flex;
    align-items: center;
    user-select: none;
    gap: 8px;
  `,
})
