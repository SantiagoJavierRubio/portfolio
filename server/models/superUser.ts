import mongoose from 'mongoose'

const superUserSchema = new mongoose.Schema({
    email: String,
    password: String
}, {collection: 'admin'})

const SuperUser = mongoose.model('SuperUser', superUserSchema)

export default SuperUser