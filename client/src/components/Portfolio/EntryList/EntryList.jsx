import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import PortfolioCard from '../../PortfolioCard/PortfolioCard'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import SearchModal from './SearchModal/SearchModal'
import useWindowDimensions from '././../../../Hooks/useWindowDimensions'
import './entryList.css'

const EntryList = () => {

    // Data fetching
    const [entries, setEntries] = useState([null, null, null, null])
    const getEntries = async() => {
        const res = await axios.get('/api/entries')
        if(res.data) setEntries(res.data)
    }
    useEffect(() => {
        getEntries()   
    }, [])

    // Search and filter
    const [search, setSearch] = useState('')
    const [filteredEntries, setFilteredEntries] = useState([])

    const findMatch = (entry) => {
        const r = search.toLowerCase()
        return entry.name?.toLowerCase().includes(r) || 
        entry.summary?.toLowerCase().includes(r) || 
        entry.description?.toLowerCase().includes(r)
    }

    useMemo(() => {
        if(search && search.length > 0) {
            setFilteredEntries([...entries.filter(entry => findMatch(entry))])
        } else {
            setFilteredEntries(entries)
        }
    }, [search, setFilteredEntries, entries])

    // Custom components
    const CustomTextField = styled(TextField)({
        backgroundColor: 'whitesmoke',
        borderRadius: '25px',
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderRadius: '25px',
            },
        },
    })

    // Window dimensions handlers
    const [useModal, setUseModal] = useState(false)
    const { width } = useWindowDimensions()
    useEffect(() => {
        if(width < 768 && !useModal) setUseModal(true)
        else if(width >= 768 && useModal) setUseModal(false)
    }, [width])

    return(
        <div id="entry-list">
            <div className="aboutList">
                <h5>These are my web-dev projects:</h5>
                <div className="searchBar">
                    { useModal ? 
                        <SearchModal setSearch={setSearch} search={search}/>
                        :
                        <CustomTextField 
                            variant="outlined"
                            placeholder="Search..."
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>)
                            }}
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                            autoFocus
                        />
                    }
                </div>
            </div>
            {(search && useModal) && 
            <div id="search-params">
                <button onClick={() => setSearch('')} id="clear-search-btn">
                    {search} X
                </button>
            </div>
            }
            <div className="list">
                {entries && filteredEntries.map((entry, index) => {
                    return <PortfolioCard entry={entry} key={entry?._id || index} />
                })}
                {(!filteredEntries || filteredEntries.length === 0) && <h5 id="none-msg">No projects found</h5>}
            </div>
        </div>
    )
}

export default EntryList