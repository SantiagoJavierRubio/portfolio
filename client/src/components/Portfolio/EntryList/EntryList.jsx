import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import PortfolioCard from '../../PortfolioCard/PortfolioCard'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import './entryList.css'

const EntryList = () => {

    // Data fetching
    const [entries, setEntries] = useState([])
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

    const CustomTextField = styled(TextField)({
        backgroundColor: 'whitesmoke',
        borderRadius: '25px',
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderRadius: '25px',
            },
        },
    })

    return(
        <div id="entry-list">
            <div className="aboutList">
                <h5>These are my web-dev projects:</h5>
                <div className="searchBar">
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
                </div>
            </div>
            <div className="list">
                {entries && filteredEntries.map(entry => {
                    return <PortfolioCard entry={entry} key={entry._id}/>
                })}
            </div>
        </div>
    )
}

export default EntryList