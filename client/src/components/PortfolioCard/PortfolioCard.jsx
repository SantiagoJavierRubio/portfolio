import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { setView, pages } from '../../redux/ducks/views.js'
import { useDispatch } from 'react-redux'
import './portfolio_card.css'

const PortfolioCard = ({entry}) => {
    const dispatch = useDispatch()

    const handleGoToEntry = () => {
        dispatch(setView(pages.PORTFOLIO, entry.id))
    }
    return(
        <Card className="entryCard">
            <CardActionArea style={{height: '100%'}} onClick={handleGoToEntry}>
                <CardMedia 
                    component="img"
                    image={entry.thumbnail}
                    alt={`Screenshot for ${entry.name}`}
                />
                <CardContent>
                    <h3 className="cardTitle">{entry.name}</h3>
                    <p className="cardDescription">{entry.description}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PortfolioCard