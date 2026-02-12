import { useEffect } from 'react'
import '../styles/About.css'

const values = [
  { icon: '★', title: 'Excellence', description: 'Highest quality, precise equipment.' },
  { icon: '★', title: 'Integrity', description: 'Transparency and ethical practices.' },
  { icon: '★', title: 'Partnership', description: 'Long-term collaborative success.' },
  { icon: '★', title: 'Innovation', description: 'Disruptive technologies advancing microelectronics.' }
]

export default function About() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }, [])

  return (
    <section id="about">
      <div className="container">
        <h2>About</h2>
        <p><strong>Our Story:</strong> Precision, Partnership, and Pioneering Breakthroughs.</p>
        <p><strong>Our Vision & Dedication:</strong> Headquartered in Singapore, we specialize in next-generation semiconductor equipment. Our mission is to accelerate innovation in the microelectronics industry by building systems that define the future.</p>
        <p>We are a team of developers and scientists united by precision and disruptive breakthroughs across RF systems, power devices, and precise motion control platforms.</p>
        
        <div className="ticker">
          <div className="ticker-track">
            <span>We are Globally Connected with USA and Singapore, Our Partners are: Aligned Test Pte Ltd and Techdatax</span>
            <span>We are Globally Connected with USA and Singapore, Our Partners are: Aligned Test Pte Ltd and Techdatax</span>
          </div>
        </div>

        <h3 className="values-heading">Our Foundational Values</h3>
        <div className="values-grid">
          {values.map((value, idx) => (
            <div key={idx} className="value-item">
              <span className="value-icon">{value.icon}</span>
              <strong>{value.title}:</strong> {value.description}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
