import { useState } from 'react'
import '../styles/Accordion.css'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="accordion">
      {items.map((item, idx) => (
        <div key={idx} className="accordion-section">
          <button
            className={`accordion-toggle ${openIndex === idx ? 'open' : ''}`}
            onClick={() => toggleAccordion(idx)}
            role="button"
            tabIndex="0"
          >
            <h4>{item.title}</h4>
            <div className="arrow">▶</div>
          </button>
          {openIndex === idx && (
            <div className="accordion-content" style={{ display: 'block', maxHeight: '1000px' }}>
              <div className="accordion-item">
                <img src={item.image} alt={item.title} />
                <p>{item.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
