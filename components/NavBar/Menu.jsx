import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import WorkIcon from '@mui/icons-material/Work'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { Trans } from '@lingui/macro'

const Menu = ({ forceShow = false }) => {
  const [isOpen, setOpen] = useState(false)
  const elRef = useRef()

  const handleOpen = () => {
    setOpen(prev => !prev)
  }
  const handleClick = () => {
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = e => {
      if (elRef.current && !elRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)

    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [elRef])

  return (
    <div
      className={`absolute right-2 top-2 z-50 flex scale-100 flex-col opacity-100 ${
        !forceShow && 'sm:scale-0 sm:opacity-0'
      } transition-all duration-700`}
      ref={elRef}
    >
      <div>
        <button
          type="button"
          className="mr-2 aspect-square w-10 rounded-full bg-transparent hover:bg-teal-300 hover:text-black active:bg-teal-300/50"
          onClick={handleOpen}
        >
          <MenuIcon />
        </button>
      </div>
      <div
        className={`${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } absolute top-full right-4 origin-top-right overflow-hidden rounded-xl bg-black/50 p-4 text-lg font-bold backdrop-blur-sm transition-all duration-75`}
      >
        <Link
          href="/portfolio"
          className="my-2 flex cursor-pointer items-center justify-between gap-2"
          onClick={handleClick}
        >
          <p>Portfolio</p>
          <button
            type="button"
            className="aspect-square rounded-full bg-stone-600 p-2 hover:bg-violet-600/50"
          >
            <WorkIcon />
          </button>
        </Link>
        <Link
          href="/about"
          className="my-2 flex cursor-pointer items-center justify-between gap-2"
          onClick={handleClick}
        >
          <p>
            <Trans>About</Trans>
          </p>
          <button
            type="button"
            className="aspect-square rounded-full bg-stone-600 p-2 hover:bg-violet-600/50"
          >
            <InfoIcon />
          </button>
        </Link>
        <Link
          href="/#contact"
          className="my-2 flex cursor-pointer items-center justify-between gap-2"
          onClick={handleClick}
        >
          <p>
            <Trans>Contact</Trans>
          </p>
          <button
            type="button"
            className="aspect-square rounded-full bg-stone-600 p-2 hover:bg-violet-600/50"
          >
            <ContactMailIcon />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Menu
