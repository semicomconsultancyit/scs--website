import { useState } from 'react'
import '../styles/Header.css'

export default function Header() {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const closeNav = () => {
    setNavOpen(false)
  }

  return (
    <header>
      <div className="container header-inner">
        <div className="logo-row">
          <img src="assests/scs%20logo.png" alt="SCS Logo" />
          <div className="site-title">Semicom Consultancy Services</div>
        </div>
        <button 
          className={`nav-toggle ${navOpen ? 'open' : ''}`}
          onClick={toggleNav}
          aria-label="Toggle menu"
          aria-expanded={navOpen}
        >
          ☰
        </button>
        <nav className={navOpen ? 'open' : ''}>
          <ul>
            <li><a href="#home" onClick={closeNav}>Home</a></li>
            <li><a href="#about" onClick={closeNav}>About</a></li>
            <li><a href="#products" onClick={closeNav}>Products</a></li>
            <li><a href="#clients" onClick={closeNav}>Clients</a></li>
            <li><a href="#contact-section" onClick={closeNav}>Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
