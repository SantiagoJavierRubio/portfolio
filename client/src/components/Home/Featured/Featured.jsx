import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PortfolioCard from '../../PortfolioCard/PortfolioCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import './featured.css'


const Featured = () => {
    const [entries, setEntries] = useState([])
    const getFeaturedEntries = async() => {
        const res = await axios.get('/api/featured')
        if(res.data) setEntries(res.data)
    }

    useEffect(() => {
       getFeaturedEntries()
    }, [])

    return(
        <>
        <section id="featured">
            {entries && entries.map(entry => {
                return <PortfolioCard entry={entry} key={entry._id}/>
            })}
        </section>
        <div id="goToPortfolio">
            <button>Check my portfolio <ChevronRightIcon /></button>      
        </div>
        </>
    )
}

export default Featured