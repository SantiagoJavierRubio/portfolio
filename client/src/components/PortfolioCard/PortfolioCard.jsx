import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { setView, pages } from '../../redux/ducks/views'
import { useDispatch } from 'react-redux'
import './portfolio_card.css'

const PortfolioCard = ({entry}) => {
    const dispatch = useDispatch()

    const handleGoToEntry = () => {
        dispatch(setView(pages.PORTFOLIO, entry.id))
    }
    return(
        <Card className="entryCard" style={{ backgroundColor: 'rgba(9, 10, 10, 0.80)'}}>
            <CardActionArea style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} onClick={handleGoToEntry}>
                <h3 className="cardTitle">{entry.name}</h3>
                <CardMedia 
                    component="img"
                    image={entry.thumbnail}
                    alt={`Screenshot for ${entry.name}`}
                />
                <CardContent>
                    <p className="cardDescription">{entry.summary}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PortfolioCard