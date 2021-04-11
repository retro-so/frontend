import { FC } from 'react'
import { Global, css } from '@emotion/react'

export const GlobalStyles: FC = () => (
  <Global
    styles={css`
      body {
        padding: 0;
        margin: 0;
        background-color: #fff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `}
  />
)
