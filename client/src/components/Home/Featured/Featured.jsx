import PortfolioCard from '../../PortfolioCard/PortfolioCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './featured.css'


const Featured = () => {
    const testItems = [
        {
            name: 'Prueba 1',
            thumbnail: 'https://i2.wp.com/dialoguemos.ec/wp-content/uploads/2016/04/thumbnail-default.jpg?ssl=1',
            description: 'Esta es la prueba número uno, que como todos ya sabrán es la que siempre sale mal',
            id: 1
        },
        {
            name: 'Prueba2',
            thumbnail: 'https://i2.wp.com/dialoguemos.ec/wp-content/uploads/2016/04/thumbnail-default.jpg?ssl=1',
            description: 'Otra prueba, de otro tipo',
            id: 2
        },
        {
            name: 'Prueba 3',
            thumbnail: 'https://i2.wp.com/dialoguemos.ec/wp-content/uploads/2016/04/thumbnail-default.jpg?ssl=1',
            description: 'Prueba numero 3, esta si.',
            id: 3
        }
    ]
    return(
        <>
        <section id="featured">
            {testItems.map(entry => {
                return <PortfolioCard entry={entry} key={entry.id}/>
            })}
        </section>
        <div id="goToPortfolio">
            <button>Check my portfolio <ChevronRightIcon /></button>      
        </div>
        </>
    )
}

export default Featured