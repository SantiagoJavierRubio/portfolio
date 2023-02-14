import { useState, useEffect } from 'react'
import axios from 'axios'
import PortfolioCard from './PortfolioCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const Featured = () => {
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
    <>
      <section className="relative flex w-full grow items-stretch justify-evenly gap-8">
        {entries &&
          entries.map((entry, index) => {
            return <PortfolioCard entry={entry} key={entry?._id || index} />
          })}
      </section>
      <div className="mb-4 h-0 w-full">
        <button className="relative float-right m-5 flex cursor-pointer items-center border-0 bg-transparent text-lg font-bold text-stone-200">
          Check my portfolio <ChevronRightIcon />
        </button>
      </div>
    </>
  )
}

export default Featured
