import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    let response
    if (req.method === 'POST') {
      response = create(db, req.body)
    } else if (req.method === 'PUT') {
      response = edit(db, req.query.id, req.body)
    } else if (req.method === 'DELETE') {
      response = remove(db, req.query.id)
    } else return res.status(405).send('Method not allowed')
    console.log(response)
    res.send(JSON.stringify(response))
  } catch (err) {
    console.log(err)
    res.send('error')
  }
}

function create(db, data) {
  // TODO: validate data
  return db.collection('items').insertOne(data)
}

function edit(db, id, data) {
  // TODO: validate data
  return db.collection('items').updateOne({ _id: new ObjectId(id) }, data)
}

function remove(db, id) {
  // TODO: Validate exists
  return db.collection('items').deleteOne({ _id: new ObjectId(id) })
}
