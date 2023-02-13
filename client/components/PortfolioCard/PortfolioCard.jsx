import { Card, CardContent, CardMedia, CardActionArea, Skeleton } from '@mui/material'
import { setView, pages } from '../../redux/ducks/views'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './portfolio_card.css'

const PortfolioCard = ({entry}) => {

    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()
    const handleGoToEntry = () => {
        dispatch(setView(pages.PORTFOLIO, entry._id))
    }

    const triggerLoad = () => {
        setTimeout(() => {
            setLoaded(true)
        }, 100)
    }

    return(
        <>
        {!loaded && <Skeleton variant="rect" className="cardSkeleton" animation="wave" width="100%" height="500px" /> }
        {entry && <Card className="entryCard" style={{ backgroundColor: 'rgba(9, 10, 10, 0.80)', display: loaded ? 'initial' : 'none' }}>
            <CardActionArea style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} onClick={handleGoToEntry}>
                <h3 className="cardTitle">{entry.name}</h3>
                <CardMedia 
                        component="img"
                        image={entry.thumbnail}
                        alt={`Screenshot for ${entry.name}`}
                        onLoad={triggerLoad}
                />
                <CardContent>
                    <p className="cardDescription">{entry.summary}</p>
                </CardContent>
            </CardActionArea>
        </Card>}
        </>
    )
}

export default PortfolioCard