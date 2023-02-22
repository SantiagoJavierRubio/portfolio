import axios from 'axios'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import clientPromise from '../../lib/mongodb'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function Admin({ entries }) {
  const { data: session, status } = useSession()
  if (status === 'loading') return <div>loader</div>
  else if (session && status !== 'unauthenticated')
    return (
      <Layout>
        <h1 className="text-5xl font-bold text-teal-500">Admin panel</h1>
        <section className="m-auto h-full w-full max-w-6xl">
          <h3 className="p-4 text-left text-xl text-purple-700 underline">
            Add new portfolio element:
          </h3>
          <AddProjectForm
            langs={[...new Set(entries.flatMap(entry => entry.langs || []))]}
          />
        </section>
        <section className="m-auto h-full w-full max-w-6xl">
          <h3 className="admin-section-text">
            View and edit portfolio elements:
          </h3>
          <div className="admin-entries">
            {entries.length === 0 ? (
              <p className="noentries">No projects to show</p>
            ) : (
              entries.map(entry => (
                <div className="entry" key={entry._id}>
                  <div className="entry-info">
                    <h6>{entry.name}</h6>
                    <p>{entry.date}</p>
                    <a href={entry.siteUrl} target="_blank" rel="noreferrer">
                      Demo page
                    </a>
                  </div>
                  <Link className="edit-btn" href={`/admin/${entry._id}`}>
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </Layout>
    )
  else return <h1>Unauthorized</h1>
}

const DEFAULT_VALUES = {
  name: '',
  summary: '',
  thumbnail: '',
  siteUrl: '',
  gitUrl: '',
  description: '',
  langs: []
}

const AddProjectForm = ({ langs }) => {
  const [inputs, setInputs] = useState(DEFAULT_VALUES)
  const [languages, setLanguages] = useState(langs)

  const handleTextChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLangCheck = e => {
    if (!inputs.langs.includes(e.target.value)) {
      setInputs(prev => ({ ...prev, langs: [...prev.langs, e.target.value] }))
    } else
      setInputs(prev => ({
        ...prev,
        langs: prev.langs.filter(l => l !== e.target.value)
      }))
  }

  const addNewLanguage = () => {
    const newLang = document.querySelector('#newLang').value
    if (languages.includes(newLang)) return
    if (newLang.trim()) setLanguages(prev => [...prev, newLang])
  }

  const handleInputKeyEnter = e => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    addNewLanguage()
  }
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('/api/admin', inputs)
      .then(res => {
        if (res.ok) setInputs(DEFAULT_VALUES)
        else console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <form className="grid w-full gap-4 text-teal-500" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Project name:</label>
        <input
          name="name"
          type="text"
          id="name"
          maxLength={50}
          onChange={handleTextChange}
          value={inputs.name}
          required
        />
      </div>
      <div>
        <label htmlFor="summary">Summary:</label>
        <input
          name="summary"
          type="text"
          id="summary"
          maxLength="120"
          value={inputs.summary}
          onChange={handleTextChange}
          required
        />
      </div>
      <div>
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input
          name="thumbnail"
          type="text"
          id="thumbnail"
          value={inputs.thumbnail}
          onChange={handleTextChange}
          required
        />
      </div>
      <div>
        <label htmlFor="url">Site demo url:</label>
        <input
          name="siteUrl"
          type="text"
          id="url"
          value={inputs.siteUrl}
          onChange={handleTextChange}
          required
        />
      </div>
      <div>
        <label htmlFor="git">Github url:</label>
        <input
          name="gitUrl"
          type="text"
          id="git"
          value={inputs.gitUrl}
          onChange={handleTextChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={inputs.description}
          onChange={handleTextChange}
          maxLength={1000}
          required
        />
      </div>
      <label
        htmlFor="checkbox-options"
        className="p-4 px-8 text-left text-lg italic text-purple-700"
      >
        Languages/technologies used:
      </label>
      <div id="checkbox-options">
        <div className="grid w-full grid-cols-5 gap-4">
          {languages &&
            languages.map(language => (
              <div
                className="flex items-center justify-center gap-2"
                key={language}
              >
                <label htmlFor="langs">{language}</label>
                <input
                  type="checkbox"
                  name="langs"
                  value={language}
                  id={language}
                  onChange={handleLangCheck}
                  checked={inputs.langs.includes(language)}
                />
              </div>
            ))}
        </div>
        <div id="other-opts" className="mt-8">
          <label htmlFor="newLang">Add another:</label>
          <input type="text" id="newLang" onKeyDown={handleInputKeyEnter} />
          <button type="button" id="new-lang-btn" onClick={addNewLanguage}>
            Add
          </button>
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db('portfolio')
    const entries = await db.collection('items').find().toArray()
    return {
      props: {
        entries: JSON.parse(JSON.stringify(entries))
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        entries: []
      }
    }
  }
}
