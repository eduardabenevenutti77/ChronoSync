import { useState } from 'react'
import './App.css'
import Time from './pages/time/time'
import Footer from './components/footer/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Time />
      <Footer />
    </>
  )
}

export default App
