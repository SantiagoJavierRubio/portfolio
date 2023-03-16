import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

import Layout from '../../components/Layout'
import GitHubIcon from '@mui/icons-material/GitHub'
import WebIcon from '@mui/icons-material/Web'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import FavoriteIcon from '@mui/icons-material/Favorite'
import { loadCatalog } from '../../lib/intl'
import { Trans } from '@lingui/macro'

import { getIcon } from '../../components/Icons'

export default function Project({ data }) {
  return (
    <Layout>
      {data && (
        <section className="relative m-auto mt-20 h-full w-full max-w-6xl px-2 sm:px-0">
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
            className="m-auto mt-2 whitespace-pre-wrap text-center text-stone-300 sm:w-3/4"
          >
            {data.description}
          </p>
          <p
            id="resources-title"
            className="py-2 text-left text-base font-normal text-teal-500 underline sm:px-4 md:px-8"
          >
            <Trans>Resources:</Trans>{' '}
          </p>
          <div
            id="resource-list"
            className="mx-auto grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:p-0 md:w-4/5 md:grid-cols-4"
          >
            {data.langs.map(lang => {
              return (
                <div
                  key={lang}
                  className="animate-crossThrough bg-gradient-to-tr from-teal-400 via-purple-400 to-teal-300/90 bg-150 bg-clip-text text-left text-lg text-transparent sm:p-4"
                >
                  {getIcon(lang)}
                  <span className="ml-2 text-base text-stone-200">{lang}</span>
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
                  className="group mb-2 flex h-12 w-24 cursor-pointer items-center justify-center rounded-md bg-stone-900 py-2 px-4 text-center font-bold text-stone-200 transition-all duration-1000 ease-in-out hover:-translate-x-px hover:drop-shadow-md active:translate-y-0"
                >
                  <span className="whitespace-nowrap bg-gradient-to-r from-purple-500 via-teal-500 to-purple-500 bg-200 bg-clip-text bg-[0%] font-extrabold text-transparent transition-all duration-1000 group-hover:bg-[-200%] group-active:from-teal-500">
                    <Trans>Site</Trans>
                  </span>
                  <WebIcon className="text-purple-400/80 transition-all duration-1000 group-hover:text-teal-400/80" />
                </a>
                <a
                  href={data.gitUrl}
                  id="git-btn"
                  target="_blank"
                  rel="noreferrer"
                  className="group mb-2 cursor-pointer rounded-md bg-stone-900 py-3 px-5 text-center font-bold text-stone-200 transition-all duration-1000 ease-in-out hover:-translate-x-px hover:drop-shadow-md active:translate-y-0"
                >
                  <span className="whitespace-nowrap bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500 bg-200 bg-clip-text bg-[0%] font-extrabold text-transparent transition-all duration-1000 group-hover:bg-[-200%] group-active:from-teal-500">
                    <Trans>Code</Trans>{' '}
                  </span>
                  <GitHubIcon className="text-teal-400/80 transition-all duration-1000 group-hover:text-purple-400/80" />
                </a>
              </div>
            </div>
            <div className="w-full">
              <h6 className="mb-1 text-left font-bold text-stone-200 underline">
                Demo:
              </h6>
              <iframe
                className="min-h-screen w-full overflow-scroll rounded-sm scrollbar-hide"
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
        data: JSON.parse(
          JSON.stringify({
            ...project[0],
            date: localeDate,
            description:
              locale === 'en'
                ? project[0].description
                : project[0].description_es
          })
        ),
        i18n: await loadCatalog(locale)
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
        paths: projects.flatMap(p => [
          { params: { id: p._id.toString() }, locale: 'en' },
          { params: { id: p._id.toString() }, locale: 'es' }
        ]),
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
