import { FC } from 'react'
import { renderRoutes } from 'react-router-config'

import { routes } from './routes'

export const Pages: FC = () => renderRoutes(routes)
