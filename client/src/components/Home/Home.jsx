import Featured from './Featured/Featured'
import Intro from './Intro/Intro'
import Contact from './Contact/Contact'

import TopGreenCurve from '../SVGS/green_curve_top_3.svg'
import BottomGreenCurve from '../SVGS/green_curve_bottom_1.svg'
import TopPurpleCurve from '../SVGS/green_curve_top_3.svg'
import BottomPurpleCurve from '../SVGS/green_curve_bottom_1.svg'
import './home.css'

const Home = () => {
    return(
        <div id="home">
            <Intro />
            <div className="separatorCurve" id="featured-top" style={{
                backgroundImage: `url(${TopGreenCurve})`
            }}>         
            </div>
            <Featured />
            <div className="separatorCurve" id="featured-bottom" style={{
                backgroundImage: `url(${BottomGreenCurve})`
            }}>            
            </div>
            <div className="separatorCurve" id="featured-top" style={{
                backgroundImage: `url(${TopPurpleCurve})`
            }}>         
            </div>
            <Contact />
            <div className="separatorCurve" id="featured-bottom" style={{
                backgroundImage: `url(${BottomPurpleCurve})`
            }}>            
            </div>
        </div>
        )
    }
    
    export default Home