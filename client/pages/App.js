import { useRef } from 'react'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Portfolio from './components/Portfolio/Portfolio'
import About from './components/About/About'
import Footer from './components/Footer/Footer'

import { useSelector } from 'react-redux'
import './App.css'

function App() {
  const view = useSelector(state => state.views.view)
  const contactRef = useRef(null)
  const scrollToContact = () => {
    if (!contactRef.current) {
      return setTimeout(scrollToContact, 1000)
    }
    contactRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className="App">
      <NavBar scrollToContact={scrollToContact} />
      {view === 'home' && <Home contactRef={contactRef} />}
      {view === 'portfolio' && <Portfolio />}
      {view === 'about' && <About />}
      <Footer />
    </div>
  )
}

export default App
