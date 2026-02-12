import '../styles/Clients.css'

const clients = [
  'Indian Space Research Organization (ISRO)',
  'Defence Research and Development Organization (DRDO)',
  'Indian Institute of Technology (IITs)',
  'Indian Institute of Science (IISc)',
  'MIL - Hindustan Aeronautics Limited (HAL)',
  'Bharat Electronics Limited (BEL)',
  'Electronics Corporation of India Limited (ECIL)',
  'Bharat Heavy Electricals Limited (BHEL)',
  'Gallium Arsenide Enabling Technology Centre (GAETEC)',
  'National Physical Laboratory (NPL)',
  'Semiconductor Complex Limited (SCL)',
  'CSIR-CEERI'
]

export default function Clients() {
  return (
    <section id="clients" className="clients-section">
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', color: 'var(--primary-color)' }}>
          Trusted by Leading Institutes
        </h2>

        <div style={{ textAlign: 'center' }}>
          <div className="clients-logos-wrapper">
            <img src="assests/clientimage-removebg-preview.png" alt="Client Logos" />
          </div>
        </div>

        <div className="clients-card">
          <ul className="client-list">
            {clients.map((client, idx) => (
              <li key={idx}>{client}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
