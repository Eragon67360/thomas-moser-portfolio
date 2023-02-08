import { handleSmoothScroll } from 'next/dist/shared/lib/router/router'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='scroll-smooth'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
