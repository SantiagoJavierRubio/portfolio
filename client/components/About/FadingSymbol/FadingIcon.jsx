import './fading_icon.css'

const FadingIcon = ({ icons }) => {

    const fadingTime = Math.floor(Math.random() * 10) + 4

    return(
        <div className='fadingIcon'>
            <i className={icons[0]} 
                style={{
                    animation: `fade-in ${fadingTime}s alternate infinite ease-in-out`
                }}
            />
            <i className={icons[1]} 
                style={{
                    animationDelay: `${fadingTime}s`,
                    animation: `fade-in ${fadingTime}s alternate-reverse infinite ease-in-out`
                }}
            />
        </div>
    )
}

export default FadingIcon
