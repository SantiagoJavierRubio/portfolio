import './footer.css'
import BottomWaves from '../SVGS/purple_waves_1.svg'

const Footer = () => {

    return(
        <footer className="separatorCurve" style={{
            backgroundImage: `url(${BottomWaves})`
        }}>
            this is footer
        </footer>
    )
}

export default Footer