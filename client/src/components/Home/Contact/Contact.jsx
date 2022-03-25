import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
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

const Contact = ({ contactRef }) => {

    const [formData, setFormData] = useState({ name: undefined, email: undefined, message: undefined })
    const [buttonState, setButtonState] = useState({ disabled: true, color: '#0F729B', secondaryColor: '#206B8A', fill: 'Send' })

    const CustomButton = styled(Button)({
        backgroundColor: buttonState.color,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: buttonState.secondaryColor,
        }
    })

    useEffect(() => {
        if(formData.email && formData.message) {
            setButtonState({ ...buttonState, disabled: false })
        } else {
            setButtonState({ ...buttonState, disabled: true })
        }
    }, [formData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.email || !formData.message) return
        setButtonState({ ...buttonState, fill: <CircularProgress size={'1.5rem'}/> })
        try {
            const res = await axios.post('/api/contact', formData)
            if(res.status === 200){
                setButtonState({ ...buttonState, color: 'green', secondaryColor: 'green', fill: <CheckCircleOutlineOutlinedIcon size={'1.5rem'} /> })
                e.target.reset()
                setTimeout(() => {
                    setButtonState({ ...buttonState, color: '#0F729B', secondaryColor: '#206B8A', fill: 'Send' })
                    setFormData({ ...formData, message: undefined })
                }, 1000)
            }
        } catch(err) {
            console.log(err)
            setButtonState({ ...buttonState, color: 'red', secondaryColor: 'red', fill: <ErrorOutlineOutlinedIcon size={'1.5rem'} /> })
            setTimeout(() => {
                setButtonState({ ...buttonState, color: '#0F729B', secondaryColor: '#206B8A', fill: 'Send' })
            }, 2500)
        }
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
                <CustomButton variant='contained' className='contactButton' type='submit' disabled={buttonState.disabled}>
                    {buttonState.fill}
                </CustomButton>
                {buttonState.color === 'red' && <p className='error'>Something went wrong, please try again</p>}
            </form>
        </section>
    )
}

export default Contact