import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send("Welcome to my server!")
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
server.on('error', (err) => {
    console.error(`Server error: ${err}`)
})