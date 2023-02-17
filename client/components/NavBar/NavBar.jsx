import { Avatar } from '@mui/material'
import useWindowScroll from '../../hooks/useWindowScroll'
import Menu from './Menu/Menu'
import Link from 'next/link'

const NavBar = () => {
  const scroll = useWindowScroll()

  // const { width } = useWindowDimensions()
  // useEffect(() => {
  //   if (width < 768 && !miniature) setMiniature(true)
  // }, [width])

  // useEffect(() => {
  //   const checkScroll = () => {
  //     if (width < 768) return
  //     if (window.scrollY > 35 && !miniature) setMiniature(true)
  //     if (window.scrollY < 35 && miniature) setMiniature(false)
  //   }
  //   window.addEventListener('scroll', checkScroll)
  //   return () => window.removeEventListener('scroll', checkScroll)
  // })

  return (
    <nav
      id="nav-bar"
      className="fixed top-0 z-50 flex h-16 w-full flex-row flex-nowrap items-center justify-between text-cyan-200 transition-all"
      // className={
      //   'fixed flex flex-row flex-nowrap justify-between items-center text-cyan-200 transition-all' +
      //   miniature
      //     ? 'miniNavBar'
      //     : 'fullNavBar'
      // }
    >
      <Link
        className={` flex ${
          scroll > 35 ? 'ml-1 -mt-2 opacity-60' : 'ml-4 opacity-100'
        } h-8 items-center justify-center gap-4 transition-all`}
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
      <Menu forceShow={scroll > 35} />
      <div
        className={`flex scale-0 opacity-0 sm:mr-4 ${
          scroll < 35 && 'sm:scale-100 sm:opacity-100'
        } origin-right transition-all sm:gap-4`}
      >
        <Link
          className="hover:underline active:text-stone-200"
          href="/portfolio"
        >
          Portfolio
        </Link>
        <Link className="hover:underline active:text-stone-200" href="/about">
          About
        </Link>
        <Link
          className="hover:underline active:text-stone-200"
          href="/#contact"
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
