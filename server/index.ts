import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoDBStore, { MongoDBSessionOptions } from 'connect-mongodb-session'
import mongoose, { ConnectOptions } from 'mongoose'
import path from 'path'
import "dotenv/config"

declare module 'express-session' {
    interface SessionData {
        likedEntries: string[]
    }
  }

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
process.env.PWD = process.cwd()
app.use(express.static(path.join(process.env.PWD, 'client/build')));
app.use(express.static(path.join(process.env.PWD, 'public')))

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
// app.use(cors({ credentials: true, origin: 'localhost' })) // REMOVE CORS ON DEPLOYMENT

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "..", "/client/build/index.html"))
})

app.set('views', './public/views')
app.set('view engine', 'ejs')
import adminRoutes from './routes/adminRoutes'
app.use('/admin', adminRoutes)
import apiRoutes from './routes/apiRoutes'
app.use('/api', apiRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).json({ error: err.message })
})
app.use((req: Request, res: Response, next: NextFunction) => {
    if(req.method && req.method !== 'GET') return res.status(404).json({ error: 'Route not found' })
    res.redirect('/')
})


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