import './featured.css'
import TopCurve from '../../SVGS/green_curve_top_1.svg'
import BottomCurve from '../../SVGS/green_curve_bottom_1.svg'

const Featured = () => {
    return(
        <section id="featured">
            <div className="separatorCurve" id="featured-top" style={{
                backgroundImage: `url(${TopCurve})`
            }}>            
            </div>
            <div className="separatorCurve" id="featured-bottom" style={{
                backgroundImage: `url(${BottomCurve})`
            }}>            
            </div>
        </section>
    )
}

export default Featured