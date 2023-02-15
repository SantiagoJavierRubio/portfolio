import { MongoClient } from 'mongodb'

const URI = process.env.MONGODB_URI

let client
let clientPromise

if (!process.env.MONGODB_URI) console.error('No connection URI')

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(URI, {})
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(URI, {})
  clientPromise = client.connect()
}

export default clientPromise
