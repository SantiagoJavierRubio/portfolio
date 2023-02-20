/* eslint-disable tailwindcss/no-custom-classname */
import clientPromise from '../lib/mongodb'

import Image from 'next/image'
import Link from 'next/link'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import PortfolioCard from '../components/PortfolioCard'

export default function Home({ featured }) {
  return (
    <Layout>
      <section className="relative m-auto h-full w-full max-w-6xl p-4 text-stone-200">
        <div className="flex h-64 w-full flex-col gap-4">
          <h1 className="animate-appearLeft self-start text-5xl font-bold text-teal-500">
            Hi! My name is Santiago
          </h1>
          <h2 className="animate-appearBottom self-start text-3xl font-semibold italic text-purple-700">
            I&apos;m a full-stack web developer
          </h2>
          {/* ADD SOMETHING HERE? */}
          <div className="relative h-full w-1/3 -translate-y-3/4 self-end pr-4">
            <div className="animate-appearBottom absolute inset-x-0 aspect-square">
              <Image src="/front-img.png" alt="" fill />
            </div>
          </div>
        </div>
        <article className="px-4 md:mt-20 md:p-0 lg:mt-32">
          <h2
            id="featured-title"
            className="p-2 text-left text-lg text-teal-500"
          >
            Featured projects:
          </h2>
          <div className="relative grid w-full gap-2 md:grid-cols-3 md:gap-4">
            {featured &&
              featured.map((entry, index) => {
                return (
                  <PortfolioCard
                    entry={entry}
                    key={entry?._id || index}
                    className="hover:shadow-lg hover:shadow-teal-900/20"
                  />
                )
              })}
          </div>
          <div className="mb-4 h-0 w-full">
            <Link href="/portfolio">
              <button className="relative float-right m-5 flex cursor-pointer items-center border-0 bg-transparent text-lg font-bold text-purple-500 hover:underline">
                Check my portfolio <ChevronRightIcon />
              </button>
            </Link>
          </div>
        </article>

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
