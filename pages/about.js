/* eslint-disable tailwindcss/no-custom-classname */
import Layout from '../components/Layout'
import FadingIcon from '../components/FadingIcon'

export default function About() {
  return (
    <Layout>
      <section className="m-auto mb-8 h-full max-w-6xl tracking-wide text-stone-200 sm:px-4 md:px-8 lg:px-12">
        <h1 className="mb-6 text-5xl font-bold text-violet-400">About me</h1>
        <article className="my-6">
          <h3 className="mb-4 pb-4 text-center text-2xl font-bold text-purple-500 sm:text-left">
            Basic info
          </h3>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center md:ml-8 lg:ml-12">
            My name is Santiago, I&apos;m a Fullstack{' '}
            <span className="px-1 font-bold text-yellow-500">Javascript</span> &{' '}
            <span className="px-1 font-bold text-blue-500">Typescript</span>{' '}
            developer 🧑🏼‍💻
          </p>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center md:ml-8 lg:ml-12">
            🌎 I&apos;m from Argentina, currently based in Buenos Aires
          </p>
          <p className="m-4 py-2 text-left text-xl  text-stone-200 sm:text-center md:ml-8 lg:ml-12">
            I currently work as a part-time developer at OLA Estudio and also do
            freelance projects 💼
          </p>
        </article>
        <FadingIcon
          icons={['devicon-javascript-plain', 'devicon-typescript-plain']}
        />
        <article className="my-6">
          <h3 className="mb-4 pb-4 text-center text-2xl font-bold text-purple-500 sm:text-left">
            Studies
          </h3>
          <ul>
            <li className="m-4 text-left text-xl text-stone-200 before:mr-2 before:align-middle before:text-sm before:content-['📖'] sm:px-8">
              Backend development - Coderhouse
              <span className="ml-4 text-base font-thin italic text-teal-200">
                JS & TS (2022)
              </span>
            </li>
            <li className="m-4 text-left text-xl text-stone-200 before:mr-2 before:align-middle before:text-sm before:content-['📖'] sm:px-8">
              Backend development - Agencia de Aprendizaje a lo largo de la Vida
              <span className="ml-4 text-base font-thin italic text-teal-200">
                Java (2022)
              </span>
            </li>
            <li className="m-4 text-left text-xl text-stone-200 before:mr-2 before:align-middle before:text-sm before:content-['📖'] sm:px-8">
              Fullstack web development - Agencia de Aprendizaje a lo largo de
              la Vida{' '}
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
            Competences
          </h3>
          <div className="mt-4 ml-2 sm:ml-4 md:ml-8 lg:ml-12">
            <h4 className="text-left text-xl font-bold text-teal-500 underline">
              Proficient
            </h4>
            <ul className="ml-4 list-disc pl-2 sm:px-4 md:px-8 lg:px-12">
              <li className="m-4 text-left text-xl text-stone-200">
                NodeJS backend frameworks (Express, Nest, Koa)
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                SPA with React, Redux, React Router, React Query
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                Fullstack with NextJS, tRPC, SSR
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                Styling with CSS, Tailwind, Styled-components
              </li>
              <li className="m-4 text-left text-xl text-stone-200">
                SQL & NoSQL databases - MySQL, MongoDB, Firebase, Postgres
              </li>
            </ul>
          </div>
          <div className="mt-4 ml-2 sm:ml-4 md:ml-8 lg:ml-12">
            <h4 className="text-left text-xl font-bold text-teal-500 underline">
              Competent
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
            Interests & hobbies
          </h3>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center">
            Apart from coding I&apos;m a musician and a music teacher. I play
            the piano and clarinet 🎹
          </p>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center">
            <i className="devicon-godot-plain colored px-2" />I like playing
            videogames. I also create some of my own using Godot engine as a
            hobby{'  '}{' '}
          </p>
          <p className="m-4 py-2 text-left text-xl text-stone-200 sm:text-center">
            I enjoy coding since I was a teenager, and I&apos;ve always been
            passionate about it 🤓
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
