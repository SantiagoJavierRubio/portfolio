/* eslint-disable tailwindcss/no-custom-classname */
import clientPromise from '../lib/mongodb'
import axios from 'axios'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DoneIcon from '@mui/icons-material/Done'
import ReportIcon from '@mui/icons-material/Report'

import Layout from '../components/Layout'
import PortfolioCard from '../components/PortfolioCard'
import TextScroller from '../components/TextScroller'

const CODE_TEXT = `
<h1>My tool belt</h1>
<ul>
  <li>
    <h2>Programming languages: </h2>
    <ul>
      <li>Javascript</li>
      <li>Typescript</li>
      <li>SQL</li>
      <li>Python</li>
    </ul>
  </li>
  <li>
  <h2>Frameworks: </h2>
    <ul>
      <li>Node</li>
      <li>React</li>
      <li>Next</li>
      <li>Express</li>
    </ul>
  </li>
  <li>
  <h2>Design & styling: </h2>
    <ul>
      <li>CSS</li>
      <li>Tailwind</li>
      <li>Styled components</li>
      <li>MaterialUI</li>
    </ul>
  </li>
</ul>
`

function parseCodeToText(code) {
  const lines = code.split('\n')
  return lines.filter(line => !!line)
}

const parsedCode = parseCodeToText(CODE_TEXT)

export default function Home({ featured }) {
  return (
    <Layout>
      <section className="relative m-auto h-full w-full max-w-6xl text-stone-200 sm:p-4">
        <div className="flex h-auto w-full flex-col gap-4 sm:h-64">
          <h1 className="animate-appearLeft self-start text-5xl font-bold text-teal-500">
            Hi! My name is Santiago
          </h1>
          <h2 className="animate-appearBottom text-3xl font-semibold italic text-purple-700 sm:self-start">
            I&apos;m a Fullstack web developer
          </h2>
          <div className="relative hidden h-full w-full pr-4 sm:block">
            <TextScroller textArray={parsedCode} />
            <div className="absolute right-[5%] top-0 aspect-square animate-appearBottom sm:w-64 md:w-72">
              <Image src="/front-img.png" alt="developer desk" fill />
            </div>
          </div>
        </div>
        <article className="mb-20 mt-4 px-4 sm:mt-24 md:p-0 lg:mt-32">
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
          <div className="h-0 w-full">
            <Link href="/portfolio">
              <button className="relative float-right m-5 mr-8 flex cursor-pointer items-center border-0 bg-transparent text-lg font-bold text-purple-500 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-4/5 after:origin-bottom-right after:scale-x-0 after:rounded-sm after:bg-purple-500 after:transition-transform after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 active:text-teal-400/80 active:after:bg-teal-400/80">
                See more <ChevronRightIcon />
              </button>
            </Link>
          </div>
        </article>
        <article id="contact" className="mt-32">
          <div
            id="questions"
            className="m-auto flex w-4/5 items-center justify-between"
          >
            <h6 className="text-center text-lg font-bold text-teal-500">
              Don&apos;t have a website yet?
            </h6>
            <h6 className="-translate-y-12 translate-x-4 text-center text-lg font-bold text-teal-500">
              Looking for an upgrade on your existing web?
            </h6>
            <h6 className="text-center text-lg font-bold text-teal-500">
              Want to improve your business?
            </h6>
          </div>
          <h6
            id="contact-title"
            className="mb-2 mt-4 text-center text-xl font-bold text-purple-500 underline"
          >
            Contact me
          </h6>
          <ContactForm />
        </article>
      </section>
    </Layout>
  )
}

const SENDING_STATUS = {
  NULL: 'NULL',
  SENDING: 'SENDING',
  SENT_OK: 'SENT_OK',
  SENT_ERROR: 'SENT_ERROR'
}

const ContactForm = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [sendStatus, setSendStatus] = useState(SENDING_STATUS.NULL)

  const handleChange = e => {
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSendStatus(SENDING_STATUS.SENDING)
    if (!inputs.email || !inputs.message) return
    axios
      .post('/api/contact', inputs)
      .then(res => {
        if (res.status === 200) {
          setInputs({
            name: '',
            email: '',
            message: ''
          })
          setSendStatus(SENDING_STATUS.SENT_OK)
        }
      })
      .catch(err => {
        console.log(err)
        setSendStatus(SENDING_STATUS.SENT_ERROR)
      })
      .finally(() => {
        setTimeout(() => {
          setSendStatus(SENDING_STATUS.NULL)
        }, 3000)
      })
  }
  const renderButtonStyle = () => {
    switch (sendStatus) {
      case SENDING_STATUS.NULL:
        return 'sm:px-20 cursor-pointer bg-purple-700 disabled:bg-gray-400'
      case SENDING_STATUS.SENDING:
        return 'sm:px-4 cursor-default disabled:bg-purple-700'
      case SENDING_STATUS.SENT_OK:
        return 'sm:px-4 cursor-default disabled:bg-green-600'
      case SENDING_STATUS.SENT_ERROR:
      default:
        return 'sm:px-20 cursor-default disabled:bg-red-400'
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex w-full max-w-xl flex-col gap-4 px-6"
    >
      <label htmlFor="name" className="hidden">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="w-full rounded-sm p-2 text-lg text-stone-900"
        placeholder="Name"
        value={inputs.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="email" className="hidden">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={inputs.email}
        required
        placeholder="Email"
        className="w-full rounded-sm p-2 text-lg text-stone-900"
        onChange={handleChange}
      />
      <label htmlFor="message" className="hidden">
        Message
      </label>
      <textarea
        required
        value={inputs.message}
        id="message"
        placeholder="Your message"
        className="min-h-[6rem] w-full rounded-sm p-2 text-lg text-stone-900"
        onChange={handleChange}
      />
      <button
        className={`${renderButtonStyle()} m-auto w-full max-w-full rounded-md p-4 transition-all enabled:hover:-translate-y-px enabled:hover:shadow-md enabled:hover:shadow-teal-500/10 enabled:active:translate-y-0 sm:w-auto`}
        type="submit"
        disabled={
          !inputs.name.trim() ||
          !inputs.email.trim() ||
          !inputs.message.trim() ||
          sendStatus !== SENDING_STATUS.NULL
        }
      >
        {sendStatus === SENDING_STATUS.NULL && 'Send'}
        {sendStatus === SENDING_STATUS.SENDING && (
          <svg
            aria-hidden="true"
            className="m-auto h-6 w-6 animate-spin fill-stone-300 text-stone-500 dark:text-teal-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
        {sendStatus === SENDING_STATUS.SENT_OK && <DoneIcon />}
        {sendStatus === SENDING_STATUS.SENT_ERROR && <ReportIcon />}
      </button>
    </form>
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
