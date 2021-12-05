import { FC } from 'react'
import styled from '@emotion/styled'

import { palette, dimensions } from '../../design-system'

interface ItemsGroupProps {
  title?: string
}

export const ItemsGroup: FC<ItemsGroupProps> = (props) => {
  const { title, children } = props

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  )
}

const Container = styled.div`
  &:not(:last-child) {
    margin-bottom: ${dimensions[200]};

    &::after {
      content: '';
      background-color: ${palette.blueGrey[200]};
      display: block;
      height: 1px;
      margin-top: ${dimensions[200]};
    }
  }
`

const Title = styled.div`
  color: ${palette.blueGrey[1000]};
  margin-top: ${dimensions[200]};
  margin-bottom: ${dimensions[100]};
  margin-left: ${dimensions[200]};
  user-select: none;
  font-family: var(--typography-font-family);
  font-size: 12px;
  line-height: 12px;
`
