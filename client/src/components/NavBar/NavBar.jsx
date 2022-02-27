import { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'
import Menu from './Menu/Menu'
import './navbar.css'

const NavBar = () => {

    const [miniature, setMiniature] = useState(false)

    useEffect(() => {
        const checkScroll = () => {
            if(window.scrollY > 35 && !miniature) setMiniature(true)
            if(window.scrollY < 35 && miniature) setMiniature(false)
        }
        window.addEventListener('scroll', checkScroll)
        return () => window.removeEventListener('scroll', checkScroll)
    })
    return(
        <nav id="nav-bar" className={miniature ? 'miniNavBar' : 'fullNavBar'}>
            <div className="profile">
                <Avatar
                    src={"https://res.cloudinary.com/dju7kjewc/image/upload/v1645484667/me/IMG_3272_zstkua.png"}
                    alt="Santiago Javier Rubio"
                    id="profile-pic"
                />
                <h1>Santiago Javier Rubio</h1>
            </div>
            <div className="sections">
                {
                miniature ? <Menu /> 
                : 
                <>
                    <button className="sectionItem">Portfolio</button>
                    <button className="sectionItem">About</button>
                    <button className="sectionItem">Contact</button>
                </>
                }
            </div>
        </nav>
    )
}

export default NavBar