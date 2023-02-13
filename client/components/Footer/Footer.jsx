import './footer.css'
import BottomWaves from '../SVGS/purple_waves_1.svg'

const Footer = () => {

    return(
        <footer className="separatorCurve" id="footer" style={{
            backgroundImage: `url(${BottomWaves})`
        }}>
            <div className="socials">
                <a href="https://github.com/SantiagoJavierRubio" target="_blank" rel="noopener noreferrer">
                    <i className="devicon-github-original" />
                </a>
                <a href="https://www.linkedin.com/in/santiago-javier-rubio" target="_blank" rel="noopener noreferrer">
                    <i className="devicon-linkedin-plain" />
                </a>
            </div>
            <p>Created by Santiago Javier Rubio - 2022</p>
        </footer>
    )
}

export default Footer