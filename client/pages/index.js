import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import PortfolioCard from '../components/PortfolioCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Home() {
  const [entries, setEntries] = useState([null, null, null])
  const getFeaturedEntries = async () => {
    const res = await axios.get('/api/featured')
    if (res.data) {
      setEntries(res.data)
    } else {
      setTimeout(getFeaturedEntries, 5000)
    }
  }
  useEffect(() => {
    getFeaturedEntries()
  }, [])
  return (
    <Layout>
      <section className="relative flex w-full max-w-full flex-col items-center justify-start text-stone-200">
        <div id="intro-titles">
          <h2>Hi! My name is Santiago</h2>
          <h3>I&apos;m a FullStack web developer</h3>
        </div>
        <h2 id="featured-title">Featured projects:</h2>
        <div className="relative flex w-full grow items-stretch justify-evenly gap-8">
          {entries &&
            entries.map((entry, index) => {
              return <PortfolioCard entry={entry} key={entry?._id || index} />
            })}
        </div>
        <div className="mb-4 h-0 w-full">
          <button className="relative float-right m-5 flex cursor-pointer items-center border-0 bg-transparent text-lg font-bold text-stone-200">
            Check my portfolio <ChevronRightIcon />
          </button>
        </div>
        <Contact />
      </section>
    </Layout>
  )
}
