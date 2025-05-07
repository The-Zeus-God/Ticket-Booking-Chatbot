import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

const socket = io('http://localhost:5000');

const GREETING_MESSAGE = {
  sender: 'bot',
  text: '👋 Hello! I am PEAS, your guide assistant. Please type "hi" to start the conversation!'
};

const ChatBot = ({ isDarkTheme }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const greetedRef = useRef(false);

  useEffect(() => {
    if (!greetedRef.current) {
      setMessages([GREETING_MESSAGE]);
      greetedRef.current = true;
    }

    socket.on('bot message', (message) => {
      if (message === GREETING_MESSAGE.text) {
        return;
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: message }]);
    });

    return () => {
      socket.off('bot message');
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    socket.emit('chat message', input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([GREETING_MESSAGE]);
  };

  const renderMessage = (msg) => {
    if (msg.text.includes('<img')) {
      const imgSrc = msg.text.match(/src="(.*?)"/)[1];
      return <img src={imgSrc} alt="QR Code" style={{ maxWidth: '100%', marginTop: '10px' }} />;
    }
    return msg.text;
  };

  const theme = {
    primaryColor: isDarkTheme ? '#333' : '#4CAF50',
    backgroundColor: isDarkTheme ? '#121212' : '#f7f7f7',
    headerColor: isDarkTheme ? '#333' : '#4CAF50',
    headerTextColor: 'white',
    userMessageColor: isDarkTheme ? '#444' : '#dcf8c6',
    botMessageColor: isDarkTheme ? '#555' : '#e0e0e0',
    buttonColor: isDarkTheme ? '#4CAF50' : '#333',
    resetButtonColor: '#f44336',
    fontFamily: "'Roboto', sans-serif",
    borderRadius: '20px',
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '30px auto',
      backgroundColor: theme.backgroundColor,
      borderRadius: theme.borderRadius,
      boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      fontFamily: theme.fontFamily
    }}>
      <div style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: theme.headerColor,
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
        color: theme.headerTextColor
      }}>
        <h2>PEAS - Your Museum Ticket Guide</h2>
      </div>

      <div ref={chatContainerRef} style={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? theme.userMessageColor : theme.botMessageColor,
                padding: '10px 15px',
                borderRadius: theme.borderRadius,
                maxWidth: '70%',
                wordBreak: 'break-word'
              }}
            >
              {renderMessage(msg)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{
        display: 'flex',
        padding: '15px',
        borderTop: '1px solid #ccc',
        gap: '10px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: '10px',
            borderRadius: theme.borderRadius,
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: theme.buttonColor,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius,
            cursor: 'pointer'
          }}
        >
          Send
        </button>
        <button
          onClick={resetChat}
          style={{
            padding: '10px 20px',
            backgroundColor: theme.resetButtonColor,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius,
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
