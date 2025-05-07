import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from "../App";
import Footer from './Footer'; 

function Contact() {
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: theme === 'dark' ? '#1f2937' : '#f7f7f7',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  };

  const inputStyle = {
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  return (
    <div style={containerStyle}>
      <div style={{ flexGrow: 1, padding: '3rem' }}>
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem' }}>Contact Us</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            We'd love to hear from you! Whether you have a question about ticket bookings, museums, or anything else,
            our team is ready to answer all your queries.
          </p>
        </section>

        <section style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input 
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input 
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <textarea 
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <motion.button 
              type="submit"
              style={buttonStyle}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Send Message
            </motion.button>
          </form>
        </section>

        <section style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p>📍 Based in Tamil Nadu, India</p>
          <p>✉️ Email: support@peasassistant.com</p>
          <p>📞 Phone: +91-9876543210</p>
        </section>
      </div>

      
      <Footer />
    </div>
  );
}

export default Contact;
