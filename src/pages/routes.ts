import { lazy } from 'react'
import { RouteConfig } from 'react-router-config'

import { paths } from './paths'

export const routes: RouteConfig[] = [
  {
    path: paths.login(),
    exact: true,
    component: lazy(() => import('./LoginPage')),
  },
  {
    path: paths.boards(),
    exact: true,
    component: lazy(() => import('./BoardsPage')),
  },
  {
    path: paths.board(),
    exact: true,
    component: lazy(() => import('./BoardPage')),
  },
  {
    path: '*',
    component: lazy(() => import('./NotFoundPage')),
  },
]
