import { useState, useEffect } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import WorkIcon from '@mui/icons-material/Work'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import useWindowDimensions from '../../../Hooks/useWindowDimensions'

// TODO: refactor to avoid MUI

const optionStyle = {
  className: 'bg-cyan-300 text-stone-200 hover:bg-cyan-500'
  // backgroundColor: 'rgb(122, 113, 173)',
  // color: '#202624',
  // '&:hover': {
  //   backgroundColor: 'rgb(173, 113, 164)'
  // }
}

const Menu = () => {
  const [open, setOpen] = useState(false)

  const { width } = useWindowDimensions()
  const [minimal, setMinimal] = useState(false)
  useEffect(() => {
    if (width < 768 && !minimal) setMinimal(true)
    else if (width >= 768 && minimal) setMinimal(false)
  }, [width])

  return (
    <SpeedDial
      ariaLabel="Menu"
      icon={<MenuIcon />}
      direction="down"
      FabProps={{
        className:
          'mt-2 w-10 h-10 bg-transparent hover:bg-cyan-200 hover:text-black'
        // sx: {
        //   width: minimal ? '3rem' : '3.9rem',
        //   height: minimal ? '3rem' : '3.9rem',
        //   boxShadow: 'none',
        //   bgcolor: 'transparent',
        //   color: 'inherit',
        //   '&:hover': {
        //     bgcolor: 'rgb(113, 164, 173)',
        //     color: '#fff'
        //   }
        // }
      }}
      className="absolute top-0 right-2 z-50"
      // style={{ position: 'absolute', top: 0, right: '.5rem', zIndex: '10000' }}
      open={open}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <SpeedDialAction
        className="bg-cyan-300 text-black hover:bg-cyan-500"
        icon={<WorkIcon />}
        tooltipTitle="Portfolio"
        tooltipOpen
        FabProps={{ sx: optionStyle }}
        onClick={() => null}
      />
      <SpeedDialAction
        icon={<InfoIcon />}
        tooltipTitle="About"
        tooltipOpen
        FabProps={{ sx: optionStyle }}
        onClick={() => null}
      />
      <SpeedDialAction
        icon={<ContactMailIcon />}
        tooltipTitle="Contact"
        tooltipOpen
        FabProps={{ sx: optionStyle }}
        onClick={() => null}
      />
    </SpeedDial>
  )
}

export default Menu
