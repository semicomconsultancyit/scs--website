import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import About from './components/About'
import Products from './components/Products'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatbotWidget from './components/ChatbotWidget'
import './styles/App.css'

export default function App() {
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    // Initialize EmailJS
    if (window.emailjs) {
      window.emailjs.init("S6HG1wJ5UxM3d7nYk")
    }
  }, [])

  const handleShowModal = (modalId) => {
    setActiveModal(modalId)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Expertise />
        <About />
        <Products onShowModal={handleShowModal} />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  )
}
