import { Card, CardContent, CardMedia, CardActionArea, Skeleton } from '@mui/material'
import { setView, pages } from '../../redux/ducks/views'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './portfolio_card.css'

const PortfolioCard = ({entry}) => {

    const [loaded, setLoaded] = useState(false)

    const dispatch = useDispatch()
    const handleGoToEntry = () => {
        dispatch(setView(pages.PORTFOLIO, entry._id))
    }

    useEffect(() => {
        if(!entry) return
        const img = new Image()
        img.src = entry.thumbnail
        img.loading = 'lazy'
        img.onload = () => setLoaded(img)
    }, [entry])

    return(
        <>
        {!loaded? <Skeleton variant="rect" className="cardSkeleton" animation="wave" width="100%" height="500px" /> 
        :
        <Card className="entryCard" style={{ backgroundColor: 'rgba(9, 10, 10, 0.80)'}}>
            <CardActionArea style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} onClick={handleGoToEntry}>
                <h3 className="cardTitle">{entry.name}</h3>
                <CardMedia 
                        component="img"
                        image={entry.thumbnail}
                        alt={`Screenshot for ${entry.name}`}
                        loading="lazy"
                />
                <CardContent>
                    <p className="cardDescription">{entry.summary}</p>
                </CardContent>
            </CardActionArea>
        </Card>
        }
        </>
    )
}

export default PortfolioCard