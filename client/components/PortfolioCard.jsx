import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Skeleton
} from '@mui/material'
import { useState } from 'react'

const PortfolioCard = ({ entry }) => {
  const [loaded, setLoaded] = useState(false)

  const triggerLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 100)
  }

  return (
    <>
      {!loaded && (
        <Skeleton
          variant="rect"
          className="w-1/3 max-w-lg grow"
          animation="wave"
          width="100%"
          height="500px"
        />
      )}
      {entry && (
        <Card
          className="shadow-black/75 hover:shadow-md"
          style={{
            backgroundColor: 'rgba(9, 10, 10, 0.80)',
            display: loaded ? 'initial' : 'none'
          }}
        >
          <CardActionArea
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <h3 className="relative m-4 p-0 text-lg font-bold text-stone-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:rounded-sm after:bg-stone-200 after:transition-transform after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100">
              {entry.name}
            </h3>
            <CardMedia
              component="img"
              image={entry.thumbnail}
              alt={`Screenshot for ${entry.name}`}
              onLoad={triggerLoad}
            />
            <CardContent>
              <p className="text-stone-200">{entry.summary}</p>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  )
}

export default PortfolioCard
