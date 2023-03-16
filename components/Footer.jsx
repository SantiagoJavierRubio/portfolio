/* eslint-disable tailwindcss/no-custom-classname */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LanguageIcon from '@mui/icons-material/Language'

const Footer = () => {
  const router = useRouter()
  const [locale, setLocale] = useState(router.locale || router.defaultLocale)
  const handleChangeLocale = e => {
    if (e.target.value !== locale) setLocale(e.target.value)
  }

  useEffect(() => {
    if (locale !== router.locale)
      router.push(router.pathname, router.pathname, { locale })
  }, [locale, router])
  return (
    <footer
      className="relative mt-8 max-w-full bg-gradient-to-t from-black/80 to-transparent p-8 pt-16"
      id="footer"
    >
      <div className="m-auto flex items-center justify-center gap-6 text-center text-2xl font-bold text-stone-400">
        <a
          href="https://github.com/SantiagoJavierRubio"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 transition-all hover:text-3xl hover:text-white"
        >
          <i className="devicon-github-original" />
        </a>
        <a
          href="https://www.linkedin.com/in/santiago-javier-rubio"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 transition-all hover:text-3xl hover:text-sky-600"
        >
          <i className="devicon-linkedin-plain" />
        </a>
      </div>
      <p className="text-center text-sm font-thin text-stone-200/70">
        &copy; Santiago Javier Rubio - 2022
      </p>
      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 text-cyan-600">
        <LanguageIcon />
        <div className="flex items-center justify-center gap-1">
          <label
            className={`${
              locale === 'en'
                ? 'text-cyan-600'
                : 'cursor-pointer text-stone-500'
            }  transition-all`}
          >
            English
            <input
              value="en"
              checked={locale === 'en'}
              type="radio"
              onChange={handleChangeLocale}
              className="hidden"
            />
          </label>
          {' | '}
          <label
            className={`${
              locale === 'es'
                ? 'text-cyan-600'
                : 'cursor-pointer text-stone-500'
            } transition-all`}
          >
            Español
            <input
              value="es"
              checked={locale === 'es'}
              type="radio"
              onChange={handleChangeLocale}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </footer>
  )
}

export default Footer
