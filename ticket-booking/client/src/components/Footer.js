import React, { useContext } from 'react';
import { ThemeContext } from '../App';  
const Footer = () => {
  const { theme } = useContext(ThemeContext);  
  console.log("Current theme in Footer:", theme);

  const footerStyles = {
    backgroundColor: theme === 'dark' ? '#333' : '#4CAF50', 
    color: theme === 'dark' ? '#fff' : '#000',  
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto',
  };

  return (
    <footer style={footerStyles}>
      <p style={{ marginBottom: '10px' }}>© 2025 PEAS - Museum Ticket Guide | All rights reserved</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Privacy Policy</a>
        <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Terms</a>
        <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
