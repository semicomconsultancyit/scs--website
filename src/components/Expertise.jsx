import '../styles/Expertise.css'

const expertiseData = [
  {
    title: 'Semiconductor/Lasers/Photonics',
    description: 'Advanced semiconductor testing and devices engineered for precision and high performance.',
    image: 'assests/Semiconductorwafer.jpg',
    position: 'left'
  },
  {
    title: 'RF & Microwaves/SiC',
    description: 'High-power and high-frequency solutions built on Silicon Carbide.',
    image: 'assests/RFCard.jpg',
    position: 'left'
  },
  {
    title: 'Quantum',
    description: 'Next-gen quantum technologies enabling ultra-secure communications and precision computation.',
    image: 'assests/quantum.avif',
    position: 'left'
  },
  {
    title: 'THz/Optics',
    description: 'Cutting-edge photonic and THz systems delivering sensing and imaging solutions.',
    image: 'assests/THz.png',
    position: 'right'
  },
  {
    title: 'GaN Technology',
    description: 'High-efficiency Gallium Nitride power and RF devices engineered for superior performance.',
    image: 'assests/GaNcardBG.png',
    position: 'right'
  }
]

export default function Expertise() {
  const leftExpertise = expertiseData.filter(e => e.position === 'left')
  const rightExpertise = expertiseData.filter(e => e.position === 'right')

  return (
    <section id="expertise">
      <div className="container expertise-grid">
        <div className="expertise-column left">
          {leftExpertise.map((item, idx) => (
            <div key={idx} className={`expertise-card ${item.position === 'left' && idx === 1 ? 'image-left' : ''}`}>
              <img 
                src={item.image} 
                alt={item.title}
                style={
                  idx === 0 ? { marginLeft: '10px', width: '100px' } :
                  idx === 1 ? { marginRight: '10px' } :
                  { marginLeft: '10px' }
                }
              />
              <div>
                <div className="text">{item.title}</div>
                <div className="desc small-muted">{item.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="expertise-heading">OUR<br/>EXPERTISE</div>

        <div className="expertise-column right">
          {rightExpertise.map((item, idx) => (
            <div key={idx} className="expertise-card">
              <img 
                src={item.image} 
                alt={item.title}
                style={{ marginRight: '10px' }}
              />
              <div>
                <div className="text">{item.title}</div>
                <div className="desc small-muted">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
