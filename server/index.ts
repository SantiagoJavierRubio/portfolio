import express, { Application } from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoDBStore, { MongoDBSessionOptions } from 'connect-mongodb-session'
import mongoose, { ConnectOptions } from 'mongoose'
import path from 'path'
import "dotenv/config"

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

const MONGOSTORE = MongoDBStore(session)
const store = new MONGOSTORE(
    {
        uri: `${process.env.MONGO_CONN_URL}`,
        databaseName: 'admin_session',
        collection: 'portfolio'
    } as MongoDBSessionOptions, err => {
        if(err) console.error(`Mongo session store error -> ${err}`)
    }
)
declare module 'express-session' {
    interface SessionData {
        authorized: boolean
    }
}
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    cookie: {
        maxAge: 1000 * 60 *60 * 24 * 7 * 3
    },
    store: store,
    resave: true,
    saveUninitialized: false
}))
app.set('trust proxy', 1)
app.use(cors({ credentials: true, origin: 'localhost' }))

app.get('/', (req, res) => {
    res.send("Welcome to my server!")
})
app.post('/', (req, res) => {
    res.status(200).json(req.body)
})
app.set('views', './public/views')
app.set('view engine', 'ejs')
import adminRoutes from './routes/adminRoutes'
app.use('/admin', adminRoutes)

const PORT = process.env.PORT || 8080
const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(`${process.env.MONGO_CONN_URL}`, MONGO_OPTIONS as ConnectOptions)
    .then( () => {
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
        server.on('error', (err) => {
            console.error(`Server error: ${err}`)
        })
    })
    .catch(err => console.error(err))