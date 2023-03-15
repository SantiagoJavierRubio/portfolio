import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { SessionProvider } from 'next-auth/react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useRouter } from 'next/router'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const { locale, defaultLocale } = useRouter()
  const currLocale = locale || defaultLocale
  i18n._messages[currLocale] = pageProps.i18n
  i18n._locale = currLocale
  return (
    <SessionProvider session={session}>
      <I18nProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nProvider>
    </SessionProvider>
  )
}
