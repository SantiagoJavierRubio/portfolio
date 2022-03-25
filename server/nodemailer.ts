import nodemailer from 'nodemailer'
import "dotenv/config"

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASSWORD}`
    }
})

transporter.verify((err, ) => {
    if(err) console.error(err)
    else console.log('Server is ready to take messages')
})

export default transporter