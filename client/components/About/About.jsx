import FadingIcon from './FadingSymbol/FadingIcon'
import './about.css'

const About = () => {
    return(
        <div id="about">
            <div id="about-text">
                <h1>About me</h1>
                <p>My name is Santiago, I'm a full-stack javascript developer</p>
                <FadingIcon icons={["devicon-nodejs-plain", "devicon-express-original"]} />
                <p>I'm from Argentina 🇦🇷 , currently based in Buenos Aires</p>
                <FadingIcon icons={["devicon-javascript-plain", "devicon-typescript-plain"]} />
                <p>I've studied fullstack development at Agencia de Aprendizaje a lo largo de la Vida 📚<br />
                I'm currently studying backend development at Coderhouse</p>
                <FadingIcon icons={["devicon-react-original", "devicon-html5-plain"]} />
                <p>Apart from coding I'm a musician and a music teacher 🎹</p>
                <FadingIcon icons={["devicon-css3-plain", "devicon-mongodb-plain"]} />
                <p>I enjoy coding since I was a teenager, and I've always been passionate about it 🤓</p>
            </div>
        </div>
    )
}

export default About