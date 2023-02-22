import axios from 'axios'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import clientPromise from '../../lib/mongodb'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader'

export default function Admin({ entries }) {
  const { data: session, status } = useSession()
  if (status === 'loading')
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="aspect-square h-12 fill-stone-500 text-center text-blue-400" />
      </div>
    )
  else if (session && status !== 'unauthenticated')
    return (
      <Layout>
        <Link
          className="absolute top-0 z-50 cursor-pointer text-lg font-bold text-stone-200"
          href="/api/auth/signout"
        >
          Log out
        </Link>
        <h1 className="text-5xl font-bold text-teal-500">Admin panel</h1>
        <section className="m-auto h-full w-full max-w-6xl">
          <h3 className="p-4 text-left text-xl text-purple-500 underline">
            Add new portfolio element:
          </h3>
          <AddProjectForm
            langs={[...new Set(entries.flatMap(entry => entry.langs || []))]}
          />
        </section>
        <section className="m-auto h-full w-full max-w-6xl">
          <h3 className="p-4 text-left text-xl text-purple-500 underline">
            View and edit portfolio elements:
          </h3>
          <div className="flex flex-col items-stretch justify-center gap-6">
            {entries.length === 0 ? (
              <p>No projects to show</p>
            ) : (
              entries.map(entry => (
                <div
                  className="flex items-center justify-between rounded-md bg-teal-500 p-6"
                  key={entry._id}
                >
                  <div className="flex items-center gap-4">
                    <h6 className="text-lg">{entry.name}</h6>
                    <p className="-ml-2 text-xs font-light italic">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    <a
                      href={entry.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 underline"
                    >
                      Demo page
                    </a>
                  </div>
                  <Link
                    className="cursor-pointer rounded-md bg-purple-800 px-6 py-2 text-stone-200"
                    href={`/admin/${entry._id}`}
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </Layout>
    )
  else
    return (
      <Layout>
        <section className="m-auto h-full w-full max-w-6xl p-8">
          <h1 className="my-16 text-3xl font-bold text-stone-400">
            Unauthorized
          </h1>
          <Link
            href="/api/auth/signin"
            className="rounded-lg bg-purple-500 p-6 text-center font-bold text-stone-200"
          >
            Sign in
          </Link>
        </section>
      </Layout>
    )
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
    <form
      className="m-auto grid gap-4 p-2 text-teal-500"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full items-center gap-4">
        <label className="w-1/5 text-right" htmlFor="name">
          Project name:
        </label>
        <input
          className="max-w-3xl grow rounded-md p-1 text-black"
          name="name"
          type="text"
          id="name"
          maxLength={50}
          onChange={handleTextChange}
          value={inputs.name}
          required
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label className="w-1/5 text-right" htmlFor="summary">
          Summary:
        </label>
        <input
          className="max-w-3xl grow rounded-md p-1 text-black"
          name="summary"
          type="text"
          id="summary"
          maxLength="120"
          value={inputs.summary}
          onChange={handleTextChange}
          required
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label className="w-1/5 text-right" htmlFor="thumbnail">
          Thumbnail:
        </label>
        <input
          className="max-w-3xl grow rounded-md p-1 text-black"
          name="thumbnail"
          type="text"
          id="thumbnail"
          value={inputs.thumbnail}
          onChange={handleTextChange}
          required
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label className="w-1/5 text-right" htmlFor="url">
          Site demo url:
        </label>
        <input
          className="max-w-3xl grow rounded-md p-1 text-black"
          name="siteUrl"
          type="text"
          id="url"
          value={inputs.siteUrl}
          onChange={handleTextChange}
          required
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label className="w-1/5 text-right" htmlFor="git">
          Github url:
        </label>
        <input
          className="max-w-3xl grow rounded-md p-1 text-black"
          name="gitUrl"
          type="text"
          id="git"
          value={inputs.gitUrl}
          onChange={handleTextChange}
          required
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <label className="w-1/5 text-right" htmlFor="description">
          Description:
        </label>
        <textarea
          className="min-h-[6rem] max-w-3xl grow rounded-md p-1 text-black"
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
        <div
          id="other-opts"
          className="float-right my-6 flex items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="newLang">Add another:</label>
            <input
              type="text"
              className="rounded-md p-1"
              id="newLang"
              onKeyDown={handleInputKeyEnter}
            />
          </div>
          <button
            type="button"
            id="new-lang-btn"
            className="grow rounded-md bg-teal-500 px-2 py-1 text-center text-stone-200"
            onClick={addNewLanguage}
          >
            Add
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="m-auto w-full max-w-3xl rounded-md bg-purple-500 py-4 text-lg font-bold text-stone-200 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-purple-200/10 active:translate-y-0 active:shadow-none"
      >
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
