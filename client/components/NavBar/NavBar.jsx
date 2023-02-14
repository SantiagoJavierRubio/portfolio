import { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import Menu from './Menu/Menu'

const NavBar = () => {
  const [miniature, setMiniature] = useState(false)

  const { width } = useWindowDimensions()
  useEffect(() => {
    if (width < 768 && !miniature) setMiniature(true)
  }, [width])

  useEffect(() => {
    const checkScroll = () => {
      if (width < 768) return
      if (window.scrollY > 35 && !miniature) setMiniature(true)
      if (window.scrollY < 35 && miniature) setMiniature(false)
    }
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  })

  return (
    <nav
      id="nav-bar"
      className="fixed top-0 flex h-16 w-full flex-row flex-nowrap items-center justify-between text-cyan-200 transition-all"
      // className={
      //   'fixed flex flex-row flex-nowrap justify-between items-center text-cyan-200 transition-all' +
      //   miniature
      //     ? 'miniNavBar'
      //     : 'fullNavBar'
      // }
    >
      <div className="ml-4 flex h-8 items-center justify-center gap-4">
        <Avatar
          src={
            'https://res.cloudinary.com/dju7kjewc/image/upload/v1645484667/me/IMG_3272_zstkua.png'
          }
          alt="Santiago Javier Rubio"
          id="profile-pic"
          onClick={() => null}
        />
        <h1>Santiago Javier Rubio</h1>
      </div>
      <div className="sections">
        {miniature ? (
          <Menu />
        ) : (
          <>
            <button className="sectionItem" onClick={() => null}>
              Portfolio
            </button>
            <button className="sectionItem" onClick={() => null}>
              About
            </button>
            <button className="sectionItem" onClick={() => null}>
              Contact
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
