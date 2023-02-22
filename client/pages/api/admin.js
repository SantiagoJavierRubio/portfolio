import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    let response
    if (req.method === 'POST') {
      response = await create(db, req.body)
      res.revalidate(`/portfolio/${response._id}`)
      res.revalidate(`/admin/${response._id}`)
    } else if (req.method === 'PUT') {
      response = await edit(db, req.query.id, req.body)
      res.revalidate(`/admin/${response._id}`)
      res.revalidate(`/portfolio/${response._id}`)
    } else if (req.method === 'DELETE') {
      response = await remove(db, req.query.id)
    } else return res.status(405).send('Method not allowed')
    console.log(response)
    res.revalidate('/portfolio')
    res.send(JSON.stringify(response))
  } catch (err) {
    console.log(err)
    res.send('error')
  }
}

function create(db, data) {
  // TODO: validate data
  return db
    .collection('items')
    .insertOne(data)
    .then(res => {
      if (res.insertedId)
        return {
          _id: res.insertedId.toString()
        }
    })
}

function edit(db, id, data) {
  // TODO: validate data
  return db
    .collection('items')
    .updateOne({ _id: new ObjectId(id) }, data)
    .then(res => {
      if (res.upsertedId)
        return {
          _id: res.upsertedId.toString()
        }
    })
}

function remove(db, id) {
  return db
    .collection('items')
    .deleteOne({ _id: new ObjectId(id) })
    .then(res => {
      if (res.deletedCount > 0)
        return {
          _id: id
        }
    })
}
