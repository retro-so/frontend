import { FC, HTMLAttributes } from 'react'

export interface SvgIconProps extends HTMLAttributes<SVGElement> {
  size?: 12 | 16 | 24
}

export const SvgIcon: FC<SvgIconProps> = (props) => {
  const { children, size = 16, ...p } = props

  return (
    <svg className="SvgIcon" width={size} height={size} viewBox="0 0 16 16" {...p}>
      {children}
    </svg>
  )
}
