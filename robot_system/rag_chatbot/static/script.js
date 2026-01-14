// RAG Chatbot Interface
class RAGChatbot {
    constructor() {
        this.chatHistory = document.getElementById('chatHistory');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.selectedTextButton = document.getElementById('selectedTextButton');
        this.bookContent = document.getElementById('bookText');
        
        this.conversationHistory = [];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.selectedTextButton.addEventListener('click', () => this.sendSelectedTextMessage());
        
        // Allow sending message with Enter key (but allow Shift+Enter for new lines)
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }
    
    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        // Add user message to UI
        this.addMessageToUI(message, 'user');
        
        // Clear input
        this.userInput.value = '';
        
        // Show loading indicator
        const loadingMessage = this.addMessageToUI('Thinking...', 'bot', true);
        
        try {
            // Call the backend API
            const response = await this.callAPI('/api/v1/chat', {
                query: message,
                conversation_history: this.conversationHistory
            });
            
            // Remove loading indicator
            this.chatHistory.removeChild(loadingMessage);
            
            // Add bot response to UI
            this.addMessageToUI(response.response, 'bot');
            
            // Update conversation history
            this.conversationHistory.push({ role: 'user', content: message });
            this.conversationHistory.push({ role: 'assistant', content: response.response });
        } catch (error) {
            // Remove loading indicator
            this.chatHistory.removeChild(loadingMessage);
            
            // Show error message
            this.addMessageToUI(`Error: ${error.message}`, 'bot');
        }
    }
    
    async sendSelectedTextMessage() {
        const selectedText = this.getSelectedText();
        const message = this.userInput.value.trim();
        
        if (!selectedText) {
            this.addMessageToUI('Please select some text from the book content first.', 'bot');
            return;
        }
        
        if (!message) {
            this.addMessageToUI('Please enter a question about the selected text.', 'bot');
            return;
        }
        
        // Add user message to UI
        this.addMessageToUI(`Question about selected text: ${message}`, 'user');
        
        // Clear input
        this.userInput.value = '';
        
        // Show loading indicator
        const loadingMessage = this.addMessageToUI('Thinking...', 'bot', true);
        
        try {
            // Call the backend API for selected text
            const response = await this.callAPI('/api/v1/chat-selected-text', {
                query: message,
                selected_text: selectedText,
                conversation_history: this.conversationHistory
            });
            
            // Remove loading indicator
            this.chatHistory.removeChild(loadingMessage);
            
            // Add bot response to UI
            this.addMessageToUI(response.response, 'bot');
            
            // Update conversation history
            this.conversationHistory.push({ role: 'user', content: `Question about selected text: ${message}` });
            this.conversationHistory.push({ role: 'assistant', content: response.response });
        } catch (error) {
            // Remove loading indicator
            this.chatHistory.removeChild(loadingMessage);
            
            // Show error message
            this.addMessageToUI(`Error: ${error.message}`, 'bot');
        }
    }
    
    getSelectedText() {
        // Get the selected text from the book content area
        if (window.getSelection) {
            return window.getSelection().toString().trim();
        } else if (document.selection && document.selection.type !== 'Control') {
            return document.selection.createRange().text.trim();
        }
        return '';
    }
    
    addMessageToUI(content, sender, isLoading = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
            messageDiv.innerHTML = `<strong>You:</strong> ${this.escapeHtml(content)}`;
        } else {
            messageDiv.classList.add('bot-message');
            if (isLoading) {
                messageDiv.innerHTML = `<strong>Chatbot:</strong> <span class="loading">Thinking...</span>`;
            } else {
                messageDiv.innerHTML = `<strong>Chatbot:</strong> ${this.escapeHtml(content)}`;
            }
        }
        
        this.chatHistory.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
        
        if (isLoading) {
            return messageDiv;
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    async callAPI(endpoint, data) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RAGChatbot();
});