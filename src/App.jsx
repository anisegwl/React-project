import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";

import HeroSection from "./components/Banner";
import Card from "./components/card";

function App() {
  const [text, setText] = useState("Dark Mode");
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setText("Light Mode");
    } else {
      setMode("light");
      setText("Dark Mode");
    }
  };

  let brandName = "Hamro-bazzar";

  return (
    <>
      <Navbar brandName={brandName} toggleMode={toggleMode} text={text} mode={mode} />
      <HeroSection />
      <Card toggleMode={toggleMode} mode={mode} />
    </>
  );
}

export default App;
