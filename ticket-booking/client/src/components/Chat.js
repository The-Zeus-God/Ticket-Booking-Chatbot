import React, { useContext } from "react";

import { ThemeContext } from "../App"; 
import ChatBot from "./ChatBot"; 

function Chat() {
  const { theme } = useContext(ThemeContext);
    
      const isDark = theme === "dark"; 
  
  const containerStyle = {
    padding: "20px",
    backgroundColor: theme === "dark" ? "#1f2937" : "#f7f7f7", 
    minHeight: "100vh", 
    color: theme === "dark" ? "#ffffff" : "#000000", 
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center",color: isDark ? "#90ee90" : "#2E8B57",marginTop:"45px" }}>Start Chatting with PEAS!</h2>
      <ChatBot isDarkTheme={theme === "dark"} /> 
    </div>
  );
}

export default Chat; 