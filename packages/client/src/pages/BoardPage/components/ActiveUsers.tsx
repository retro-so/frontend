import { FC } from 'react'
import styled from '@emotion/styled'

interface ActiveUsersProps {
  users: any[]
}

// TODO: Print placeholder when more than 6 users.
export const ActiveUsers: FC<ActiveUsersProps> = (props) => {
  const { users } = props

  return (
    <Container>
      {users.map((user) => (
        <Avatar key={user.id} src={user.avatarUrl} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #fff;
  background-color: #fff;
  box-sizing: border-box;
  user-select: none;

  & + & {
    margin-left: -10px;
  }
`
