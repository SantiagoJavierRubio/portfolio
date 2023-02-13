import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setView, pages } from '../../../redux/ducks/views'
import PortfolioCard from '../../PortfolioCard/PortfolioCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import './featured.css'


const Featured = () => {
    const [entries, setEntries] = useState([null, null, null])
    const getFeaturedEntries = async() => {
        const res = await axios.get('/api/featured')
        if(res.data) {
            setEntries(res.data)
        } else {
            setTimeout(getFeaturedEntries, 5000)
        }
    }
    useEffect(() => {
       getFeaturedEntries()
    }, [])

    const dispatch = useDispatch()
    const handleGoToPortfolio = () => {
        dispatch(setView(pages.PORTFOLIO))
    }

    return(
        <>
        <section id="featured">
            {entries && entries.map((entry, index) => {
                return <PortfolioCard entry={entry} key={entry?._id || index}/>
            })}
        </section>
        <div id="goToPortfolio">
            <button onClick={handleGoToPortfolio}>Check my portfolio <ChevronRightIcon /></button>      
        </div>
        </>
    )
}

export default Featured