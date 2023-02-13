import { useState } from 'react'
import { Modal } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import "./search_modal.css"

const SearchModal = ({ setSearch, search }) => {

    const [open, setOpen] = useState(false)

    const handleInput = e => {
        e.preventDefault()
        setSearch(e.target.search.value)
        e.target.reset()
        setOpen(false)
    }
    return(
        <>
        <button onClick={() => setOpen(true)} id="open-modal-btn">
            <SearchIcon />
        </button>
        <Modal open={open} onClose={() => setOpen(false)} id="search-modal">
            <form onSubmit={handleInput}>
                <input type="text" name="search" id="search" defaultValue={search} />
                <button type="submit">Search</button>
            </form>
        </Modal>
        </>
    )
}

export default SearchModal