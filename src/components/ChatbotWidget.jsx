import { useEffect } from 'react'

export default function ChatbotWidget() {
  useEffect(() => {
    // Configure chatbot
    window.ChatbotConfig = {
      backendUrl: 'https://your-render-app.onrender.com',
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      position: 'bottom-right',
      welcomeMessage: 'Hello! Welcome to Semicom Consultancy. How can I assist you today?',
      botName: 'SERA',
      autoOpen: false,
      requireName: false
    }

    // Load chatbot widget script
    const script = document.createElement('script')
    script.src = '/chatbot-widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
