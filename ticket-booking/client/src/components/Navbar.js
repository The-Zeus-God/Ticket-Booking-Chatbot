import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext); 

  return (
    <nav style={{ 
      ...styles.navbar, 
      backgroundColor: theme === "dark" ? "#1f2937" : "#2E8B57" 
    }}>
      <h2 style={styles.logo}>PEAS</h2>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>🏠 Home</Link>
        <Link to="/museums" style={styles.link}>🏛️ Museums</Link>
        <Link to="/about" style={styles.link}>ℹ️ About</Link>
        <Link to="/chat" style={styles.link}>💬 Chat</Link>
        <Link to="/contact" style={styles.link}>📞 Contact</Link>
        <button 
          onClick={toggleTheme} 
          style={{
            ...styles.link,
            backgroundColor: "transparent",
            border: "1px solid white",
            borderRadius: "5px",
            padding: "4px 8px",
            cursor: "pointer"
          }}
        >
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  },
  
  logo: {
    color: "white",
    margin: 0,
    fontSize: "24px",
  },
  navLinks: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginRight: "40px",
  },
  
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};


export default Navbar;
