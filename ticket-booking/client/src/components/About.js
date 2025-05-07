import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from "react";
import { ThemeContext } from "../App"; 

function About() {
   const { theme } = useContext(ThemeContext);
  
    const isDark = theme === "dark";

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      
      
      <section
        style={{
          backgroundColor: isDark ? '#2E8B57' : '#4CAF50',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem',marginTop:"80px" }}>About PEAS</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Your Smart Ticket Booking Assistant for Museums across Tamil Nadu
        </p>
      </section>

      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '4rem 2rem',
          alignItems: 'center',
          gap: '2rem',
          justifyContent: 'center',
          paddingLeft:"140px",
          backgroundColor: isDark ? '#1f2937' : 'white',
        }}
      >
        
        <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
          <h2 style={{ color: isDark ? '#90ee90' : '#333', marginBottom: '1rem' }}>
            Discover Tamil Nadu’s Rich Heritage
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: isDark ? '#ccc' : '#555',
              marginBottom: '1rem',
            }}
          >
            PEAS (Personalized Easy Assistant Service) is designed to simplify the way you book museum tickets across Tamil Nadu.
            We bring you closer to the vibrant culture, ancient history, and artistic brilliance of our state — all through a smart and easy chatbot experience.
          </p>
          <p
            style={{
              fontSize: '1.1rem',
              color: isDark ? '#ccc' : '#555',
            }}
          >
            Whether you're a student, tourist, or history enthusiast, PEAS makes your journey seamless — search museums by district, chat for instant details, and book your entry effortlessly.
          </p>
        </div>

        {/* Image Part */}
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <motion.img
            src="/images/gandhi-museum-madurai.jpg"
            alt="Museum Tamil Nadu"
            style={{
              width: '100%',
              maxWidth: '450px',
              borderRadius: '15px',
              boxShadow: isDark
                ? '0 8px 16px rgba(0,0,0,0.5)'
                : '0 8px 16px rgba(0,0,0,0.2)',
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>
      </section>

      
      <section
        style={{
          backgroundColor: isDark ? '#111827' : '#f9f9f9',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: isDark ? '#90ee90' : '#4CAF50',
            marginBottom: '1rem',
          }}
        >
          Our Mission
        </h2>
        <p
          style={{
            fontSize: '1.2rem',
            color: isDark ? '#ccc' : '#555',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          To empower everyone to access Tamil Nadu’s cultural heritage easily, preserving our traditions while making exploration effortless and enjoyable.
        </p>
      </section>
    </div>
  );
}

export default About;
