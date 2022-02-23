import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import WorkIcon from '@mui/icons-material/Work'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import './menu.css'

const optionStyle = {
    backgroundColor: 'rgb(122, 113, 173)',
    color: '#202624',
    '&:hover': {
        backgroundColor: 'rgb(173, 113, 164)'
    }
}

const Menu = () => {
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
            />
            <SpeedDialAction 
                icon={<InfoIcon />}
                tooltipTitle="About"
                tooltipOpen
                FabProps={{sx:optionStyle}}
            />
            <SpeedDialAction 
                icon={<ContactMailIcon />}
                tooltipTitle="Contact"
                tooltipOpen
                FabProps={{sx:optionStyle}}
            />
        </SpeedDial>
    )
}

export default Menu