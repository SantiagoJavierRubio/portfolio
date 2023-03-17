import { Avatar } from '@mui/material'
import { useSession } from 'next-auth/react'
import useWindowScroll from '../../hooks/useWindowScroll'
import Menu from './Menu'
import Link from 'next/link'
import { Trans } from '@lingui/macro'
import { loadCatalog } from '../../lib/intl'

const NavBar = () => {
  const scroll = useWindowScroll()
  const { data: session, status } = useSession()

  return (
    <nav
      id="nav-bar"
      className="fixed top-0 z-50 h-16 w-full bg-transparent text-teal-400 transition-all"
    >
      <div className="relative m-auto flex h-full w-full max-w-7xl flex-row flex-nowrap items-center justify-between">
        <Link
          className={` flex ${
            scroll > 35
              ? 'ml-1 -mt-1 scale-90 opacity-60'
              : 'ml-4 scale-100 opacity-100'
          } h-8 items-center justify-center gap-4 transition-all duration-700 hover:opacity-100`}
          href="/"
        >
          <Avatar
            src={
              'https://res.cloudinary.com/dju7kjewc/image/upload/v1645484667/me/IMG_3272_zstkua.png'
            }
            alt="Santiago Javier Rubio"
            id="profile-pic"
          />
          <h1
            className={`${
              scroll > 35 ? 'scale-0' : 'scale-100'
            } origin-left transition-all`}
          >
            Santiago Javier Rubio
          </h1>
        </Link>
        {session && status !== 'unauthenticated' && (
          <Link
            className={`mb-4 cursor-pointer text-lg font-bold text-stone-200 ${
              scroll > 35 ? 'hidden' : 'inline'
            }`}
            href="/api/auth/signout"
          >
            Log out
          </Link>
        )}
        <Menu forceShow={scroll > 35} />
        <div
          className={`flex -translate-y-2 scale-0 opacity-0 sm:mr-4 ${
            scroll < 35 && 'sm:translate-y-0 sm:scale-100 sm:opacity-100'
          } origin-right transition-all duration-700 sm:gap-4`}
        >
          <Link
            className="decoration-inherit/10 -translate-y-px decoration-4 underline-offset-4 transition-all hover:translate-y-0 hover:underline hover:decoration-inherit hover:decoration-auto hover:underline-offset-2 active:text-stone-200"
            href="/portfolio"
          >
            Portfolio
          </Link>
          <Link
            className="decoration-inherit/10 -translate-y-px decoration-4 underline-offset-4 transition-all hover:translate-y-0 hover:underline hover:decoration-inherit hover:decoration-auto hover:underline-offset-2 active:text-stone-200"
            href="/about"
          >
            <Trans>About</Trans>
          </Link>
          <Link
            className="decoration-inherit/10 -translate-y-px decoration-4 underline-offset-4 transition-all hover:translate-y-0 hover:underline hover:decoration-inherit hover:decoration-auto hover:underline-offset-2 active:text-stone-200"
            href="/#contact"
          >
            <Trans>Contact</Trans>
          </Link>
          {session && status !== 'unauthenticated' && (
            <Link
              className="decoration-inherit/10 -translate-y-px decoration-4 underline-offset-4 transition-all hover:translate-y-0 hover:underline hover:decoration-inherit hover:decoration-auto hover:underline-offset-2 active:text-stone-200"
              href="/admin"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar

export async function getStaticProps(ctx) {
  return {
    props: {
      i18n: await loadCatalog(ctx.locale)
    }
  }
}
