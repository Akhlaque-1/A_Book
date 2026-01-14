import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './Chatbot.module.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your book assistant. Ask me anything about the Autonomous Humanoid Robot System.", sender: 'bot' }
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
      return "Hello there! How can I help you with information about the Autonomous Humanoid Robot System?";
    } else if (lowerCaseMessage.includes('what') && lowerCaseMessage.includes('robot')) {
      return "The Autonomous Humanoid Robot System is a sophisticated robotics platform with four core modules: Robotic Nervous System (ROS 2), Digital Twin (Gazebo/Unity), AI-Robot Brain (NVIDIA Isaac), and Vision-Language-Action (VLA) module.";
    } else if (lowerCaseMessage.includes('nervous') || lowerCaseMessage.includes('ros')) {
      return "The Robotic Nervous System is the core communication layer using ROS 2. It manages communication between sensors, actuators, and AI modules.";
    } else if (lowerCaseMessage.includes('digital') || lowerCaseMessage.includes('simulation') || lowerCaseMessage.includes('gazebo')) {
      return "The Digital Twin module provides physics simulation and environment modeling using Gazebo and Unity. It enables virtual testing for humanoid robots.";
    } else if (lowerCaseMessage.includes('ai') || lowerCaseMessage.includes('brain') || lowerCaseMessage.includes('navigation')) {
      return "The AI-Robot Brain handles perception, navigation, and learning using NVIDIA Isaac technologies. It processes sensory input to understand the environment and make decisions.";
    } else if (lowerCaseMessage.includes('vla') || lowerCaseMessage.includes('voice') || lowerCaseMessage.includes('action')) {
      return "The Vision-Language-Action (VLA) module handles cognitive planning and multi-modal interaction, converting human instructions to robot actions.";
    } else if (lowerCaseMessage.includes('install') || lowerCaseMessage.includes('setup')) {
      return "To install the system, you need Ubuntu 22.04 LTS with ROS 2 Humble Hawksbill, NVIDIA Isaac ROS packages, Gazebo Garden, and Python 3.8+. Check the installation guide in the documentation.";
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
      return "Goodbye! Feel free to ask if you have more questions about the Autonomous Humanoid Robot System.";
    } else {
      return "I'm your book assistant for the Autonomous Humanoid Robot System. I can provide information about the robot's architecture, modules, and functionality. What would you like to know?";
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
    <Layout title="Book Chatbot" description="Chat with the book assistant for the Autonomous Humanoid Robot System">
      <div className={clsx('container', styles.chatContainer)}>
        <div className={styles.chatHeader}>
          <h1>Book Assistant</h1>
          <p>Ask me anything about the Autonomous Humanoid Robot System</p>
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