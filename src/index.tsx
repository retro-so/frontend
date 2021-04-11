import { Suspense } from 'react'
import { Router } from 'react-router'
import { render } from 'react-dom'

import { Pages } from './pages'
import { GlobalStyles } from './GlobalStyles'
import reportWebVitals from './reportWebVitals'
import { history } from './libs/history'
import { readyToLoadSession } from './features/session'
import { LegoThemeProvider } from './components/LegoThemeProvider'
import { PageLoading } from './components/PageLoading'

readyToLoadSession().then(() => {
  render(
    <>
      <GlobalStyles />
      <LegoThemeProvider>
        <Router history={history}>
          <Suspense fallback={<PageLoading />}>
            <Pages />
          </Suspense>
        </Router>
      </LegoThemeProvider>
    </>,
    document.getElementById('root'),
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
