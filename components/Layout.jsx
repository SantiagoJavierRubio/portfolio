import NavBar from './NavBar/NavBar'
import Head from 'next/head'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Santiago Rubio - Web Dev</title>
      </Head>
      <NavBar />
      <main className="mt-16 min-h-screen max-w-full bg-stone-900 text-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
