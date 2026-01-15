import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './Chatbot.module.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your book assistant. Ask me anything about the A_Book documentation.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    inputRef.current?.focus();
  }, [location]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateBotResponse = (userMessage) => {
    // This is a simple simulation - in a real implementation, you would connect to an AI service
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return "Hello there! How can I help you with information about the A_Book documentation?";
    } else if (lowerCaseMessage.includes('what') && lowerCaseMessage.includes('book')) {
      return "A_Book is a comprehensive documentation platform designed to provide detailed guides and resources on various topics. It's built with Docusaurus for optimal user experience.";
    } else if (lowerCaseMessage.includes('documentation') || lowerCaseMessage.includes('guide')) {
      return "Our documentation covers a wide range of topics with detailed guides, tutorials, and reference materials. You can browse through different sections to find what you need.";
    } else if (lowerCaseMessage.includes('search') || lowerCaseMessage.includes('find')) {
      return "You can use the search bar at the top of the site to find specific topics, or browse through our organized documentation sections.";
    } else if (lowerCaseMessage.includes('contribute') || lowerCaseMessage.includes('help')) {
      return "We welcome contributions! You can contribute by suggesting improvements, reporting issues, or adding new content through our GitHub repository.";
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
      return "Goodbye! Feel free to explore the A_Book documentation for more information.";
    } else {
      return "I'm your book assistant for A_Book. I can provide information about the documentation structure, content, and how to navigate the resources. What would you like to know?";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { 
      id: Date.now(), 
      text: inputValue, 
      sender: 'user' 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot processing time
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: simulateBotResponse(inputValue), 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout title="Book Chatbot" description="Chat with the book assistant for A_Book documentation">
      <div className={clsx('container', styles.chatContainer)}>
        <div className={styles.chatHeader}>
          <h1>Book Assistant</h1>
          <p>Ask me anything about the A_Book documentation</p>
        </div>
        
        <div className={styles.chatBox}>
          <div className={styles.messages}>
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={clsx(
                  styles.message, 
                  message.sender === 'user' ? styles.userMessage : styles.botMessage
                )}
              >
                <div className={styles.messageContent}>
                  {message.text}
                </div>
                <div className={styles.sender}>
                  {message.sender === 'user' ? 'You' : 'Book Assistant'}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className={clsx(styles.message, styles.botMessage)}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
                <div className={styles.sender}>Book Assistant</div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className={styles.inputForm}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question about the book..."
              className={styles.input}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className={styles.sendButton}
              disabled={isLoading || !inputValue.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Chatbot;