import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import './portfolio_card.css'

const PortfolioCard = ({entry}) => {
    return(
        <Card className="entryCard">
            <CardActionArea style={{height: '100%'}}>
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