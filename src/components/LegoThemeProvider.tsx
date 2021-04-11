import { FC } from 'react'
import { cnTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'

export const LegoThemeProvider: FC = ({ children }) => {
  return <div className={cnTheme(theme)}>{children}</div>
}
