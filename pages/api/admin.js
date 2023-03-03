import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

// TODO: portfolio and index dont update on new element/edit

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
    .insertOne({
      ...data,
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      position: 0,
      visits: 0,
      likes: 0
    })
    .then(res => {
      if (res.insertedId)
        return {
          _id: res.insertedId.toString()
        }
    })
}

function edit(db, id, data) {
  // TODO: validate data
  if (!data) return
  // eslint-disable-next-line no-unused-vars
  const { _id, __v, likes, date, visits, ...edits } = data
  return db
    .collection('items')
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...edits } })
    .then(res => {
      if (res.modifiedCount > 0)
        return {
          _id: id
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
