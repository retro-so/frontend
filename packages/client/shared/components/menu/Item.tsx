import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { palette, radius, dimensions } from '../../design-system'

interface ItemProps {
  color?: string
  icon?: ReactNode
  keybind?: string
  onAction: () => void
}

export const Item: FC<ItemProps> = (props) => {
  const { children, color, onAction, icon, keybind, ...p } = props

  return (
    <Container onClick={onAction} data-color={color}>
      {icon}
      {children}
      {keybind && <Keybind>{keybind}</Keybind>}
    </Container>
  )
}

const Container = styled.div`
  border-radius: ${radius[150]};
  padding: ${dimensions[200]};

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto 1fr auto;
  gap: ${dimensions[200]};

  cursor: pointer;
  user-select: none;
  color: ${palette.blueGrey[1600]};
  font-family: var(--typography-font-family);
  font-size: var(--text-control-size-m-font-size);
  line-height: var(--text-control-size-m-line-height);

  &:hover {
    background-color: ${palette.blueGrey[100]};
  }

  &:active {
    background-color: ${palette.blueGrey[200]};
  }

  .SvgIcon {
    color: ${palette.blueGrey[1500]};
  }

  &[data-color='red'],
  &[data-color='red'] .SvgIcon {
    color: ${palette.red[1000]};
  }
`

const Keybind = styled.span`
  color: ${palette.blueGrey[1200]};
`
