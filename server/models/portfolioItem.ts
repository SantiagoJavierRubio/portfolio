import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: String,
    siteUrl: String,
    gitUrl: String,
    thumbnail: String,
    summary: String,
    description: String,
    langs: { type: [String], default: [] },
    date: { type: Date, default: Date.now()},
    likes: { type: Number, default: 0 },
    position: { type: Number, default: 0},
    visits: { type: Number, default: 0 }
}, {collection: 'items'})

const PortfolioItem = mongoose.model('PortfolioItem', itemSchema)

export default PortfolioItem