// import './styles/globals.css'
import '../styles/globals.css'
import '../styles/custom.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return(
  <>
  <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <meta name="theme-color" content="#440099" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#440099" />
      </Head>
    <Component {...pageProps} />
  </>
  )
}
