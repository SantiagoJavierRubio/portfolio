import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'
import { Card, CardActions, CardContent } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { styled } from '@mui/material/styles'
import { getIcon } from './Icons'
import './entry_details.css'

const CustomCard = styled(Card)({
    backgroundColor: 'rgb(145, 185, 192)',
    width:'95%',
    margin: 'auto',
})

const EntryDetails = () => {
    const entryId = useSelector((state) => state.views.entry)
    const [entry, setEntry] = useState(null)
    const [hasLiked, setLiked] = useState(false)

    const getEntry = async () => {
        const res = await axios.get(`/api/entries/${entryId}`)
        if(res.data) {
            setEntry({ ...res.data.entry, date: new Date(res.data.entry.date) })
            setLiked(res.data.hasLiked)
        } else {
            setTimeout(getEntry, 5000)
        }
    }
    const setVisited = () => {
        axios.put(`/api/visit/${entryId}`)
            .then(res => {
                if(res.status === 200) {
                    return
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getEntry()
        setVisited()
    }, [entryId])

    const handleLike = async () => {
        if(hasLiked) return
        const res = await axios.put(`/api/like/${entryId}`)
        if(res.status === 200) {
            setLiked(true)
        } else {
            console.log(res)
        }
    }

    return(
        <div id="portfolio-item-details">
            {entry && 
            (<>
                <div className='basicInfo'>
                    <h1>{entry.name}</h1>
                    <p id="portfolio-item-date">{entry.date.toLocaleDateString()}</p>
                    <p id="portfolio-item-description">{entry.description}</p>
                    <p id="resources-title">Resources: </p>
                    <div id="resource-list">
                        {entry.langs.map(lang => {
                            return(
                                <div key={lang} className="resource">
                                        {getIcon(lang)}
                                        <span className="resource-name">{lang}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <CustomCard>
                    <CardActions id="card-actions">
                        <button onClick={handleLike} id="like-btn">{hasLiked ? <FavoriteIcon sx={{fontSize: '2rem'}}/> : <FavoriteBorderIcon sx={{fontSize: '2rem'}}/>}</button>
                        <div id="actions-buttons">
                            <a href={entry.siteUrl} id="webpage-btn" target="_blank" rel="author">Webpage</a>
                            <a href={entry.gitUrl} id="git-btn" target="_blank" rel="noreferrer">Code</a>
                        </div>
                    </CardActions>
                    <CardContent>
                        <iframe src={entry.siteUrl} title={entry.name}></iframe>
                    </CardContent>
                </CustomCard>
            </>)
            }

        </div>
    )
}

export default EntryDetails