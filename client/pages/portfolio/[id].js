import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

import Layout from '../../components/Layout'
import { Card, CardActions, CardContent } from '@mui/material'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import FavoriteIcon from '@mui/icons-material/Favorite'
import { styled } from '@mui/material/styles'
import { getIcon } from '../../components/Icons'

const CustomCard = styled(Card)({
  backgroundColor: 'rgb(145, 185, 192)',
  width: '95%',
  margin: 'auto'
})

export default function Project({ data }) {
  return (
    <Layout>
      {data && (
        <>
          <div className="text-stone-200">
            <h1>{data.name}</h1>
            <p id="portfolio-item-date">{data.date}</p>
            <p id="portfolio-item-description">{data.description}</p>
            <p id="resources-title">Resources: </p>
            <div id="resource-list">
              {data.langs.map(lang => {
                return (
                  <div key={lang} className="text-violet-400">
                    {getIcon(lang)}
                    <span className="text-stone-200">{lang}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <CustomCard>
            <CardActions id="card-actions">
              {/* <button onClick={handleLike} id="like-btn">
                {hasLiked ? (
                  <FavoriteIcon sx={{ fontSize: '2rem' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: '2rem' }} />
                )}
              </button> */}
              <div id="actions-buttons">
                <a
                  href={data.siteUrl}
                  id="webpage-btn"
                  target="_blank"
                  rel="author noreferrer"
                >
                  Webpage
                </a>
                <a
                  href={data.gitUrl}
                  id="git-btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Code
                </a>
              </div>
            </CardActions>
            <CardContent>
              <iframe src={data.siteUrl} title={data.name}></iframe>
            </CardContent>
          </CustomCard>
        </>
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
