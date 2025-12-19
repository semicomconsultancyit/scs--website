(function() {
    'use strict';
    
    // Configuration
    const config = {
        backendUrl: 'https://your-render-app.onrender.com',
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        position: 'bottom-right',
        welcomeMessage: 'Hello! Welcome to Semicom Consultancy. How can I assist you today?',
        botName: 'Bharat Bot',
        autoOpen: false,
        requireName: false
    };
    
    // User configuration override
    window.ChatbotConfig = window.ChatbotConfig || {};
    Object.assign(config, window.ChatbotConfig);
    
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chatbot-widget-container';
    
    // Set position - MOBILE FIRST (smaller on mobile)
    const positions = {
        'bottom-right': { bottom: '15px', right: '15px' },
        'bottom-left': { bottom: '15px', left: '15px' },
        'top-right': { top: '15px', right: '15px' },
        'top-left': { top: '15px', left: '15px' }
    };
    
    Object.assign(widgetContainer.style, {
        position: 'fixed',
        zIndex: '999999',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif`,
        ...positions[config.position] || positions['bottom-right']
    });
    
    // Create viewport meta tag if not exists
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
        document.head.appendChild(meta);
    }
    
    // Create HTML structure FIRST (mobile-optimized)
    widgetContainer.innerHTML = `
        <div class="chatbot-window" id="chatbotWindow">
            <div class="chatbot-header">
                <div class="header-content">
                    <div class="bot-avatar">
                        🤖
                    </div>
                    <div class="header-text">
                        <h3>${config.botName}</h3>
                        <p class="status online">Online</p>
                    </div>
                </div>
                <button class="close-btn" id="chatbotCloseBtn">×</button>
            </div>
            
            <div class="chat-messages" id="chatMessages">
                <!-- Messages will appear here -->
            </div>
            
            <div class="input-area">
                <div class="input-container">
                    <input type="text" id="userInput" placeholder="Type your message...">
                    <button id="sendBtn">→</button>
                </div>
                <p class="disclaimer">Powered by Semicom Consultancy Services</p>
            </div>
        </div>
        
        <button class="chatbot-toggle-btn" id="chatbotToggleBtn">
            💬
        </button>
    `;
    
    // Inject CSS with MOBILE-FIRST approach
    const style = document.createElement('style');
    style.textContent = `
        /* ===== MOBILE FIRST BASE STYLES ===== */
        /* For screens SMALLER than 768px (Mobile) */
        
        /* Chatbot Toggle Button - Mobile */
        .chatbot-toggle-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            border: none;
            color: white;
            font-size: 22px;
            cursor: pointer;
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .chatbot-toggle-btn:hover {
            transform: scale(1.05);
        }
        
        .chatbot-toggle-btn.pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
            100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
        }
        
        /* Chat Window - Mobile (Full screen on very small devices) */
        .chatbot-window {
            position: absolute;
            bottom: 65px;
            right: 0;
            width: 100vw;
            height: calc(100vh - 80px);
            background: white;
            border-radius: 0;
            box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px);
            visibility: hidden;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }
        
        .chatbot-window.open {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        }
        
        ${config.position.includes('left') ? '.chatbot-window { right: auto; left: 0; }' : ''}
        ${config.position.includes('top') ? '.chatbot-window { bottom: auto; top: 65px; }' : ''}
        
        /* Chat Header - Mobile */
        .chatbot-header {
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            padding: 12px 15px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
            min-height: 60px;
            box-sizing: border-box;
        }
        
        .header-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .bot-avatar {
            width: 40px;
            height: 40px;
            min-width: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        
        .header-text {
            flex: 1;
            min-width: 0;
        }
        
        .header-text h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .status {
            font-size: 11px;
            opacity: 0.9;
            margin-top: 2px;
        }
        
        .status.online {
            color: #4ade80;
        }
        
        .close-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-left: 8px;
        }
        
        /* Chat Messages - Mobile */
        .chat-messages {
            flex: 1;
            padding: 12px;
            overflow-y: auto;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: 10px;
            -webkit-overflow-scrolling: touch;
            box-sizing: border-box;
        }
        
        .message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 18px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            animation: messageIn 0.3s ease;
            box-sizing: border-box;
        }
        
        @keyframes messageIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .user-message {
            align-self: flex-end;
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            color: white;
            border-bottom-right-radius: 5px;
        }
        
        .bot-message {
            align-self: flex-start;
            background: white;
            color: #333;
            border: 1px solid #e2e8f0;
            border-bottom-left-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .message-content {
            font-size: 14px;
            line-height: 1.4;
        }
        
        .message-time {
            font-size: 10px;
            opacity: 0.7;
            margin-top: 4px;
            text-align: right;
        }
        
        /* Input Area - Mobile */
        .input-area {
            padding: 12px;
            border-top: 1px solid #e2e8f0;
            background: white;
            flex-shrink: 0;
            box-sizing: border-box;
        }
        
        .input-container {
            display: flex;
            gap: 8px;
        }
        
        .input-container input {
            flex: 1;
            padding: 12px 14px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            outline: none;
            box-sizing: border-box;
            height: 44px;
        }
        
        .input-container input:focus {
            border-color: ${config.primaryColor};
            box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
        }
        
        .input-container button {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
            border: none;
            color: white;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .disclaimer {
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
            margin: 8px 0 0 0;
        }
        
        /* Typing indicator */
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 10px 14px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            border-bottom-left-radius: 5px;
            align-self: flex-start;
            margin-bottom: 10px;
        }
        
        .typing-indicator span {
            width: 7px;
            height: 7px;
            background: #94a3b8;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        
        /* ===== MEDIUM DEVICES (Tablets) ===== */
        /* 768px and up */
        @media (min-width: 768px) {
            .chatbot-window {
                width: 380px;
                height: 550px;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                bottom: 80px;
                right: 0;
            }
            
            .chatbot-toggle-btn {
                width: 60px;
                height: 60px;
                font-size: 24px;
            }
            
            ${config.position.includes('left') ? '.chatbot-window { right: auto; left: 0; }' : ''}
            ${config.position.includes('top') ? '.chatbot-window { bottom: auto; top: 80px; }' : ''}
        }
        
        /* ===== LARGE DEVICES (Desktops) ===== */
        /* 1024px and up */
        @media (min-width: 1024px) {
            .chatbot-window {
                width: 400px;
                height: 600px;
            }
        }
        
        /* ===== EXTRA SMALL DEVICES ===== */
        /* For devices under 400px width (very small phones) */
        @media (max-width: 400px) {
            .chatbot-window {
                height: calc(100vh - 70px);
            }
            
            .chatbot-toggle-btn {
                width: 45px;
                height: 45px;
                font-size: 20px;
                bottom: 10px;
                right: 10px;
            }
            
            .header-text h3 {
                font-size: 15px;
            }
            
            .message {
                max-width: 90%;
                padding: 8px 12px;
            }
            
            .message-content {
                font-size: 13px;
            }
            
            .input-container input {
                padding: 10px 12px;
                font-size: 13px;
                height: 40px;
            }
            
            .input-container button {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
        }
        
        /* ===== SHORT DEVICES (like 484x642) ===== */
        /* For devices with height less than 700px */
        @media (max-height: 700px) {
            .chatbot-window {
                height: calc(100vh - 60px);
            }
            
            .chatbot-header {
                padding: 10px 12px;
                min-height: 50px;
            }
            
            .bot-avatar {
                width: 35px;
                height: 35px;
                min-width: 35px;
                font-size: 18px;
            }
            
            .header-text h3 {
                font-size: 15px;
            }
            
            .close-btn {
                width: 30px;
                height: 30px;
                font-size: 18px;
            }
            
            .chat-messages {
                padding: 10px;
                gap: 8px;
            }
            
            .message {
                padding: 8px 12px;
            }
            
            .message-content {
                font-size: 13px;
            }
            
            .input-area {
                padding: 10px;
            }
        }
        
        /* ===== VERY SHORT DEVICES ===== */
        /* For devices with height less than 500px */
        @media (max-height: 500px) {
            .chatbot-window {
                height: calc(100vh - 50px);
            }
            
            .chatbot-header {
                padding: 8px 10px;
                min-height: 45px;
            }
            
            .bot-avatar {
                width: 30px;
                height: 30px;
                min-width: 30px;
                font-size: 16px;
            }
            
            .header-text h3 {
                font-size: 14px;
            }
            
            .status {
                font-size: 10px;
            }
            
            .close-btn {
                width: 28px;
                height: 28px;
                font-size: 16px;
            }
            
            .chat-messages {
                padding: 8px;
                gap: 6px;
            }
            
            .message {
                padding: 6px 10px;
            }
            
            .message-content {
                font-size: 12px;
                line-height: 1.3;
            }
            
            .input-area {
                padding: 8px;
            }
            
            .input-container input {
                padding: 8px 10px;
                font-size: 12px;
                height: 38px;
            }
            
            .input-container button {
                width: 38px;
                height: 38px;
                font-size: 15px;
            }
        }
        
        /* ===== DARK MODE SUPPORT ===== */
        @media (prefers-color-scheme: dark) {
            .chatbot-window {
                background: #1a1a1a;
                color: white;
            }
            
            .chat-messages {
                background: #2d2d2d;
            }
            
            .bot-message {
                background: #2d2d2d;
                border-color: #404040;
                color: white;
            }
            
            .input-area {
                background: #1a1a1a;
                border-color: #404040;
            }
            
            .input-container input {
                background: #2d2d2d;
                border-color: #404040;
                color: white;
            }
            
            .typing-indicator {
                background: #2d2d2d;
                border-color: #404040;
            }
        }
        
        /* ===== TOUCH OPTIMIZATIONS ===== */
        .chatbot-toggle-btn,
        .close-btn,
        .input-container button {
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve scrolling on iOS */
        .chat-messages {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
        }
        
        /* Fix for iOS Safari 100vh issue */
        @supports (-webkit-touch-callout: none) {
            .chatbot-window {
                height: -webkit-fill-available;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(widgetContainer);
    
    // State management
    const state = {
        isOpen: false,
        messages: [],
        unreadCount: 0,
        userData: {
            name: localStorage.getItem('chatbotUserName') || '',
            email: localStorage.getItem('chatbotUserEmail') || ''
        }
    };

    // Initialize
    function init() {
        bindEvents();
        loadMessages();
        startAutoPing();
        
        // Add initial welcome message
        setTimeout(() => {
            if (document.getElementById('chatMessages').children.length === 0) {
                addMessage(config.welcomeMessage, 'bot');
            }
        }, 300);
        
        // Auto-open if configured
        if (config.autoOpen) {
            setTimeout(() => toggleChatbot(), 1000);
        }
        
        // Add pulse animation
        const toggleBtn = document.getElementById('chatbotToggleBtn');
        toggleBtn.classList.add('pulse');
        setTimeout(() => toggleBtn.classList.remove('pulse'), 5000);
    }
    
    // Event binding
    function bindEvents() {
        const toggleBtn = document.getElementById('chatbotToggleBtn');
        const closeBtn = document.getElementById('chatbotCloseBtn');
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        
        toggleBtn.addEventListener('click', toggleChatbot);
        closeBtn.addEventListener('click', closeChatbot);
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Touch events for mobile
        toggleBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleChatbot();
        }, { passive: false });
        
        // Close when clicking outside (except the toggle button)
        document.addEventListener('click', (e) => {
            const chatbotWindow = document.getElementById('chatbotWindow');
            const toggleBtn = document.getElementById('chatbotToggleBtn');
            
            if (state.isOpen && 
                !chatbotWindow.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                closeChatbot();
            }
        });
        
        // Handle virtual keyboard on mobile
        userInput.addEventListener('focus', handleMobileKeyboard);
        window.addEventListener('resize', handleMobileResize);
    }
    
    function handleMobileKeyboard() {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 300);
        }
    }
    
    function handleMobileResize() {
        if (state.isOpen && window.innerWidth <= 768) {
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    function toggleChatbot() {
        const chatbotWindow = document.getElementById('chatbotWindow');
        
        if (!state.isOpen) {
            chatbotWindow.classList.add('open');
            state.isOpen = true;
            state.unreadCount = 0;
            updateNotificationBadge();
            document.getElementById('userInput').focus();
            
            // Scroll to bottom when opening
            setTimeout(() => {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        } else {
            closeChatbot();
        }
    }
    
    function closeChatbot() {
        const chatbotWindow = document.getElementById('chatbotWindow');
        chatbotWindow.classList.remove('open');
        state.isOpen = false;
    }
    
    async function sendMessage() {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            const response = await fetch(`${config.backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: message,
                    userData: state.userData 
                })
            });
            
            const data = await response.json();
            
            removeTypingIndicator();
            
            if (response.ok) {
                addMessage(data.response, 'bot');
                saveMessages();
            } else {
                addMessage(`Sorry, I encountered an error. Please try again.`, 'bot');
            }
        } catch (error) {
            removeTypingIndicator();
            addMessage('I am having trouble connecting right now. Please check your internet connection.', 'bot');
            console.error('Chat error:', error);
        }
    }
    
    function addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Format content
        let formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = `
            <div class="message-content">${formattedContent}</div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add to state
        state.messages.push({
            sender,
            content,
            time: new Date().toISOString()
        });
        
        // Update unread count
        if (!state.isOpen && sender === 'bot') {
            state.unreadCount++;
            updateNotificationBadge();
        }
        
        // Limit messages
        if (state.messages.length > 50) {
            state.messages = state.messages.slice(-50);
        }
    }
    
    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function updateNotificationBadge() {
        const toggleBtn = document.getElementById('chatbotToggleBtn');
        let badge = toggleBtn.querySelector('.notification-badge');
        
        if (state.unreadCount > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'notification-badge';
                badge.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ff4757;
                    color: white;
                    font-size: 10px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                toggleBtn.appendChild(badge);
            }
            badge.textContent = state.unreadCount > 9 ? '9+' : state.unreadCount;
        } else if (badge) {
            badge.remove();
        }
    }
    
    function saveMessages() {
        try {
            localStorage.setItem('chatbotMessages', JSON.stringify(state.messages.slice(-20)));
        } catch (e) {
            console.error('Failed to save messages:', e);
        }
    }
    
    function loadMessages() {
        try {
            const saved = localStorage.getItem('chatbotMessages');
            if (saved) {
                const messages = JSON.parse(saved);
                messages.forEach(msg => addMessage(msg.content, msg.sender));
            }
        } catch (e) {
            console.error('Failed to load messages:', e);
        }
    }
    
    // Auto-ping to keep backend alive
    function startAutoPing() {
        if (!config.backendUrl || config.backendUrl.includes('your-render-app')) {
            return;
        }
        
        // Ping immediately
        pingBackend();
        
        // Ping every 10 minutes
        setInterval(pingBackend, 10 * 60 * 1000);
        
        // Also ping on user interaction
        ['click', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                setTimeout(pingBackend, 1000);
            }, { passive: true });
        });
    }
    
    function pingBackend() {
        if (!config.backendUrl || config.backendUrl.includes('your-render-app')) {
            return;
        }
        
        fetch(`${config.backendUrl}/api/health`)
            .then(response => {
                if (response.ok) {
                    console.log('✅ Backend ping successful');
                }
            })
            .catch(() => {
                // Silent fail - backend might be sleeping
            });
    }
    
    // Public API
    window.ChatbotWidget = {
        open: toggleChatbot,
        close: closeChatbot,
        sendMessage: (message) => {
            if (message) {
                document.getElementById('userInput').value = message;
                sendMessage();
            }
        }
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();