import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASSWORD
    }
  })
  const { name, email, message } = req.body
  const htmlContent = `
    <h1>Message from ${name} (${email})</h1>
    <p>${message}</p>
  `
  const sent = await transporter.sendMail({
    from: process.env.GMAIL_ACCOUNT,
    to: process.env.RECEIVE_MAIL,
    subject: 'Portfolio inquiry',
    html: htmlContent
  })
  if (sent.accepted) return res.status(200).end()
  return res.status(500).send(sent.response)
}
