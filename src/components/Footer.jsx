import '../styles/Footer.css'

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
    <path d="M22.54 16.88l-5-2.14a1 1 0 0 0-1 .14l-2.34 1.74a16.88 16.88 0 0 1-7.38-7.38l1.74-2.34a1 1 0 0 0 .14-1l-2.14-5A1 1 0 0 0 6.19.46L1.15 1.6A1 1 0 0 0 .2 3c0 11.28 9.19 20.47 20.47 20.47a1 1 0 0 0 1.39-.95l1.14-5.04a1 1 0 0 0-.76-1.2z"/>
  </svg>
)

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.75S5.53 4.23 6.5 4.23s1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.27h-3v-5.5c0-1.38-1.12-2.5-2.5-2.5S10 12.62 10 14v5.5h-3v-10h3v1.43c.75-1.1 2.06-1.93 3.5-1.93 2.48 0 4.5 2.02 4.5 4.5v6z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
    <path d="M7.75 2h8.5c3.14 0 5.75 2.61 5.75 5.75v8.5c0 3.14-2.61 5.75-5.75 5.75h-8.5C4.61 22 2 19.39 2 16.25v-8.5C2 4.61 4.61 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.25v8.5c0 2.07 1.68 3.75 3.75 3.75h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5c0-2.07-1.68-3.75-3.75-3.75h-8.5zm10.75 1.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5c0-.41.34-.75.75-.75zm-5 2.5a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer>
      <div className="footer-contact">
        <p>
          <a href="tel:+918600418168">
            <PhoneIcon />
            Call: +91 86004 18168
          </a>
        </p>
        <p>
          <a href="mailto:semicomconsultancy1@gmail.com">
            <EmailIcon />
            Email: semicomconsultancy1@gmail.com
          </a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/semicom-consultancy-services-9392b5208/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
            LinkedIn: semicom-consultancy-services
          </a>
        </p>
        <p>
          <a href="https://www.instagram.com/semicom_consultancy_services" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            Instagram: @semicom_consultancy_services
          </a>
        </p>
      </div>

      <a 
        href="https://wa.me/918600418168?text=Hello%20Semicom%20Consultancy%20Services%20-%20I%20would%20like%20to%20chat" 
        className="whatsapp-fab" 
        aria-label="Chat on WhatsApp" 
        title="Chat with us on WhatsApp" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="assests/whatsapp.png" alt="WhatsApp" className="whatsapp-img" loading="lazy" decoding="async" />
      </a>
    </footer>
  )
}
