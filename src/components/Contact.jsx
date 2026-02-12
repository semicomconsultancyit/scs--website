import { useState } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    query: ''
  })
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const showFormFeedback = (message, type) => {
    setFeedback({ message, type })
    if (type === 'success') {
      setTimeout(() => {
        setFeedback(null)
      }, 4000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      showFormFeedback('Please enter your name', 'error')
      return
    }
    if (!formData.email.trim()) {
      showFormFeedback('Please enter your email', 'error')
      return
    }
    if (!isValidEmail(formData.email)) {
      showFormFeedback('Please enter a valid email address', 'error')
      return
    }
    if (!formData.query.trim()) {
      showFormFeedback('Please enter your query', 'error')
      return
    }

    setIsLoading(true)

    const data = new FormData()
    data.append('name', formData.name.trim())
    data.append('email', formData.email.trim())
    data.append('organization', formData.organization.trim() || 'Not provided')
    data.append('message', formData.query.trim())

    try {
      const response = await fetch('https://formspree.io/f/meoylggd', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        showFormFeedback('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success')
        setFormData({ name: '', email: '', organization: '', query: '' })
      } else {
        throw new Error('Email service error')
      }
    } catch (error) {
      console.error('Email send error:', error)
      // Show success message anyway (as per original behavior)
      showFormFeedback('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success')
      setFormData({ name: '', email: '', organization: '', query: '' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact-section">
      <div className="container">
        <h2>Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          {feedback && (
            <div className={`form-feedback form-feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}
          
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <label htmlFor="organization">Organization</label>
          <input 
            type="text" 
            id="organization" 
            placeholder="Your Organization"
            value={formData.organization}
            onChange={handleChange}
          />
          
          <label htmlFor="query">Query</label>
          <textarea 
            id="query" 
            rows="4" 
            placeholder="Your Query"
            value={formData.query}
            onChange={handleChange}
          ></textarea>
          
          <button type="submit" className="primary-btn" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}
