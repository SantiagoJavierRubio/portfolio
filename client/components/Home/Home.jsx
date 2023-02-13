import Featured from './Featured/Featured'
import Intro from './Intro/Intro'
import Contact from './Contact/Contact'
import TopGreenCurve from '../SVGS/green_curve_top_5.svg'
import BottomGreenCurve from '../SVGS/green_curve_bottom_1.svg'
import TopPurpleCurve from '../SVGS/purple_curve_top_2.svg'
import BottomPurpleCurve from '../SVGS/purple_curve_bottom_1.svg'

import './home.css'

const Home = ({ contactRef }) => {
    return(
        <div id="home">
            <Intro />
            <div className="separatorCurve" id="featured-top" style={{
                backgroundImage: `url(${TopGreenCurve})`
            }}>
                <h2 id="featured-title">Featured projects:</h2>     
            </div>
            <Featured />
            <div className="separatorCurve" id="featured-bottom" style={{
                backgroundImage: `url(${BottomGreenCurve})`
            }}>
            </div>
            <div className="separatorCurve" id="contact-top" style={{
                backgroundImage: `url(${TopPurpleCurve})`
            }}>         
            </div>
            <Contact contactRef={contactRef}/>
            <div className="separatorCurve" id="contact-bottom" style={{
                backgroundImage: `url(${BottomPurpleCurve})`
            }}>            
            </div>
        </div>
        )
    }
    
    export default Home