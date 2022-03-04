import { useSelector } from "react-redux"

const EntryDetails = () => {
    const entry = useSelector((state) => state.views.entry)
    return(
        <div id="entry-details">
        
        </div>
    )
}

export default EntryDetails