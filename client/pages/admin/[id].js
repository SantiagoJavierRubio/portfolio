import axios from 'axios'
import { useRouter } from 'next/router'
import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default function EditPanel({ data }) {
  const router = useRouter()
  const handleRemoveEntry = () => {
    axios
      .delete('/api/admin', {
        params: {
          id: data._id
        }
      })
      .then(res => {
        if (res.ok) router.push('/admin')
      })
  }
  return (
    <div>
      <button type="button" onClick={handleRemoveEntry}>
        Delete
      </button>
    </div>
  )
}

export async function getStaticProps({ params, locale }) {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    const project = await db
      .collection('items')
      .find({ _id: new ObjectId(params.id) })
      .toArray()
    const localeDate = new Date(project[0].date).toLocaleDateString(locale)
    return {
      props: {
        data: JSON.parse(JSON.stringify({ ...project[0], date: localeDate }))
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        notFound: true
      }
    }
  }
}

export async function getStaticPaths() {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    const projects = await db
      .collection('items')
      .find({})
      .project({ _id: 1 })
      .toArray()
    if (projects) {
      return {
        paths: projects.map(p => ({
          params: { id: p._id.toString() },
          locale: 'en'
        })),
        fallback: false
      }
    } else throw new Error('No projects')
  } catch (err) {
    console.error(err)
    return {
      paths: [],
      fallback: false
    }
  }
}
