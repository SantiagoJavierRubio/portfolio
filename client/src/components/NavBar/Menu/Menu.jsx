import { SpeedDial, SpeedDialAction } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import WorkIcon from '@mui/icons-material/Work'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { useDispatch } from 'react-redux'
import { setView, pages } from '../../../redux/ducks/views.js'
import './menu.css'

const optionStyle = {
    backgroundColor: 'rgb(122, 113, 173)',
    color: '#202624',
    '&:hover': {
        backgroundColor: 'rgb(173, 113, 164)'
    }
}

const Menu = () => {

    const dispatch = useDispatch()
    const handleScrollToContact = () => {
        return
    }
    const handleNavigation = (direction) => {
        if(direction === 'contact'){
            dispatch(setView(pages.HOME))
            return handleScrollToContact()
        }
        dispatch(setView(direction))
    }
    return(
        <SpeedDial
            ariaLabel='Menu'
            icon={<MenuIcon />}
            direction="down"
            FabProps={
                {sx: {  
                        boxShadow: 'none',
                        bgcolor: 'transparent',
                        color: 'inherit',
                        '&:hover': {
                            bgcolor: 'rgb(113, 164, 173)',
                            color: '#fff'
                        }
                }}
            }
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