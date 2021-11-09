import { FC, HTMLAttributes } from 'react'
import styled from '@emotion/styled'

type ItemProps = HTMLAttributes<HTMLDivElement> & {}

export const Item: FC<ItemProps> = (props) => {
  const { children, color, ...p } = props

  return <Container {...p} data-color={color}>{children}</Container>
}

const Container = styled.div`
  border-radius: 6px;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: var(--color-control-typo-primary);
  font-family: var(--typography-font-family);
  font-size: var(--text-control-size-m-font-size);
  line-height: var(--text-control-size-m-line-height);

  &:hover {
    background-color: #f1f2f5;
  }

  &:active {
    background-color: #eaecf0;
  }

  &[data-color='red'] {
    color: #f00;
  }

  .SvgIcon {
    margin-right: 8px;
  }
`
