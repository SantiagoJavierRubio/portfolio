import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import './contact.css'

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#0F729B',
        fontWeight: 600,
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#0F729B',
        },
    },
    '& .MuiFilledInput-root': {
        '&.Mui-focused:after': {
          borderColor: '#0F729B',
        },
    },
})

const CustomButton = styled(Button)({
    backgroundColor: '#0F729B',
    fontWeight: 600,
    "&:hover": {
        backgroundColor: '#206B8A',
    }
})

const Contact = ({ contactRef }) => {

    const [formData, setFormData] = useState({ name: undefined, email: undefined, message: undefined })

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    return(
        <section id="contact" ref={contactRef}>
            <div id="questions">
                <h6>Don't  have a website yet?</h6>
                <h6>Looking for an upgrade on your existing web?</h6>
                <h6>Want to improve your business?</h6>
            </div>
            <h6 id='contact-title'>Contact me</h6>
            <form onSubmit={handleSubmit}>
                <div className="contactData">
                    <CustomTextField 
                        variant='filled'
                        label='Name' 
                        size='small' 
                        className='contactField' 
                        inputProps={{form:{autocomplete: 'off'}}}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <CustomTextField 
                        variant='filled' 
                        label='Contact email' 
                        size='small' 
                        required 
                        className='contactField' 
                        inputProps={{form:{autocomplete: 'off'}}}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <CustomTextField 
                    multiline 
                    variant='filled' 
                    label='Your message' 
                    required 
                    className='contactField'
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <CustomButton variant='contained' color='primary' className='contactButton' type='submit' disabled={(!formData.email || !formData.message) ? true : false}>Send</CustomButton>
            </form>
        </section>
    )
}

export default Contact