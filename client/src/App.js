import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Portfolio from './components/Portfolio/Portfolio'
import About from './components/About/About'
import Footer from './components/Footer/Footer'

import { useSelector } from 'react-redux'
import './App.css';

function App() {
  const view = useSelector((state) => state.views.view)
  return (
    <div className="App">
      <NavBar />
        {view === 'home' && <Home />}
        {view === 'portfolio' && <Portfolio />}
        {view === 'about' && <About />}
      <Footer />
    </div>
  );
}

export default App;
