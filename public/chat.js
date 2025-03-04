import config from './config.js';

class ChatWidget {
    constructor() {
        this.chatButton = document.querySelector('.chat-button');
        this.chatBox = document.querySelector('.chat-box');
        this.closeButton = document.querySelector('.close-chat');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.inputField = document.querySelector('.chat-input textarea');
        this.sendButton = document.querySelector('.send-message');
        this.exportButton = document.querySelector('.export-chat');
        
        this.messages = [];
        this.isOpen = false;
        this.apiUrl = config.apiUrl;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addInitialMessage();
    }

    setupEventListeners() {
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        this.exportButton.addEventListener('click', () => this.exportChat());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatBox.classList.toggle('active');
        this.chatButton.classList.toggle('active');
        if (this.isOpen) {
            this.inputField.focus();
        }
    }

    addInitialMessage() {
        this.addMessage('Hello! I\'m your AI assistant. How can I help you today?', 'bot');
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.inputField.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            this.removeTypingIndicator();
            this.addMessage(data.message, 'bot');
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'error');
            console.error('Chat API Error:', error);
        }
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        this.messages.push({ text, type, timestamp: new Date().toISOString() });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.textContent = 'Typing...';
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = this.messagesContainer.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    exportChat() {
        const chatText = this.messages
            .map(msg => {
                const date = new Date(msg.timestamp).toLocaleString();
                return `[${date}] ${msg.type === 'user' ? 'You' : 'Assistant'}: ${msg.text}`;
            })
            .join('\n\n');
        
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-history-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
}); 