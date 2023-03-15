/* eslint-disable tailwindcss/no-custom-classname */
import Layout from '../components/Layout'
import FadingIcon from '../components/FadingIcon'
import { Trans } from '@lingui/macro'
import { loadCatalog } from '../lib/intl'

export default function About() {
  return (
    <Layout>
      <section className="m-auto mb-8 h-full max-w-6xl tracking-wide text-stone-200 sm:px-4 md:px-8 lg:px-12">
        <h1 className="mb-6 text-5xl font-bold text-violet-400">
          <Trans>About me</Trans>
        </h1>
        <article className="my-6">
          <h3 className="mb-4 pb-4 text-center text-2xl font-bold text-purple-500 sm:text-left">
            <Trans>Basic info</Trans>
          </h3>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center md:ml-8 lg:ml-12">
            <Trans>
              My name is Santiago, I&apos;m a Fullstack{' '}
              <span className="px-1 font-bold text-yellow-500">Javascript</span>{' '}
              & <span className="px-1 font-bold text-blue-500">Typescript</span>{' '}
              developer 🧑🏼‍💻
            </Trans>
          </p>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center md:ml-8 lg:ml-12">
            <Trans>
              🌎 I&apos;m from Argentina, currently based in Buenos Aires
            </Trans>
          </p>
          <p className="m-4 py-2 text-left text-xl  text-stone-200 sm:text-center md:ml-8 lg:ml-12">
            <Trans>
              I currently work as a part-time developer at OLA Estudio and also
              do freelance projects 💼
            </Trans>
          </p>
        </article>
        <FadingIcon
          icons={['devicon-javascript-plain', 'devicon-typescript-plain']}
        />
        <article className="my-6">
          <h3 className="mb-4 pb-4 text-center text-2xl font-bold text-purple-500 sm:text-left">
            <Trans>Studies</Trans>
          </h3>
          <ul>
            <li className="m-4 text-left text-xl text-stone-200 before:mr-2 before:align-middle before:text-sm before:content-['📖'] sm:px-8">
              <Trans>Backend development - Coderhouse</Trans>
              <span className="ml-4 text-base font-thin italic text-teal-200">
                JS & TS (2022)
              </span>
            </li>
            <li className="m-4 text-left text-xl text-stone-200 before:mr-2 before:align-middle before:text-sm before:content-['📖'] sm:px-8">
              <Trans>
                Backend development - Agencia de Aprendizaje a lo largo de la
                Vida
              </Trans>
              <span className="ml-4 text-base font-thin italic text-teal-200">
                Java (2022)
              </span>
            </li>
            <li className="m-4 text-left text-xl text-stone-200 before:mr-2 before:align-middle before:text-sm before:content-['📖'] sm:px-8">
              <Trans>
                Fullstack web development - Agencia de Aprendizaje a lo largo de
                la Vida
              </Trans>{' '}
              <span className="ml-4 text-base font-thin italic text-teal-200">
                JS (2021)
              </span>
            </li>
          </ul>
        </article>
        <FadingIcon
          icons={['devicon-react-original', 'devicon-express-original']}
        />
        <article className="my-6">
          <h3 className="mb-4 pb-4 text-center text-2xl font-bold text-purple-500 sm:text-left">
            <Trans>Competences</Trans>
          </h3>
          <div className="mt-4 ml-2 sm:ml-4 md:ml-8 lg:ml-12">
            <h4 className="text-left text-xl font-bold text-teal-500 underline">
              <Trans>Proficient</Trans>
            </h4>
            <ul className="ml-4 list-disc pl-2 sm:px-4 md:px-8 lg:px-12">
              <li className="m-4 text-left text-xl text-stone-200">
                <Trans>NodeJS backend frameworks (Express, Nest, Koa)</Trans>
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                <Trans>SPA with React, Redux, React Router, React Query</Trans>
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                <Trans>Fullstack with NextJS, tRPC, SSR</Trans>
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                <Trans>Styling with CSS, Tailwind, Styled-components</Trans>
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                <Trans>
                  SQL & NoSQL databases - MySQL, MongoDB, Firebase, Postgres
                </Trans>
              </li>
            </ul>
          </div>
          <div className="mt-4 ml-2 sm:ml-4 md:ml-8 lg:ml-12">
            <h4 className="text-left text-xl font-bold text-teal-500 underline">
              <Trans>Competent</Trans>
            </h4>
            <ul className="ml-4 list-disc pl-2 sm:px-4 md:px-8 lg:px-12">
              <li className="m-4 text-left text-xl text-stone-200">Python</li>
              <li className="m-4 text-left text-xl text-stone-200">
                Java SpringBoot
              </li>
              <li className="m-4 text-left text-xl text-stone-200">Docker</li>
              <li className="m-4 text-left text-xl text-stone-200">SEO</li>
            </ul>
          </div>
        </article>
        <FadingIcon icons={['devicon-css3-plain', 'devicon-mongodb-plain']} />
        <article className="my-6">
          <h3 className="mb-4 pb-4 text-center text-2xl font-bold text-purple-500 sm:text-left">
            <Trans>Interests & hobbies</Trans>
          </h3>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center">
            <Trans>
              Apart from coding I&apos;m a musician and a music teacher. I play
              the piano and clarinet 🎹
            </Trans>
          </p>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center">
            <i className="devicon-godot-plain colored px-2" />
            <Trans>
              I like playing videogames. I also create some of my own using
              Godot engine as a hobby
            </Trans>
          </p>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center">
            <Trans>
              I enjoy coding since I was a teenager, and I&apos;ve always been
              passionate about it 🤓
            </Trans>
          </p>
          {/* PENDING: <p className="m-4 text-left py-2 sm:text-center text-xl text-stone-200">
            Here&apos;s me with my beautiful dog, Leon:
          </p> */}
          {/* TODO: IMAGE */}
        </article>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      i18n: await loadCatalog(ctx.locale)
    }
  }
}
