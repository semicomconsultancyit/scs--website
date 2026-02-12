import { useState } from 'react'
import Accordion from './Accordion'
import '../styles/ProductModal.css'

const modalContent = {
  lasers: {
    title: 'Lasers',
    type: 'cards',
    cards: [
      { id: 'lightSources', title: 'Light Sources', image: 'assests/light sources.png' },
      { id: 'detectors', title: 'Detectors', image: 'assests/detector.png' },
      { id: 'imaging', title: 'Imaging', image: 'assests/imaging.png' },
      { id: 'optics', title: 'Optics & Fiber', image: 'assests/optics & fiber.png' },
      { id: 'opto', title: 'Opto-Mechanics', image: 'assests/opto mechanics.png' },
      { id: 'opticalTest', title: 'Optical Test & Metrology', image: 'assests/optical test & metrology.png' }
    ]
  },
  GaN: {
    title: 'GaN Technology',
    type: 'accordion',
    items: [
      {
        title: '1. GaN Epitaxial (Epi) Design',
        image: 'assests/gaNexp.png',
        description: 'The process begins with the design of the GaN epitaxial structure engineered on a high-performance substrate such as Silicon Carbide (SiC). Multiple layers—including GaN cap, AlGaN barrier, GaN buffer, and AlN nucleation—are optimized to ensure superior thermal conductivity, high electron mobility, and reliability required for high-power RF applications.'
      },
      {
        title: '2. Processed GaN Wafer',
        image: 'assests/Processed%20GaN%20wafer.jpg',
        description: 'Once the epi structure is finalized, the wafer undergoes semiconductor processing steps like photolithography, etching, metallization, and passivation. This transforms the wafer into functional GaN device layers ready for IC fabrication. The processed wafer contains multiple devices distributed across the substrate.'
      },
      {
        title: '3. Fabricated IC',
        image: 'assests/Fabricated%20IC.jpg',
        description: 'The processed wafer is diced, and individual GaN die are fabricated into integrated circuits. These ICs incorporate RF amplifier structures designed to handle high power and wide-band operation. The layout includes matching networks and metallization structures required for optimal RF performance.'
      },
      {
        title: '4. Packaged Chip',
        image: 'assests/Packaged%20Chip.jpg',
        description: 'The fabricated ICs are then packaged into protective high-reliability RF packages. Packaging improves mechanical strength, thermal handling, and electrical interfacing. It enables the device to be integrated into RF modules and systems while maintaining low parasitics and stable high-frequency performance.'
      },
      {
        title: '5. RF Power Module',
        image: 'assests/GaNcardBG.png',
        description: 'The packaged GaN device is integrated into a fully assembled RF power amplifier module. The module delivers: 150 W continuous-wave output power, Operating range: 700 MHz – 6 GHz, Compact size: 32 × 20 × 5 cm. This module is ready for deployment in applications such as radar, satellite communication, defense electronics, 5G infrastructure, and research systems.'
      }
    ]
  },
  probe: {
    title: 'Probe Station System & Accessories',
    type: 'cards',
    cards: [
      { id: 'probeSystem', title: 'Probe Station System', image: 'assests/probe_card.png' }
    ]
  }
}

export default function ProductModal({ modalId, onClose }) {
  const content = modalContent[modalId]

  if (!content) {
    return null
  }

  return (
    <div className="modal show" aria-hidden="false" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-flex">
          <h2>{content.title}</h2>
        </div>

        {content.type === 'cards' && (
          <div className="card-container">
            {content.cards.map(card => (
              <button
                key={card.id}
                className="product-card"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
              </button>
            ))}
          </div>
        )}

        {content.type === 'accordion' && (
          <>
            <h3>Module Development Steps</h3>
            <Accordion items={content.items} />
          </>
        )}

        <div style={{ marginTop: '14px', textAlign: 'right' }}>
          <button className="btn-contact" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
