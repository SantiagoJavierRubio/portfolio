import { useSelector } from 'react-redux'
import EntryList from './EntryList/EntryList'
import EntryDetails from './EntryDetails/EntryDetails'
import './portfolio.css'


const Portfolio = () => {

    const focusedEntry = useSelector((state) => state.views.entry)
    return(
        <div id="portfolio">
            { focusedEntry ? <EntryDetails /> : <EntryList /> }
        </div>
    )
}


export default Portfolio