import { useState, useEffect } from 'react'
import PortfolioCard from '../../PortfolioCard/PortfolioCard'

const EntryList = () => {
    return(
        <div id="entry-list">
            <div className="aboutList">
                <h5>These are my web-dev projects:</h5>
                <p>Filter or description...</p>
            </div>
            <div className="list">

            </div>
        </div>
    )
}

export default EntryList