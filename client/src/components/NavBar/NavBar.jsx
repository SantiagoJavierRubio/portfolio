import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setView, pages } from '../../redux/ducks/views.js'
import { Avatar } from '@mui/material'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import Menu from './Menu/Menu'
import './navbar.css'

const NavBar = ({ scrollToContact }) => {

    const [miniature, setMiniature] = useState(false)
    const dispatch = useDispatch()

    const { width } = useWindowDimensions()
    useEffect(() => {
        if(width < 768 && !miniature) setMiniature(true)
    }, [width])

    useEffect(() => {
        const checkScroll = () => {
            if(width < 768) return
            if(window.scrollY > 35 && !miniature) setMiniature(true)
            if(window.scrollY < 35 && miniature) setMiniature(false)
        }
        window.addEventListener('scroll', checkScroll)
        return () => window.removeEventListener('scroll', checkScroll)
    })


    const handleNavigation = (direction) => {
        if(direction === 'contact'){
            dispatch(setView(pages.HOME))
            return scrollToContact()
        }
        dispatch(setView(direction))
        if(direction === pages.HOME){
            window.scroll({top: 0, left: 0, behavior: 'smooth'})
        }
    }

    return(
        <nav id="nav-bar" className={miniature ? 'miniNavBar' : 'fullNavBar'}>
            <div className="profile">
                <Avatar
                    src={"https://res.cloudinary.com/dju7kjewc/image/upload/v1645484667/me/IMG_3272_zstkua.png"}
                    alt="Santiago Javier Rubio"
                    id="profile-pic"
                    onClick={() => handleNavigation(pages.HOME)}
                />
                <h1>Santiago Javier Rubio</h1>
            </div>
            <div className="sections">
                {
                miniature ? <Menu scrollToContact={scrollToContact}/> 
                : 
                <>
                    <button className="sectionItem" onClick={() => handleNavigation(pages.PORTFOLIO)}>
                        Portfolio
                    </button>
                    <button className="sectionItem" onClick={() => handleNavigation(pages.ABOUT)}>
                        About
                    </button>
                    <button className="sectionItem" onClick={() => handleNavigation('contact')}>
                        Contact
                    </button>
                </>
                }
            </div>
        </nav>
    )
}

export default NavBar