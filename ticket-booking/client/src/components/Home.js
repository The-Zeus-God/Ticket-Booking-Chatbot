import React, { useContext } from "react";
import { ThemeContext } from "../App";

function Home() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const themedStyles = {
    container: {
      textAlign: "center",
      padding: "50px",
      backgroundColor: isDark ? "#1f2937" : "#ffffff", 
      color: isDark ? "#f9f9f9" : "#000000",          
      minHeight: "90vh",
    },
    title: {
      fontSize: "48px",
      color: isDark ? "#90ee90" : "#2E8B57", 
      marginBottom: "10px",
      marginTop:"90px"
    },
    subtitle: {
      fontSize: "20px",
      color: isDark ? "#ccc" : "#555",
      marginBottom: "40px",
    },
    features: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginBottom: "50px",
      flexWrap: "wrap",
    },
    featureCard: {
      backgroundColor: isDark ? "#2d3748" : "#f9fff9",
      color: isDark ? "#e0e0e0" : "#000",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      width: "250px",
    },
    button: {
      backgroundColor: isDark ? "#4CAF50" : "#2E8B57", 
      color: "white",
      padding: "15px 30px",
      fontSize: "18px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "20px",
    },
  };

  return (
    <div style={themedStyles.container}>
      <h1 style={themedStyles.title}>Welcome to PEAS</h1>
      <p style={themedStyles.subtitle}>
        Your Personal Assistant for Effortless Museum Ticket Booking!
      </p>

      <div style={themedStyles.features}>
        <div style={themedStyles.featureCard} className="feature-card">
          <h2>🎫 Easy Booking</h2>
          <p>Book your museum tickets quickly with a friendly chatbot!</p>
        </div>
        <div style={themedStyles.featureCard} className="feature-card">
          <h2>🏛️ Explore Museums</h2>
          <p>Discover exciting museums and exhibitions around you.</p>
        </div>
        <div style={themedStyles.featureCard} className="feature-card">
          <h2>💬 Instant Support</h2>
          <p>Get instant answers to your museum ticket queries with PEAS.</p>
        </div>
      </div>

      <button
        style={themedStyles.button}
        className="start-button"
        onClick={() => (window.location.href = "/chat")}
      >
        Start Chatting
      </button>

      <style>
        {`
          .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .feature-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          }
          .start-button {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .start-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
}

export default Home;
