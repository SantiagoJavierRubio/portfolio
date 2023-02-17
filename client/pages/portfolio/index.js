import clientPromise from '../../lib/mongodb'
import Layout from '../../components/Layout'
import PortfolioCard from '../../components/PortfolioCard'

export default function Portfolio({ entries }) {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        {entries.map(entry => {
          return <PortfolioCard entry={entry} key={entry._id} />
        })}
      </div>
    </Layout>
  )
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
