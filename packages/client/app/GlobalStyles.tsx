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

      /* Lego patch start. */
      .Button2[class]::before {
        border-radius: 8px;
      }

      .Button2-Text {
        /* FIXME: Apply without important. */
        display: flex !important;
        align-items: center;
        justify-content: center;
      }

      .Popup2[class] {
        border-radius: 8px;
        box-shadow: 0px 0px 0px 1px rgba(0, 44, 94, 0.1), 0px 10px 20px -4px rgba(0, 44, 94, 0.15);
      }

      .Popup2[class]::before {
        box-shadow: none;
      }
      /* Lego patch end. */

      .firebase-emulator-warning {
        display: none;
      }
    `}
  />
)
