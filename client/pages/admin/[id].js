import axios from 'axios'
import { useSession } from 'next-auth/react'
import Layout from '../../components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'
import Loader from '../../components/Loader'

export default function EditPanel({ data }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [inputs, setInputs] = useState(data)
  const [languages, setLanguages] = useState(data.langs)
  const [deleteValidation, setDeleteValidation] = useState('')

  if (status !== 'loading' && !session) router.push('/admin')

  const handleRemoveEntry = () => {
    axios
      .delete('/api/admin', {
        params: {
          id: data._id
        }
      })
      .then(res => {
        if (res.status === 200) router.push('/admin')
      })
  }

  const handleEditEntry = e => {
    e.preventDefault()
    axios
      .put('/api/admin', inputs, {
        params: {
          id: data._id
        }
      })
      .then(res => {
        if (res.status === 200) router.reload()
      })
  }

  const handleTextChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePositionChange = e => {
    setInputs(prev => ({ ...prev, position: parseInt(e.target.value) }))
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

  const handleValidationText = e => {
    setDeleteValidation(e.target.value)
  }
  const isAbleToDelete = deleteValidation !== data.name
  if (status !== 'authenticated')
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="aspect-square h-12 fill-stone-500 text-center text-blue-400" />
      </div>
    )
  return (
    <Layout>
      <section className="m-auto h-full w-full max-w-6xl">
        <form
          onSubmit={handleEditEntry}
          className="m-auto grid gap-4 p-2 text-teal-500"
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
          <div
            id="immutable-props"
            className="flex items-center justify-evenly"
          >
            <div>
              <label htmlFor="date">Date:</label>
              <input
                name="date"
                type="date"
                id="date"
                value={new Date(inputs.date).toISOString().substring(0, 10)}
                disabled
                readOnly
                className="ml-2 rounded-sm p-1 text-center font-semibold text-stone-200"
              />
            </div>
            <div>
              <label htmlFor="visits">Visits:</label>
              <input
                name="visits"
                id="visits"
                type="number"
                step={1}
                min={0}
                value={data.visits}
                disabled
                readOnly
                className="ml-2 w-12 rounded-sm p-1 text-center font-semibold text-stone-200"
              />
            </div>
            <div>
              <label htmlFor="likes">Likes:</label>
              <input
                name="likes"
                id="likes"
                type="number"
                value={data.likes}
                disabled
                readOnly
                className="ml-2 w-12 rounded-sm p-1 text-center font-semibold text-stone-200"
              />
            </div>
            <div>
              <label htmlFor="position">Position:</label>
              <input
                name="position"
                id="position"
                type="number"
                step={1}
                min={0}
                value={inputs.position}
                onChange={handlePositionChange}
                className="ml-2 w-12 rounded-sm p-1 text-center font-semibold text-black"
              />
            </div>
          </div>
          <button
            type="submit"
            className="m-auto mt-2 w-full max-w-3xl rounded-md bg-purple-500 py-4 text-lg font-bold text-stone-200 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-purple-200/10 active:translate-y-0 active:shadow-none"
          >
            Submit
          </button>
        </form>
        <div className="m-auto mt-8 max-w-3xl rounded-lg border-2 border-red-500 bg-red-300 p-8 pt-4">
          <h6 className="mb-6 text-left text-lg font-bold text-red-500">
            Danger zone
          </h6>
          <label htmlFor="deleteValidation">
            Are you sure? Type project name to confirm
          </label>
          <br />
          <input
            type="text"
            id="deleteValidation"
            value={deleteValidation}
            onChange={handleValidationText}
            className="my-4 w-full rounded-sm p-1 text-center text-red-500"
          />
          <button
            type="button"
            className="m-auto w-full rounded-md bg-red-500 py-4 text-lg font-bold text-stone-200 disabled:bg-gray-500"
            onClick={handleRemoveEntry}
            disabled={isAbleToDelete}
          >
            Delete
          </button>
        </div>
      </section>
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
