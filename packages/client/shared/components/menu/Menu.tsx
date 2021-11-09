import { FC } from 'react'
import styled from '@emotion/styled'

type MenuProps = {}

// TODO: Rename to listbox.
// TODO: Add keyboard navigation.
export const Menu: FC<MenuProps> = (props) => {
  const { children } = props

  return <Container>{children}</Container>
}

const Container = styled.div`
  padding: 4px;
`
