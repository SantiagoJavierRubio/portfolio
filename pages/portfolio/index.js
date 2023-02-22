import clientPromise from '../../lib/mongodb'
import Layout from '../../components/Layout'
import PortfolioCard from '../../components/PortfolioCard'

export default function Portfolio({ entries }) {
  return (
    <Layout>
      <section className="m-auto h-full w-full max-w-6xl">
        <h1 className="text-center text-5xl font-bold text-teal-500">
          Portfolio
        </h1>
        <h2 className="p-4 text-left text-2xl font-bold italic text-purple-700">
          These are some of my projects:
        </h2>
        <div className="grid gap-4 px-2 sm:grid-cols-3">
          {entries.map(entry => {
            return <PortfolioCard entry={entry} key={entry._id} />
          })}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
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
