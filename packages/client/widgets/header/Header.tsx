import { FC } from 'react'
import { component, css } from '@steely/react'

import { User } from '../../entities/user'
import { Logo } from '../../shared/components'

export const Header: FC = () => {
  return (
    <Container>
      <Logo />
      <User />
    </Container>
  )
}

const Container = component('div', {
  styles: css`
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    height: 58px;
    padding: 0 24px;
    justify-content: space-between;
    box-shadow: 0px 0px 4px #dfe3eb;
  `,
})
