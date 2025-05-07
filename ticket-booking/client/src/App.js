import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Museums from "./components/Museums";
import About from "./components/About";
import Contact from "./components/Contact";
import Chat from "./components/Chat";

import "./App.css";


export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/museums" element={<Museums />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact  />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
          
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
