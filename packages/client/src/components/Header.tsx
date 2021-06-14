import { FC } from 'react'
import styled from '@emotion/styled'

import { User } from './User'

export const Header: FC = () => {
  return (
    <Container>
      <Logo>RetroBoard</Logo>
      <User />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  height: 48px;
  padding: 0 16px;
  justify-content: space-between;
`

const Logo = styled.div`
  font-family: var(--text-headline-size-m-font-family);
  font-size: var(--text-headline-size-m-font-size);
  line-height: var(--text-headline-size-m-line-height);
  letter-spacing: var(--text-headline-size-m-letter-spacing);
  user-select: none;
`
