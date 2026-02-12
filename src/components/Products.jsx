import { useState } from 'react'
import ProductModal from './ProductModal'
import '../styles/Products.css'

const products = [
  {
    id: 'lasers',
    title: 'THz/Photonics/Optics Solutions',
    image: 'assests/laser_card.png',
    alt: 'Lasers'
  },
  {
    id: 'probe',
    title: 'Probe Station System & Accessories',
    image: 'assests/AutomaticProbe.png',
    alt: 'Probe Station System & Accessories',
    imageStyle: { width: '60%', height: 'auto' }
  },
  {
    id: 'GaN',
    title: 'GaN Technology',
    image: 'assests/GaNcardBG.png',
    alt: 'GaN Tech',
    imageStyle: { width: '60%', height: 'auto' }
  }
]

export default function Products({ onShowModal }) {
  const [activeModal, setActiveModal] = useState(null)

  const handleShowModal = (modalId) => {
    setActiveModal(modalId)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
  }

  return (
    <>
      <section id="products">
        <div className="container">
          <h2>Products & Services</h2>
          <div className="products-grid">
            {products.map(product => (
              <button
                key={product.id}
                className="product-card"
                onClick={() => handleShowModal(product.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <img 
                  src={product.image} 
                  alt={product.alt}
                  style={product.imageStyle}
                />
                <h3>{product.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeModal && (
        <ProductModal 
          modalId={activeModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
