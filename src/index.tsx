import { Suspense } from 'react'
import { Router } from 'react-router'
import { render } from 'react-dom'
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'

import { Pages } from './pages'
import reportWebVitals from './reportWebVitals'
import { history } from './libs/history'
import './libs/firebase'
import './index.css'

configureRootTheme({ theme })

render(
  <Router history={history}>
    <Suspense fallback="Loading...">
      <Pages />
    </Suspense>
  </Router>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
