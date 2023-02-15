import clientPromise from '../../lib/mongodb'

export default function Portfolio({ entries }) {
  console.log(entries)
  return <div>portfolio</div>
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    const entries = await db
      .collection('items')
      .find({})
      .project({ thumbnail: 1, name: 1, summary: 1 })
      .sort({ position: 1 })
      .toArray()
    if (entries) {
      return { props: { entries: JSON.parse(JSON.stringify(entries)) } }
    } else
      return {
        props: { entries: [] }
      }
  } catch (err) {
    console.log(err)
    return {
      props: { entries: [] }
    }
  }
}
