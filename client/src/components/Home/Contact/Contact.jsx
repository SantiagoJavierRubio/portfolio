import './contact.css'

const Contact = () => {
    return(
        <section id="contact">
            <div id="questions">
                <h6>Don't  have a website yet?</h6>
                <h6>Looking for an upgrade on your existing web?</h6>
                <h6>Want to improve your business?</h6>
            </div>
            <h6>Contact me</h6>
            <form method="POST" action="/">
                <input type="text" name="email" id="email" placeholder="Contact email" required/>
                <input type="text" name="subject" id="subject" placeholder="Subject" />
                <textarea name="message" id="message" required>Your message</textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    )
}

export default Contact