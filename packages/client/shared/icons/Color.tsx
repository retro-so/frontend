import { FC } from 'react'
import styled from '@emotion/styled'

import { palette } from '../design-system'

interface ColorProps {
  tint: string
}

export const Color: FC<ColorProps> = (props) => {
  const { tint } = props

  return <Container data-tint={tint} />
}

const Container = styled.span`
  box-sizing: border-box;
  height: 16px;
  width: 16px;
  background-color: var(--icon-fill);
  border: 1px solid var(--icon-stroke);
  border-radius: 50%;

  &[data-tint='green'] {
    --icon-fill: ${palette.green[50]};
    --icon-stroke: ${palette.green[200]};
  }

  &[data-tint='yellow'] {
    --icon-fill: ${palette.yellow[50]};
    --icon-stroke: ${palette.yellow[200]};
  }

  &[data-tint='blue'] {
    --icon-fill: ${palette.blue[50]};
    --icon-stroke: ${palette.blue[200]};
  }

  &[data-tint='red'] {
    --icon-fill: ${palette.red[50]};
    --icon-stroke: ${palette.red[200]};
  }

  &[data-tint='gray'] {
    --icon-fill: ${palette.blueGrey[50]};
    --icon-stroke: ${palette.blueGrey[200]};
  }

  &[data-tint='mint'] {
    --icon-fill: ${palette.mint[50]};
    --icon-stroke: ${palette.mint[200]};
  }
`
