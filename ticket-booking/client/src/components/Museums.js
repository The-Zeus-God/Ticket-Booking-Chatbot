import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../App";

function Museums() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const themedStyles = {
    container: {
      padding: "40px",
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      color: isDark ? "#f9f9f9" : "#000",
      minHeight: "90vh",
    },
    title: {
      textAlign: "center",
      fontSize: "36px",
      marginBottom: "30px",
      color: isDark ? "#90ee90" : "#2E8B57",
      marginTop:"70px"
    },
    museumList: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "30px",
    },
    card: {
      backgroundColor: isDark ? "#2d3748" : "#ffffff",
      color: isDark ? "#e0e0e0" : "#000",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      width: "250px",
      textAlign: "center",
      cursor: "pointer",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "15px",
    },
    name: {
      fontSize: "20px",
      color: isDark ? "#ffffff" : "#333",
      marginBottom: "5px",
    },
    location: {
      fontSize: "16px",
      color: isDark ? "#ccc" : "#777",
    },
  };

  const museums = [
    {
      name: "Government Museum",
      location: "Chennai, Tamil Nadu",
      image: "/images/one.jpg",
    },
    {
      name: "Gandhi Memorial Museum",
      location: "Madurai, Tamil Nadu",
      image: "/images/two.jpg",
    },
    {
      name: "Government Museum",
      location: "Thanjavur, Tamil Nadu",
      image: "/images/three.jpg",
    },
    {
      name: "Fort Museum",
      location: "Chennai, Tamil Nadu",
      image: "/images/four.jpg",
    },
    {
      name: "Vivekananda House Museum",
      location: "Chennai, Tamil Nadu",
      image: "/images/five.webp",
    },
  ];

  return (
    <div style={themedStyles.container}>
      <h2 style={themedStyles.title}>Explore Tamil Nadu Museums</h2>
      <div style={themedStyles.museumList}>
        {museums.map((museum, index) => (
          <motion.div
            key={index}
            style={themedStyles.card}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={museum.image} alt={museum.name} style={themedStyles.image} />
            <h2 style={themedStyles.name}>{museum.name}</h2>
            <p style={themedStyles.location}>{museum.location}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Museums;
