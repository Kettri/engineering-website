const config = {
    apiUrl: window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api/chat'
        : 'https://api.araztanha.com/api/chat',
    maxMessageLength: 500,
    typingIndicatorDelay: 1000,
    maxRetries: 3,
    retryDelay: 1000
};

export default config; 