import { FC, ImgHTMLAttributes } from 'react'
import { Text } from '@yandex/ui/Text/bundle'
import { component, css } from '@steely/react'

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

const Container = component('div', {
  styles: css`
    display: flex;
    align-items: center;
    user-select: none;
  `,
})

const Avatar = component<ImgHTMLAttributes<HTMLImageElement>>('img', {
  styles: css`
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin-left: 8px;
  `,
})
