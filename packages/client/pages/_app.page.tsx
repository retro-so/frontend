import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGate, useStore } from 'effector-react'

import { createSocketConnection } from '../libs/socket'
import { $isLoading, AppGate } from '../features/session'
import { GlobalStyles } from '../components/GlobalStyles'
import { LegoThemeProvider } from '../components/LegoThemeProvider'

createSocketConnection()

export default function MyApp({ Component, pageProps }: AppProps) {
  useGate(AppGate)

  const isLoading = useStore($isLoading)
  const router = useRouter()

  if (isLoading || !router.isReady) {
    return null
  }

  return (
    <>
      <Head>
        <title>Retroboard</title>
        <meta name="description" content="Retroboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <LegoThemeProvider>
        <Component {...pageProps} />
      </LegoThemeProvider>
    </>
  )
}
