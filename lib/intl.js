import { i18n } from '@lingui/core'
import { en, es } from 'make-plural/plurals'

export const locales = [
  { twoLettersCode: 'en', label: 'English' },
  { twoLettersCode: 'es', label: 'Español' }
]

i18n.loadLocaleData({
  en: { plurals: en },
  es: { plurals: es }
})

export async function loadCatalog(locale) {
  let data
  if (process.env.NODE_ENV === 'production') {
    data = await import(`../intl/locales/${locale}/texts`)
  } else {
    data = await import(`@lingui/loader!../intl/locales/${locale}/texts.po`)
  }
  return data.messages
}
