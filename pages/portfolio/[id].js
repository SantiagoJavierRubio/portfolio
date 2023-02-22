import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

import Layout from '../../components/Layout'
import GitHubIcon from '@mui/icons-material/GitHub'
import WebIcon from '@mui/icons-material/Web'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import FavoriteIcon from '@mui/icons-material/Favorite'

import { getIcon } from '../../components/Icons'

export default function Project({ data }) {
  return (
    <Layout>
      {data && (
        <section className="relative m-auto mt-20 h-full w-full max-w-6xl">
          <h1 className="text-center text-2xl font-bold text-teal-400">
            {data.name}
          </h1>
          <p
            id="portfolio-item-date"
            className="text-center font-bold italic text-purple-500"
          >
            {data.date}
          </p>
          <p
            id="portfolio-item-description"
            className="m-auto mt-2 text-center text-stone-300 sm:w-2/3"
          >
            {data.description}
          </p>
          <p
            id="resources-title"
            className="px-8 py-2 text-left text-base font-normal text-teal-500 underline"
          >
            Resources:{' '}
          </p>
          <div
            id="resource-list"
            className="mx-auto grid grid-cols-3 gap-4 sm:grid-cols-5 md:w-4/5"
          >
            {data.langs.map(lang => {
              return (
                <div
                  key={lang}
                  className="text-left text-lg text-purple-400 sm:p-4"
                >
                  {getIcon(lang)}
                  <span className="ml-2 text-stone-200">{lang}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 w-full rounded-lg bg-teal-600 p-2 sm:p-4">
            <div id="card-actions">
              {/* <button onClick={handleLike} id="like-btn">
                {hasLiked ? (
                  <FavoriteIcon sx={{ fontSize: '2rem' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: '2rem' }} />
                )}
              </button> */}
              <div id="actions-buttons" className="flex gap-4">
                <a
                  href={data.siteUrl}
                  id="webpage-btn"
                  target="_blank"
                  rel="author noreferrer"
                  className="mb-2 cursor-pointer rounded-md bg-gray-500 py-2 px-4 text-center font-bold text-stone-200"
                >
                  Site <WebIcon />
                </a>
                <a
                  href={data.gitUrl}
                  id="git-btn"
                  target="_blank"
                  rel="noreferrer"
                  className="mb-2 cursor-pointer rounded-md bg-gray-500 py-2 px-4 text-center font-bold text-stone-200"
                >
                  Code <GitHubIcon />
                </a>
              </div>
            </div>
            <div className="w-full">
              <h6 className="text-left font-bold text-purple-700 underline">
                Demo:
              </h6>
              <iframe
                className="min-h-screen w-full rounded-sm"
                src={data.siteUrl}
                title={data.name}
              />
            </div>
          </div>
        </section>
      )}
    </Layout>
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
