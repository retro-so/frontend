import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '../components/svg-icon'

export const Heart: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      d="M8.38992 15.2461C8.15118 15.4067 7.84882 15.4067 7.61008 15.2461C6.00595 14.1671 0 9.85498 0 5.78197C0 0.437971 6.28 -0.41803 8 3.18197C9.72 -0.41803 16 0.437971 16 5.78197C16 9.85498 9.99405 14.1671 8.38992 15.2461Z"
      fill="currentColor"
    />
  </SvgIcon>
)
