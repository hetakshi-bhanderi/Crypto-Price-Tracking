import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Coin from './pages/coin/Coin'
import Footer from './components/Footer/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
