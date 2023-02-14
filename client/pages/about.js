import Layout from '../components/Layout'
import FadingIcon from '../components/FadingIcon'

export default function about() {
  return (
    <Layout>
      <div className="mb-8 h-full">
        <div className="mt-10 mb-8">
          <h1 className="mb-6 text-3xl font-bold text-violet-400">About me</h1>
          <p className="m-4 text-center text-xl text-stone-200">
            My name is Santiago, I&apos;m a full-stack javascript developer
          </p>
          <FadingIcon
            icons={['devicon-nodejs-plain', 'devicon-express-original']}
          />
          <p className="m-4 text-center text-xl text-stone-200">
            I&apos;m from Argentina 🇦🇷 , currently based in Buenos Aires
          </p>
          <FadingIcon
            icons={['devicon-javascript-plain', 'devicon-typescript-plain']}
          />
          <p className="m-4 text-center text-xl text-stone-200">
            I&apos;ve studied fullstack development at Agencia de Aprendizaje a
            lo largo de la Vida 📚
            <br />
            I&apos;m currently studying backend development at Coderhouse
          </p>
          <FadingIcon
            icons={['devicon-react-original', 'devicon-html5-plain']}
          />
          <p className="m-4 text-center text-xl text-stone-200">
            Apart from coding I&apos;m a musician and a music teacher 🎹
          </p>
          <FadingIcon icons={['devicon-css3-plain', 'devicon-mongodb-plain']} />
          <p className="m-4 text-center text-xl text-stone-200">
            I enjoy coding since I was a teenager, and I&apos;ve always been
            passionate about it 🤓
          </p>
        </div>
      </div>
    </Layout>
  )
}
