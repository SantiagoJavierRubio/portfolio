import Layout from '../components/Layout'
import Contact from '../components/Contact'
import PortfolioCard from '../components/PortfolioCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import clientPromise from '../lib/mongodb'
import Link from 'next/link'

export default function Home({ featured }) {
  console.log(featured)
  return (
    <Layout>
      <section className="relative flex w-full max-w-full flex-col items-center justify-start text-stone-200">
        <div id="intro-titles">
          <h2>Hi! My name is Santiago</h2>
          <h3>I&apos;m a FullStack web developer</h3>
        </div>
        <h2 id="featured-title">Featured projects:</h2>
        <div className="relative flex w-full grow items-stretch justify-evenly gap-8">
          {featured &&
            featured.map((entry, index) => {
              return <PortfolioCard entry={entry} key={entry?._id || index} />
            })}
        </div>
        <div className="mb-4 h-0 w-full">
          <Link href="/portfolio">
            <button className="relative float-right m-5 flex cursor-pointer items-center border-0 bg-transparent text-lg font-bold text-stone-200 hover:underline">
              Check my portfolio <ChevronRightIcon />
            </button>
          </Link>
        </div>
        <Contact />
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ res }) {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    const entries = await db
      .collection('items')
      .find({})
      .project({ thumbnail: 1, name: 1, summary: 1 })
      .sort({ position: 1 })
      .limit(3)
      .toArray()
    if (entries) {
      res.setHeader('Cache-Control', 'public, s-maxage=3600')
      return {
        props: {
          featured: JSON.parse(JSON.stringify(entries))
        }
      }
    } else
      return {
        props: {
          featured: [null, null, null]
        }
      }
  } catch (err) {
    return {
      props: {
        featured: [null, null, null]
      }
    }
  }
}
