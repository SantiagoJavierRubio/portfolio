import NavBar from './NavBar/NavBar'
import Head from 'next/head'
import Footer from './Footer'
import BgCloud from './BgCloud'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Santiago Rubio - Dev</title>
      </Head>
      <NavBar />
      <BgCloud />
      <main className="relative z-10 mt-16 min-h-screen max-w-full bg-transparent text-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
