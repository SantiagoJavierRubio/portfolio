import { useState, useEffect } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import WorkIcon from '@mui/icons-material/Work'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { useDispatch } from 'react-redux'
import { setView, pages } from '../../../redux/ducks/views.js'
import useWindowDimensions from '../../../Hooks/useWindowDimensions'
import './menu.css'

const optionStyle = {
    backgroundColor: 'rgb(122, 113, 173)',
    color: '#202624',
    '&:hover': {
        backgroundColor: 'rgb(173, 113, 164)'
    }
}

const Menu = ({ scrollToContact }) => {

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const handleNavigation = (direction) => {
        setOpen(false)
        if(direction === 'contact'){
            dispatch(setView(pages.HOME))
            return scrollToContact()
        }
        dispatch(setView(direction))
    }

    const { width } = useWindowDimensions()
    const [minimal, setMinimal] = useState(false)
    useEffect(() => {
        if(width < 768 && !minimal) setMinimal(true)
        else if(width >= 768 && minimal) setMinimal(false)
    }, [width])

    return(
        <SpeedDial
            ariaLabel='Menu'
            icon={<MenuIcon />}
            direction="down"
            FabProps={
                {sx: {  
                        width: minimal ? '3rem' : '3.9rem',
                        height: minimal ? '3rem' : '3.9rem',
                        boxShadow: 'none',
                        bgcolor: 'transparent',
                        color: 'inherit',
                        '&:hover': {
                            bgcolor: 'rgb(113, 164, 173)',
                            color: '#fff'
                        }
                }}
            }
            style={{position: 'absolute', top: 0, right: '.5rem', zIndex: '10000'}}
            open={open}
            onClose={() => setOpen(false)} 
            onClick={() => setOpen(!open)}
        >
            <SpeedDialAction 
                icon={<WorkIcon />}
                tooltipTitle="Portfolio"
                tooltipOpen
                FabProps={{sx:optionStyle}}
                onClick={() => handleNavigation(pages.PORTFOLIO)}
            />
            <SpeedDialAction 
                icon={<InfoIcon />}
                tooltipTitle="About"
                tooltipOpen
                FabProps={{sx:optionStyle}}
                onClick={() => handleNavigation(pages.ABOUT)}
            />
            <SpeedDialAction 
                icon={<ContactMailIcon />}
                tooltipTitle="Contact"
                tooltipOpen
                FabProps={{sx:optionStyle}}
                onClick={() => handleNavigation('contact')}
            />
        </SpeedDial>
    )
}

export default Menu