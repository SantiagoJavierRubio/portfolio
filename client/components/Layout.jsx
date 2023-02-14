import NavBar from './NavBar/NavBar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="mt-16 h-screen max-w-full bg-transparent text-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
