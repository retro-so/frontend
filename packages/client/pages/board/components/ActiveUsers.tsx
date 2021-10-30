import { FC, ImgHTMLAttributes } from 'react'
import { component, css } from '@steely/react'
import { Text } from '@yandex/ui/Text/bundle'

interface ActiveUsersProps {
  users: any[]
}

const defaultUsers = Array(8).fill({
  avatarUrl:
    'https://avatars.yandex.net/get-yapic/57243/enc-d7e5d480b8800b2dc9889176ed010a99e86ba15d4afcaff44c5cb8f117114a09/islands-200',
})

const SHOW_MAX_USERS = 6

// TODO: Add tooltips with display names.
export const ActiveUsers: FC<ActiveUsersProps> = (props) => {
  const { users } = props
  const totalUsers = defaultUsers.length
  const shouldShowPlaceholder = totalUsers > SHOW_MAX_USERS

  return (
    <Container>
      {defaultUsers.slice(0, SHOW_MAX_USERS).map((user, index) => (
        <Avatar key={index} src={user.avatarUrl} />
      ))}
      {shouldShowPlaceholder && <MoreText>+{totalUsers - SHOW_MAX_USERS}</MoreText>}
    </Container>
  )
}

const Container = component('div', {
  styles: css`
    display: flex;
    align-items: center;
  `,
})

const Avatar = component<ImgHTMLAttributes<HTMLImageElement>>('img', {
  styles: css`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #f1f2f5;
    background-color: #fff;
    box-sizing: border-box;
    user-select: none;

    & + & {
      margin-left: -10px;
    }
  `,
})

const MoreText = component(Text, {
  defaultProps: {
    typography: 'body-long-l',
  },
  styles: css`
    margin-left: 6px;
  `,
})
